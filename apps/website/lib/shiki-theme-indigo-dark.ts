import type { ThemeRegistration } from 'shiki'

// OKLCH color palette - same as light theme
const colors = {
  gray: {
    50: 'oklch(0.985 0.002 247.839)',
    100: 'oklch(0.967 0.003 264.542)',
    200: 'oklch(0.928 0.006 264.531)',
    300: 'oklch(0.872 0.01 258.338)',
    400: 'oklch(0.707 0.012 261.325)',
    500: 'oklch(0.551 0.015 264.364)',
    600: 'oklch(0.446 0.016 256.802)',
    700: 'oklch(0.373 0.017 259.733)',
    800: 'oklch(0.278 0.018 256.848)',
    900: 'oklch(0.21 0.020 264.665)',
    950: 'oklch(0.145 0.022 261.692)',
  },
  indigo: {
    50: 'oklch(0.962 0.018 272.314)',
    100: 'oklch(0.93 0.034 272.788)',
    200: 'oklch(0.87 0.065 274.039)',
    300: 'oklch(0.785 0.115 274.713)',
    400: 'oklch(0.673 0.182 276.935)',
    500: 'oklch(0.585 0.233 277.117)',
    600: 'oklch(0.511 0.262 276.966)',
    700: 'oklch(0.457 0.24 277.023)',
    800: 'oklch(0.398 0.195 277.366)',
    900: 'oklch(0.359 0.144 278.697)',
    950: 'oklch(0.257 0.09 281.288)',
  },
  // Additional accent colors for variety
  emerald: {
    400: 'oklch(0.75 0.14 162)',
    500: 'oklch(0.7 0.15 162)',
    600: 'oklch(0.6 0.16 162)',
  },
  amber: {
    400: 'oklch(0.85 0.11 85)',
    500: 'oklch(0.8 0.12 85)',
    600: 'oklch(0.7 0.13 85)',
  },
  rose: {
    400: 'oklch(0.75 0.14 25)',
    500: 'oklch(0.7 0.15 25)',
    600: 'oklch(0.6 0.16 25)',
  },
}

