import { codeToHtml } from 'shiki'

import { indigoLightTheme } from './shiki-theme-indigo-light'

export const highlightCode = (
  code: string,
  opts?: Partial<Parameters<typeof codeToHtml>[1]>,
) => {
  return codeToHtml(code, {
    lang: 'tsx',
    theme: indigoLightTheme,
    ...opts,
  })
}
