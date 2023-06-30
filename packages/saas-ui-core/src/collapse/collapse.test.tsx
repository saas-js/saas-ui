import * as React from 'react'
import { hooks } from '@saas-ui/test-utils'

import { useCollapse } from '.'

describe('useCollapse', () => {
  test('it should collapse', async () => {
    const { result } = hooks.render(() => useCollapse())

    expect(result.current.isOpen).toBeFalsy()

    hooks.act(() => {
      result.current.onOpen()
    })

    expect(result.current.isOpen).toBeTruthy()

    hooks.act(() => {
      result.current.onToggle()
    })

    expect(result.current.isOpen).toBeFalsy()
  })

  test('it should have getToggleProps to return aria props', async () => {
    const { result } = hooks.render(() => useCollapse())

    const toggleProps = result.current.getToggleProps()
    const collapseProps = result.current.getCollapseProps()

    expect(toggleProps['aria-expanded']).toBe('false')

    expect(toggleProps['aria-controls']).toBe(collapseProps.id)

    hooks.act(() => {
      result.current.onOpen()
    })

    const updatedToggleProps = result.current.getToggleProps()

    expect(updatedToggleProps['aria-expanded']).toBe('true')
  })

  test('it should have no toggle props', async () => {
    const { result } = hooks.render(() =>
      useCollapse({
        isCollapsible: false,
      })
    )

    const toggleProps = result.current.getToggleProps()
    expect(toggleProps).toMatchObject({})
  })
})
