import * as React from 'react'

import {
  ModalFooter,
  MenuListProps,
  useMenuList,
  chakra,
  StylesProvider,
  useStyles,
  forwardRef,
  useMenuContext,
  Menu,
} from '@chakra-ui/react'

import { BaseModal, BaseModalProps } from '@saas-ui/modals'

export interface MenuDialogProps extends BaseModalProps {
  /**
   * The modal footer, wrapped with `ModalFooter`
   */
  footer?: React.ReactNode
}

export const MenuDialog: React.FC<MenuDialogProps> = (props) => {
  return <Menu variant="dialog" {...props} />
}

export interface MenuDialogListProps
  extends Omit<
      BaseModalProps,
      'isOpen' | 'onClose' | 'children' | 'scrollBehavior'
    >,
    Omit<MenuListProps, 'title'> {}

export const MenuDialogList = forwardRef<MenuDialogListProps, 'div'>(
  (props, ref) => {
    const {
      rootProps,
      title,
      footer,
      initialFocusRef,
      hideCloseButton,
      motionPreset,
      ...rest
    } = props

    const { isOpen, onClose, menuRef } = useMenuContext()

    const ownProps = useMenuList(rest, ref)

    const styles = useStyles()

    return (
      <BaseModal
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={initialFocusRef || menuRef}
        title={title}
        hideCloseButton={hideCloseButton}
        motionPreset={motionPreset}
      >
        {/* We forward the styles again, otherwise the modal styles will be picked up */}
        <StylesProvider value={styles}>
          <chakra.div
            {...ownProps}
            __css={{
              outline: 0,
              maxHeight: '80vh', // can override this in theme
              overflowY: 'auto', // can override this in theme
              ...styles.list,
              boxShadow: 'none',
              border: 0,
            }}
          />
        </StylesProvider>
        {footer && <ModalFooter>{footer}</ModalFooter>}
      </BaseModal>
    )
  }
)
