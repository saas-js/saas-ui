import chroma, { Color } from 'chroma-js'

import { theme, Colors } from '@chakra-ui/theme'

const names: Record<number, string> = {
  0: 'red',
  30: 'orange',
  50: 'yellow',
  120: 'green',
  180: 'teal',
  190: 'cyan',
  210: 'blue',
  240: 'indigo',
  270: 'purple',
  330: 'pink',
}

const hueName = (h: number) => {
  const i = Math.round((h - 2) / 10) * 10
  const name = names[i]
  return name
}

// const defaultLums = [900, 700, 600, 400, 280, 160, 110, 80, 50, 30].map(
//   (n) => n / 1000,
// )

const getLumsFromThemeColors = (name: string, colors: Record<string, any>) => {
  const lums = []
  let color = colors[name]

  if (!color) {
    color = colors.blue // fallback lums from blue
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

const createBlack = (hex: string) => {
  const d = desat(1 / 8)(hex)
  return chroma(d).luminance(0.005).hex()
}

const createShades = (hex: string, lums: Array<number>) => {
  return lums.map((lum) => {
    return chroma(hex).luminance(lum).hex()
  })
}

// Mappers
const keyword = (hex: Color) => {
  const [hue, sat] = chroma(hex).hsl()
  if (sat < 0.5) {
    return 'gray'
  }
  const name = hueName(hue)
  return name
}

// Reducer
const toObj = (a: any, color: any) => {
  const key = a[color.key] ? color.key + '2' : color.key
  a[key] = color.value
  return a
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
  const obj: any = {}

  for (const key in values) {
    obj[keys[key]] = values[key]
  }

  return obj
}

const createPalette = (hex: string, options = {}) => {
  const color = chroma(hex)
  const colors = []
  const [hue, sat, lte] = color.hsl()

  const hues = createHues(36)(hue)

  colors.push({
    key: 'black',
    value: createBlack('' + color.hex()),
  })

  colors.push({
    key: 'gray',
    value: mapValues(
      createShades(
        desat(1 / 8)('' + color.hex()),
        getLumsFromThemeColors('gray', theme.colors)
      )
    ),
  })

  hues.forEach((h) => {
    const c: Color = chroma.hsl(h, sat, lte)
    const key = keyword(c)
    if (!key) {
      return
    }
    colors.push({
      key,
      value: mapValues(
        createShades('' + c.hex(), getLumsFromThemeColors(key, theme.colors))
      ),
    })
  })

  const obj = Object.assign(colors.reduce(toObj, {}))

  return obj
}

export default createPalette