export const indigoDarkTheme: ThemeRegistration = {
  name: 'indigo-dark',
  displayName: 'Indigo Dark',
  type: 'dark',
  semanticHighlighting: true,
  semanticTokenColors: {},
  colors: {
    'activityBar.background': colors.gray[900],
    'activityBar.foreground': colors.gray[300],
    'editor.background': colors.gray[900],
    'editor.foreground': colors.gray[100],
    'editor.lineHighlightBackground': colors.gray[800],
    'editor.selectionBackground': colors.indigo[900],
    'editorCursor.foreground': colors.indigo[400],
    'editorLineNumber.foreground': colors.gray[600],
    'editorLineNumber.activeForeground': colors.gray[400],
    'sideBar.background': colors.gray[800],
    'sideBar.foreground': colors.gray[300],
    'statusBar.background': colors.indigo[600],
    'statusBar.foreground': colors.gray[50],
    'titleBar.activeBackground': colors.gray[800],
    'titleBar.activeForeground': colors.gray[100],
  },
  tokenColors: [
    {
      name: 'Comment',
      scope: ['comment', 'punctuation.definition.comment'],
      settings: {
        foreground: colors.gray[500],
        fontStyle: 'italic',
      },
    },
    {
      name: 'Variables',
      scope: ['variable', 'string constant.other.placeholder'],
      settings: {
        foreground: colors.gray[200],
      },
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
      settings: {
        foreground: colors.gray[400],
      },
    },
    {
      name: 'Invalid',
      scope: ['invalid', 'invalid.illegal'],
      settings: {
        foreground: colors.rose[400],
      },
    },
    {
      name: 'Keyword, Storage',
      scope: ['keyword', 'storage.type', 'storage.modifier'],
      settings: {
        foreground: colors.gray[400],
        fontStyle: 'normal',
      },
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
      settings: {
        foreground: colors.indigo[400],
      },
    },
    {
      name: 'Tag',
      scope: ['entity.name.tag', 'meta.tag.sgml', 'markup.deleted.git_gutter'],
      settings: {
        foreground: colors.indigo[400],
        fontStyle: 'bold',
      },
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
      settings: {
        foreground: colors.indigo[300],
      },
    },
    {
      name: 'Block Level Variables',
      scope: ['meta.block variable.other'],
      settings: {
        foreground: colors.gray[300],
      },
    },
    {
      name: 'Other Variable, String Link',
      scope: ['support.other.variable', 'string.other.link'],
      settings: {
        foreground: colors.gray[300],
      },
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
      settings: {
        foreground: colors.amber[400],
      },
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
      settings: {
        foreground: colors.emerald[400],
      },
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
      settings: {
        foreground: colors.indigo[300],
      },
    },
    {
      name: 'Entity Types',
      scope: ['support.type'],
      settings: {
        foreground: colors.indigo[400],
      },
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
      settings: {
        foreground: colors.indigo[400],
      },
    },
    {
      name: 'Sub-methods',
      scope: [
        'entity.name.module.js',
        'variable.import.parameter.js',
        'variable.other.class.js',
      ],
      settings: {
        foreground: colors.gray[300],
      },
    },
    {
      name: 'Language methods',
      scope: ['variable.language'],
      settings: {
        foreground: colors.gray[400],
        fontStyle: 'italic',
      },
    },
    {
      name: 'entity.name.method.js',
      scope: ['entity.name.method.js'],
      settings: {
        foreground: colors.indigo[300],
      },
    },
    {
      name: 'meta.method.js',
      scope: [
        'meta.class-method.js entity.name.function.js',
        'variable.function.constructor',
      ],
      settings: {
        foreground: colors.indigo[300],
      },
    },
    {
      name: 'Attributes',
      scope: ['entity.other.attribute-name'],
      settings: {
        foreground: colors.indigo[300],
        fontStyle: 'italic',
      },
    },
    {
      name: 'HTML Attributes',
      scope: [
        'text.html.basic entity.other.attribute-name.html',
        'text.html.basic entity.other.attribute-name',
      ],
      settings: {
        foreground: colors.indigo[300],
        fontStyle: 'italic',
      },
    },
    {
      name: 'CSS Classes',
      scope: ['entity.other.attribute-name.class'],
      settings: {
        foreground: colors.indigo[400],
      },
    },
    {
      name: "CSS ID's",
      scope: ['source.sass keyword.control'],
      settings: {
        foreground: colors.indigo[400],
      },
    },
    {
      name: 'Inserted',
      scope: ['markup.inserted'],
      settings: {
        foreground: colors.emerald[400],
      },
    },
    {
      name: 'Deleted',
      scope: ['markup.deleted'],
      settings: {
        foreground: colors.rose[400],
      },
    },
    {
      name: 'Changed',
      scope: ['markup.changed'],
      settings: {
        foreground: colors.amber[400],
      },
    },
    {
      name: 'Regular Expressions',
      scope: ['string.regexp'],
      settings: {
        foreground: colors.amber[400],
      },
    },
    {
      name: 'Escape Characters',
      scope: ['constant.character.escape'],
      settings: {
        foreground: colors.amber[400],
      },
    },
    {
      name: 'URL',
      scope: ['*url*', '*link*', '*uri*'],
      settings: {
        fontStyle: 'underline',
      },
    },
    {
      name: 'Decorators',
      scope: [
        'tag.decorator.js entity.name.tag.js',
        'tag.decorator.js punctuation.definition.tag.js',
      ],
      settings: {
        foreground: colors.indigo[400],
      },
    },
    {
      name: 'ES7 Bind Operator',
      scope: [
        'source.js constant.other.object.key.js string.unquoted.label.js',
      ],
      settings: {
        foreground: colors.gray[300],
      },
    },
    {
      name: 'JSON Key - Level 0',
      scope: [
        'source.json meta.structure.dictionary.json support.type.property-name.json',
      ],
      settings: {
        foreground: colors.indigo[400],
      },
    },
    {
      name: 'JSON Key - Level 1',
      scope: [
        'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
      ],
      settings: {
        foreground: colors.indigo[300],
      },
    },
    {
      name: 'JSON Key - Level 2',
      scope: [
        'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
      ],
      settings: {
        foreground: colors.indigo[500],
      },
    },
    {
      name: 'Markdown - Plain',
      scope: [
        'text.html.markdown',
        'punctuation.definition.list_item.markdown',
      ],
      settings: {
        foreground: colors.gray[300],
      },
    },
    {
      name: 'Markdown - Markup Raw Inline',
      scope: ['text.html.markdown markup.inline.raw.markdown'],
      settings: {
        foreground: colors.indigo[400],
      },
    },
    {
      name: 'Markdown - Markup Raw Inline Punctuation',
      scope: [
        'text.html.markdown markup.inline.raw.markdown punctuation.definition.raw.markdown',
      ],
      settings: {
        foreground: colors.gray[500],
      },
    },
    {
      name: 'Markdown - Heading',
      scope: [
        'markdown.heading',
        'markup.heading | markup.heading entity.name',
        'markup.heading.markdown punctuation.definition.heading.markdown',
      ],
      settings: {
        foreground: colors.indigo[300],
        fontStyle: 'bold',
      },
    },
    {
      name: 'Markup - Italic',
      scope: ['markup.italic'],
      settings: {
        fontStyle: 'italic',
        foreground: colors.gray[300],
      },
    },
    {
      name: 'Markup - Bold',
      scope: ['markup.bold', 'markup.bold string'],
      settings: {
        fontStyle: 'bold',
        foreground: colors.gray[200],
      },
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
      settings: {
        fontStyle: 'bold italic',
        foreground: colors.gray[200],
      },
    },
    {
      name: 'Markup - Underline',
      scope: ['markup.underline'],
      settings: {
        fontStyle: 'underline',
        foreground: colors.indigo[400],
      },
    },
    {
      name: 'Markdown - Blockquote',
      scope: ['markup.quote punctuation.definition.blockquote.markdown'],
      settings: {
        foreground: colors.gray[500],
      },
    },
    {
      name: 'Markup - Quote',
      scope: ['markup.quote'],
      settings: {
        fontStyle: 'italic',
        foreground: colors.gray[400],
      },
    },
    {
      name: 'Markdown - Link',
      scope: ['string.other.link.title.markdown'],
      settings: {
        foreground: colors.indigo[400],
      },
    },
    {
      name: 'Markdown - Link Description',
      scope: ['string.other.link.description.title.markdown'],
      settings: {
        foreground: colors.indigo[300],
      },
    },
    {
      name: 'Markdown - Link Anchor',
      scope: ['constant.other.reference.link.markdown'],
      settings: {
        foreground: colors.amber[400],
      },
    },
    {
      name: 'Markup - Raw Block',
      scope: ['markup.raw.block'],
      settings: {
        foreground: colors.indigo[400],
      },
    },
    {
      name: 'Markdown - Raw Block Fenced',
      scope: ['markup.raw.block.fenced.markdown'],
      settings: {
        foreground: colors.gray[300],
      },
    },
    {
      name: 'Markdown - Fenced Bode Block',
      scope: ['punctuation.definition.fenced.markdown'],
      settings: {
        foreground: colors.gray[500],
      },
    },
    {
      name: 'Markdown - Fenced Bode Block Variable',
      scope: [
        'markup.raw.block.fenced.markdown',
        'variable.language.fenced.markdown',
        'punctuation.section.class.end',
      ],
      settings: {
        foreground: colors.gray[300],
      },
    },
    {
      name: 'Markdown - Fenced Language',
      scope: ['variable.language.fenced.markdown'],
      settings: {
        foreground: colors.indigo[400],
      },
    },
    {
      name: 'Markdown - Separator',
      scope: ['meta.separator'],
      settings: {
        fontStyle: 'bold',
        foreground: colors.gray[500],
      },
    },
    {
      name: 'Markup - Table',
      scope: ['markup.table'],
      settings: {
        foreground: colors.gray[300],
      },
    },
  ],
}
