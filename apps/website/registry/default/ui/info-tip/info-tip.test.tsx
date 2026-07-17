import * as React from 'react'
import { act } from 'react'

import { ChakraProvider } from '@chakra-ui/react'
import { defaultSystem } from '@saas-ui/chakra-preset'
import { type Root, createRoot } from 'react-dom/client'
import { vi } from 'vitest'

import { InfoTip } from './info-tip.tsx'

vi.mock('../icon-button/index.ts', async () => {
  const React = await import('react')

  type TestIconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    size?: string
    variant?: string
  }

  return {
    IconButton: React.forwardRef<HTMLButtonElement, TestIconButtonProps>(
      function TestIconButton({ size, variant: _variant, ...props }, ref) {
        return <button data-size={size} ref={ref} {...props} />
      },
    ),
  }
})

const testEnvironment = globalThis as {
  IS_REACT_ACT_ENVIRONMENT?: boolean
}
testEnvironment.IS_REACT_ACT_ENVIRONMENT = true

describe('InfoTip', () => {
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

  it('renders the smallest IconButton size supported by the preset', () => {
    act(() => {
      root.render(
        <ChakraProvider value={defaultSystem}>
          <InfoTip aria-label="Info tip" icon={<span />}>
            More information
          </InfoTip>
        </ChakraProvider>,
      )
    })

    const sizeVariants = Object.keys(
      defaultSystem.getRecipe('button').variants?.size ?? {},
    )
    const infoTipButton = container.querySelector<HTMLButtonElement>(
      '[aria-label="Info tip"]',
    )

    expect(sizeVariants).toEqual(['2xs', 'xs', 'sm', 'md', 'lg', 'xl'])
    expect(infoTipButton).toBeInstanceOf(HTMLButtonElement)
    expect(infoTipButton?.dataset.size).toBe(sizeVariants[0])
  })
})
