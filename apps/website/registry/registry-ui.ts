import { RegistryEntry } from '@saas-ui/registry'

export const ui = [
  {
    name: 'accordion',
    type: 'registry:ui',
    dependencies: ['@chakra-ui/react'],
    registryDependencies: ['icons'],
    files: [
      {
        path: 'ui/accordion/accordion.tsx',
        type: 'registry:ui',
      },
      {
        path: 'ui/accordion/index.ts',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'action-bar',
    type: 'registry:ui',
    dependencies: ['@chakra-ui/react'],
    registryDependencies: ['close-button'],
    files: [
      {
        path: 'ui/action-bar/action-bar.tsx',
        type: 'registry:ui',
      },
      {
        path: 'ui/action-bar/index.ts',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'alert',
    type: 'registry:ui',
    dependencies: ['@chakra-ui/react'],
    registryDependencies: ['close-button'],
    files: [
      {
        path: 'ui/alert/alert.tsx',
        type: 'registry:ui',
      },
      {
        path: 'ui/alert/index.ts',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'app-shell',
    type: 'registry:ui',
    dependencies: ['@chakra-ui/react'],
    registryDependencies: [],
    files: [
      {
        path: 'ui/app-shell/app-shell.tsx',
        type: 'registry:ui',
      },
      {
        path: 'ui/app-shell/index.ts',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'avatar',
    type: 'registry:ui',
    dependencies: ['@chakra-ui/react'],
    registryDependencies: [],
    files: [
      {
        path: 'ui/avatar/avatar.tsx',
        type: 'registry:ui',
      },
      {
        path: 'ui/avatar/index.ts',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'back-button',
    type: 'registry:ui',
    dependencies: ['@chakra-ui/react'],
    registryDependencies: ['icons', 'link'],
    files: [
      {
        path: 'ui/back-button/back-button.tsx',
        type: 'registry:ui',
      },
      {
        path: 'ui/back-button/index.ts',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'blockquote',
    type: 'registry:ui',
    dependencies: ['@chakra-ui/react'],
    registryDependencies: [],
    files: [
      {
        path: 'ui/blockquote/blockquote.tsx',
        type: 'registry:ui',
      },
      {
        path: 'ui/blockquote/index.ts',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'breadcrumb',
    type: 'registry:ui',
    dependencies: ['@chakra-ui/react'],
    registryDependencies: [],
    files: [
      {
        path: 'ui/breadcrumb/breadcrumb.tsx',
        type: 'registry:ui',
      },
      {
        path: 'ui/breadcrumb/index.ts',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'checkbox',
    type: 'registry:ui',
    dependencies: ['@chakra-ui/react'],
    registryDependencies: [],
    files: [
      {
        path: 'ui/checkbox/checkbox.tsx',
        type: 'registry:ui',
      },
      {
        path: 'ui/checkbox/index.ts',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'checkbox-card',
    type: 'registry:ui',
    dependencies: ['@chakra-ui/react'],
    registryDependencies: [],
    files: [
      {
        path: 'ui/checkbox-card/checkbox-card.tsx',
        type: 'registry:ui',
      },
      {
        path: 'ui/checkbox-card/index.ts',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'clipboard',
    type: 'registry:ui',
    dependencies: ['@chakra-ui/react'],
    registryDependencies: ['button', 'icon-button', 'icons', 'input'],
    files: [
      {
        path: 'ui/clipboard/clipboard.tsx',
        type: 'registry:ui',
      },
      {
        path: 'ui/clipboard/index.ts',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'close-button',
    type: 'registry:ui',
    dependencies: ['@chakra-ui/react'],
    registryDependencies: ['icons'],
    files: [
      {
        path: 'ui/close-button/close-button.tsx',
        type: 'registry:ui',
      },
      {
        path: 'ui/close-button/index.ts',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'color-mode',
    type: 'registry:ui',
    dependencies: ['@chakra-ui/react', 'next-themes'],
    registryDependencies: [],
    files: [
      {
        path: 'ui/color-mode/color-mode.tsx',
        type: 'registry:ui',
      },
      {
        path: 'ui/color-mode/index.ts',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'command',
    type: 'registry:ui',
    dependencies: ['@chakra-ui/react', '@saas-ui/chakra-preset'],
    registryDependencies: [],
    files: [
      {
        path: 'ui/command/command.tsx',
        type: 'registry:ui',
      },
      {
        path: 'ui/command/index.ts',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'dialog',
    type: 'registry:ui',
    dependencies: ['@chakra-ui/react'],
    registryDependencies: ['close-button'],
    files: [
      {
        path: 'ui/dialog/dialog.tsx',
        type: 'registry:ui',
      },
      {
        path: 'ui/dialog/index.ts',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'drawer',
    type: 'registry:ui',
    dependencies: ['@ark-ui/react', '@chakra-ui/react'],
    registryDependencies: ['close-button'],
    files: [
      {
        path: 'ui/drawer/drawer.tsx',
        type: 'registry:ui',
      },
      {
        path: 'ui/drawer/index.ts',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'empty-state',
    type: 'registry:ui',
    dependencies: ['@chakra-ui/react'],
    registryDependencies: [],
    files: [
      {
        path: 'ui/empty-state/empty-state.tsx',
        type: 'registry:ui',
      },
      {
        path: 'ui/empty-state/index.ts',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'file-upload',
    type: 'registry:ui',
    dependencies: ['@chakra-ui/react'],
    registryDependencies: ['button', 'close-button'],
    files: [
      {
        path: 'ui/file-upload/file-upload.tsx',
        type: 'registry:ui',
      },
      {
        path: 'ui/file-upload/index.ts',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'grid-list',
    type: 'registry:ui',
    dependencies: [
      '@chakra-ui/react',
      '@saas-ui/chakra-preset',
      '@saas-ui/core',
    ],
    registryDependencies: ['./grid-list.context.ts'],
    files: [
      {
        path: 'ui/grid-list/grid-list.tsx',
        type: 'registry:ui',
      },
      {
        path: 'ui/grid-list/index.ts',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'hover-card',
    type: 'registry:ui',
    dependencies: ['@chakra-ui/react'],
    registryDependencies: [],
    files: [
      {
        path: 'ui/hover-card/hover-card.tsx',
        type: 'registry:ui',
      },
      {
        path: 'ui/hover-card/index.ts',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'icon-badge',
    type: 'registry:ui',
    dependencies: ['@chakra-ui/react', '@saas-ui/core'],
    registryDependencies: [],
    files: [
      {
        path: 'ui/icon-badge/icon-badge.tsx',
        type: 'registry:ui',
      },
      {
        path: 'ui/icon-badge/index.ts',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'icons',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: ['./create-icon.tsx'],
    files: [
      {
        path: 'ui/icons/icons.tsx',
        type: 'registry:ui',
      },
      {
        path: 'ui/icons/index.ts',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'info-tip',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: ['icon-button', 'icons', 'toggle-tip'],
    files: [
      {
        path: 'ui/info-tip/info-tip.tsx',
        type: 'registry:ui',
      },
      {
        path: 'ui/info-tip/index.ts',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'loading-overlay',
    type: 'registry:ui',
    dependencies: ['@ark-ui/react', '@chakra-ui/react'],
    registryDependencies: ['spinner', './loading-overlay.context.ts'],
    files: [
      {
        path: 'ui/loading-overlay/loading-overlay.tsx',
        type: 'registry:ui',
      },
      {
        path: 'ui/loading-overlay/index.ts',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'menu',
    type: 'registry:ui',
    dependencies: ['@chakra-ui/react'],
    registryDependencies: ['button', 'icons'],
    files: [
      {
        path: 'ui/menu/menu.tsx',
        type: 'registry:ui',
      },
      {
        path: 'ui/menu/index.ts',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'native-select',
    type: 'registry:ui',
    dependencies: ['@chakra-ui/react'],
    registryDependencies: ['icons'],
    files: [
      {
        path: 'ui/native-select/native-select.tsx',
        type: 'registry:ui',
      },
      {
        path: 'ui/native-select/index.ts',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'navbar',
    type: 'registry:ui',
    dependencies: ['@chakra-ui/react', '@saas-ui/core'],
    registryDependencies: ['../provider/use-link.tsx', './navbar.context.ts'],
    files: [
      {
        path: 'ui/navbar/navbar.tsx',
        type: 'registry:ui',
      },
      {
        path: 'ui/navbar/index.ts',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'number-input',
    type: 'registry:ui',
    dependencies: ['@chakra-ui/react'],
    registryDependencies: ['input-group'],
    files: [
      {
        path: 'ui/number-input/number-input.tsx',
        type: 'registry:ui',
      },
      {
        path: 'ui/number-input/index.ts',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'page',
    type: 'registry:ui',
    dependencies: ['@chakra-ui/react'],
    registryDependencies: ['loading-overlay', './page.context.ts'],
    files: [
      {
        path: 'ui/page/page.tsx',
        type: 'registry:ui',
      },
      {
        path: 'ui/page/index.ts',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'pagination',
    type: 'registry:ui',
    dependencies: ['@chakra-ui/react', '@saas-ui/core'],
    registryDependencies: ['icons'],
    files: [
      {
        path: 'ui/pagination/pagination.tsx',
        type: 'registry:ui',
      },
      {
        path: 'ui/pagination/index.ts',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'password-input',
    type: 'registry:ui',
    dependencies: ['@chakra-ui/react'],
    registryDependencies: ['icons'],
    files: [
      {
        path: 'ui/password-input/password-input.tsx',
        type: 'registry:ui',
      },
      {
        path: 'ui/password-input/index.ts',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'persona',
    type: 'registry:ui',
    dependencies: [
      '@chakra-ui/react',
      '@saas-ui/chakra-preset',
      '@saas-ui/core',
    ],
    registryDependencies: [
      'avatar/avatar.tsx',
      './persona.context.ts',
      './presence.ts',
    ],
    files: [
      {
        path: 'ui/persona/persona.tsx',
        type: 'registry:ui',
      },
      {
        path: 'ui/persona/index.ts',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'pin-input',
    type: 'registry:ui',
    dependencies: ['@chakra-ui/react'],
    registryDependencies: [],
    files: [
      {
        path: 'ui/pin-input/pin-input.tsx',
        type: 'registry:ui',
      },
      {
        path: 'ui/pin-input/index.ts',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'popover',
    type: 'registry:ui',
    dependencies: ['@chakra-ui/react'],
    registryDependencies: ['close-button'],
    files: [
      {
        path: 'ui/popover/popover.tsx',
        type: 'registry:ui',
      },
      {
        path: 'ui/popover/index.ts',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'radio',
    type: 'registry:ui',
    dependencies: ['@chakra-ui/react'],
    registryDependencies: [],
    files: [
      {
        path: 'ui/radio/radio.tsx',
        type: 'registry:ui',
      },
      {
        path: 'ui/radio/index.ts',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'radio-card',
    type: 'registry:ui',
    dependencies: ['@chakra-ui/react'],
    registryDependencies: [],
    files: [
      {
        path: 'ui/radio-card/radio-card.tsx',
        type: 'registry:ui',
      },
      {
        path: 'ui/radio-card/index.ts',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'search-input',
    type: 'registry:ui',
    dependencies: ['@chakra-ui/react', '@saas-ui/core'],
    registryDependencies: ['icons'],
    files: [
      {
        path: 'ui/search-input/search-input.tsx',
        type: 'registry:ui',
      },
      {
        path: 'ui/search-input/index.ts',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'section',
    type: 'registry:ui',
    dependencies: ['@chakra-ui/react'],
    registryDependencies: ['./section.context.ts'],
    files: [
      {
        path: 'ui/section/section.tsx',
        type: 'registry:ui',
      },
      {
        path: 'ui/section/index.ts',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'segmented-control',
    type: 'registry:ui',
    dependencies: ['@chakra-ui/react'],
    registryDependencies: [],
    files: [
      {
        path: 'ui/segmented-control/segmented-control.tsx',
        type: 'registry:ui',
      },
      {
        path: 'ui/segmented-control/index.ts',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'select',
    type: 'registry:ui',
    dependencies: ['@chakra-ui/react'],
    registryDependencies: ['close-button'],
    files: [
      {
        path: 'ui/select/select.tsx',
        type: 'registry:ui',
      },
      {
        path: 'ui/select/index.ts',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'sidebar',
    type: 'registry:ui',
    dependencies: ['@chakra-ui/react', '@saas-ui/core'],
    registryDependencies: ['./sidebar.context.ts'],
    files: [
      {
        path: 'ui/sidebar/sidebar.tsx',
        type: 'registry:ui',
      },
      {
        path: 'ui/sidebar/index.ts',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'skeleton',
    type: 'registry:ui',
    dependencies: ['@chakra-ui/react'],
    registryDependencies: [],
    files: [
      {
        path: 'ui/skeleton/skeleton.tsx',
        type: 'registry:ui',
      },
      {
        path: 'ui/skeleton/index.ts',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'slider',
    type: 'registry:ui',
    dependencies: ['@chakra-ui/react'],
    registryDependencies: [],
    files: [
      {
        path: 'ui/slider/slider.tsx',
        type: 'registry:ui',
      },
      {
        path: 'ui/slider/index.ts',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'spinner',
    type: 'registry:ui',
    dependencies: ['@chakra-ui/react'],
    registryDependencies: [],
    files: [
      {
        path: 'ui/spinner/spinner.tsx',
        type: 'registry:ui',
      },
      {
        path: 'ui/spinner/index.ts',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'stat',
    type: 'registry:ui',
    dependencies: ['@chakra-ui/react'],
    registryDependencies: [],
    files: [
      {
        path: 'ui/stat/stat.tsx',
        type: 'registry:ui',
      },
      {
        path: 'ui/stat/index.ts',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'status',
    type: 'registry:ui',
    dependencies: ['@chakra-ui/react'],
    registryDependencies: [],
    files: [
      {
        path: 'ui/status/status.tsx',
        type: 'registry:ui',
      },
      {
        path: 'ui/status/index.ts',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'steps',
    type: 'registry:ui',
    dependencies: ['@chakra-ui/react'],
    registryDependencies: ['icons'],
    files: [
      {
        path: 'ui/steps/steps.tsx',
        type: 'registry:ui',
      },
      {
        path: 'ui/steps/index.ts',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'switch',
    type: 'registry:ui',
    dependencies: ['@chakra-ui/react'],
    registryDependencies: [],
    files: [
      {
        path: 'ui/switch/switch.tsx',
        type: 'registry:ui',
      },
      {
        path: 'ui/switch/index.ts',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'tag',
    type: 'registry:ui',
    dependencies: ['@chakra-ui/react'],
    registryDependencies: [],
    files: [
      {
        path: 'ui/tag/tag.tsx',
        type: 'registry:ui',
      },
      {
        path: 'ui/tag/index.ts',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'toaster',
    type: 'registry:ui',
    dependencies: ['@chakra-ui/react'],
    registryDependencies: ['close-button', 'spinner'],
    files: [
      {
        path: 'ui/toaster/toaster.tsx',
        type: 'registry:ui',
      },
      {
        path: 'ui/toaster/index.ts',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'toggle-tip',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: ['popover', 'portal'],
    files: [
      {
        path: 'ui/toggle-tip/toggle-tip.tsx',
        type: 'registry:ui',
      },
      {
        path: 'ui/toggle-tip/index.ts',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'tooltip',
    type: 'registry:ui',
    dependencies: ['@chakra-ui/react'],
    registryDependencies: [],
    files: [
      {
        path: 'ui/tooltip/tooltip.tsx',
        type: 'registry:ui',
      },
      {
        path: 'ui/tooltip/index.ts',
        type: 'registry:ui',
      },
    ],
  },
] satisfies RegistryEntry[]
