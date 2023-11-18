import * as React from 'react'
import { render, testStories } from '@saas-ui/test-utils'

import { Navbar, NavbarBrand, NavbarItem, NavbarContent } from './index'

import * as stories from './navbar.stories'

testStories<typeof stories>(stories)

describe('Navbar', () => {
  it('should render correctly', () => {
    const wrapper = render(<Navbar />)

    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('ref should be forwarded', () => {
    const ref = React.createRef<HTMLDivElement>()

    render(<Navbar ref={ref} />)
    expect(ref.current).not.toBeNull()
  })

  it('should render correctly with brand', () => {
    const wrapper = render(
      <Navbar>
        <NavbarBrand data-testid="navbar-test">Saas UI</NavbarBrand>
      </Navbar>
    )

    expect(wrapper.getByTestId('navbar-test')).toBeInTheDocument()
  })

  it('should render correctly content children', () => {
    const wrapper = render(
      <Navbar>
        <NavbarContent data-testid="navbar-content-test">
          <NavbarItem>Dashboard</NavbarItem>
          <NavbarItem>Contacts</NavbarItem>
          <NavbarItem>Settings</NavbarItem>
        </NavbarContent>
      </Navbar>
    )

    const navbarContent = wrapper.getByTestId('navbar-content-test')

    expect(navbarContent.children.length).toBe(5)
  })
})
