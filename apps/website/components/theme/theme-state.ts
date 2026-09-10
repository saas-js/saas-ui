import type { AccentPalette } from './appearance'
import {
  type Appearance,
  type SidebarAppearance,
  applyAppearance,
  accentPalettes,
  defaultAppearance,
} from './appearance'
import {
  applyFonts,
  fontFamilyValue,
  fontOptions,
  getFontOption,
} from './fonts'

export const THEME_STORAGE_KEY = 'sui-theme'
export const THEME_COOKIE = 'sui-theme'
export const THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 365

export interface ThemeState extends Appearance {
  scaleFactor: number
  overlayEffect: string
  controlRadius: number
  panelRadius: number
  indicatorRadius: number
  /** Active preset id, cleared when the appearance is tweaked manually. */
  preset: string | null
  /** Named palette that seeded the accent, for swatch highlighting. */
  accentPalette: AccentPalette | null
  /** Selected heading font id, null for the site default. */
  headingFont: string | null
  /** Selected body font id, null for the site default. */
  bodyFont: string | null
}

export const defaultThemeState: ThemeState = {
  scaleFactor: 1,
  overlayEffect: 'blur(10px)',
  controlRadius: 1,
  panelRadius: 1,
  indicatorRadius: 1,
  ...defaultAppearance,
  preset: 'default',
  accentPalette: 'indigo',
  headingFont: null,
  bodyFont: null,
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}

function parseSidebar(value: unknown): SidebarAppearance {
  if (!isRecord(value)) return defaultThemeState.sidebar
  if (value.type === 'base') return { type: 'base' }
  if (value.type === 'tonal' && isFiniteNumber(value.h) && isFiniteNumber(value.c)) {
    return {
      type: 'tonal',
      h: value.h,
      c: value.c,
      contrast:
        value.contrast === 'soft' || value.contrast === 'strong'
          ? value.contrast
          : 'normal',
    }
  }
  if (
    value.type === 'solid' &&
    isFiniteNumber(value.l) &&
    isFiniteNumber(value.c) &&
    isFiniteNumber(value.h)
  ) {
    return {
      type: 'solid',
      l: value.l,
      c: value.c,
      h: value.h,
      foreground: value.foreground === 'dark' ? 'dark' : 'light',
    }
  }
  return defaultThemeState.sidebar
}

export function pickThemeState(value: ThemeState): ThemeState {
  return {
    scaleFactor: value.scaleFactor,
    overlayEffect: value.overlayEffect,
    controlRadius: value.controlRadius,
    panelRadius: value.panelRadius,
    indicatorRadius: value.indicatorRadius,
    base: value.base,
    accent: value.accent,
    sidebar: value.sidebar,
    preset: value.preset,
    accentPalette: value.accentPalette,
    headingFont: value.headingFont,
    bodyFont: value.bodyFont,
  }
}

export function parseThemeState(value: unknown): ThemeState | null {
  if (!isRecord(value) || !isRecord(value.base) || !isRecord(value.accent)) {
    return null
  }
  if (!isFiniteNumber(value.base.h) || !isFiniteNumber(value.base.c)) {
    return null
  }
  if (
    !isFiniteNumber(value.accent.l) ||
    !isFiniteNumber(value.accent.c) ||
    !isFiniteNumber(value.accent.h)
  ) {
    return null
  }

  const accentPalette =
    typeof value.accentPalette === 'string' &&
    accentPalettes.includes(value.accentPalette as AccentPalette)
      ? (value.accentPalette as AccentPalette)
      : null

  return {
    ...defaultThemeState,
    scaleFactor: isFiniteNumber(value.scaleFactor)
      ? value.scaleFactor
      : defaultThemeState.scaleFactor,
    overlayEffect:
      typeof value.overlayEffect === 'string'
        ? value.overlayEffect
        : defaultThemeState.overlayEffect,
    controlRadius: isFiniteNumber(value.controlRadius)
      ? value.controlRadius
      : defaultThemeState.controlRadius,
    panelRadius: isFiniteNumber(value.panelRadius)
      ? value.panelRadius
      : defaultThemeState.panelRadius,
    indicatorRadius: isFiniteNumber(value.indicatorRadius)
      ? value.indicatorRadius
      : defaultThemeState.indicatorRadius,
    base: {
      h: value.base.h,
      c: value.base.c,
      contrast:
        value.base.contrast === 'soft' || value.base.contrast === 'strong'
          ? value.base.contrast
          : 'normal',
    },
    accent: {
      l: value.accent.l,
      c: value.accent.c,
      h: value.accent.h,
      foreground: value.accent.foreground === 'dark' ? 'dark' : 'light',
    },
    sidebar: parseSidebar(value.sidebar),
    preset: typeof value.preset === 'string' ? value.preset : null,
    accentPalette,
    headingFont: typeof value.headingFont === 'string' ? value.headingFont : null,
    bodyFont: typeof value.bodyFont === 'string' ? value.bodyFont : null,
  }
}

