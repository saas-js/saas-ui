export const iconLibraries = {
  lucide: {
    name: 'lucide',
    package: 'lucide-react',
    import: 'lucide-react',
  },
  tabler: {
    name: 'tabler',
    package: '@tabler/icons-react',
    import: '@tabler/icons-react',
  },
} as const

export const icons: Record<
  string,
  Record<keyof typeof iconLibraries, string>
> = {
  AlignCenter: {
    lucide: 'AlignCenter',
    tabler: 'IconAlignCenter',
  },
  AlignJustify: {
    lucide: 'AlignJustify',
    tabler: 'IconAlignJustified',
  },
  AlignLeft: {
    lucide: 'AlignLeft',
    tabler: 'IconAlignLeft',
  },
  AlignRight: {
    lucide: 'AlignRight',
    tabler: 'IconAlignRight',
  },
  ArrowLeft: {
    lucide: 'ArrowLeft',
    tabler: 'IconArrowLeft',
  },
  Bold: {
    lucide: 'Bold',
    tabler: 'IconBold',
  },
  Calendar: {
    lucide: 'Calendar',
    tabler: 'IconCalendar',
  },
  Check: {
    lucide: 'Check',
    tabler: 'IconCheck',
  },
  ChevronDown: {
    lucide: 'ChevronDown',
    tabler: 'IconChevronDown',
  },
  ChevronLeft: {
    lucide: 'ChevronLeft',
    tabler: 'IconChevronLeft',
  },
  ChevronRight: {
    lucide: 'ChevronRight',
    tabler: 'IconChevronRight',
  },
  ChevronUp: {
    lucide: 'ChevronUp',
    tabler: 'IconChevronUp',
  },
  Close: {
    lucide: 'X',
    tabler: 'IconX',
  },
  Code: {
    lucide: 'Code',
    tabler: 'IconCode',
  },
  Copy: {
    lucide: 'Copy',
    tabler: 'IconCopy',
  },
  Ellipsis: {
    lucide: 'Ellipsis',
    tabler: 'IconDots',
  },
  Eye: {
    lucide: 'Eye',
    tabler: 'IconEye',
  },
  EyeOff: {
    lucide: 'EyeOff',
    tabler: 'IconEyeOff',
  },
  Filter: {
    lucide: 'Filter',
    tabler: 'IconFilter',
  },
  Hamburger: {
    lucide: 'Menu',
    tabler: 'IconMenu2',
  },
  Heading1: {
    lucide: 'Heading1',
    tabler: 'IconH1',
  },
  Heading2: {
    lucide: 'Heading2',
    tabler: 'IconH2',
  },
  Heading3: {
    lucide: 'Heading3',
    tabler: 'IconH3',
  },
  Heading4: {
    lucide: 'Heading4',
    tabler: 'IconH4',
  },
  Highlighter: {
    lucide: 'Highlighter',
    tabler: 'IconHighlight',
  },
  Info: {
    lucide: 'Info',
    tabler: 'IconInfoCircle',
  },
  Italic: {
    lucide: 'Italic',
    tabler: 'IconItalic',
  },
  Link: {
    lucide: 'Link',
    tabler: 'IconLink',
  },
  List: {
    lucide: 'List',
    tabler: 'IconList',
  },
  ListOrdered: {
    lucide: 'ListOrdered',
    tabler: 'IconListNumbers',
  },
  Minus: {
    lucide: 'Minus',
    tabler: 'IconMinus',
  },
  Plus: {
    lucide: 'Plus',
    tabler: 'IconPlus',
  },
  Quote: {
    lucide: 'Quote',
    tabler: 'IconQuote',
  },
  Redo: {
    lucide: 'Redo',
    tabler: 'IconArrowForwardUp',
  },
  Search: {
    lucide: 'Search',
    tabler: 'IconSearch',
  },
  Strikethrough: {
    lucide: 'Strikethrough',
    tabler: 'IconStrikethrough',
  },
  Underline: {
    lucide: 'Underline',
    tabler: 'IconUnderline',
  },
  Undo: {
    lucide: 'Undo',
    tabler: 'IconArrowBackUp',
  },
  Unlink: {
    lucide: 'Unlink',
    tabler: 'IconUnlink',
  },
  ViewOff: {
    lucide: 'EyeOff',
    tabler: 'IconEyeOff',
  },
  View: {
    lucide: 'Eye',
    tabler: 'IconEye',
  },
} as const
