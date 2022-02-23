import * as React from 'react'

import {
  ModalFooter,
  MenuDescendantsProvider,
  MenuProvider,
  MenuListProps,
  useMenu,
  useMenuList,
  chakra,
  StylesProvider,
  useMultiStyleConfig,
  useTheme,
  useStyles,
  forwardRef,
} from '@chakra-ui/react'

import { BaseModal, BaseModalProps } from './modal'

export interface MenuDialogProps extends BaseModalProps {
  /**
   * The modal footer, wrapped with `ModalFooter`
   */
  footer?: React.ReactNode
}

export const MenuDialog: React.FC<MenuDialogProps> = (props) => {
  const { children, footer, isOpen, onClose, ...rest } = props

  const styles = useMultiStyleConfig('Menu', props)
  const { direction } = useTheme()
  const { descendants, ...ctx } = useMenu({
    onClose,
    autoSelect: true,
    defaultIsOpen: true,
    closeOnBlur: false,
    direction,
  })
  const context = React.useMemo(() => ctx, [ctx])

  React.useEffect(() => {
    ctx.openAndFocusFirstItem()
  }, [props.isOpen])

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      initialFocusRef={ctx.menuRef}
      {...rest}
    >
      <MenuDescendantsProvider value={descendants}>
        <MenuProvider value={context}>
          <StylesProvider value={styles}>{children}</StylesProvider>
        </MenuProvider>
      </MenuDescendantsProvider>

      {footer && <ModalFooter>{footer}</ModalFooter>}
    </BaseModal>
  )
}

MenuDialog.defaultProps = {
  variant: 'dialog',
}

export const MenuDialogList = forwardRef<MenuListProps, 'div'>((props, ref) => {
  const { rootProps, ...rest } = props

  const ownProps = useMenuList(rest, ref) as any

  const styles = useStyles()

  return (
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
  )
})
