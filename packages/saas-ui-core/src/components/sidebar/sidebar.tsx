import React, { forwardRef, useState } from 'react'

import { Presence, type PresenceProps } from '@ark-ui/react'

import { type HTMLSystemProps, sui } from '#system'
import { callAll, dataAttr } from '#utils'

import { useSidebar, useSidebarTrigger } from './sidebar.context.tsx'
import { SidebarProps } from './sidebar.types.ts'

export const SidebarRoot = React.forwardRef<HTMLDivElement, SidebarProps>(
  (props, ref) => {
    const { children, ...containerProps } = props

    const { open, mode } = useSidebar()

    return (
      <sui.div
        ref={ref}
        data-state={open ? 'open' : 'closed'}
        data-mode={mode}
        {...containerProps}
      >
        {children}
      </sui.div>
    )
  },
)

export interface SidebarTriggerProps extends HTMLSystemProps<'button'> {}

export const SidebarTrigger = forwardRef<
  HTMLButtonElement,
  SidebarTriggerProps
>((props, ref) => {
  const { children, ...rest } = props
  const { getButtonProps } = useSidebarTrigger()

  return (
    <sui.button {...getButtonProps(rest)} ref={ref} {...rest}>
      {children}
    </sui.button>
  )
})

export interface SidebarFlyoutTriggerProps extends HTMLSystemProps<'button'> {}

export const SidebarFlyoutTrigger = forwardRef<
  HTMLButtonElement,
  SidebarFlyoutTriggerProps
>((props, ref) => {
  const { children, ...rest } = props
  const { getFlyoutButtonProps } = useSidebarTrigger()

  return (
    <sui.button {...getFlyoutButtonProps(rest)} ref={ref} {...rest}>
      {children}
    </sui.button>
  )
})

export interface SidebarBackdropProps
  extends HTMLSystemProps<'div'>,
    PresenceProps {}

export const SidebarBackdrop = forwardRef<HTMLDivElement, SidebarBackdropProps>(
  (props, ref) => {
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
        <sui.div
          ref={ref}
          data-visible={enabled}
          {...backdropProps}
          {...props}
        />
      </Presence>
    )
  },
)

/**
 * Sidebar header section.
 *
 * @see Docs https://saas-ui.dev/docs/components/layout/sidebar
 */
export const SidebarHeader = sui.header

/**
 * Sidebar body section, used for the main content of the sidebar.
 *
 * @see Docs https://saas-ui.dev/docs/components/layout/sidebar
 */
export const SidebarBody = sui.div

/**
 * Sidebar footer section.
 *
 * @see Docs https://saas-ui.dev/docs/components/layout/sidebar
 */
export const SidebarFooter = sui.div

export const SidebarTrack = forwardRef<HTMLDivElement, HTMLSystemProps<'div'>>(
  (props, ref) => {
    const { setOpen, mode } = useSidebar()
    return (
      <sui.div
        ref={ref}
        {...props}
        onClick={callAll(() => {
          if (mode !== 'flyout') {
            setOpen(false)
          }
        }, props.onClick)}
      />
    )
  },
)

export const SidebarGroup = forwardRef<HTMLDivElement, HTMLSystemProps<'div'>>(
  (props, ref) => {
    return <sui.div ref={ref} {...props} />
  },
)

export const SidebarGroupHeader = forwardRef<
  HTMLDivElement,
  HTMLSystemProps<'div'>
>((props, ref) => {
  return <sui.div ref={ref} {...props} />
})

export const SidebarGroupTitle = forwardRef<
  HTMLHeadingElement,
  HTMLSystemProps<'h5'>
>((props, ref) => {
  return <sui.h5 ref={ref} {...props} />
})

export const SidebarGroupEndElement = forwardRef<
  HTMLDivElement,
  HTMLSystemProps<'div'>
>((props, ref) => {
  return <sui.div ref={ref} {...props} />
})

export const SidebarGroupContent = forwardRef<
  HTMLDivElement,
  HTMLSystemProps<'div'>
>((props, ref) => {
  return <sui.div ref={ref} {...props} />
})

export const SidebarNavItem = forwardRef<
  HTMLDivElement,
  HTMLSystemProps<'div'>
>((props, ref) => {
  return <sui.div ref={ref} {...props} />
})

export interface SidebarNavButtonProps extends HTMLSystemProps<'button'> {
  active?: boolean
}

export const SidebarNavButton = forwardRef<
  HTMLButtonElement,
  SidebarNavButtonProps
>((props, ref) => {
  const { children, active, ...rest } = props

  return (
    <sui.button ref={ref} data-active={dataAttr(active)} {...rest}>
      {children}
    </sui.button>
  )
})

export const SidebarNavItemEndElement = forwardRef<
  HTMLDivElement,
  HTMLSystemProps<'div'>
>((props, ref) => {
  return <sui.div ref={ref} {...props} />
})
