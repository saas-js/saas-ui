import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const exampleImportAliases = {
  components: '#components',
  hooks: '#hooks',
  icons: '#components/icons',
  lib: '#lib',
  ui: '#components/ui',
} as const

const exampleImportPattern =
  /(['"])compositions\/(components|hooks|icons|lib|ui)(?=\/|['"])/g

export const prepareExampleSource = (source: string) => {
  return source.replace(
    exampleImportPattern,
    (_, quote: string, alias: keyof typeof exampleImportAliases) =>
      `${quote}${exampleImportAliases[alias]}`,
  )
}

export const readExampleFile = async (name: string, ext = 'tsx') => {
  const filePath = resolve('../compositions/src/examples', `${name}.${ext}`)

  const fileContent = await readFile(filePath, 'utf-8')

  return prepareExampleSource(fileContent)
}
