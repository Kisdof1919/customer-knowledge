import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const contentRoot = path.join(root, "content");
const outputFile = path.join(root, "site", "content", "knowledge.json");

function slugFromPath(value) {
  return value
    .replace(/\\/g, "/")
    .replace(/\/index\.md$/i, "")
    .replace(/\.md$/i, "")
    .split("/")
    .filter(Boolean)
    .join("-");
}

function parseScalar(value) {
  const trimmed = String(value || "").trim();
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (/^\d+$/.test(trimmed)) return Number(trimmed);
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    return trimmed
      .slice(1, -1)
      .split(",")
      .map((item) => item.trim().replace(/^["']|["']$/g, ""))
      .filter(Boolean);
  }
  return trimmed.replace(/^["']|["']$/g, "");
}

function parseFrontMatter(text) {
  if (!text.startsWith("---")) return [{}, text.trim()];
  const end = text.indexOf("\n---", 3);
  if (end === -1) return [{}, text.trim()];
  const yaml = text.slice(3, end).replace(/\r/g, "").trim().split("\n");
  const body = text.slice(text.indexOf("\n", end + 1) + 1).trim();
  const data = {};
  let currentKey = null;
  let currentObject = null;

  for (const rawLine of yaml) {
    const line = rawLine.replace(/\r$/, "");
    if (!line.trim() || line.trim().startsWith("#")) continue;

    const top = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (top) {
      currentKey = top[1];
      currentObject = null;
      data[currentKey] = top[2] ? parseScalar(top[2]) : [];
      continue;
    }

    const listItem = line.match(/^  -\s*(.*)$/);
    if (listItem && currentKey) {
      if (!Array.isArray(data[currentKey])) data[currentKey] = [];
      const value = listItem[1];
      const objectStart = value.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
      if (objectStart) {
        currentObject = { [objectStart[1]]: parseScalar(objectStart[2]) };
        data[currentKey].push(currentObject);
      } else {
        currentObject = null;
        data[currentKey].push(parseScalar(value));
      }
      continue;
    }

    const objectField = line.match(/^    ([A-Za-z0-9_-]+):\s*(.*)$/);
    if (objectField && currentObject) {
      currentObject[objectField[1]] = parseScalar(objectField[2]);
    }
  }

  return [data, body];
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function inlineMarkdown(value) {
  return escapeHtml(value)
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img class="article-image" src="$2" alt="$1">')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
}

function markdownToHtml(markdown) {
  const lines = markdown.replace(/\r/g, "").split("\n");
  const html = [];
  let paragraph = [];
  let listType = null;

  function closeParagraph() {
    if (!paragraph.length) return;
    html.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`);
    paragraph = [];
  }

  function closeList() {
    if (!listType) return;
    html.push(`</${listType}>`);
    listType = null;
  }

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      closeParagraph();
      closeList();
      continue;
    }
    if (trimmed.startsWith("<")) {
      closeParagraph();
      closeList();
      html.push(trimmed);
      continue;
    }
    const heading = trimmed.match(/^(#{2,4})\s+(.+)$/);
    if (heading) {
      closeParagraph();
      closeList();
      const level = heading[1].length + 1;
      html.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`);
      continue;
    }
    const ordered = trimmed.match(/^\d+\.\s+(.+)$/);
    if (ordered) {
      closeParagraph();
      if (listType !== "ol") {
        closeList();
        html.push("<ol>");
        listType = "ol";
      }
      html.push(`<li>${inlineMarkdown(ordered[1])}</li>`);
      continue;
    }
    const unordered = trimmed.match(/^[-*]\s+(.+)$/);
    if (unordered) {
      closeParagraph();
      if (listType !== "ul") {
        closeList();
        html.push("<ul>");
        listType = "ul";
      }
      html.push(`<li>${inlineMarkdown(unordered[1])}</li>`);
      continue;
    }
    closeList();
    paragraph.push(trimmed);
  }

  closeParagraph();
  closeList();
  return html.join("");
}

function readEntry(filePath, idPrefix = "") {
  const relative = path.relative(contentRoot, filePath).replace(/\\/g, "/");
  const [frontMatter, body] = parseFrontMatter(fs.readFileSync(filePath, "utf8"));
  const id = frontMatter.id || slugFromPath(`${idPrefix}${relative}`);
  const node = {
    id,
    title: frontMatter.title || path.basename(filePath, ".md"),
  };

  for (const key of ["summary", "keywords", "downloads", "folder"]) {
    if (frontMatter[key] !== undefined) node[key] = frontMatter[key];
  }
  node.order = frontMatter.order ?? 999;

  const html = markdownToHtml(body);
  if (html) node.sections = [{ title: frontMatter.sectionTitle || "Details", html }];
  return node;
}

function sortNodes(nodes) {
  return nodes.sort((a, b) => (a.order - b.order) || a.title.localeCompare(b.title));
}

function buildDirectory(dir) {
  const indexFile = path.join(dir, "index.md");
  const relativeDir = path.relative(contentRoot, dir).replace(/\\/g, "/");
  const node = fs.existsSync(indexFile)
    ? readEntry(indexFile)
    : { id: slugFromPath(relativeDir), title: path.basename(dir), order: 999 };

  const children = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      children.push(buildDirectory(entryPath));
    } else if (entry.isFile() && entry.name.endsWith(".md") && entry.name !== "index.md") {
      children.push(readEntry(entryPath));
    }
  }

  if (children.length) node.children = sortNodes(children).map(stripOrder);
  return node;
}

function stripOrder(node) {
  const { order, ...clean } = node;
  if (clean.children) clean.children = clean.children.map(stripOrder);
  return clean;
}

const home = readEntry(path.join(contentRoot, "index.md"));
home.children = sortNodes([
  buildDirectory(path.join(contentRoot, "how-to")),
  buildDirectory(path.join(contentRoot, "troubleshooting")),
]).map(stripOrder);

fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, `${JSON.stringify({ tree: [stripOrder(home)] }, null, 2)}\n`);
