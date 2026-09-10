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

const registryFolderPattern =
  /(['"])(?:@\/|#)registry\/[^/'"]+\/(components|hooks|icons|lib|ui)(?=\/|['"])/g

const registryPrefixPattern = /(['"])(?:@\/|#)registry\/[^/'"]+/g

export const prepareExampleSource = (source: string) => {
  return source.replace(
    exampleImportPattern,
    (_, quote: string, alias: keyof typeof exampleImportAliases) =>
      `${quote}${exampleImportAliases[alias]}`,
  )
}

/** Rewrite registry aliases to the same consumer paths the CLI writes. */
export const prepareBlockSource = (source: string) => {
  return source
    .replace(
      registryFolderPattern,
      (_, quote: string, alias: keyof typeof exampleImportAliases) =>
        `${quote}${exampleImportAliases[alias]}`,
    )
    .replace(registryPrefixPattern, `$1${exampleImportAliases.components}`)
}

export const readExampleFile = async (name: string, ext = 'tsx') => {
  const filePath = resolve('../compositions/src/examples', `${name}.${ext}`)

  const fileContent = await readFile(filePath, 'utf-8')

  return prepareExampleSource(fileContent)
}
