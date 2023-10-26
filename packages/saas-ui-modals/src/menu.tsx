import * as React from 'react'

import {
  ModalFooter,
  chakra,
  forwardRef,
  useMenuContext,
  useMenuList,
  createStylesContext,
  useMultiStyleConfig,
  Menu,
  MenuListProps,
  useBreakpointValue,
} from '@chakra-ui/react'

import { BaseModal, BaseModalProps } from './modal'

const [StylesProvider] = createStylesContext('SuiMenuDialog')

export interface MenuDialogProps extends BaseModalProps {
  /**
   * The modal footer, wrapped with `ModalFooter`
   */
  footer?: React.ReactNode
}

export const MenuDialog: React.FC<MenuDialogProps> = (props) => {
  const { onClose, onCloseComplete, ...rest } = props

  return (
    <Menu
      variant="dialog"
      onClose={() => {
        onClose?.()
        // Not supported in Menu, so we call it here instead
        // @todo Refactor this in v2?
        onCloseComplete?.()
      }}
      {...rest}
    />
  )
}

export interface MenuDialogListProps
  extends Omit<
      BaseModalProps,
      'isOpen' | 'onClose' | 'children' | 'scrollBehavior'
    >,
    Omit<MenuListProps, 'title'> {}

export const MenuDialogList = forwardRef<MenuDialogListProps, 'div'>(
  (props, forwardedRef) => {
    const {
      rootProps,
      title,
      footer,
      initialFocusRef,
      hideCloseButton,
      motionPreset = 'slideInBottom',
      isCentered: isCenteredProp,
      ...rest
    } = props

    const { isOpen, onClose, menuRef } = useMenuContext()

    const { ref, ...ownProps } = useMenuList(rest, forwardedRef)

    const styles = useMultiStyleConfig('Menu', props)

    const isCentered = useBreakpointValue({ base: true, md: false })

    return (
      <BaseModal
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={initialFocusRef || menuRef}
        title={title}
        hideCloseButton={hideCloseButton}
        motionPreset={motionPreset}
        isCentered={isCenteredProp ?? isCentered}
        contentProps={{ mx: 4 }}
      >
        {/* We forward the styles again, otherwise the modal styles will be picked up */}
        <StylesProvider value={styles}>
          <chakra.div
            {...ownProps}
            ref={ref as React.Ref<HTMLDivElement>}
            __css={{
              outline: 0,
              maxHeight: '80vh', // can override this in theme
              overflowY: 'auto', // can override this in theme
              ...styles.list,
              boxShadow: 'none',
              border: 0,
              _dark: {
                /* @ts-expect-error */
                ...(styles.list._dark || {}),
                boxShadow: 'none',
              },
            }}
          />
        </StylesProvider>
        {footer && <ModalFooter>{footer}</ModalFooter>}
      </BaseModal>
    )
  }
)
