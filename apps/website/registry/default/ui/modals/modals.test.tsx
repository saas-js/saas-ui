import * as React from 'react'

import { Provider } from '@/registry/default/setup/provider/provider.tsx'
import { render, waitFor } from '@saas-ui/test-utils'
import { vi } from 'vitest'

import { ModalsProvider, useModals } from './index.ts'

function renderWithModals(ui: React.ReactNode) {
  return render(
    <Provider>
      <ModalsProvider>{ui}</ModalsProvider>
    </Provider>,
  )
}

describe('Modals', () => {
  it('opens and closes a modal', async () => {
    function TestComponent() {
      const modals = useModals()
      return (
        <button
          onClick={() =>
            modals.open({
              title: 'Modal title',
              body: (
                <button onClick={() => modals.closeAll()}>Close all</button>
              ),
            })
          }
        >
          Open
        </button>
      )
    }

    const screen = renderWithModals(<TestComponent />)
    await screen.user.click(screen.getByRole('button', { name: 'Open' }))

    const dialog = await screen.findByRole('dialog')
    expect(dialog).toBeVisible()

    await screen.user.click(screen.getByRole('button', { name: 'Close all' }))
    await waitFor(() => expect(dialog).not.toBeVisible())
  })

  it('opens a confirm dialog and calls onConfirm', async () => {
    const onConfirm = vi.fn()

    function TestComponent() {
      const modals = useModals()
      return (
        <button
          onClick={() =>
            modals.confirm({
              title: 'Delete user?',
              body: 'This action cannot be undone.',
              onConfirm,
            })
          }
        >
          Delete
        </button>
      )
    }

    const screen = renderWithModals(<TestComponent />)
    await screen.user.click(screen.getByRole('button', { name: 'Delete' }))

    expect(await screen.findByRole('alertdialog')).toBeVisible()
    await screen.user.click(screen.getByRole('button', { name: 'Confirm' }))
    expect(onConfirm).toHaveBeenCalledOnce()
  })
})
