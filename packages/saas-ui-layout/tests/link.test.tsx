import * as React from 'react'

import { render, testStories } from '@saas-ui/test-utils'

import { SaasProvider } from '@saas-ui/provider'

import { Link } from '../src'

interface LinkComponentProps {
  href: string
  children: React.ReactNode
}

const LinkComponent: React.FC<LinkComponentProps> = (props) => {
  const { children, href, ...rest } = props
  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            href,
            className: 'saas-ui-link',
          })
        }
      })}
    </>
  )
}

const renderLink = (ui) => {
  return render(<SaasProvider linkComponent={LinkComponent}>{ui}</SaasProvider>)
}

test('should render the link', async () => {
  const { getByText } = renderLink(<Link>Test</Link>)

  const link = getByText('Test')

  expect(link).toHaveClass('saas-ui-link')
})
