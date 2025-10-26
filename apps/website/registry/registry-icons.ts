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
  ArrowLeft: {
    lucide: 'ArrowLeft',
    tabler: 'IconArrowLeft',
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
  Copy: {
    lucide: 'Copy',
    tabler: 'IconCopy',
  },
  Ellipsis: {
    lucide: 'MoreHorizontal',
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
  Info: {
    lucide: 'Info',
    tabler: 'IconInfoCircle',
  },
  Minus: {
    lucide: 'Minus',
    tabler: 'IconMinus',
  },
  Plus: {
    lucide: 'Plus',
    tabler: 'IconPlus',
  },
  Search: {
    lucide: 'Search',
    tabler: 'IconSearch',
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
