import bash from '@shikijs/langs/bash'
import css from '@shikijs/langs/css'
import html from '@shikijs/langs/html'
import javascript from '@shikijs/langs/javascript'
import json from '@shikijs/langs/json'
import jsx from '@shikijs/langs/jsx'
import shellscript from '@shikijs/langs/shellscript'
import tsx from '@shikijs/langs/tsx'
import typescript from '@shikijs/langs/typescript'
import { createHighlighterCore } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'

import { suiDarkTheme, suiLightTheme } from './shiki-theme'

/**
 * Static grammar objects, not `shiki/langs` dynamic `import('@shikijs/langs/...')`.
 * workerd cannot load those at runtime (no fs / no Oniguruma WASM), and
 * OpenNext's server bundle does not include the lazy lang chunks.
 */
const bundledLangs = {
  bash,
  css,
  html,
  javascript,
  json,
  jsx,
  shellscript,
  tsx,
  typescript,
} as const

type BundledLang = keyof typeof bundledLangs

const langAliases: Record<string, BundledLang> = {
  ts: 'typescript',
  js: 'javascript',
  sh: 'shellscript',
  shell: 'shellscript',
  zsh: 'shellscript',
}

function resolveLang(lang: string | undefined): BundledLang {
  if (!lang) return 'tsx'
  if (lang in langAliases) return langAliases[lang]
  if (lang in bundledLangs) return lang as BundledLang
  return 'tsx'
}

let highlighterPromise: ReturnType<typeof createHighlighterCore> | undefined

function getHighlighter() {
  highlighterPromise ??= createHighlighterCore({
    themes: [suiLightTheme, suiDarkTheme],
    langs: Object.values(bundledLangs),
    // workerd blocks Oniguruma WASM.
    engine: createJavaScriptRegexEngine({ forgiving: true }),
  })
  return highlighterPromise
}

export const highlightCode = async (
  code: string,
  opts?: { lang?: string },
) => {
  const highlighter = await getHighlighter()
  const lang = resolveLang(opts?.lang)

  return highlighter.codeToHtml(code, {
    lang,
    themes: {
      light: 'sui-light',
      dark: 'sui-dark',
    },
  })
}
