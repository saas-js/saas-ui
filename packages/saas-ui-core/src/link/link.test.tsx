import * as React from 'react'

import { render } from '@saas-ui/test-utils'

import { SaasProvider } from '../provider'

import { Link } from './link'

interface LinkComponentProps {
  href: string
  children: React.ReactNode
}

const LinkComponent: React.FC<LinkComponentProps> = (props) => {
  const { children, href, ...rest } = props
  return (
    <a href={href} {...rest} className="saas-ui-link">
      {children}
    </a>
  )
}

const renderLink = (ui: React.ReactNode) => {
  return render(<SaasProvider linkComponent={LinkComponent}>{ui}</SaasProvider>)
}

test('should render the link', async () => {
  const { getByText } = renderLink(<Link>Test</Link>)

  const link = getByText('Test')

  expect(link).toHaveClass('saas-ui-link')
})
