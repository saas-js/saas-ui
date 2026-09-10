import * as React from 'react'
import { act } from 'react'

import { Button as ChakraButton, ChakraProvider } from '@chakra-ui/react'
import { defaultSystem } from '@saas-ui/chakra-preset'
import { type Root, createRoot } from 'react-dom/client'

import { Button } from './button.ts'

const testEnvironment = globalThis as {
  IS_REACT_ACT_ENVIRONMENT?: boolean
}
testEnvironment.IS_REACT_ACT_ENVIRONMENT = true

describe('Button', () => {
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

  it('preserves the Chakra Button runtime and forwards its ref', () => {
    expect(Button).toBe(ChakraButton)

    const ref = React.createRef<HTMLButtonElement>()

    act(() => {
      root.render(
        <ChakraProvider value={defaultSystem}>
          <Button ref={ref} variant="glass" size="xl">
            Connect
          </Button>
        </ChakraProvider>,
      )
    })

    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    expect(ref.current?.textContent).toBe('Connect')
  })
})
