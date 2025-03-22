import { createModals } from '@saas-ui/modals-provider'

import { defaultModals } from './default-modals.ts'

// Exporting from './dialog'
export { AlertDialog } from './alert-dialog.tsx'
export type { AlertDialogProps } from './alert-dialog.tsx'

// Exporting from './drawer'
export { Drawer } from './drawer'
export type { DrawerProps } from './drawer'

// Exporting from './modal'
export { Modal } from './modal'
export type { ModalProps } from './modal'

const { useModals, ModalsProvider } = createModals({
  modals: defaultModals,
})

export { ModalsProvider, useModals }
