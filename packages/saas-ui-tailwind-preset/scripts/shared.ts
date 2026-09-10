import { Options, format as prettierFormat } from 'prettier'

export function format(code: string) {
  return prettierFormat(code, {
    parser: 'typescript',
    semi: false,
    singleQuote: true,
    trailingComma: 'all',
    printWidth: 80,
  } as Options)
}

export function formatCSS(code: string) {
  return prettierFormat(code, {
    parser: 'css',
    semi: true,
    singleQuote: false,
    printWidth: 80,
  } as Options)
}

export function kebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
}

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
