import { colors } from '@saas-ui/react/colors'
import Color from 'colorjs.io'

type ArrayOf11<T> = [T, T, T, T, T, T, T, T, T, T, T]
const arrayOf11 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const

// prettier-ignore
const grayScaleNames : Array<keyof typeof colors> = ['gray', 'zinc', 'stone'] as const;

// prettier-ignore
const scaleNames: Array<keyof typeof colors> = [...grayScaleNames, 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose']

const lightColors = Object.fromEntries(
  scaleNames.map((scaleName) => [
    scaleName,
    Object.values(colors[scaleName]).map((shade) =>
      new Color(shade.value).to('oklch'),
    ),
  ]),
) as Record<(typeof scaleNames)[number], ArrayOf11<Color>>
console.log('lightColors', lightColors)
const lightGrayColors = Object.fromEntries(
  grayScaleNames.map((scaleName) => [
    scaleName,
    Object.values(colors[`${scaleName}`]).map((shade) =>
      new Color(shade.value).to('oklch'),
    ),
  ]),
) as Record<(typeof grayScaleNames)[number], ArrayOf11<Color>>

export interface PaletteOptions {
  blackLuminance?: number
}

function getScaleFromColor(
  source: Color,
  scales: Record<string, ArrayOf11<Color>>,
  backgroundColor: Color,
) {
  let allColors: { scale: string; color: Color; distance: number }[] = []

  Object.entries(scales).forEach(([name, scale]) => {
    for (const color of scale) {
      const distance = source.deltaEOK(color)
      allColors.push({ scale: name, distance, color })
    }
  })

  allColors.sort((a, b) => a.distance - b.distance)

  // Remove non-unique scales
  let closestColors = allColors.filter(
    (color, i, arr) =>
      i === arr.findIndex((value) => value.scale === color.scale),
  )

  // If the next two closest colors are both grays, remove the second one until it's not a gray anymore.
  const grayScaleNamesStr = grayScaleNames as readonly string[]
  const allAreGrays = closestColors.every((color) =>
    grayScaleNamesStr.includes(color.scale),
  )
  if (!allAreGrays && grayScaleNamesStr.includes(closestColors[0].scale)) {
    while (grayScaleNamesStr.includes(closestColors[1].scale)) {
      closestColors.splice(1, 1)
    }
  }

  let colorA = closestColors[0]
  let colorB = closestColors[1]

  // Light trigonometry ahead.
  const a = colorB.distance
  const b = colorA.distance
  const c = colorA.color.deltaEOK(colorB.color)

  const cosA = (b ** 2 + c ** 2 - a ** 2) / (2 * b * c)
  const radA = Math.acos(cosA)
  const sinA = Math.sin(radA)

  const cosB = (a ** 2 + c ** 2 - b ** 2) / (2 * a * c)
  const radB = Math.acos(cosB)
  const sinB = Math.sin(radB)

  const tanC1 = cosA / sinA
  const tanC2 = cosB / sinB

  const ratio = Math.max(0, tanC1 / tanC2) * 0.5

  const scaleA = scales[colorA.scale]
  const scaleB = scales[colorB.scale]
  const scale = arrayOf11.map((i) =>
    new Color(Color.mix(scaleA[i], scaleB[i], ratio)).to('oklch'),
  ) as ArrayOf11<Color>

  const baseColor = scale
    .slice()
    .sort((a, b) => source.deltaEOK(a) - source.deltaEOK(b))[0]

  const ratioC = source.coords[1] / baseColor.coords[1]

  scale.forEach((color) => {
    color.coords[1] = Math.min(source.coords[1] * 1.5, color.coords[1] * ratioC)
    color.coords[2] = source.coords[2]
  })

  // Generate lightness scale with source color as 500 (middle)
  const sourceLightness = source.coords[0] // Use source color lightness as middle (500)

  // Create a proper lightness scale centered around the source color
  const customLightnessScale = arrayOf11.map((i) => {
    if (i === 5) {
      return sourceLightness
    } else if (i < 5) {
      const ratio = (5 - i) / 5

      const maxLightness =
        i < 4
          ? Math.min(0.95, sourceLightness + (1 - sourceLightness) * 0.7)
          : Math.min(0.88, sourceLightness + (1 - sourceLightness) * 0.5)

      return sourceLightness + (maxLightness - sourceLightness) * ratio
    } else {
      const ratio = (i - 5) / 5 // 0.2 for index 6, 1.0 for index 10
      const minLightness = Math.max(0.2, sourceLightness * 0.35)
      return sourceLightness - (sourceLightness - minLightness) * ratio
    }
  })

  customLightnessScale.forEach((lightness, i) => {
    scale[i].coords[0] = lightness
  })

  return scale
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
    '950',
  ]
  const obj: Record<string, string> = {}

  for (const key in values) {
    obj[keys[key]] = values[key]
  }

  return obj
}

export const createPalette = (hex: string, options: PaletteOptions = {}) => {
  const start = performance.now()
  const sourceColor = new Color(hex).to('oklch')
  const backgroundColor = new Color('#ffffff').to('oklch')
  const palette: Record<string, any> = {}

  // Generate gray scale
  const grayBaseColor = colors.gray
    ? new Color(colors.gray[500].value).to('oklch')
    : sourceColor
  const grayScaleColors = getScaleFromColor(
    grayBaseColor,
    lightGrayColors,
    backgroundColor,
  )

  // Generate accent scale
  const accentScaleColors = getScaleFromColor(
    sourceColor,
    lightColors,
    backgroundColor,
  )

  // Create black color
  palette.black = new Color('oklch', [options.blackLuminance || 0, 0, 0])
    .to('srgb')
    .toString({ format: 'hex' })

  // Map gray scale
  palette.gray = mapValues(
    grayScaleColors.map((color) =>
      color.to('srgb').toString({ format: 'hex' }),
    ),
  )

  // Map accent scale
  const accentName = 'primary'
  palette[accentName] = mapValues(
    accentScaleColors.map((color) =>
      color.to('srgb').toString({ format: 'hex' }),
    ),
  )

  const customColors = Object.entries(colors).filter(
    ([name]) =>
      ![
        'transparent',
        'current',
        'black',
        'white',
        'whiteAlpha',
        'blackAlpha',
        'gray',
      ].includes(name),
  )

  console.log('customColors', customColors)

  // Create shades for custom colors
  customColors.forEach(
    ([name, value]: [string, Record<number, { value: string }>]) => {
      if (name !== 'gray' && !palette[name]) {
        const customColor = new Color(value[500].value).to('oklch')
        const customScaleColors = getScaleFromColor(
          customColor,
          lightColors,
          backgroundColor,
        )
        palette[name] = mapValues(
          customScaleColors.map((color) =>
            color.to('srgb').toString({ format: 'hex' }),
          ),
        )
      }
    },
  )

  const end = performance.now()
  console.log(`createPalette took ${end - start}ms`)

  return palette
}
