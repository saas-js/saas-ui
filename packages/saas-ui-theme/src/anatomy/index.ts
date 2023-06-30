import { anatomy } from '@chakra-ui/theme-tools'

export const appShellAnatomy = anatomy('app-shell').parts(
  'container',
  'inner',
  'main'
)

export const emptyStateAnatomy = anatomy('emptystate').parts(
  'container',
  'body',
  'icon',
  'title',
  'descripton',
  'actions',
  'footer'
)

export const bannerAnatomy = anatomy('banner').parts(
  'container',
  'icon',
  'content',
  'title',
  'description',
  'actions',
  'close'
)

export const hotkeysAnantomy = anatomy('hotkeys').parts(
  'container',
  'group',
  'groupTitle',
  'item',
  'command',
  'then'
)

export const loadingOverlayAnatomy = anatomy('loading-overlay').parts(
  'overlay',
  'text'
)

export const navGroupAnatomy = anatomy('nav-group').parts(
  'container',
  'title',
  'icon',
  'content'
)

export const navItemAnatomy = anatomy('nav-item').parts(
  'item',
  'link',
  'inner',
  'icon',
  'label'
)

export const nprogressAnatomy = anatomy('nprogress').parts('container', 'bar')

export const personaAnatomy = anatomy('persona').parts(
  'container',
  'details',
  'avatar',
  'label',
  'secondaryLabel',
  'tertiaryLabel'
)

export const searchInputAnatomy = anatomy('search-input').parts(
  'input',
  'reset'
)

export const sidebarAnatomy = anatomy('sidebar').parts(
  'container',
  'overlay',
  'section',
  'toggleWrapper',
  'toggle'
)

export const stepperAnatomy = anatomy('stepper').parts(
  'container',
  'steps',
  'icon',
  'content',
  'title',
  'separator'
)

export const structuredListAnatomy = anatomy('structured-list').parts(
  'list',
  'item',
  'button',
  'header',
  'cell',
  'icon'
)

export const propertyAnatomy = anatomy('property').parts(
  'property',
  'label',
  'value'
)

export const selectAnatomy = anatomy('select').parts(
  'addon',
  'field',
  'element'
)

export const timelineAnatomy = anatomy('timeline').parts(
  'container',
  'item',
  'separator',
  'icon',
  'dot',
  'track',
  'content'
)
