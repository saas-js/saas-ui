import { codeToHtml } from 'shiki'

import { indigoDarkTheme } from './shiki-theme-indigo-dark'
import { indigoLightTheme } from './shiki-theme-indigo-light'

export const highlightCode = (
  code: string,
  opts?: Partial<Parameters<typeof codeToHtml>[1]>,
) => {
  return codeToHtml(code, {
    lang: 'tsx',
    themes: {
      light: indigoLightTheme,
      dark: indigoDarkTheme,
    },
    ...opts,
  })
}
