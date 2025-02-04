import { ComponentProps, PropsWithChildren, forwardRef } from 'react'

import { PolymorphicProps } from '@ark-ui/react'
import { Sidebar, type SidebarProviderProps } from '@saas-ui/core/sidebar'
import { Box, BoxProps, splitCssProps, styled } from '@saas-ui/panda-preset/jsx'
import { sidebar, sidebarItem } from '@saas-ui/panda-preset/recipes'

import { createStyleContext } from '../context'
import { HTMLSuiProps } from '../types'

const { withContext, withProvider } = createStyleContext(sidebar)

export const SidebarContext = Sidebar.Context

export const SidebarProvider = withProvider(function SidebarProvider(
  props: SidebarProviderProps & BoxProps,
) {
  const { children, ...rest } = props
  const [styleProps, ctx] = splitCssProps(rest)

  return (
    <Sidebar.Provider {...ctx}>
      <Box ref={rest.ref} {...styleProps}>
        {props.children}
      </Box>
    </Sidebar.Provider>
  )
})

export const SidebarRoot = withContext(styled(Sidebar.Root), 'root')

// added PolymorphicProps, because it was showing that "asChild" does not exist, but it clearly does
export interface SidebarTriggerProps
  extends ComponentProps<typeof StyledSidebarTrigger>,
    PolymorphicProps,
    PropsWithChildren {}

const StyledSidebarTrigger = styled(Sidebar.Trigger)
export const SidebarTrigger = withContext(function Trigger(
  props: SidebarTriggerProps,
) {
  return <StyledSidebarTrigger asChild {...props} />
}, 'trigger')

export interface SidebarFlyoutTriggerProps
  extends ComponentProps<typeof StyledSidebarFlyoutTrigger>,
    PolymorphicProps {}

const StyledSidebarFlyoutTrigger = styled(Sidebar.FlyoutTrigger)
export const SidebarFlyoutTrigger = withContext(function FlyoutTrigger(
  props: SidebarFlyoutTriggerProps,
) {
  return <StyledSidebarFlyoutTrigger asChild {...props} />
}, 'flyoutTrigger')

export interface SidebarBackdropProps
  extends HTMLSuiProps<'div'>,
    PolymorphicProps {}

export const SidebarBackdrop: React.FC<SidebarBackdropProps> = withContext(
  styled(Sidebar.Backdrop),
  'backdrop',
)

export const SidebarHeader = withContext(styled(Sidebar.Header), 'header')
export const SidebarBody = withContext(styled(Sidebar.Body), 'body')
export const SidebarFooter = withContext(styled(Sidebar.Footer), 'footer')

export interface SidebarTrackProps extends HTMLSuiProps<'div'> {}

const StyledSidebarTrack = styled(Sidebar.Track)
export const SidebarTrack = withContext(function Track(
  props: SidebarTrackProps,
) {
  return <StyledSidebarTrack asChild {...props} />
}, 'track')

export interface SidebarGroupProps extends HTMLSuiProps<'div'> {}

export const SidebarGroup = withContext(styled(Sidebar.Group), 'group')

export interface SidebarGroupHeaderProps extends HTMLSuiProps<'div'> {}

export const SidebarGroupHeader = withContext(
  styled(Sidebar.GroupHeader),
  'groupHeader',
)

export interface SidebarGroupTitleProps extends HTMLSuiProps<'h5'> {}

export const SidebarGroupTitle = withContext(
  styled(Sidebar.GroupTitle),
  'groupTitle',
)

export interface SidebarGroupEndElementProps extends HTMLSuiProps<'div'> {}

export const SidebarGroupEndElement = withContext(
  styled(Sidebar.GroupEndElement),
  'groupEndElement',
)

export interface SidebarGroupContentProps extends HTMLSuiProps<'div'> {}

export const SidebarGroupContent = withContext(
  styled(Sidebar.GroupContent),
  'groupContent',
)

const {
  withProvider: withSidebarItemProvider,
  withContext: withSidebarItemContext,
} = createStyleContext(sidebarItem)

export interface SidebarNavItemProps extends HTMLSuiProps<'div'> {}

export const SidebarNavItem = withSidebarItemProvider(
  styled(Sidebar.NavItem),
  'item',
)

export interface SidebarNavButtonProps
  extends HTMLSuiProps<'div'>,
    PropsWithChildren {
  active?: boolean
}

const StyledSidebarNavButton = forwardRef<
  HTMLDivElement,
  SidebarNavButtonProps
>((props, ref) => {
  const Component = styled(Sidebar.NavButton)
  return <Component ref={ref} {...props} />
})

export const SidebarNavButton = withSidebarItemContext(
  StyledSidebarNavButton,
  'button',
)

export interface SidebarNavItemEndElementProps extends HTMLSuiProps<'div'> {}

export const SidebarNavItemEndElement = withSidebarItemContext(
  styled(
    Sidebar.NavItemEndElement,
    {},
    { defaultProps: { 'data-slot': 'endElement' } },
  ),
  'endElement',
)
