'use client'

import { createModals } from './create-modals.tsx'
import { AlertDialog, Drawer, Modal } from './modal-components.tsx'

export { createModals } from './create-modals.tsx'
export type { CreateModalsOptions } from './create-modals.tsx'
export { AlertDialog, Drawer, Modal } from './modal-components.tsx'
export type {
  AlertDialogProps,
  DrawerProps,
  ModalProps,
} from './modal-components.tsx'
export {
  ModalsContext,
  ModalsProvider as BaseModalsProvider,
  useModalsContext,
} from './modals-provider.tsx'
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
} from './modals-provider.tsx'

export const defaultModals = {
  alert: AlertDialog,
  confirm: AlertDialog,
  drawer: Drawer,
  modal: Modal,
}

const defaultManager = createModals({ modals: defaultModals })

export const ModalsProvider = defaultManager.ModalsProvider
export const useModals = defaultManager.useModals
