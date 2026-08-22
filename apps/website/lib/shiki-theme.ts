import type { ThemeRegistration } from 'shiki'

/**
 * Syntax colors are CSS variables from the Saas UI / Chakra theme, so
 * randomized appearance seeds and light/dark mode flow through without
 * re-highlighting.
 */
const colors = {
  bg: 'var(--chakra-colors-bg-muted)',
  bgSubtle: 'var(--chakra-colors-bg-subtle)',
  fg: 'var(--chakra-colors-fg)',
  fgMuted: 'var(--chakra-colors-fg-muted)',
  fgSubtle: 'var(--chakra-colors-fg-subtle)',
  accent: 'var(--chakra-colors-accent-solid)',
  accentFg:
    'color-mix(in oklch, var(--chakra-colors-accent-solid) 72%, var(--chakra-colors-fg))',
  string: 'var(--chakra-colors-success-solid)',
  number: 'var(--chakra-colors-warning-solid)',
  error: 'var(--chakra-colors-destructive-solid)',
  selection: 'var(--chakra-colors-accent-subtle)',
}

const tokenColors: ThemeRegistration['tokenColors'] = [
  {
    name: 'Comment',
    scope: ['comment', 'punctuation.definition.comment'],
    settings: { foreground: colors.fgMuted, fontStyle: 'italic' },
  },
  {
    name: 'Variables',
    scope: ['variable', 'string constant.other.placeholder'],
    settings: { foreground: colors.fg },
  },
  {
    name: 'HTML/JSX Text Content',
    scope: [
      'text.html',
      'text.xml',
      'text.jsx',
      'meta.jsx.children',
      'meta.tag.js meta.jsx.children',
      'meta.tag.tsx meta.jsx.children',
      'meta.tag.without-attributes.js meta.jsx.children',
      'meta.tag.without-attributes.tsx meta.jsx.children',
      'source.js meta.tag.js',
      'source.tsx meta.tag.tsx',
    ],
    settings: { foreground: colors.fgMuted },
  },
  {
    name: 'Invalid',
    scope: ['invalid', 'invalid.illegal'],
    settings: { foreground: colors.error },
  },
  {
    name: 'Keyword, Storage',
    scope: ['keyword', 'storage.type', 'storage.modifier'],
    settings: { foreground: colors.fgSubtle, fontStyle: 'normal' },
  },
  {
    name: 'Operator, Misc',
    scope: [
      'keyword.control',
      'constant.other.color',
      'punctuation',
      'meta.tag',
      'punctuation.definition.tag',
      'punctuation.separator.inheritance.php',
      'punctuation.definition.tag.html',
      'punctuation.definition.tag.begin.html',
      'punctuation.definition.tag.end.html',
      'punctuation.section.embedded',
      'keyword.other.template',
      'keyword.other.substitution',
    ],
    settings: { foreground: colors.accent },
  },
  {
    name: 'Tag',
    scope: ['entity.name.tag', 'meta.tag.sgml', 'markup.deleted.git_gutter'],
    settings: { foreground: colors.accent, fontStyle: 'bold' },
  },
  {
    name: 'Function, Special Method',
    scope: [
      'entity.name.function',
      'meta.function-call',
      'variable.function',
      'support.function',
      'keyword.other.special-method',
    ],
    settings: { foreground: colors.accent },
  },
  {
    name: 'Block Level Variables',
    scope: ['meta.block variable.other'],
    settings: { foreground: colors.fg },
  },
  {
    name: 'Other Variable, String Link',
    scope: ['support.other.variable', 'string.other.link'],
    settings: { foreground: colors.fg },
  },
  {
    name: 'Number, Constant, Function Argument, Tag Attribute, Embedded',
    scope: [
      'constant.numeric',
      'constant.language',
      'support.constant',
      'constant.character',
      'constant.escape',
      'variable.parameter',
      'keyword.other.unit',
      'keyword.other',
    ],
    settings: { foreground: colors.number },
  },
  {
    name: 'String, Symbols, Inherited Class, Markup Heading',
    scope: [
      'string',
      'constant.other.symbol',
      'constant.other.key',
      'entity.other.inherited-class',
      'markup.heading',
      'markup.inserted.git_gutter',
      'meta.group.braces.curly constant.other.object.key.js string.unquoted.label.js',
    ],
    settings: { foreground: colors.string },
  },
  {
    name: 'Class, Support',
    scope: [
      'entity.name',
      'support.type',
      'support.class',
      'support.other.namespace.use.php',
      'meta.use.php',
      'support.other.namespace.php',
      'markup.changed.git_gutter',
      'support.type.sys-types',
    ],
    settings: { foreground: colors.accent },
  },
  {
    name: 'Entity Types',
    scope: ['support.type'],
    settings: { foreground: colors.accent },
  },
  {
    name: 'CSS Class and Support',
    scope: [
      'source.css support.type.property-name',
      'source.sass support.type.property-name',
      'source.scss support.type.property-name',
      'source.less support.type.property-name',
      'source.stylus support.type.property-name',
      'source.postcss support.type.property-name',
    ],
    settings: { foreground: colors.accent },
  },
  {
    name: 'Sub-methods',
    scope: [
      'entity.name.module.js',
      'variable.import.parameter.js',
      'variable.other.class.js',
    ],
    settings: { foreground: colors.fg },
  },
  {
    name: 'Language methods',
    scope: ['variable.language'],
    settings: { foreground: colors.fgSubtle, fontStyle: 'italic' },
  },
  {
    name: 'entity.name.method.js',
    scope: ['entity.name.method.js'],
    settings: { foreground: colors.accent },
  },
  {
    name: 'meta.method.js',
    scope: [
      'meta.class-method.js entity.name.function.js',
      'variable.function.constructor',
    ],
    settings: { foreground: colors.accent },
  },
  {
    name: 'Attributes',
    scope: ['entity.other.attribute-name'],
    settings: { foreground: colors.accentFg, fontStyle: 'italic' },
  },
  {
    name: 'HTML Attributes',
    scope: [
      'text.html.basic entity.other.attribute-name.html',
      'text.html.basic entity.other.attribute-name',
    ],
    settings: { foreground: colors.accentFg, fontStyle: 'italic' },
  },
  {
    name: 'CSS Classes',
    scope: ['entity.other.attribute-name.class'],
    settings: { foreground: colors.accent },
  },
  {
    name: "CSS ID's",
    scope: ['source.sass keyword.control'],
    settings: { foreground: colors.accent },
  },
  {
    name: 'Inserted',
    scope: ['markup.inserted'],
    settings: { foreground: colors.string },
  },
  {
    name: 'Deleted',
    scope: ['markup.deleted'],
    settings: { foreground: colors.error },
  },
  {
    name: 'Changed',
    scope: ['markup.changed'],
    settings: { foreground: colors.number },
  },
  {
    name: 'Regular Expressions',
    scope: ['string.regexp'],
    settings: { foreground: colors.number },
  },
  {
    name: 'Escape Characters',
    scope: ['constant.character.escape'],
    settings: { foreground: colors.number },
  },
  {
    name: 'URL',
    scope: ['*url*', '*link*', '*uri*'],
    settings: { fontStyle: 'underline' },
  },
  {
    name: 'Decorators',
    scope: [
      'tag.decorator.js entity.name.tag.js',
      'tag.decorator.js punctuation.definition.tag.js',
    ],
    settings: { foreground: colors.accent },
  },
  {
    name: 'ES7 Bind Operator',
    scope: ['source.js constant.other.object.key.js string.unquoted.label.js'],
    settings: { foreground: colors.fg },
  },
  {
    name: 'JSON Key - Level 0',
    scope: [
      'source.json meta.structure.dictionary.json support.type.property-name.json',
    ],
    settings: { foreground: colors.accent },
  },
  {
    name: 'JSON Key - Level 1',
    scope: [
      'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
    ],
    settings: { foreground: colors.accentFg },
  },
  {
    name: 'JSON Key - Level 2',
    scope: [
      'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
    ],
    settings: { foreground: colors.accent },
  },
  {
    name: 'Markdown - Plain',
    scope: ['text.html.markdown', 'punctuation.definition.list_item.markdown'],
    settings: { foreground: colors.fg },
  },
  {
    name: 'Markdown - Markup Raw Inline',
    scope: ['text.html.markdown markup.inline.raw.markdown'],
    settings: { foreground: colors.accent },
  },
  {
    name: 'Markdown - Markup Raw Inline Punctuation',
    scope: [
      'text.html.markdown markup.inline.raw.markdown punctuation.definition.raw.markdown',
    ],
    settings: { foreground: colors.fgMuted },
  },
  {
    name: 'Markdown - Heading',
    scope: [
      'markdown.heading',
      'markup.heading | markup.heading entity.name',
      'markup.heading.markdown punctuation.definition.heading.markdown',
    ],
    settings: { foreground: colors.accent, fontStyle: 'bold' },
  },
  {
    name: 'Markup - Italic',
    scope: ['markup.italic'],
    settings: { fontStyle: 'italic', foreground: colors.fg },
  },
  {
    name: 'Markup - Bold',
    scope: ['markup.bold', 'markup.bold string'],
    settings: { fontStyle: 'bold', foreground: colors.fg },
  },
  {
    name: 'Markup - Bold-Italic',
    scope: [
      'markup.bold markup.italic',
      'markup.italic markup.bold',
      'markup.quote markup.bold',
      'markup.bold markup.italic string',
      'markup.italic markup.bold string',
      'markup.quote markup.bold string',
    ],
    settings: { fontStyle: 'bold italic', foreground: colors.fg },
  },
  {
    name: 'Markup - Underline',
    scope: ['markup.underline'],
    settings: { fontStyle: 'underline', foreground: colors.accent },
  },
  {
    name: 'Markdown - Blockquote',
    scope: ['markup.quote punctuation.definition.blockquote.markdown'],
    settings: { foreground: colors.fgMuted },
  },
  {
    name: 'Markup - Quote',
    scope: ['markup.quote'],
    settings: { fontStyle: 'italic', foreground: colors.fgSubtle },
  },
  {
    name: 'Markdown - Link',
    scope: ['string.other.link.title.markdown'],
    settings: { foreground: colors.accent },
  },
  {
    name: 'Markdown - Link Description',
    scope: ['string.other.link.description.title.markdown'],
    settings: { foreground: colors.accentFg },
  },
  {
    name: 'Markdown - Link Anchor',
    scope: ['constant.other.reference.link.markdown'],
    settings: { foreground: colors.number },
  },
  {
    name: 'Markup - Raw Block',
    scope: ['markup.raw.block'],
    settings: { foreground: colors.accent },
  },
  {
    name: 'Markdown - Raw Block Fenced',
    scope: ['markup.raw.block.fenced.markdown'],
    settings: { foreground: colors.fg },
  },
  {
    name: 'Markdown - Fenced Bode Block',
    scope: ['punctuation.definition.fenced.markdown'],
    settings: { foreground: colors.fgMuted },
  },
  {
    name: 'Markdown - Fenced Bode Block Variable',
    scope: [
      'markup.raw.block.fenced.markdown',
      'variable.language.fenced.markdown',
      'punctuation.section.class.end',
    ],
    settings: { foreground: colors.fg },
  },
  {
    name: 'Markdown - Fenced Language',
    scope: ['variable.language.fenced.markdown'],
    settings: { foreground: colors.accent },
  },
  {
    name: 'Markdown - Separator',
    scope: ['meta.separator'],
    settings: { fontStyle: 'bold', foreground: colors.fgMuted },
  },
  {
    name: 'Markup - Table',
    scope: ['markup.table'],
    settings: { foreground: colors.fg },
  },
]

function createTheme(
  name: string,
  type: 'light' | 'dark',
): ThemeRegistration {
  return {
    name,
    displayName: type === 'light' ? 'Saas UI Light' : 'Saas UI Dark',
    type,
    semanticHighlighting: true,
    semanticTokenColors: {},
    colors: {
      'editor.background': colors.bg,
      'editor.foreground': colors.fg,
      'editor.lineHighlightBackground': colors.bgSubtle,
      'editor.selectionBackground': colors.selection,
      'editorCursor.foreground': colors.accent,
      'editorLineNumber.foreground': colors.fgMuted,
      'editorLineNumber.activeForeground': colors.fgSubtle,
    },
    tokenColors,
  }
}

export const suiLightTheme = createTheme('sui-light', 'light')
export const suiDarkTheme = createTheme('sui-dark', 'dark')
