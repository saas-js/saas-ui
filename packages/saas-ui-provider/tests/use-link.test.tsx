import * as React from 'react'
import { hooks, render } from '@saas-ui/test-utils'

import { SaasProvider, useLink } from '../src'

const DummyComponent = ({ href = '' }) => {
  const LinkWrapper = useLink()

  if (LinkWrapper) {
    return (
      <LinkWrapper href={href}>
        <a>Link</a>
      </LinkWrapper>
    )
  }
  return <a>Link</a>
}

const Link = ({
  href = '',
  children,
}: {
  href: string
  children: React.ReactNode
}) => {
  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            href,
          })
        }
        return child
      })}
    </>
  )
}

const renderLink = (ui: React.ReactNode) => {
  return render(<SaasProvider linkComponent={Link}>{ui}</SaasProvider>, {
    withSaasProvider: false,
  })
}

test('it should not throw without context', () => {
  const { result } = hooks.render(() => useLink())
})

test('it should render', () => {
  const { getByText } = renderLink(<DummyComponent />)

  expect(getByText('Link')).toBeInTheDocument()
})

test('it should render with href', () => {
  const { getByText } = renderLink(<DummyComponent href="/test" />)

  expect(getByText('Link')).toHaveAttribute('href', '/test')
})
