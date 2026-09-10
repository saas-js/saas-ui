/**
 * Font options for the theme customizer, matching the fonts offered by
 * shadcn/ui's theme creator (ui.shadcn.com/create). Fonts are loaded on
 * demand from Google Fonts and applied through the `--font-heading` and
 * `--font-body` variables consumed by the site's font tokens.
 */

export interface FontOption {
  id: string
  label: string
  category: 'sans' | 'serif'
  /** Google Fonts weights to request. */
  weights?: string
}

export const fontOptions: FontOption[] = [
  { id: 'geist', label: 'Geist', category: 'sans' },
  { id: 'inter', label: 'Inter', category: 'sans' },
  { id: 'noto-sans', label: 'Noto Sans', category: 'sans' },
  { id: 'nunito-sans', label: 'Nunito Sans', category: 'sans' },
  { id: 'figtree', label: 'Figtree', category: 'sans' },
  { id: 'roboto', label: 'Roboto', category: 'sans' },
  { id: 'raleway', label: 'Raleway', category: 'sans' },
  { id: 'dm-sans', label: 'DM Sans', category: 'sans' },
  { id: 'public-sans', label: 'Public Sans', category: 'sans' },
  { id: 'outfit', label: 'Outfit', category: 'sans' },
  { id: 'oxanium', label: 'Oxanium', category: 'sans' },
  { id: 'manrope', label: 'Manrope', category: 'sans' },
  { id: 'space-grotesk', label: 'Space Grotesk', category: 'sans' },
  { id: 'montserrat', label: 'Montserrat', category: 'sans' },
  { id: 'ibm-plex-sans', label: 'IBM Plex Sans', category: 'sans' },
  { id: 'source-sans-3', label: 'Source Sans 3', category: 'sans' },
  { id: 'instrument-sans', label: 'Instrument Sans', category: 'sans' },
  { id: 'noto-serif', label: 'Noto Serif', category: 'serif' },
  { id: 'roboto-slab', label: 'Roboto Slab', category: 'serif' },
  { id: 'merriweather', label: 'Merriweather', category: 'serif' },
  { id: 'lora', label: 'Lora', category: 'serif' },
  { id: 'playfair-display', label: 'Playfair Display', category: 'serif' },
  { id: 'eb-garamond', label: 'EB Garamond', category: 'serif' },
  {
    id: 'instrument-serif',
    label: 'Instrument Serif',
    category: 'serif',
    weights: '400',
  },
]

export const headingFontOptions = fontOptions

export const bodyFontOptions = fontOptions.filter(
  (font) => font.category === 'sans',
)

export function getFontOption(id: string | null) {
  if (!id) return null
  return fontOptions.find((font) => font.id === id) ?? null
}

export function fontFamilyValue(font: FontOption) {
  const fallback = font.category === 'serif' ? 'serif' : 'sans-serif'
  return `'${font.label}', ${fallback}`
}

export function googleFontHref(font: FontOption) {
  const family = font.label.replaceAll(' ', '+')
  const weights = font.weights ?? '400;500;600;700'
  return `https://fonts.googleapis.com/css2?family=${family}:wght@${weights}&display=swap`
}

/** Inject a Google Fonts stylesheet for the font, once. */
export function loadFont(font: FontOption) {
  const id = `sui-font-${font.id}`
  if (document.getElementById(id)) return

  const link = document.createElement('link')
  link.id = id
  link.rel = 'stylesheet'
  link.href = googleFontHref(font)
  document.head.appendChild(link)
}

export interface FontSelection {
  heading: string | null
  body: string | null
}

/**
 * Load and apply the selected fonts by setting the `--font-heading` and
 * `--font-body` variables. The site's font tokens fall back to the default
 * font when a variable is unset.
 */
export function applyFonts(el: HTMLElement, selection: FontSelection) {
  const heading = getFontOption(selection.heading)
  const body = getFontOption(selection.body)

  if (heading) {
    loadFont(heading)
    el.style.setProperty('--font-heading', fontFamilyValue(heading))
  } else {
    el.style.removeProperty('--font-heading')
  }

  if (body) {
    loadFont(body)
    el.style.setProperty('--font-body', fontFamilyValue(body))
  } else {
    el.style.removeProperty('--font-body')
  }
}

function randomValue<T>(values: readonly T[]) {
  return values[Math.floor(Math.random() * values.length)]!
}

export function createRandomFonts(): FontSelection {
  return {
    heading: randomValue(headingFontOptions).id,
    body: randomValue(bodyFontOptions).id,
  }
}

export function selectedFontOptions(selection: FontSelection) {
  const seen = new Set<string>()
  const fonts: FontOption[] = []
  for (const id of [selection.heading, selection.body]) {
    const font = getFontOption(id)
    if (!font || seen.has(font.id)) continue
    seen.add(font.id)
    fonts.push(font)
  }
  return fonts
}
