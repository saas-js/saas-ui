import { ConfirmDialog } from './dialog'
import { MenuDialog } from './menu'
import { FormDialog } from './form'
import { Drawer } from './drawer'
import { Modal } from './modal'

export const defaultModals = {
  alert: ConfirmDialog,
  confirm: ConfirmDialog,
  drawer: Drawer,
  modal: Modal,
  menu: MenuDialog,
  form: FormDialog,
}
