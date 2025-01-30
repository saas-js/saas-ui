import React, { forwardRef, useState } from 'react'

import { Presence, type PresenceProps, ark } from '@ark-ui/react'
import { styled } from '@saas-ui/panda/jsx'
import { sidebar, sidebarItem } from '@saas-ui/panda/recipes'
import { callAll, dataAttr } from 'src/utils'

import { createStyleContext } from '../context'
import { HTMLSuiProps } from '../types'
import {
  SidebarProvider,
  UseSidebarReturn,
  useSidebar,
  useSidebarTrigger,
} from './sidebar.context'
import { SidebarProps } from './sidebar.types'

const { withContext, withProvider } = createStyleContext(sidebar)

export const SidebarContext = function SidebarContext(props: {
  children: (context: UseSidebarReturn) => React.ReactNode
}) {
  const context = useSidebar()

  return props.children(context)
}

export const SidebarRoot = withProvider(
  React.forwardRef<HTMLDivElement, SidebarProps>((props, ref) => {
    const { children, ...containerProps } = props

    function Container() {
      const { open, mode } = useSidebar()

      return (
        <styled.div
          ref={ref}
          data-state={open ? 'open' : 'closed'}
          data-mode={mode}
          {...containerProps}
        >
          {children}
        </styled.div>
      )
    }

    return (
      <SidebarProvider {...props}>
        <Container />
      </SidebarProvider>
    )
  }),
  'root',
)

export interface SidebarTriggerProps extends HTMLSuiProps<'button'> {}

const StyledButtonForwardChild = styled(
  ark.button,
  {},
  {
    defaultProps: {
      asChild: true,
    },
  },
)

export const SidebarTrigger = withContext(
  forwardRef<HTMLButtonElement, SidebarTriggerProps>((props, ref) => {
    const { children, ...rest } = props
    const { getButtonProps } = useSidebarTrigger()

    return (
      <StyledButtonForwardChild {...getButtonProps(rest)} ref={ref} {...rest}>
        {children}
      </StyledButtonForwardChild>
    )
  }),
  'trigger',
)

export interface SidebarFlyoutTriggerProps extends HTMLSuiProps<'button'> {}

export const SidebarFlyoutTrigger = withContext(
  forwardRef<HTMLButtonElement, SidebarFlyoutTriggerProps>((props, ref) => {
    const { children, ...rest } = props
    const { getFlyoutButtonProps } = useSidebarTrigger()

    return (
      <StyledButtonForwardChild
        ref={ref}
        {...rest}
        {...getFlyoutButtonProps(rest)}
      >
        {children}
      </StyledButtonForwardChild>
    )
  }),
  'flyoutTrigger',
)

export interface SidebarBackdropProps
  extends HTMLSuiProps<'div'>,
    Omit<PresenceProps, keyof HTMLSuiProps<'div'>> {}

export const SidebarBackdrop = withContext(
  forwardRef<HTMLDivElement, SidebarBackdropProps>((props, ref) => {
    const { setOpen, isMobile, open, mode } = useSidebar()

    const [enabled, setEnabled] = useState(false)

    if (!isMobile && mode !== 'flyout') {
      return null
    }

    const backdropProps = {
      onClick: () => {
        if (mode !== 'flyout') {
          setOpen(false)
        }
      },
      onMouseEnter: () => {
        if (mode === 'flyout') {
          setOpen(false)
        }
      },
    }

    return (
      <Presence
        present={open}
        unmountOnExit
        lazyMount
        onAnimationStart={() => {
          setEnabled(false)
        }}
        onAnimationEnd={() => {
          setEnabled(true)
        }}
        asChild
      >
        <styled.div
          ref={ref}
          data-visible={enabled}
          {...backdropProps}
          {...props}
        />
      </Presence>
    )
  }),
  'backdrop',
)

export const SidebarHeader = withContext(styled.header, 'header')
export const SidebarBody = withContext(styled.div, 'body')
export const SidebarFooter = withContext(styled.div, 'footer')

export interface SidebarTrackProps extends HTMLSuiProps<'div'> {}

export const SidebarTrack = withContext(
  forwardRef<HTMLDivElement, SidebarTrackProps>((props, ref) => {
    const { setOpen, mode } = useSidebar()
    return (
      <styled.div
        ref={ref}
        {...props}
        onClick={callAll(props.onClick, (e) => {
          if (!e.defaultPrevented && mode !== 'flyout') {
            setOpen(false)
          }
        })}
      />
    )
  }),
  'track',
)

export interface SidebarGroupProps extends HTMLSuiProps<'div'> {}

export const SidebarGroup = withContext(
  forwardRef<HTMLDivElement, SidebarGroupProps>((props, ref) => {
    return <styled.div ref={ref} {...props} />
  }),
  'group',
)

export interface SidebarGroupHeaderProps extends HTMLSuiProps<'div'> {}

export const SidebarGroupHeader = withContext(
  forwardRef<HTMLDivElement, SidebarGroupHeaderProps>((props, ref) => {
    return <styled.div ref={ref} {...props} />
  }),
  'groupHeader',
)

export interface SidebarGroupTitleProps extends HTMLSuiProps<'h5'> {}

export const SidebarGroupTitle = withContext(
  forwardRef<HTMLHeadingElement, SidebarGroupTitleProps>((props, ref) => {
    return <styled.h5 ref={ref} {...props} />
  }),
  'groupTitle',
)

export interface SidebarGroupEndElementProps extends HTMLSuiProps<'div'> {}

export const SidebarGroupEndElement = withContext(
  forwardRef<HTMLDivElement, SidebarGroupEndElementProps>((props, ref) => {
    return <styled.div ref={ref} {...props} />
  }),
  'groupEndElement',
)

export interface SidebarGroupContentProps extends HTMLSuiProps<'div'> {}

export const SidebarGroupContent = withContext(
  forwardRef<HTMLDivElement, SidebarGroupContentProps>((props, ref) => {
    return <styled.div ref={ref} {...props} />
  }),
  'groupContent',
)

const {
  withProvider: withSidebarItemProvider,
  withContext: withSidebarItemContext,
} = createStyleContext(sidebarItem)

export interface SidebarNavItemProps extends HTMLSuiProps<'div'> {}

export const SidebarNavItem = withSidebarItemProvider(
  forwardRef<HTMLDivElement, SidebarNavItemProps>((props, ref) => {
    return <styled.div ref={ref} {...props} />
  }),
  'item',
)

export interface SidebarNavButtonProps extends HTMLSuiProps<'div'> {
  active?: boolean
}

export const SidebarNavButton = withSidebarItemContext(
  forwardRef<HTMLDivElement, SidebarNavButtonProps>((props, ref) => {
    const { children, active, ...rest } = props

    return (
      <styled.div
        ref={ref}
        data-active={dataAttr(active)}
        role="button"
        {...rest}
      >
        {children}
      </styled.div>
    )
  }),
  'button',
)

export interface SidebarNavItemEndElementProps extends HTMLSuiProps<'div'> {}

export const SidebarNavItemEndElement = withSidebarItemContext(
  forwardRef<HTMLDivElement, SidebarNavItemEndElementProps>((props, ref) => {
    return <styled.div ref={ref} {...props} />
  }),
  'endElement',
)
