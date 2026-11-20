/**
 * Minimal sRGB <-> OKLCH conversion and WCAG 2 contrast.
 *
 * `@saas-ui/appearance` works purely in OKLCH and never parses colors, so the
 * palette app owns the hex entry point and the display helpers.
 */

export interface Oklch {
  l: number
  c: number
  h: number
  a?: number
}

type Rgb = [number, number, number]

const HEX = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i

export function isHex(value: string) {
  return HEX.test(value.trim())
}

export function normalizeHex(value: string): string | null {
  const match = HEX.exec(value.trim())
  if (!match) return null
  let hex = match[1]!.toLowerCase()
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((char) => char + char)
      .join('')
  }
  return `#${hex}`
}

function toLinear(channel: number) {
  return channel <= 0.04045
    ? channel / 12.92
    : Math.pow((channel + 0.055) / 1.055, 2.4)
}

function fromLinear(channel: number) {
  return channel <= 0.0031308
    ? channel * 12.92
    : 1.055 * Math.pow(channel, 1 / 2.4) - 0.055
}

function hexToLinearRgb(hex: string): Rgb {
  const normalized = normalizeHex(hex)
  if (!normalized) throw new Error(`Invalid hex color: ${hex}`)
  const int = Number.parseInt(normalized.slice(1), 16)
  return [
    toLinear(((int >> 16) & 255) / 255),
    toLinear(((int >> 8) & 255) / 255),
    toLinear((int & 255) / 255),
  ]
}

function linearRgbToOklch([r, g, b]: Rgb): Oklch {
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b)
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b)
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b)

  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s

  const c = Math.sqrt(A * A + B * B)
  const h = c < 1e-4 ? 0 : ((Math.atan2(B, A) * 180) / Math.PI + 360) % 360

  return { l: L, c, h }
}

function oklchToLinearRgb({ l: L, c, h }: Oklch): Rgb {
  const hr = (h * Math.PI) / 180
  const A = c * Math.cos(hr)
  const B = c * Math.sin(hr)

  const l = (L + 0.3963377774 * A + 0.2158037573 * B) ** 3
  const m = (L - 0.1055613458 * A - 0.0638541728 * B) ** 3
  const s = (L - 0.0894841775 * A - 1.291485548 * B) ** 3

  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ]
}

function round(value: number, precision = 3) {
  const factor = 10 ** precision
  const rounded = Math.round(value * factor) / factor
  return Object.is(rounded, -0) ? 0 : rounded
}

export function hexToOklch(hex: string): Oklch {
  const { l, c, h } = linearRgbToOklch(hexToLinearRgb(hex))
  return { l: round(l), c: round(c), h: round(h) }
}

const OKLCH = /^oklch\(\s*([-\d.]+)(%?)\s+([-\d.]+)\s+([-\d.]+)(?:\s*\/\s*([\d.]+)(%?))?\s*\)$/i

export function parseOklch(value: string): Oklch | null {
  const match = OKLCH.exec(value.trim())
  if (!match) return null
  const l = Number(match[1]) / (match[2] ? 100 : 1)
  const alpha =
    match[5] === undefined ? undefined : Number(match[5]) / (match[6] ? 100 : 1)
  return { l, c: Number(match[3]), h: Number(match[4]), a: alpha }
}

export function formatOklch({ l, c, h, a }: Oklch) {
  const alpha = a === undefined ? '' : ` / ${round(a)}`
  return `oklch(${round(l)} ${round(c)} ${round(h)}${alpha})`
}

/** True when the color can be shown in sRGB without clipping. */
export function inSrgbGamut(color: Oklch) {
  const epsilon = 0.0005
  return oklchToLinearRgb(color).every(
    (channel) => channel >= -epsilon && channel <= 1 + epsilon,
  )
}

/**
 * The nearest sRGB hex. Out of gamut colors are clipped per channel, the same
 * thing a browser does when it paints them on an sRGB display.
 */
export function oklchToHex(color: Oklch) {
  const hex = oklchToLinearRgb(color)
    .map((channel) => {
      const value = Math.round(
        fromLinear(Math.min(Math.max(channel, 0), 1)) * 255,
      )
      return Math.min(Math.max(value, 0), 255).toString(16).padStart(2, '0')
    })
    .join('')
  return `#${hex}`
}

function luminance(color: Oklch) {
  const [r, g, b] = oklchToLinearRgb(color).map((channel) =>
    Math.min(Math.max(channel, 0), 1),
  ) as Rgb
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/** WCAG 2 contrast ratio between two opaque colors. */
export function contrastRatio(a: Oklch, b: Oklch) {
  const la = luminance(a)
  const lb = luminance(b)
  const [hi, lo] = la > lb ? [la, lb] : [lb, la]
  return (hi + 0.05) / (lo + 0.05)
}
