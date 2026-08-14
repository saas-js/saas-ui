import type { ReactNode } from 'react'

import { type ModalProps, createModals, useModals } from './index.ts'

declare const defaultModals: ReturnType<typeof useModals>

defaultModals.open({ title: 'Modal', body: 'Content' })
defaultModals.open({ type: 'drawer', title: 'Drawer', placement: 'start' })
defaultModals.confirm({
  title: 'Confirm',
  leastDestructiveFocus: 'confirm',
})

interface CustomModalProps extends Omit<ModalProps, 'children'> {
  accountId: string
  children?: ReactNode
}

declare const CustomModal: (props: CustomModalProps) => ReactNode

const custom = createModals({ modals: { custom: CustomModal } })
declare const customModals: ReturnType<typeof custom.useModals>

customModals.open({ type: 'custom', accountId: 'account-1' })

// @ts-expect-error accountId is required by the custom modal
customModals.open({ type: 'custom' })

// @ts-expect-error custom is the only registered modal type
customModals.open({ type: 'unknown' })
