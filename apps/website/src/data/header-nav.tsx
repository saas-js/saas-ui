import { NavLinkProps } from '@/components/nav-link'

const headerNav: (NavLinkProps & { authenticated?: boolean })[] = [
  { id: 'home', label: 'Home' },
  {
    href: '/nextjs-starter-kit',
    label: 'Next.js starter kit',
  },
  {
    href: '/figma',
    label: 'Figma',
  },
  {
    href: '/blocks',
    label: 'Blocks',
  },
  {
    href: '/pricing',
    label: 'Pricing',
  },
  { href: '/docs', label: 'Documentation' },
]

export default headerNav
