# @saas-ui/modals-provider

UI library agnostic React modals manager.

## Installation

```sh
$ yarn add @saas-ui/modals-provider

#or

$ npm i @saas-ui/modals-provider  --save
```

## Usage

### Add the ModalProvider to your app.

```ts
export const {ModalsProvider, useModals} = createModals({
  modals: {
    alert: AlertDialog,
    confirm: ConfirmDialog,
  }
})

export default App() {
  return (
    <ModalsProvider>
      {children}
    </ModalsProvider>
  )
}
```

### Open a modal

```ts
import { useModals } from './modals-provider'

function MyComponent() {
  const modals = useModals()

  modals.open(MyModal, {
    title: 'My modal',
  })
}
```

### Open a confirm dialog

```ts
import { useModals } from './modals-provider'

function MyComponent() {
  const modals = useModals()

  modals.confirm({
    title: 'Delete user',
    body: 'Are you sure you want to delete this user?'
    onConfirm: () => //delete user
  })
}
```

## Docs

https://www.saas-ui.dev/docs/overlay/modals-manager

## Source

https://github.com/saas-js/saas-ui/tree/next/packages/saas-ui-modals-provider

## License

MIT - Appulse Software
