import { NavLinkProps } from '@/components/nav-link'

const hideMobile = {
  // display: ['none', null, 'block'],
}

const headerNav: NavLinkProps[] = [
  { id: 'home', title: 'Home', display: 'none' },
  { id: 'features', title: 'Features', ...hideMobile },
  { id: 'pricing', title: 'Pricing', ...hideMobile },
  { id: 'faq', title: 'FAQ', ...hideMobile },
  { href: '/docs/introduction', title: 'Documentation', ...hideMobile },
  { href: '/blog', title: 'Blog', ...hideMobile },
  {
    id: 'request-access',
    title: 'Request access',
    variant: 'solid',
    colorScheme: 'primary',
  },
]

export default headerNav
