import * as React from 'react'
import { render, waitFor } from '@saas-ui/test-utils'

import { useModals, ModalsProvider, MenuDialogList } from '../src'
import { MenuItem } from '@saas-ui/menu'
import { Field, FormLayout } from '@saas-ui/forms'

const renderModal = (ui: React.ReactNode) => {
  return render(<ModalsProvider>{ui}</ModalsProvider>)
}

test('should open a basic modal', async () => {
  const title = 'Modal title'

  const TestComponent = () => {
    const modals = useModals()
    return <button onClick={() => modals.open({ title })}>Modal</button>
  }

  const { findByText, findByRole, user } = renderModal(<TestComponent />)

  const button = await findByText('Modal')
  await user.click(button)

  const dialog = await findByRole('dialog', { name: title })

  expect(dialog).toBeVisible()
})

test('should close all modals', async () => {
  const title = 'Modal title'

  const TestComponent = () => {
    const modals = useModals()
    return (
      <>
        <button onClick={() => modals.open({ title })}>Modal</button>
        <button onClick={() => modals.closeAll()}>Close all</button>
      </>
    )
  }

  const { findByText, findByRole, user } = renderModal(<TestComponent />)

  const button = await findByText('Modal')
  await user.click(button)

  const dialog = await findByRole('dialog', { name: title })

  expect(dialog).toBeVisible()

  const close = await findByText('Close all')
  await user.click(close)

  await waitFor(() => expect(dialog).not.toBeVisible())
})

test('should open a drawer', async () => {
  const title = 'Drawer title'

  const TestComponent = () => {
    const modals = useModals()
    return <button onClick={() => modals.drawer({ title })}>Drawer</button>
  }

  const { findByText, findByRole, user } = renderModal(<TestComponent />)

  const button = await findByText('Drawer')
  await user.click(button)

  const dialog = await findByRole('dialog', { name: title })

  expect(dialog).toBeVisible()
})

test('should open an alert', async () => {
  const title = 'Alert'

  const TestComponent = () => {
    const modals = useModals()
    return <button onClick={() => modals.alert({ title })}>Alert</button>
  }

  const { findByText, findByRole, user } = renderModal(<TestComponent />)

  const button = await findByText('Alert')
  await user.click(button)

  const dialog = await findByRole('alertdialog', { name: title })

  expect(dialog).toBeVisible()
})

test('should open an confirm dialog', async () => {
  const title = 'Alert'

  const TestComponent = () => {
    const modals = useModals()
    return <button onClick={() => modals.confirm({ title })}>Alert</button>
  }

  const { findByText, findByRole, user } = renderModal(<TestComponent />)

  const button = await findByText('Alert')
  await user.click(button)

  const dialog = await findByRole('alertdialog', { name: title })

  expect(dialog).toBeVisible()
})

test('should have confirm and cancel buttons', async () => {
  const title = 'Alert'

  const onConfirm = jest.fn()

  const TestComponent = () => {
    const modals = useModals()
    return (
      <button onClick={() => modals.confirm({ title, onConfirm })}>
        Alert
      </button>
    )
  }

  const { findByText, findByRole, user } = renderModal(<TestComponent />)

  const button = await findByText('Alert')
  await user.click(button)

  const dialog = await findByRole('alertdialog', { name: title })

  const cancel = await findByText('Cancel')

  const confirm = await findByText('Confirm')

  expect(cancel).toBeInTheDocument()
  expect(confirm).toBeInTheDocument()

  await user.click(confirm)

  expect(onConfirm).toBeCalled()
})

test('should open a menu dialog', async () => {
  const title = 'Menu'

  const TestComponent = () => {
    const modals = useModals()
    return (
      <button
        onClick={() =>
          modals.menu({
            title,
            body: (
              <MenuDialogList>
                <MenuItem>Item</MenuItem>
                <MenuItem>Item</MenuItem>
              </MenuDialogList>
            ),
          })
        }
      >
        Menu
      </button>
    )
  }

  const { findByText, findByRole, findAllByText, user } = renderModal(
    <TestComponent />
  )

  const button = await findByText('Menu')
  await user.click(button)

  const menu = await findByRole('dialog')

  expect(menu).toBeVisible()

  const items = await findAllByText('Item')

  expect(items).toHaveLength(2)
})

test('should open a form dialog', async () => {
  const title = 'Form'

  const onSubmit = jest.fn()

  const TestComponent = () => {
    const modals = useModals()
    return (
      <button
        onClick={() =>
          modals.form({
            title: 'Form',
            body: (
              <FormLayout>
                <Field name="title" label="Title" />
              </FormLayout>
            ),
            onSubmit: async () => onSubmit(),
          })
        }
      >
        Form
      </button>
    )
  }

  const { findByText, findByRole, findByLabelText, user } = renderModal(
    <TestComponent />
  )

  const button = await findByText('Form')
  await user.click(button)

  const form = await findByRole('dialog')

  expect(form).toBeVisible()

  const field = await findByLabelText('Title')

  expect(field).toBeInTheDocument()
})