export function parseThemeCookie(value: string | undefined | null): ThemeState | null {
  if (!value) return null
  try {
    let parsed: unknown
    try {
      parsed = JSON.parse(value)
    } catch {
      parsed = JSON.parse(decodeURIComponent(value))
    }
    if (isRecord(parsed) && 'state' in parsed) {
      return parseThemeState(parsed.state)
    }
    return parseThemeState(parsed)
  } catch {
    return null
  }
}

export function writeThemeCookie(state: ThemeState) {
  if (typeof document === 'undefined') return
  document.cookie = [
    `${THEME_COOKIE}=${encodeURIComponent(JSON.stringify(pickThemeState(state)))}`,
    'Path=/',
    `Max-Age=${THEME_COOKIE_MAX_AGE}`,
    'SameSite=Lax',
  ].join('; ')
}

export function clearThemeCookie() {
  if (typeof document === 'undefined') return
  document.cookie = `${THEME_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`
}

export function syncThemeCookieFromPersistValue(value: string) {
  try {
    const parsed = JSON.parse(value) as { state?: unknown }
    const state = parseThemeState(parsed.state)
    if (state) writeThemeCookie(state)
  } catch {
    // Ignore malformed persist payloads.
  }
}

export function themeStateToCssVars(state: ThemeState): Record<string, string> {
  const vars: Record<string, string> = {
    '--sui-base': `oklch(0.5 ${state.base.c} ${state.base.h})`,
    '--sui-accent': `oklch(${state.accent.l} ${state.accent.c} ${state.accent.h})`,
    '--scale-factor': String(state.scaleFactor),
    '--radius-control-factor': String(state.controlRadius),
    '--radius-panel-factor': String(state.panelRadius),
    '--radius-indicator-factor': String(state.indicatorRadius),
    '--overlay-effect': state.overlayEffect,
  }

  if (state.sidebar.type === 'tonal') {
    vars['--sui-sidebar'] = `oklch(0.5 ${state.sidebar.c} ${state.sidebar.h})`
  }
  if (state.sidebar.type === 'solid') {
    vars['--sui-sidebar-solid'] =
      `oklch(${state.sidebar.l} ${state.sidebar.c} ${state.sidebar.h})`
  }

  const heading = getFontOption(state.headingFont)
  const body = getFontOption(state.bodyFont)
  if (heading) vars['--font-heading'] = fontFamilyValue(heading)
  if (body) vars['--font-body'] = fontFamilyValue(body)

  return vars
}

export function themeStateToHtmlAttributes(
  state: ThemeState,
): Record<string, string> {
  const attrs: Record<string, string> = {}
  if (state.base.contrast === 'soft' || state.base.contrast === 'strong') {
    attrs['data-base-contrast'] = state.base.contrast
  }
  if (state.accent.foreground === 'dark') {
    attrs['data-accent-foreground'] = 'dark'
  }
  if (state.sidebar.type === 'solid') {
    attrs['data-sidebar'] = 'solid'
    if (state.sidebar.foreground === 'dark') {
      attrs['data-sidebar-foreground'] = 'dark'
    }
  }
  if (
    state.sidebar.type === 'tonal' &&
    (state.sidebar.contrast === 'soft' || state.sidebar.contrast === 'strong')
  ) {
    attrs['data-sidebar-contrast'] = state.sidebar.contrast
  }
  return attrs
}

export function applyThemeState(el: HTMLElement, state: ThemeState) {
  applyAppearance(el, state)
  applyFonts(el, { heading: state.headingFont, body: state.bodyFont })
  el.style.setProperty('--scale-factor', String(state.scaleFactor))
  el.style.setProperty('--radius-control-factor', String(state.controlRadius))
  el.style.setProperty('--radius-panel-factor', String(state.panelRadius))
  el.style.setProperty('--radius-indicator-factor', String(state.indicatorRadius))
  el.style.setProperty('--overlay-effect', state.overlayEffect)
}

