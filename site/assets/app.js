const state = {
  data: null,
  activeId: "home",
  openIds: new Set(["home", "how-to", "troubleshooting", "troubleshooting-camera", "troubleshooting-nvr"]),
  query: "",
};

const treeEl = document.getElementById("tree");
const articleEl = document.getElementById("article");
const searchInput = document.getElementById("searchInput");
const searchStatus = document.getElementById("searchStatus");
const sidebarToggle = document.getElementById("sidebarToggle");
const mobileSidebarToggle = document.getElementById("mobileSidebarToggle");
const railToggle = document.getElementById("railToggle");

function normalize(value) { return String(value || "").toLowerCase(); }
function searchText(node) {
  const values = [node.title];
  if (node.id === "home" || node.id.startsWith("how-to")) {
    values.push(node.summary, ...(node.keywords || []));
    for (const item of node.downloads || []) values.push(item.title, item.type);
  }
  return values.map(normalize).join(" ");
}
function nodeMatches(node, query) {
  if (!query) return true;
  return searchText(node).includes(query) || (node.children || []).some((child) => nodeMatches(child, query));
}
function countMatches(nodes, query) {
  if (!query) return 0;
  return nodes.reduce((total, node) => total + (nodeMatches(node, query) ? 1 : 0) + countMatches(node.children || [], query), 0);
}
function findNode(nodes, id) {
  for (const node of nodes) {
    if (node.id === id) return node;
    const found = findNode(node.children || [], id);
    if (found) return found;
  }
  return null;
}
function collectDownloads(node) {
  return [...(node.downloads || []), ...(node.children || []).flatMap(collectDownloads)];
}
function renderNodeList(nodes, level, query) {
  const ul = document.createElement("ul");
  ul.className = "tree-list";
  for (const node of nodes) {
    if (!nodeMatches(node, query)) continue;
    const hasChildren = Boolean((node.children && node.children.length) || node.folder);
    const isOpen = state.openIds.has(node.id) || Boolean(query);
    const li = document.createElement("li");
    li.className = "tree-item";
    const row = document.createElement("button");
    row.type = "button";
    row.className = `tree-row level-${Math.min(level, 4)}${state.activeId === node.id ? " active" : ""}${isOpen ? " open" : ""}${hasChildren ? "" : " leaf"}`;
    row.innerHTML = `<span class="caret">&gt;</span><span>${node.title}</span>`;
    row.addEventListener("click", () => {
      state.activeId = node.id;
      if (hasChildren) state.openIds[state.openIds.has(node.id) ? "delete" : "add"](node.id);
      renderTree();
      renderArticle();
      if (window.innerWidth <= 760) document.body.classList.add("sidebar-collapsed");
    });
    li.appendChild(row);
    if (node.children && node.children.length && isOpen) li.appendChild(renderNodeList(node.children, level + 1, query));
    ul.appendChild(li);
  }
  return ul;
}
function renderTree() {
  const query = normalize(state.query.trim());
  treeEl.innerHTML = "";
  const matchCount = countMatches(state.data.tree, query);
  searchStatus.textContent = query ? `${matchCount} matching items` : "";
  if (query && matchCount === 0) {
    treeEl.innerHTML = '<p class="empty">No matching items.</p>';
    return;
  }
  treeEl.appendChild(renderNodeList(state.data.tree, 0, query));
}
function renderDownloads(downloads = []) {
  if (!downloads.length) return "";
  return `<div class="download-list">${downloads.map((item) => `<div class="download-card"><div><strong>${item.title}</strong><span>${item.type || "File"}</span></div><a href="${item.href}" target="_blank" rel="noreferrer">Download</a></div>`).join("")}</div>`;
}
function renderArticle() {
  const node = findNode(state.data.tree, state.activeId) || state.data.tree[0];
  const sections = node.sections || [];
  const downloads = node.downloads || collectDownloads(node).filter((item) => item.title);
  articleEl.innerHTML = `<h2>${node.title}</h2><p class="meta">${node.summary || "Select an item from the left tree."}</p>${renderDownloads(downloads)}${sections.map((section) => `<h3>${section.title}</h3>${section.html}`).join("")}${!sections.length && !downloads.length ? '<p class="empty">Content will be added here.</p>' : ""}`;
}
function bindControls() {
  searchInput.addEventListener("input", (event) => { state.query = event.target.value; renderTree(); });
  sidebarToggle.addEventListener("click", () => document.body.classList.add("sidebar-collapsed"));
  mobileSidebarToggle.addEventListener("click", () => document.body.classList.remove("sidebar-collapsed"));
  railToggle.addEventListener("click", () => document.body.classList.remove("sidebar-collapsed"));
}
async function init() {
  const response = await fetch("content/knowledge.json", { cache: "no-store" });
  state.data = await response.json();
  bindControls();
  renderTree();
  renderArticle();
}
init().catch((error) => { articleEl.innerHTML = `<h2>Unable to load knowledge base</h2><p>${error.message}</p>`; });


