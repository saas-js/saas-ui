import * as React from 'react'
import { render, screen } from '@saas-ui/test-utils'

import { useSnackbar } from './'

test('can accept shorthand options', async () => {
  const title = 'Info'

  const TestComponent = () => {
    const snackbar = useSnackbar()

    return <button onClick={() => snackbar.info(title)}>Snackbar</button>
  }

  const { user } = render(<TestComponent />)

  const button = await screen.findByText('Snackbar')
  await user.click(button)

  const toast = await screen.findByRole('alert', {
    name: title,
  })
  expect(toast).toBeInTheDocument()
})

it('should allow promise toast chainings', async () => {
  const loadingTitle = 'Toast is loading'
  const successTitle = 'Promise resolved'
  const errorTitle = 'Error occurred'
  const sleepTime = 500
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
