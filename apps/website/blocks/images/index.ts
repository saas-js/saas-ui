import cardsDark from './cards-dark.svg?url'
import cards from './cards.svg?url'
import commandbarsDark from './commandbars-dark.svg?url'
import commandbars from './commandbars.svg?url'
import drawersDark from './drawers-dark.svg?url'
import drawers from './drawers.svg?url'
import emptystatesDark from './emptystates-dark.svg?url'
import emptystates from './emptystates.svg?url'
import filesDark from './files-dark.svg?url'
import files from './files.svg?url'
import formsDark from './forms-dark.svg?url'
import forms from './forms.svg?url'
import kpicardsDark from './kpicards-dark.svg?url'
import kpicards from './kpicards.svg?url'
import menusDark from './menus-dark.svg?url'
import menus from './menus.svg?url'
import modalsDark from './modals-dark.svg?url'
import modals from './modals.svg?url'
import navbarDark from './navbars-dark.svg?url'
import navbar from './navbars.svg?url'
import settingsDark from './settings-dark.svg?url'
import settings from './settings.svg?url'
import sidebarDark from './sidebar-dark.svg?url'
import sidebar from './sidebar.svg?url'
import tablesDark from './tables-dark.svg?url'
import tables from './tables.svg?url'

const image = (asset: string | { src: string }, alt: string) => ({
  src: typeof asset === 'string' ? asset : asset.src,
  alt,
})

const img = {
  sidebars: {
    light: image(sidebar, 'Sidebar layouts'),
    dark: image(sidebarDark, 'Sidebar layouts'),
  },
  navbars: {
    light: image(navbar, 'Stacked layouts'),
    dark: image(navbarDark, 'Stacked layouts'),
  },
  settings: {
    light: image(settings, 'Settings sections'),
    dark: image(settingsDark, 'Settings sections'),
  },
  cards: {
    light: image(cards, 'Cards'),
    dark: image(cardsDark, 'Cards'),
  },
  files: {
    light: image(files, 'File management'),
    dark: image(filesDark, 'File management'),
  },
  commandbars: {
    light: image(commandbars, 'Command bars'),
    dark: image(commandbarsDark, 'Command bars'),
  },
  drawers: {
    light: image(drawers, 'Drawers'),
    dark: image(drawersDark, 'Drawers'),
  },
  emptystates: {
    light: image(emptystates, 'Empty states'),
    dark: image(emptystatesDark, 'Empty states'),
  },
  kpicards: {
    light: image(kpicards, 'KPI cards'),
    dark: image(kpicardsDark, 'KPI cards'),
  },
  menus: {
    light: image(menus, 'Menus'),
    dark: image(menusDark, 'Menus'),
  },
  modals: {
    light: image(modals, 'Modals'),
    dark: image(modalsDark, 'Modals'),
  },
  forms: {
    light: image(forms, 'Forms'),
    dark: image(formsDark, 'Forms'),
  },
  tables: {
    light: image(tables, 'Tables and lists'),
    dark: image(tablesDark, 'Tables and lists'),
  },
}

export default img
