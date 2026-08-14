'use client'

import { createModals } from './create-modals'
import { AlertDialog, Drawer, Modal } from './modal-components'

export { createModals } from './create-modals'
export type { CreateModalsOptions } from './create-modals'
export { AlertDialog, Drawer, Modal } from './modal-components'
export type {
  AlertDialogProps,
  DrawerProps,
  ModalProps,
} from './modal-components'
export {
  ModalsContext,
  ModalsProvider as BaseModalsProvider,
  useModalsContext,
} from './modals-provider'
export type {
  AlertDialogOptions,
  ConfirmDialogOptions,
  ModalConfig,
  ModalId,
  ModalOptions,
  ModalScope,
  ModalsContextValue,
  ModalsProviderProps,
  OpenOptions,
} from './modals-provider'

export const defaultModals = {
  alert: AlertDialog,
  confirm: AlertDialog,
  drawer: Drawer,
  modal: Modal,
}

const defaultManager = createModals({ modals: defaultModals })

export const ModalsProvider = defaultManager.ModalsProvider
export const useModals = defaultManager.useModals
