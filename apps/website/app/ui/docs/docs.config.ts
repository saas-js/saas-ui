const docsLinks: NavItem = {
  title: 'Docs',
  url: 'docs',
  items: [
    {
      title: 'Getting started',
      url: 'getting-started',
      items: [
        {
          title: 'Overview',
          items: [
            { title: 'Introduction', url: 'introduction' },
            { title: 'Installation', url: 'installation' },
            { title: 'From next to rc', url: 'migrating-from-next' },
            { title: 'Migration to v3', url: 'migration' },
            { title: 'CLI', url: 'cli' },
            { title: 'Contributing', url: 'contributing' },
          ],
        },
        {
          title: 'Frameworks',
          url: 'frameworks',
          items: [
            { title: 'Next.js (App)', url: 'next-app' },
            { title: 'Next.js (Pages)', url: 'next-pages' },
            { title: 'Storybook', url: 'storybook' },
            { title: 'TanStack Start', url: 'tanstack' },
            { title: 'Vite', url: 'vite' },
          ],
        },
      ],
    },

    {
      title: 'Components',
      url: 'components',
      items: [
        {
          title: 'Overview',
          url: 'overview',
        },
        {
          title: 'Layout',
          items: [
            { title: 'Aspect Ratio', url: 'aspect-ratio' },
            { title: 'Bleed', url: 'bleed' },
            { title: 'Box', url: 'box' },
            { title: 'Center', url: 'center' },
            { title: 'Container', url: 'container' },
            { title: 'Flex', url: 'flex' },
            { title: 'Float', url: 'float' },
            { title: 'Grid', url: 'grid' },
            { title: 'Group', url: 'group' },
            { title: 'Stack', url: 'stack' },
          ],
        },
        {
          title: 'Typography',
          items: [
            { title: 'Blockquote', url: 'blockquote' },
            { title: 'Code', url: 'code' },
            { title: 'Em', url: 'em' },
            { title: 'Heading', url: 'heading' },
            { title: 'Highlight', url: 'highlight' },
            { title: 'Kbd', url: 'kbd' },
            { title: 'Link', url: 'link' },
            { title: 'Link Overlay', url: 'link-overlay' },
            { title: 'List', url: 'list' },
            { title: 'Mark', url: 'mark' },
            { title: 'Prose', url: 'prose' },
            { title: 'Text', url: 'text' },
          ],
        },
        {
          title: 'Components',
          items: [
            { title: 'Accordion', url: 'accordion' },
            { title: 'Action Bar', url: 'action-bar' },
            { title: 'Alert', url: 'alert' },
            { title: 'App Shell', url: 'app-shell' },
            { title: 'Avatar', url: 'avatar' },
            { title: 'Badge', url: 'badge' },
            { title: 'Breadcrumb', url: 'breadcrumb' },
            { title: 'Button', url: 'button' },
            { title: 'Card', url: 'card' },
            { title: 'Checkbox Card', url: 'checkbox-card' },
            { title: 'Checkbox', url: 'checkbox' },
            { title: 'Clipboard', url: 'clipboard' },
            { title: 'Close Button', url: 'close-button' },
            { title: 'Collapsible', url: 'collapsible' },
            { title: 'Data List', url: 'data-list' },
            { title: 'Data Table', url: 'data-table' },
            { title: 'Dialog', url: 'dialog' },
            { title: 'Drawer', url: 'drawer' },
            { title: 'Editable', url: 'editable' },
            { title: 'Empty State', url: 'empty-state' },
            { title: 'Field', url: 'field' },
            { title: 'File Upload', url: 'file-upload' },
            { title: 'Filters', url: 'filters' },
            { title: 'GridList', url: 'grid-list' },
            { title: 'Hover Card', url: 'hover-card' },
            { title: 'Icon', url: 'icon' },
            { title: 'Icon Badge', url: 'icon-badge' },
            { title: 'Image', url: 'image' },
            { title: 'Input', url: 'input' },
            { title: 'Menu', url: 'menu' },
            { title: 'Number Input', url: 'number-input' },
            { title: 'Page', url: 'page' },
            { title: 'Pagination', url: 'pagination' },
            { title: 'Password Input', url: 'password-input' },
            { title: 'Pin Input', url: 'pin-input' },
            { title: 'Popover', url: 'popover' },
            // { title: 'Progress Circle', url: 'progress-circle' },
            { title: 'Progress', url: 'progress' },
            { title: 'Radio Card', url: 'radio-card' },
            { title: 'Radio', url: 'radio' },
            { title: 'Rating', url: 'rating' },
            { title: 'Segmented Control', url: 'segmented-control' },
            { title: 'Select (Native)', url: 'native-select' },
            { title: 'Select', url: 'select' },
            { title: 'Separator', url: 'separator' },
            { title: 'Sidebar', url: 'sidebar' },
            { title: 'Skeleton', url: 'skeleton' },
            { title: 'Slider', url: 'slider' },
            { title: 'Spinner', url: 'spinner' },
            { title: 'Stat', url: 'stat' },
            { title: 'Status', url: 'status' },
            { title: 'Steps', url: 'steps' },
            { title: 'Switch', url: 'switch' },
            { title: 'Tabs', url: 'tabs' },
            { title: 'Table', url: 'table' },
            { title: 'Tag', url: 'tag' },
            { title: 'Textarea', url: 'textarea' },
            { title: 'Timeline', url: 'timeline' },
            { title: 'Toast', url: 'toast' },
            { title: 'Toggle Tip', url: 'toggle-tip' },
            { title: 'Tooltip', url: 'tooltip' },
          ],
        },
        {
          title: 'Utilities',
          items: [
            { title: 'ClientOnly', url: 'client-only' },
            { title: 'EnvironmentProvider', url: 'environment-provider' },
            { title: 'For', url: 'for' },
            { title: 'FormatNumber', url: 'format-number' },
            { title: 'FormatByte', url: 'format-byte' },
            { title: 'FormatDate', url: 'format-date' },
            { title: 'LocaleProvider', url: 'locale-provider' },
            { title: 'Portal', url: 'portal' },
            { title: 'Show', url: 'show' },
            { title: 'Visually Hidden', url: 'visually-hidden' },
          ],
        },
      ],
    },

    {
      title: 'Charts',
      url: 'charts',
      items: [
        {
          title: 'Overview',
          items: [
            { title: 'Introduction', url: 'overview' },
            { title: 'useChart', url: 'use-chart' },
          ],
        },
        {
          title: 'Chart types',
          items: [
            { title: 'Chart', url: 'chart' },
            { title: 'Bar', url: 'bar' },
            { title: 'Line', url: 'line' },
            { title: 'Area', url: 'area' },
            { title: 'Pie', url: 'pie' },
          ],
        },
        {
          title: 'Compositions',
          items: [
            { title: 'Bar List', url: 'bar-list' },
            { title: 'Bar Segment', url: 'bar-segment' },
          ],
        },
      ],
    },

    {
      title: 'Theming',
      url: 'theming',
      items: [
        {
          title: 'Concepts',
          items: [
            { title: 'Overview', url: 'overview' },
            { title: 'Appearance', url: 'appearance' },
            { title: 'Color system', url: 'color-system' },
            { title: 'Semantic tokens', url: 'semantic-tokens' },
            { title: 'Theme', url: 'theme' },
            { title: 'Utilities', url: 'utilities' },
            { title: 'Recipes', url: 'recipes' },
          ],
        },
        {
          title: 'Design Tokens',
          items: [
            { title: 'Motion', url: 'animations' },
            { title: 'Aspect Ratios', url: 'aspect-ratios' },
            { title: 'Breakpoints', url: 'breakpoints' },
            { title: 'Colors', url: 'colors' },
            { title: 'Radii', url: 'radii' },
            { title: 'Shadows', url: 'shadows' },
            { title: 'Sizes', url: 'sizes' },
            { title: 'Spacing', url: 'spacing' },
            { title: 'Typography', url: 'typography' },
            { title: 'Z-Index', url: 'z-index' },
          ],
        },
        {
          title: 'Compositions',
          items: [
            { title: 'Text Styles', url: 'text-styles' },
            { title: 'Layer Styles', url: 'layer-styles' },
          ],
        },
        {
          title: 'Customization',
          url: 'customization',
          items: [{ title: 'Overview', url: 'overview' }],
        },
      ],
    },

    {
      title: 'Styling',
      url: 'styling',
      items: [
        {
          title: 'Concepts',
          items: [
            { title: 'Overview', url: 'overview' },
            { title: 'Chakra Factory', url: 'chakra-factory' },
            { title: 'Responsive Design', url: 'responsive-design' },
            { title: 'CSS Variables', url: 'css-variables' },
            { title: 'Dark Mode', url: 'dark-mode' },
            { title: 'Color Opacity Modifier', url: 'color-opacity-modifier' },
            { title: 'Conditional Styles', url: 'conditional-styles' },
            { title: 'Virtual Color', url: 'virtual-color' },
            { title: 'Cascade Layers', url: 'cascade-layers' },
          ],
        },
        {
          title: 'Compositions',
          items: [
            { title: 'Text Styles', url: 'text-styles' },
            { title: 'Layer Styles', url: 'layer-styles' },
            { title: 'Animation Styles', url: 'animation-styles' },
            { title: 'Focus Ring', url: 'focus-ring' },
          ],
        },
        {
          title: 'Style Props',
          url: 'style-props',
          items: [
            { title: 'Background', url: 'background' },
            { title: 'Border', url: 'border' },
            { title: 'Display', url: 'display' },
            { title: 'Effects', url: 'effects' },
            { title: 'Filters', url: 'filters' },
            { title: 'Flex and Grid', url: 'flex-and-grid' },
            { title: 'Interactivity', url: 'interactivity' },
            { title: 'Layout', url: 'layout' },
            { title: 'List', url: 'list' },
            { title: 'Sizing', url: 'sizing' },
            { title: 'Spacing', url: 'spacing' },
            { title: 'SVG', url: 'svg' },
            { title: 'Tables', url: 'tables' },
            { title: 'Transforms', url: 'transforms' },
            { title: 'Transitions', url: 'transitions' },
            { title: 'Typography', url: 'typography' },
          ],
        },
      ],
    },
  ],
}

export const docsConfig: DocsConfig = {
  storybookUrl: 'https://storybook.saas-u.dev',
  copyright: 'Copyright © {{date}} Saas UI B.V. All Rights Reserved.',
  title: 'Saas UI',
  titleTemplate: '%s | Saas UI',
  description: 'The React component library for startups.',
  url: 'https://saas-ui.dev',
  xHandle: '@saas-ui',
  repoUrl: 'https://github.com/saas-js/saas-ui',
  repoBranch: 'v3',
  get editUrl() {
    return `${this.repoUrl}/tree/${this.repoBranch}/apps/website/content/docs`
  },
  navigation: [
    docsLinks,
    { title: 'Resources', url: 'resources' },
    { title: 'Showcase', url: 'showcase' },
  ],
}

interface DocsConfig {
  title: string
  titleTemplate: string
  description: string
  storybookUrl: string
  copyright: string
  url: string
  repoUrl: string
  editUrl: string
  xHandle: string
  navigation: NavItem[]
  repoBranch: string
}

export interface NavItem {
  title: string
  url?: string
  status?: string
  items?: NavItem[]
}

export interface FlattenNavItem extends Omit<NavItem, 'items'> {}