const fontFamilyById = Object.fromEntries(
  fontOptions.map((font) => [font.id, fontFamilyValue(font)]),
)

/**
 * Runs before paint so returning visitors with only localStorage still get
 * the persisted theme on the first frame. Cookie-backed SSR covers the
 * matching HTML; this script is the fallback and a client-nav safety net.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var s=null;var c=document.cookie.split('; ');for(var i=0;i<c.length;i++){if(c[i].indexOf('${THEME_COOKIE}=')===0){s=JSON.parse(decodeURIComponent(c[i].slice(${THEME_COOKIE.length + 1})));break}}if(!s){var r=localStorage.getItem('${THEME_STORAGE_KEY}');if(r)s=JSON.parse(r).state}if(s&&s.state&&s.state.base)s=s.state;if(!s||!s.base||!s.accent)return;var el=document.documentElement;el.classList.add('sui-theme');function o(l,c,h){return 'oklch('+l+' '+c+' '+h+')'}el.style.setProperty('--sui-base',o(0.5,s.base.c,s.base.h));el.style.setProperty('--sui-accent',o(s.accent.l,s.accent.c,s.accent.h));if(s.scaleFactor!=null)el.style.setProperty('--scale-factor',String(s.scaleFactor));if(s.controlRadius!=null)el.style.setProperty('--radius-control-factor',String(s.controlRadius));if(s.panelRadius!=null)el.style.setProperty('--radius-panel-factor',String(s.panelRadius));if(s.indicatorRadius!=null)el.style.setProperty('--radius-indicator-factor',String(s.indicatorRadius));if(s.overlayEffect)el.style.setProperty('--overlay-effect',s.overlayEffect);if(s.base.contrast==='soft'||s.base.contrast==='strong')el.setAttribute('data-base-contrast',s.base.contrast);else el.removeAttribute('data-base-contrast');if(s.accent.foreground==='dark')el.setAttribute('data-accent-foreground','dark');else el.removeAttribute('data-accent-foreground');var sb=s.sidebar||{};if(sb.type==='tonal'){el.style.setProperty('--sui-sidebar',o(0.5,sb.c,sb.h));el.style.removeProperty('--sui-sidebar-solid');el.removeAttribute('data-sidebar');el.removeAttribute('data-sidebar-foreground');if(sb.contrast==='soft'||sb.contrast==='strong')el.setAttribute('data-sidebar-contrast',sb.contrast);else el.removeAttribute('data-sidebar-contrast')}else if(sb.type==='solid'){el.style.setProperty('--sui-sidebar-solid',o(sb.l,sb.c,sb.h));el.style.removeProperty('--sui-sidebar');el.setAttribute('data-sidebar','solid');if(sb.foreground==='dark')el.setAttribute('data-sidebar-foreground','dark');else el.removeAttribute('data-sidebar-foreground');el.removeAttribute('data-sidebar-contrast')}else{el.style.removeProperty('--sui-sidebar');el.style.removeProperty('--sui-sidebar-solid');el.removeAttribute('data-sidebar');el.removeAttribute('data-sidebar-foreground');el.removeAttribute('data-sidebar-contrast')}var fonts=${JSON.stringify(fontFamilyById)};if(s.headingFont&&fonts[s.headingFont])el.style.setProperty('--font-heading',fonts[s.headingFont]);if(s.bodyFont&&fonts[s.bodyFont])el.style.setProperty('--font-body',fonts[s.bodyFont]);document.cookie='${THEME_COOKIE}='+encodeURIComponent(JSON.stringify({scaleFactor:s.scaleFactor,overlayEffect:s.overlayEffect,controlRadius:s.controlRadius,panelRadius:s.panelRadius,indicatorRadius:s.indicatorRadius,base:s.base,accent:s.accent,sidebar:s.sidebar,preset:s.preset||null,accentPalette:s.accentPalette||null,headingFont:s.headingFont||null,bodyFont:s.bodyFont||null}))+'; Path=/; Max-Age=${THEME_COOKIE_MAX_AGE}; SameSite=Lax'}catch(e){}})()`
