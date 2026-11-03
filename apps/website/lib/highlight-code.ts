import { createHighlighterCore } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'
import { bundledLanguages } from 'shiki/langs'

import { suiDarkTheme, suiLightTheme } from './shiki-theme'

const defaultLangs = [
  'tsx',
  'typescript',
  'javascript',
  'jsx',
  'bash',
  'json',
  'html',
  'css',
  'shellscript',
] as const

const highlighterPromise = createHighlighterCore({
  themes: [suiLightTheme, suiDarkTheme],
  langs: defaultLangs.map((lang) => bundledLanguages[lang]),
  // workerd blocks Oniguruma WASM.
  engine: createJavaScriptRegexEngine({ forgiving: true }),
})

export const highlightCode = async (
  code: string,
  opts?: { lang?: string },
) => {
  const highlighter = await highlighterPromise
  const lang = opts?.lang === 'ts' ? 'typescript' : (opts?.lang ?? 'tsx')
  const loaded = highlighter.getLoadedLanguages()
  if (
    typeof lang === 'string' &&
    !loaded.includes(lang) &&
    lang in bundledLanguages
  ) {
    await highlighter.loadLanguage(
      bundledLanguages[lang as keyof typeof bundledLanguages],
    )
  }

  return highlighter.codeToHtml(code, {
    lang,
    themes: {
      light: 'sui-light',
      dark: 'sui-dark',
    },
  })
}
