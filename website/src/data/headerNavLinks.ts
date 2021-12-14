const hideMobile = {
  display: ['none', 'block'],
}

const headerNavLinks = [
  { href: '#features', title: 'Features', ...hideMobile },
  { href: '#request-access', title: 'Pricing', ...hideMobile },
  { href: '#faq', title: 'FAQ', ...hideMobile },
  // { href: '/documentation', title: 'Documentation' },
  {
    href: '#request-access',
    title: 'Sign up',
    variant: 'solid',
    colorScheme: 'primary',
  },
]

export default headerNavLinks
