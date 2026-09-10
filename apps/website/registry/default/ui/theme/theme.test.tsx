import * as React from 'react'
import { act } from 'react'

import { ChakraProvider, chakra } from '@chakra-ui/react'
import { defaultSystem } from '@saas-ui/chakra-preset'
import { type Root, createRoot } from 'react-dom/client'

import { Theme } from './theme.tsx'

const testEnvironment = globalThis as {
  IS_REACT_ACT_ENVIRONMENT?: boolean
}
testEnvironment.IS_REACT_ACT_ENVIRONMENT = true

describe('Theme', () => {
  let container: HTMLDivElement
  let root: Root

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
    root = createRoot(container)
  })

  afterEach(() => {
    act(() => root.unmount())
    container.remove()
  })

  it('preserves appearance, palette, background, and Saas UI variables', () => {
    act(() => {
      root.render(
        <ChakraProvider value={defaultSystem}>
          <chakra.div
            data-reference="with-background"
            color="fg"
            bg="bg"
            colorPalette="purple"
          />
          <Theme
            data-testid="theme"
            appearance="dark"
            className="custom-theme"
            colorPalette="purple"
            scaleFactor={1.25}
            controlRadius={0.75}
            panelRadius={1.5}
            indicatorRadius={2}
            overlayEffect="saturate(120%) blur(12px)"
            style={
              {
                colorScheme: 'light',
                '--scale-factor': 99,
              } as React.CSSProperties
            }
          />
          <chakra.div
            data-reference="without-background"
            color="fg"
            colorPalette="blue"
          />
          <Theme
            data-testid="transparent-theme"
            hasBackground={false}
            colorPalette="blue"
          />
        </ChakraProvider>,
      )
    })

    const theme = container.querySelector<HTMLElement>('[data-testid="theme"]')!
    const transparent = container.querySelector<HTMLElement>(
      '[data-testid="transparent-theme"]',
    )!
    const withBackground = container.querySelector<HTMLElement>(
      '[data-reference="with-background"]',
    )!
    const withoutBackground = container.querySelector<HTMLElement>(
      '[data-reference="without-background"]',
    )!

    expect(theme.className).toContain('chakra-theme dark custom-theme')
    expect(theme.className.split(' ')).toEqual(
      expect.arrayContaining(withBackground.className.split(' ')),
    )
    expect(transparent.className.split(' ')).toEqual(
      expect.arrayContaining(withoutBackground.className.split(' ')),
    )
    expect(theme.style.colorScheme).toBe('dark')
    expect(theme.style.getPropertyValue('--scale-factor')).toBe('1.25')
    expect(theme.style.getPropertyValue('--radius-control-factor')).toBe('0.75')
    expect(theme.style.getPropertyValue('--radius-panel-factor')).toBe('1.5')
    expect(theme.style.getPropertyValue('--radius-indicator-factor')).toBe('2')
    expect(theme.style.getPropertyValue('--overlay-effect')).toBe(
      'saturate(120%) blur(12px)',
    )
    expect(theme.hasAttribute('appearance')).toBe(false)
    expect(theme.hasAttribute('scaleFactor')).toBe(false)
    expect(transparent.style.getPropertyValue('--scale-factor')).toBe('')
    expect(transparent.style.getPropertyValue('--overlay-effect')).toBe('')
  })
})
