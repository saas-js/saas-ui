import { NavLinkProps } from '@/components/nav-link'

const hideMobile = {
  // display: ['none', null, 'block'],
}

const headerNav: NavLinkProps[] = [
  { id: 'home', label: 'Home', display: 'none' },
  { id: 'features', label: 'Features', ...hideMobile },
  { id: 'pricing', label: 'Pricing', ...hideMobile },
  { id: 'faq', label: 'FAQ', ...hideMobile },
  { href: '/docs/introduction', label: 'Documentation', ...hideMobile },
  {
    id: 'pricing',
    label: 'Early access',
    variant: 'solid',
    colorScheme: 'primary',
  },
]

export default headerNav
