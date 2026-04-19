import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Eclipse Docks',
  description: 'Developer documentation for building IDE-like applications with the Eclipse Docks framework',
  base: '/docs/',
  ignoreDeadLinks: true,
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Concepts', link: '/concepts/architecture' },
      { text: 'API', link: '/api' },
      { text: 'Repo', link: 'https://github.com/eclipse-docks/core' },
    ],
    sidebar: [
      {
        text: 'Introduction',
        items: [{ text: 'What is Eclipse Docks', link: '/intro' }],
      },
      {
        text: 'Guide',
        items: [
          { text: 'Getting started', link: '/guide/getting-started' },
          { text: 'Build your own app', link: '/guide/build-your-own-app' },
          { text: 'Create an extension', link: '/guide/create-an-extension' },
          { text: 'Add a sidebar tab', link: '/guide/add-sidebar-tab' },
          { text: 'Add a command and toolbar button', link: '/guide/add-command-toolbar' },
        ],
      },
      {
        text: 'Concepts',
        items: [
          { text: 'Architecture', link: '/concepts/architecture' },
          { text: 'Docks vs Theia', link: '/concepts/docks-vs-theia' },
          { text: 'Apps', link: '/concepts/apps' },
          { text: 'Extensions', link: '/concepts/extensions' },
          { text: 'Security and safety', link: '/concepts/security' },
          { text: 'Contributions', link: '/concepts/contributions' },
          { text: 'Commands', link: '/concepts/commands' },
        ],
      },
      {
        text: 'Reference',
        items: [
          { text: 'API reference', link: '/api' },
          { text: 'Packages overview', link: '/reference/packages' },
          { text: 'Technology stack', link: '/reference/tech-stack' },
        ],
      },
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/eclipse-docks/core' }],
  },
});
