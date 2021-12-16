const hideMobile = {
  display: ['none', 'block'],
}

const headerNav = [
  { href: '/#features', title: 'Features', ...hideMobile },
  { href: '/#request-access', title: 'Pricing', ...hideMobile },
  { href: '/#faq', title: 'FAQ', ...hideMobile },
  { href: '/docs/introduction', title: 'Documentation' },
  {
    href: '/#request-access',
    title: 'Request access',
    variant: 'solid',
    colorScheme: 'primary',
  },
]

export default headerNav
