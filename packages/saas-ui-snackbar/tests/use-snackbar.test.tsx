import * as React from 'react'
import { render, act, hooks, screen, waitFor } from '@saas-ui/test-utils'

import { useSnackbar } from '../src'

test('can accept shorthand options', async () => {
  const title = 'Info'

  const { result } = hooks.render(() => useSnackbar())

  hooks.act(() => {
    result.current.info(title)
  })

  const allByTitle = await screen.findAllByRole('alert', { name: title })

  expect(allByTitle).toHaveLength(1)
})

test('can accept success handler', async () => {
  const title = 'Success'

  const { result } = hooks.render(() => useSnackbar())

  hooks.act(() => {
    result.current.success(title)
  })

  const allByTitle = await screen.findAllByRole('alert', { name: title })

  expect(allByTitle).toHaveLength(1)
})

test('can accept errpr handler', async () => {
  const title = 'Error'

  const { result } = hooks.render(() => useSnackbar())

  hooks.act(() => {
    result.current.error(title)
  })

  const allByTitle = await screen.findAllByRole('alert', { name: title })

  expect(allByTitle).toHaveLength(1)
})

it('should allow promise toast chainings', async () => {
  const loadingTitle = 'Toast is loading'
  const successTitle = 'Promise resolved'
  const errorTitle = 'Error occurred'
  const sleepTime = 200
  const dummyPromise = new Promise<{ payload: string }>((r) =>
    setTimeout(r, sleepTime, { payload: successTitle })
  )

  const TestComponent = () => {
    const snackbar = useSnackbar()

    return (
      <button
        onClick={() =>
          snackbar.promise(dummyPromise, {
            loading: loadingTitle,
            success: successTitle,
            error: errorTitle,
          })
        }
      >
        Snackbar
      </button>
    )
  }

  const { user } = render(<TestComponent />)

  const button = await screen.findByText('Snackbar')
  await user.click(button)

  const loadingToast = await screen.findByRole('alert', {
    name: loadingTitle,
  })
  expect(loadingToast).toBeInTheDocument()

  const successToast = await screen.findByRole('alert', {
    name: successTitle,
  })
  expect(successToast).toBeInTheDocument()
})
