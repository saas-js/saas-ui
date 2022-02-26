import chroma, { Color } from 'chroma-js'

import { theme, Colors } from '@chakra-ui/react'

const names: Record<number, string> = {
  0: 'red',
  30: 'orange',
  50: 'yellow',
  150: 'green',
  180: 'teal',
  190: 'cyan',
  210: 'blue',
  260: 'purple',
  330: 'pink',
}

const hueName = (h: number) => {
  const i = Math.round((h - 2) / 10) * 10
  const name = names[i]
  return name
}

export interface PaletteColors {
  [index: string]: string
}

const getLumsFromThemeColors = (name: string) => {
  const themeColors: Record<string, any> = theme.colors
  const lums = []
  let color = themeColors[name]

  if (!color) {
    color = themeColors.red // fallback lums from red, @todo select lums based on hue range.
  }

  for (const lum in color) {
    lums.push(chroma.hex(color[lum]).luminance())
  }

  return lums
}

const createArray = (length: number) => {
  const arr = []
  for (let i = 0; i < length; i++) {
    arr.push(i)
  }
  return arr
}

const createHues = (length: number) => {
  const hueStep = 360 / length
  return (base: number) => {
    const hues = createArray(length).map((n) =>
      Math.floor((base + n * hueStep) % 360)
    )

    return hues
  }
}

const desat = (n: number) => (hex: string) => {
  const [h, s, l] = chroma(hex).hsl()
  return chroma.hsl(h, n, l).hex()
}

const createBlack = (hex: string, lum = 0) => {
  return chroma(hex).luminance(lum).hex()
}

const createShades = (hex: string, lums: Array<number>) => {
  return lums.map((lum) => {
    return chroma(hex).luminance(lum).hex()
  })
}

const getColorName = (hex: Color) => {
  const [hue, sat] = chroma(hex).hsl()
  const name = hueName(hue)
  return name
}

const mapValues = (values: Array<string>) => {
  const keys = [
    '50',
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
  ]
  const obj: Record<string, string> = {}

  for (const key in values) {
    obj[keys[key]] = values[key]
  }

  return obj
}

export interface PaletteOptions {
  blackLuminance?: number
  colors?: PaletteColors
}

export const createPalette = (hex: string, options: PaletteOptions = {}) => {
  const colors = options.colors || {}
  const color = chroma(hex)
  const palette: Colors = {}
  const [hue, sat, lte] = color.hsl()

  const hues = createHues(36)(hue) // 36 so we have steps of 10

  const gray = desat(1 / 8)(colors.gray || color.hex())

  palette.black = createBlack(gray, options.blackLuminance)
  palette.gray = mapValues(createShades(gray, getLumsFromThemeColors('gray')))

  hues.forEach((h) => {
    let c = chroma.hsl(h, sat, lte)
    const name = getColorName(c)

    if (!name) {
      return
    }

    // override the hex value if this color has a custom value.
    if (colors[name]) {
      c = chroma.hex(colors[name])
    }

    palette[name] = mapValues(
      createShades(c.hex(), getLumsFromThemeColors(name))
    )
  })

  // Create shades for custom colors.
  Object.entries(colors).forEach(([name, value]) => {
    if (!palette[name]) {
      const c = chroma(value)
      palette[name] = mapValues(
        createShades(c.hex(), getLumsFromThemeColors(name))
      )
    }
  })

  return Object.assign(palette)
}
