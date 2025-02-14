import { globby } from 'globby'
import { rm } from 'node:fs/promises'
import { Options, format as prettierFormat } from 'prettier'

import prettierConfig from '../../../.prettierrc.js'

export async function cleanFiles() {
  console.log('🧹 Cleaning files...')
  const files = await globby('src/**/*.{ts,tsx}', {
    ignore: ['src/def.ts'],
  })

  const promises = files.map(async (file) => {
    return rm(file, { recursive: true })
  })

  await Promise.all(promises)

  console.log('🧹 Files cleaned')
}

export function format(code: string) {
  return prettierFormat(code, {
    parser: 'typescript',
    ...(prettierConfig as Options),
  })
}

export function kebabCaseToCamelCase(str: string) {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
}

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
