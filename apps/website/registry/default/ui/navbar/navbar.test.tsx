import * as React from 'react'

import { render, testStories } from '@saas-ui/test-utils'

import * as stories from './navbar.stories.tsx'
import { Navbar } from './index.ts'

testStories<typeof stories>(stories)

describe('Navbar', () => {
  it('should render correctly', () => {
    const wrapper = render(<Navbar.Root />)

    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('ref should be forwarded', () => {
    const ref = React.createRef<HTMLDivElement>()

    render(<Navbar.Root ref={ref} />)
    expect(ref.current).not.toBeNull()
  })

  it('should render correctly with brand', () => {
    const wrapper = render(
      <Navbar.Root>
        <Navbar.Brand data-testid="navbar-test">Saas UI</Navbar.Brand>
      </Navbar.Root>,
    )

    expect(wrapper.getByTestId('navbar-test')).toBeInTheDocument()
  })

  it('should render correctly content children', () => {
    const wrapper = render(
      <Navbar.Root>
        <Navbar.Content data-testid="navbar-content-test">
          <Navbar.Item>Dashboard</Navbar.Item>
          <Navbar.Item>Contacts</Navbar.Item>
          <Navbar.Item>Settings</Navbar.Item>
        </Navbar.Content>
      </Navbar.Root>,
    )

    const navbarContent = wrapper.getByTestId('navbar-content-test')

    expect(navbarContent.children.length).toBe(3)
  })
})
