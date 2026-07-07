import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1];
const isUserOrOrgPage = repositoryName?.endsWith('.github.io') ?? false;
const baseUrl = process.env.BASE_URL ?? (repositoryName && !isUserOrOrgPage ? `/${repositoryName}/` : '/');
const url = process.env.SITE_URL ?? (
  process.env.GITHUB_REPOSITORY_OWNER
    ? `https://${process.env.GITHUB_REPOSITORY_OWNER}.github.io`
    : 'http://127.0.0.1:3000'
);

const config: Config = {
  title: 'Customer Knowledge Base',
  tagline: 'Support cases organized as searchable documentation',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url,
  baseUrl,

  organizationName: process.env.GITHUB_REPOSITORY_OWNER ?? 'your-company',
  projectName: repositoryName ?? 'customer-knowledge',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['en'],
        docsRouteBasePath: '/',
        indexDocs: true,
        indexBlog: false,
        indexPages: false,
      },
    ],
  ],

  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Customer Knowledge Base',
      items: [],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
