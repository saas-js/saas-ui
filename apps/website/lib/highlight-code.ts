import { codeToHtml } from 'shiki'

import { suiDarkTheme, suiLightTheme } from './shiki-theme'

export const highlightCode = (
  code: string,
  opts?: Partial<Parameters<typeof codeToHtml>[1]>,
) => {
  return codeToHtml(code, {
    lang: 'tsx',
    themes: {
      light: suiLightTheme,
      dark: suiDarkTheme,
    },
    ...opts,
  })
}
