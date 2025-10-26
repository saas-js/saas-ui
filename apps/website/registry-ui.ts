import { RegistryEntry } from '@saas-ui/registry'

export const ui = [
  {
    name: 'accordion',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: ['../icons/icons.tsx'],
    files: [
      {
        path: 'accordion',
        content:
          "'use client'\n\nimport * as React from 'react'\n\nimport { Accordion } from '@chakra-ui/react/accordion'\n\nimport { ChevronRightIcon } from '../icons/icons.tsx'\n\nexport interface ItemTriggerProps extends Accordion.ItemTriggerProps {\n  indicatorIcon?: React.ReactNode\n  indicatorPlacement?: 'start' | 'end'\n}\n\nexport const ItemTrigger = React.forwardRef<\n  HTMLButtonElement,\n  ItemTriggerProps\n>(function AccordionItemTrigger(props, ref) {\n  const {\n    children,\n    indicatorPlacement = 'end',\n    indicatorIcon = <ChevronRightIcon />,\n    ...rest\n  } = props\n\n  const indicator = (\n    <Accordion.ItemIndicator>{indicatorIcon}</Accordion.ItemIndicator>\n  )\n\n  return (\n    <Accordion.ItemTrigger {...rest} ref={ref}>\n      {indicatorPlacement === 'start' && indicator}\n      {children}\n      {indicatorPlacement === 'end' && indicator}\n    </Accordion.ItemTrigger>\n  )\n})\n\nexport interface ItemContentProps extends Accordion.ItemContentProps {}\n\nexport const ItemContent = React.forwardRef<HTMLDivElement, ItemContentProps>(\n  function AccordionItemContent(props, ref) {\n    return (\n      <Accordion.ItemContent>\n        <Accordion.ItemBody {...props} ref={ref} />\n      </Accordion.ItemContent>\n    )\n  },\n)\n\nexport const Root = Accordion.Root\nexport const Item = Accordion.Item\n\nexport type RootProps = Accordion.RootProps\nexport type ItemProps = Accordion.ItemProps\n",
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'action-bar',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: ['../close-button/index.ts'],
    files: [
      {
        path: 'action-bar',
        content:
          "'use client'\n\nimport { forwardRef } from 'react'\n\nimport { ActionBar } from '@chakra-ui/react/action-bar'\nimport { Portal } from '@chakra-ui/react/portal'\n\nimport { CloseButton as CloseButtonBase } from '../close-button/index.ts'\n\ninterface ActionBarContentProps extends ActionBar.ContentProps {\n  portalled?: boolean\n  portalRef?: React.RefObject<HTMLElement>\n}\n\nconst ActionBarContent = forwardRef<HTMLDivElement, ActionBarContentProps>(\n  function ActionBarContent(props, ref) {\n    const { children, portalled = true, portalRef, ...rest } = props\n\n    return (\n      <Portal disabled={!portalled} container={portalRef}>\n        <ActionBar.Positioner>\n          <ActionBar.Content ref={ref} {...rest} asChild={false}>\n            {children}\n          </ActionBar.Content>\n        </ActionBar.Positioner>\n      </Portal>\n    )\n  },\n)\n\nconst ActionBarCloseButton = forwardRef<\n  HTMLButtonElement,\n  ActionBar.CloseTriggerProps\n>(function ActionBarCloseTrigger(props, ref) {\n  return (\n    <ActionBar.CloseTrigger {...props} asChild ref={ref}>\n      <CloseButtonBase size=\"sm\" />\n    </ActionBar.CloseTrigger>\n  )\n})\n\nexport const Root = ActionBar.Root\nexport const SelectionTrigger = ActionBar.SelectionTrigger\nexport const Separator = ActionBar.Separator\nexport const Content = ActionBarContent\nexport const CloseButton = ActionBarCloseButton\n\nexport type RootProps = ActionBar.RootProps\nexport type SelectionTriggerProps = ActionBar.SelectionTriggerProps\nexport type SeparatorProps = ActionBar.SeparatorProps\nexport type ContentProps = ActionBarContentProps\nexport type CloseTriggerProps = ActionBar.CloseTriggerProps\n",
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'alert',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: ['../close-button/index.ts'],
    files: [
      {
        path: 'alert',
        content:
          '\'use client\'\n\nimport { forwardRef } from \'react\'\n\nimport { Alert as AlertPrimitive } from \'@chakra-ui/react/alert\'\n\nimport { CloseButton } from \'../close-button/index.ts\'\n\nexport interface AlertProps extends Omit<AlertPrimitive.RootProps, \'title\'> {\n  startElement?: React.ReactNode\n  endElement?: React.ReactNode\n  title?: React.ReactNode\n  icon?: React.ReactElement\n  closable?: boolean\n  onClose?: () => void\n}\n\nexport const Alert = forwardRef<HTMLDivElement, AlertProps>(\n  function Alert(props, ref) {\n    const {\n      title,\n      children,\n      icon,\n      closable,\n      onClose,\n      startElement,\n      endElement,\n      ...rest\n    } = props\n    return (\n      <AlertPrimitive.Root ref={ref} {...rest}>\n        {startElement || (\n          <AlertPrimitive.Indicator>{icon}</AlertPrimitive.Indicator>\n        )}\n        {children ? (\n          <AlertPrimitive.Content>\n            <AlertPrimitive.Title>{title}</AlertPrimitive.Title>\n            <AlertPrimitive.Description>{children}</AlertPrimitive.Description>\n          </AlertPrimitive.Content>\n        ) : (\n          <AlertPrimitive.Title flex="1">{title}</AlertPrimitive.Title>\n        )}\n        {endElement}\n        {closable && (\n          <CloseButton\n            size="sm"\n            pos="relative"\n            top="-2"\n            insetEnd="-2"\n            alignSelf="flex-start"\n            onClick={onClose}\n          />\n        )}\n      </AlertPrimitive.Root>\n    )\n  },\n)\n',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'app-shell',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: [],
    files: [
      {
        path: 'app-shell',
        content:
          "'use client'\n\nimport { forwardRef } from 'react'\n\nimport {\n  type HTMLChakraProps,\n  type SlotRecipeProps,\n  createSlotRecipeContext,\n} from '@chakra-ui/react/styled-system'\n\n////////////////////////////////////////////////////////////////////////////////////\n\nconst {\n  withProvider,\n  withContext,\n  useStyles: useAppShellStyles,\n} = createSlotRecipeContext({\n  key: 'suiAppShell',\n})\n\nexport { useAppShellStyles }\n\nexport interface AppShellBaseProps {\n  /**\n   * The top header navigation\n   */\n  header?: React.ReactNode\n  /**\n   * Main sidebar, positioned on the left\n   */\n  sidebar?: React.ReactElement\n  /**\n   * Secondary sidebar, positioned on the right\n   */\n  aside?: React.ReactNode\n  /**\n   * The footer\n   */\n  footer?: React.ReactNode\n}\n\nexport interface AppShellRootProps\n  extends HTMLChakraProps<'div'>,\n    SlotRecipeProps<'suiAppShell'> {}\n\n/**\n * The App Shell defines the main structure of your app.\n *\n * @see Docs https://saas-ui.dev/docs/components/layout/app-shell\n */\nexport const AppShellRoot = withProvider<HTMLDivElement, AppShellRootProps>(\n  'div',\n  'root',\n  { forwardAsChild: true },\n)\n\nexport interface AppShellContentProps extends HTMLChakraProps<'div'> {}\n\nexport const AppShellContent = withContext<\n  HTMLDivElement,\n  AppShellContentProps\n>('div', 'content', { forwardAsChild: true })\n\nexport interface AppShellMainProps extends HTMLChakraProps<'div'> {}\n\nexport const AppShellMain = withContext<HTMLDivElement, AppShellMainProps>(\n  'div',\n  'main',\n  { forwardAsChild: true },\n)\n\nexport interface AppShellProps\n  extends AppShellBaseProps,\n    HTMLChakraProps<'div'> {}\n\nexport const AppShell = forwardRef<HTMLDivElement, AppShellProps>(\n  (props, ref) => {\n    const { header, sidebar, aside, footer, children, ...rootProps } = props\n\n    return (\n      <AppShellRoot ref={ref} {...rootProps}>\n        {header}\n        <AppShellContent>\n          {sidebar}\n          <AppShellMain>{children}</AppShellMain>\n          {aside}\n        </AppShellContent>\n        {footer}\n      </AppShellRoot>\n    )\n  },\n)\n\nAppShell.displayName = 'AppShell'\n",
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'avatar',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: [],
    files: [
      {
        path: 'avatar',
        content:
          "'use client'\n\nimport { forwardRef } from 'react'\n\nimport { Avatar as ChakraAvatar } from '@chakra-ui/react/avatar'\nimport { Group, type GroupProps } from '@chakra-ui/react/group'\nimport type { SlotRecipeProps } from '@chakra-ui/react/styled-system'\n\ntype ImageProps = React.ImgHTMLAttributes<HTMLImageElement>\n\nexport interface AvatarProps extends ChakraAvatar.RootProps {\n  name?: string\n  src?: string\n  srcSet?: string\n  loading?: ImageProps['loading']\n  icon?: React.ReactElement\n  fallback?: React.ReactNode\n}\n\nexport const Avatar = forwardRef<HTMLDivElement, AvatarProps>(\n  function Avatar(props, ref) {\n    const { name, src, srcSet, loading, icon, fallback, children, ...rest } =\n      props\n    return (\n      <ChakraAvatar.Root ref={ref} {...rest}>\n        <AvatarFallback name={name} icon={icon}>\n          {fallback}\n        </AvatarFallback>\n        <ChakraAvatar.Image src={src} srcSet={srcSet} loading={loading} />\n        {children}\n      </ChakraAvatar.Root>\n    )\n  },\n)\n\ninterface AvatarFallbackProps extends ChakraAvatar.FallbackProps {\n  name?: string\n  icon?: React.ReactElement\n}\n\nconst AvatarFallback = forwardRef<HTMLDivElement, AvatarFallbackProps>(\n  function AvatarFallback(props, ref) {\n    const { name, icon, children, ...rest } = props\n    return (\n      <ChakraAvatar.Fallback ref={ref} {...rest}>\n        {children}\n        {name != null && children == null && <>{getInitials(name)}</>}\n        {name == null && children == null && (\n          <ChakraAvatar.Icon asChild={!!icon}>{icon}</ChakraAvatar.Icon>\n        )}\n      </ChakraAvatar.Fallback>\n    )\n  },\n)\n\nfunction getInitials(name: string) {\n  const names = name.trim().split(' ')\n  const firstName = names[0] != null ? names[0] : ''\n  const lastName = names.length > 1 ? names[names.length - 1] : ''\n  return firstName && lastName\n    ? `${firstName.charAt(0)}${lastName.charAt(0)}`\n    : firstName.charAt(0)\n}\n\ninterface AvatarGroupProps extends GroupProps, SlotRecipeProps<'avatar'> {}\n\nexport const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(\n  function AvatarGroup(props, ref) {\n    const { size, variant, borderless, ...rest } = props\n    return (\n      <ChakraAvatar.PropsProvider value={{ size, variant, borderless }}>\n        <Group gap=\"0\" spaceX=\"-3\" ref={ref} {...rest} />\n      </ChakraAvatar.PropsProvider>\n    )\n  },\n)\n",
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'back-button',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: ['../icons/icons.tsx', '../link/index.ts'],
    files: [
      {
        path: 'back-button',
        content:
          "'use client'\n\nimport { forwardRef } from 'react'\n\nimport { type ButtonProps, IconButton } from '@chakra-ui/react'\n\nimport { ArrowLeftIcon } from '../icons/icons.tsx'\nimport { Link } from '../link/index.ts'\n\nexport interface BackButtonProps extends ButtonProps {\n  'aria-label'?: string\n  href?: string\n  children?: React.ReactNode\n}\n\nexport const BackButton = forwardRef<HTMLButtonElement, BackButtonProps>(\n  (props, ref) => {\n    const { href, variant = 'ghost', mr = 2, children, ...rest } = props\n\n    let content = children || <ArrowLeftIcon />\n    if (href) {\n      content = <Link href={href}>{content}</Link>\n    }\n\n    return (\n      <IconButton\n        ref={ref}\n        aria-label=\"Go back\"\n        variant={variant}\n        mr={mr}\n        {...rest}\n      >\n        {content}\n      </IconButton>\n    )\n  },\n)\n",
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'blockquote',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: [],
    files: [
      {
        path: 'blockquote',
        content:
          "'use client'\n\nimport * as React from 'react'\n\nimport {\n  Blockquote as ChakraBlockquote,\n  type HTMLChakraProps,\n} from '@chakra-ui/react'\n\nexport interface BlockquoteProps extends ChakraBlockquote.RootProps {\n  cite?: React.ReactNode\n  citeUrl?: string\n  icon?: React.ReactNode\n  showDash?: boolean\n}\n\nexport const Blockquote = React.forwardRef<HTMLDivElement, BlockquoteProps>(\n  function Blockquote(props, ref) {\n    const { children, cite, citeUrl, showDash, icon, ...rest } = props\n\n    return (\n      <ChakraBlockquote.Root ref={ref} {...rest}>\n        {icon}\n        <ChakraBlockquote.Content cite={citeUrl}>\n          {children}\n        </ChakraBlockquote.Content>\n        {cite && (\n          <ChakraBlockquote.Caption>\n            {showDash ? <>&mdash;</> : null} <cite>{cite}</cite>\n          </ChakraBlockquote.Caption>\n        )}\n      </ChakraBlockquote.Root>\n    )\n  },\n)\n\nexport const BlockquoteIcon = (props: HTMLChakraProps<'svg'>) => {\n  return <ChakraBlockquote.Icon {...props} />\n}\n",
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'breadcrumb',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: [],
    files: [
      {
        path: 'breadcrumb',
        content:
          "'use client'\n\nimport { Children, Fragment, forwardRef, isValidElement } from 'react'\n\nimport { Breadcrumb } from '@chakra-ui/react/breadcrumb'\nimport type { SystemStyleObject } from '@chakra-ui/react/styled-system'\n\nexport interface RootProps extends Breadcrumb.RootProps {\n  separator?: React.ReactNode\n  separatorGap?: SystemStyleObject['gap']\n}\n\nexport const Root = forwardRef<HTMLDivElement, RootProps>(\n  function BreadcrumbRoot(props, ref) {\n    const { separator = '/', separatorGap, children, ...rest } = props\n    const validChildren = Children.toArray(children).filter(isValidElement)\n    return (\n      <Breadcrumb.Root ref={ref} {...rest}>\n        <Breadcrumb.List gap={separatorGap}>\n          {validChildren.map((child, index) => {\n            const last = index === validChildren.length - 1\n            return (\n              <Fragment key={index}>\n                <Breadcrumb.Item>{child}</Breadcrumb.Item>\n                {!last && (\n                  <Breadcrumb.Separator>{separator}</Breadcrumb.Separator>\n                )}\n              </Fragment>\n            )\n          })}\n        </Breadcrumb.List>\n      </Breadcrumb.Root>\n    )\n  },\n)\n\nexport const Link = Breadcrumb.Link\nexport const CurrentLink = Breadcrumb.CurrentLink\nexport const Ellipsis = Breadcrumb.Ellipsis\n",
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'checkbox',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: [],
    files: [
      {
        path: 'checkbox',
        content:
          "'use client'\n\nimport { forwardRef } from 'react'\n\nimport { Checkbox as ChakraCheckbox } from '@chakra-ui/react/checkbox'\n\nexport interface CheckboxProps extends ChakraCheckbox.RootProps {\n  icon?: React.ReactNode\n  inputProps?: React.InputHTMLAttributes<HTMLInputElement>\n  rootRef?: React.Ref<HTMLLabelElement>\n}\n\nexport const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(\n  function Checkbox(props, ref) {\n    const { icon, children, inputProps, rootRef, ...rest } = props\n    return (\n      <ChakraCheckbox.Root ref={rootRef} {...rest}>\n        <ChakraCheckbox.HiddenInput ref={ref} {...inputProps} />\n        <ChakraCheckbox.Control>\n          {icon || <ChakraCheckbox.Indicator strokeWidth=\"4\" />}\n        </ChakraCheckbox.Control>\n        {children != null && (\n          <ChakraCheckbox.Label>{children}</ChakraCheckbox.Label>\n        )}\n      </ChakraCheckbox.Root>\n    )\n  },\n)\n",
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'checkbox-card',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: [],
    files: [
      {
        path: 'checkbox-card',
        content:
          "'use client'\n\nimport { Fragment, forwardRef } from 'react'\n\nimport { CheckboxCard as ChakraCheckboxCard } from '@chakra-ui/react/checkbox-card'\n\nexport interface CheckboxCardProps extends ChakraCheckboxCard.RootProps {\n  icon?: React.ReactElement\n  label?: React.ReactNode\n  description?: React.ReactNode\n  addon?: React.ReactNode\n  indicator?: React.ReactNode | null\n  indicatorPlacement?: 'start' | 'end' | 'inside'\n  inputProps?: React.InputHTMLAttributes<HTMLInputElement>\n}\n\nexport const CheckboxCard = forwardRef<HTMLInputElement, CheckboxCardProps>(\n  function CheckboxCard(props, ref) {\n    const {\n      inputProps,\n      label,\n      description,\n      icon,\n      addon,\n      indicator = <ChakraCheckboxCard.Indicator />,\n      indicatorPlacement = 'end',\n      ...rest\n    } = props\n\n    const hasContent = label || description || icon\n    const ContentWrapper = indicator ? ChakraCheckboxCard.Content : Fragment\n\n    return (\n      <ChakraCheckboxCard.Root {...rest}>\n        <ChakraCheckboxCard.HiddenInput ref={ref} {...inputProps} />\n        <ChakraCheckboxCard.Control>\n          {indicatorPlacement === 'start' && indicator}\n          {hasContent && (\n            <ContentWrapper>\n              {icon}\n              {label && (\n                <ChakraCheckboxCard.Label>{label}</ChakraCheckboxCard.Label>\n              )}\n              {description && (\n                <ChakraCheckboxCard.Description>\n                  {description}\n                </ChakraCheckboxCard.Description>\n              )}\n              {indicatorPlacement === 'inside' && indicator}\n            </ContentWrapper>\n          )}\n          {indicatorPlacement === 'end' && indicator}\n        </ChakraCheckboxCard.Control>\n        {addon && <ChakraCheckboxCard.Addon>{addon}</ChakraCheckboxCard.Addon>}\n      </ChakraCheckboxCard.Root>\n    )\n  },\n)\n\nexport const CheckboxCardIndicator = ChakraCheckboxCard.Indicator\n",
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'clipboard',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: [
      '../button/index.ts',
      '../icon-button/index.ts',
      '../icons/index.ts',
      '../input/index.ts',
    ],
    files: [
      {
        path: 'clipboard',
        content:
          "'use client'\n\nimport * as React from 'react'\n\nimport { Clipboard as ChakraClipboard } from '@chakra-ui/react/clipboard'\n\nimport { Button, type ButtonProps } from '../button/index.ts'\nimport { IconButton, type IconButtonProps } from '../icon-button/index.ts'\nimport { CheckIcon, CopyIcon } from '../icons/index.ts'\nimport { Input, type InputProps } from '../input/index.ts'\n\nconst ClipboardIcon = React.forwardRef<\n  HTMLDivElement,\n  ChakraClipboard.IndicatorProps\n>(function ClipboardIndicator(props, ref) {\n  const { children = <CopyIcon />, copied = <CheckIcon />, ...rest } = props\n  return (\n    <ChakraClipboard.Indicator copied={copied} {...rest} ref={ref}>\n      {children}\n    </ChakraClipboard.Indicator>\n  )\n})\n\nconst ClipboardCopyText = React.forwardRef<\n  HTMLDivElement,\n  ChakraClipboard.IndicatorProps\n>(function ClipboardCopyText(props, ref) {\n  const { children = 'Copy', copied = 'Copied', ...rest } = props\n  return (\n    <ChakraClipboard.Indicator copied={copied} {...rest} ref={ref}>\n      {children}\n    </ChakraClipboard.Indicator>\n  )\n})\n\ninterface ClipboardButtonProps extends ButtonProps {\n  icon?: React.ReactNode\n  copiedIcon?: React.ReactNode\n  copied?: string\n}\n\nconst ClipboardButton = React.forwardRef<\n  HTMLButtonElement,\n  ClipboardButtonProps\n>(function ClipboardButton(props, ref) {\n  const { icon, copiedIcon, copied, children, ...rest } = props\n  return (\n    <ChakraClipboard.Trigger asChild>\n      <Button ref={ref} {...rest}>\n        <ClipboardIcon copied={copiedIcon}>{icon}</ClipboardIcon>\n        <ClipboardCopyText copied={copied}>{children}</ClipboardCopyText>\n      </Button>\n    </ChakraClipboard.Trigger>\n  )\n})\n\ninterface ClipboardIconButtonProps extends IconButtonProps {\n  icon?: React.ReactNode\n  copiedIcon?: React.ReactNode\n}\n\nconst ClipboardIconButton = React.forwardRef<\n  HTMLButtonElement,\n  ClipboardIconButtonProps\n>(function ClipboardIconButton(props, ref) {\n  const { icon, copiedIcon, ...rest } = props\n  return (\n    <ChakraClipboard.Trigger asChild>\n      <IconButton ref={ref} size=\"xs\" {...rest}>\n        <ClipboardIcon copied={copiedIcon}>{icon}</ClipboardIcon>\n      </IconButton>\n    </ChakraClipboard.Trigger>\n  )\n})\n\nconst ClipboardInput = React.forwardRef<HTMLInputElement, InputProps>(\n  function ClipboardInputElement(props, ref) {\n    return (\n      <ChakraClipboard.Input asChild>\n        <Input ref={ref} {...props} />\n      </ChakraClipboard.Input>\n    )\n  },\n)\n\nconst ClipboardRoot = ChakraClipboard.Root\nconst ClipboardLabel = ChakraClipboard.Label\n\nexport {\n  ClipboardButton as Button,\n  ClipboardIconButton as IconButton,\n  ClipboardInput as Input,\n  ClipboardLabel as Label,\n  ClipboardRoot as Root,\n}\n\ntype ClipboardRootProps = ChakraClipboard.RootProps\n\nexport type { ClipboardRootProps as RootProps }\n",
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'close-button',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: ['../icon-button/index.ts', '../icons/icons.tsx'],
    files: [
      {
        path: 'close-button',
        content:
          "'use client'\n\nimport { forwardRef } from 'react'\n\nimport { IconButton, type IconButtonProps } from '../icon-button/index.ts'\nimport { CloseIcon } from '../icons/icons.tsx'\n\nexport interface CloseButtonProps extends IconButtonProps {}\n\nexport const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>(\n  function CloseButton(props, ref) {\n    return (\n      <IconButton variant=\"ghost\" aria-label=\"Close\" ref={ref} {...props}>\n        {props.children ?? <CloseIcon />}\n      </IconButton>\n    )\n  },\n)\n",
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'color-mode',
    type: 'registry:ui',
    dependencies: ['next-themes'],
    registryDependencies: [],
    files: [
      {
        path: 'color-mode',
        content:
          "'use client'\n\nimport * as React from 'react'\n\nimport type { HTMLChakraProps, SpanProps } from '@chakra-ui/react'\nimport { ClientOnly, Span, chakra } from '@chakra-ui/react'\nimport { ThemeProvider, useTheme } from 'next-themes'\nimport type { ThemeProviderProps } from 'next-themes'\n\nexport interface ColorModeProviderProps extends ThemeProviderProps {}\n\nexport function ColorModeProvider(props: ColorModeProviderProps) {\n  return (\n    <ThemeProvider attribute=\"class\" disableTransitionOnChange {...props} />\n  )\n}\n\nexport type ColorMode = 'light' | 'dark'\n\nexport interface UseColorModeReturn {\n  colorMode: ColorMode\n  setColorMode: (colorMode: ColorMode) => void\n  toggleColorMode: () => void\n}\n\nexport function useColorMode(): UseColorModeReturn {\n  const { resolvedTheme, setTheme, forcedTheme } = useTheme()\n  const colorMode = forcedTheme || resolvedTheme\n  const toggleColorMode = () => {\n    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')\n  }\n  return {\n    colorMode: colorMode as ColorMode,\n    setColorMode: setTheme,\n    toggleColorMode,\n  }\n}\n\nexport function useColorModeValue<T>(light: T, dark: T) {\n  const { colorMode } = useColorMode()\n  return colorMode === 'dark' ? dark : light\n}\n\nexport const ColorModeTrigger = React.forwardRef<\n  HTMLButtonElement,\n  HTMLChakraProps<'button'> & {\n    fallback?: React.ReactNode\n  }\n>(function ColorModeButton(props, ref) {\n  const { fallback, children, ...rest } = props\n  const { toggleColorMode } = useColorMode()\n  return (\n    <ClientOnly fallback={props.fallback}>\n      <chakra.button\n        onClick={toggleColorMode}\n        aria-label=\"Toggle color mode\"\n        ref={ref}\n        {...rest}\n      >\n        {children}\n      </chakra.button>\n    </ClientOnly>\n  )\n})\n\nexport const LightMode = React.forwardRef<HTMLSpanElement, SpanProps>(\n  function LightMode(props, ref) {\n    return (\n      <Span\n        color=\"fg\"\n        display=\"contents\"\n        className=\"chakra-theme light\"\n        colorPalette=\"gray\"\n        colorScheme=\"light\"\n        ref={ref}\n        {...props}\n      />\n    )\n  },\n)\n\nexport const DarkMode = React.forwardRef<HTMLSpanElement, SpanProps>(\n  function DarkMode(props, ref) {\n    return (\n      <Span\n        color=\"fg\"\n        display=\"contents\"\n        className=\"chakra-theme dark\"\n        colorPalette=\"gray\"\n        colorScheme=\"dark\"\n        ref={ref}\n        {...props}\n      />\n    )\n  },\n)\n",
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'command',
    type: 'registry:ui',
    dependencies: ['@saas-ui'],
    registryDependencies: ['../../types.ts', '../kbd/index.ts'],
    files: [
      {
        path: 'command',
        content:
          "'use client'\n\nimport * as React from 'react'\n\nimport {\n  type HTMLChakraProps,\n  UnstyledProp,\n  createRecipeContext,\n} from '@chakra-ui/react/styled-system'\nimport type { CommandVariantProps } from '@saas-ui/chakra-preset/recipes/command'\n\nimport type { RecipeProps } from '../../types.ts'\nimport { Kbd, type KbdProps } from '../kbd/index.ts'\n\nconst { withContext } = createRecipeContext({\n  key: 'suiCommand',\n})\n\nexport interface CommandBaseProps\n  extends RecipeProps<'suiCommand', CommandVariantProps>,\n    UnstyledProp {}\n\nexport interface CommandProps\n  extends HTMLChakraProps<'span'>,\n    CommandBaseProps,\n    CommandVariantProps {\n  /**\n   * The modifiers to use for the command.\n   * @default ['then', 'or', '+']\n   */\n  modifiers?: Array<string>\n}\n\nexport const Command: React.FC<CommandProps> = (props) => {\n  const { children, modifiers, ...rest } = props\n\n  if (typeof children !== 'string') {\n    return <>{children}</>\n  }\n\n  const keys = children.split(/\\s|\\+/)\n\n  return (\n    <StyledCommand {...rest}>\n      {keys.map((key) => (\n        <Key key={key} modifiers={modifiers} size={props.size}>\n          {key}\n        </Key>\n      ))}\n    </StyledCommand>\n  )\n}\n\nconst StyledCommand = withContext<HTMLDivElement, CommandBaseProps>('span')\n\nconst Key: React.FC<KbdProps & { modifiers?: Array<string> }> = (props) => {\n  const { modifiers = ['then', 'or', '+'], children, ...rest } = props\n  if (typeof children !== 'string') {\n    return <>{children}</>\n  }\n\n  if (modifiers.includes(children)) {\n    return <span>{children}</span>\n  }\n\n  return <Kbd {...rest}>{children}</Kbd>\n}\n",
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'dialog',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: ['../close-button/index.ts'],
    files: [
      {
        path: 'dialog',
        content:
          "'use client'\n\nimport { type RefObject, forwardRef } from 'react'\n\nimport { Dialog as ChakraDialog } from '@chakra-ui/react/dialog'\nimport { Portal } from '@chakra-ui/react/portal'\n\nimport { CloseButton as CloseButtonBase } from '../close-button/index.ts'\n\nexport interface ContentProps extends ChakraDialog.ContentProps {\n  portalled?: boolean\n  portalRef?: RefObject<HTMLElement>\n  backdrop?: boolean\n}\n\nexport const Content = forwardRef<HTMLDivElement, ContentProps>(\n  function DialogContent(props, ref) {\n    const {\n      children,\n      portalled = true,\n      portalRef,\n      backdrop = true,\n      ...rest\n    } = props\n\n    return (\n      <Portal disabled={!portalled} container={portalRef}>\n        {backdrop && <ChakraDialog.Backdrop />}\n        <ChakraDialog.Positioner>\n          <ChakraDialog.Content ref={ref} {...rest} asChild={false}>\n            {children}\n          </ChakraDialog.Content>\n        </ChakraDialog.Positioner>\n      </Portal>\n    )\n  },\n)\n\nexport const CloseButton = forwardRef<\n  HTMLButtonElement,\n  ChakraDialog.CloseTriggerProps\n>(function DialogCloseTrigger(props, ref) {\n  return (\n    <ChakraDialog.CloseTrigger {...props} asChild>\n      <CloseButtonBase size=\"sm\" ref={ref}>\n        {props.children}\n      </CloseButtonBase>\n    </ChakraDialog.CloseTrigger>\n  )\n})\n\nexport const CloseTrigger = ChakraDialog.CloseTrigger\n\nexport type RootProps = ChakraDialog.RootProps\n\nexport const Root = ChakraDialog.Root\nexport const Context = ChakraDialog.Context\nexport const Footer = ChakraDialog.Footer\nexport const Header = ChakraDialog.Header\nexport const Body = ChakraDialog.Body\nexport const Backdrop = ChakraDialog.Backdrop\nexport const Title = ChakraDialog.Title\nexport const Description = ChakraDialog.Description\nexport const Trigger = ChakraDialog.Trigger\nexport const ActionTrigger = ChakraDialog.ActionTrigger\n",
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'drawer',
    type: 'registry:ui',
    dependencies: ['@ark-ui'],
    registryDependencies: ['../close-button/index.ts'],
    files: [
      {
        path: 'drawer',
        content:
          "'use client'\n\nimport { forwardRef } from 'react'\n\nimport { DialogContext } from '@ark-ui/react/dialog'\nimport { Drawer as ChakraDrawer, Portal } from '@chakra-ui/react'\n\nimport { CloseButton as CloseButtonBase } from '../close-button/index.ts'\n\nexport interface ContentProps extends ChakraDrawer.ContentProps {\n  portalled?: boolean\n  portalRef?: React.RefObject<HTMLElement>\n  offset?: ChakraDrawer.ContentProps['padding']\n}\n\nexport const Content = forwardRef<HTMLDivElement, ContentProps>(\n  function DrawerContent(props, ref) {\n    const { children, portalled = true, portalRef, offset, ...rest } = props\n    return (\n      <Portal disabled={!portalled} container={portalRef}>\n        <ChakraDrawer.Positioner padding={offset}>\n          <ChakraDrawer.Content ref={ref} {...rest} asChild={false}>\n            {children}\n          </ChakraDrawer.Content>\n        </ChakraDrawer.Positioner>\n      </Portal>\n    )\n  },\n)\n\nexport const CloseButton = forwardRef<\n  HTMLButtonElement,\n  ChakraDrawer.CloseTriggerProps\n>(function DrawerCloseTrigger(props, ref) {\n  const { children, ...rest } = props\n  return (\n    <ChakraDrawer.CloseTrigger {...rest} asChild>\n      <CloseButtonBase size=\"sm\" ref={ref}>\n        {children}\n      </CloseButtonBase>\n    </ChakraDrawer.CloseTrigger>\n  )\n})\n\nexport const CloseTrigger = ChakraDrawer.CloseTrigger\nexport const Trigger = ChakraDrawer.Trigger\nexport const Root = ChakraDrawer.Root\nexport const Footer = ChakraDrawer.Footer\nexport const Header = ChakraDrawer.Header\nexport const Body = ChakraDrawer.Body\nexport const Backdrop = ChakraDrawer.Backdrop\nexport const Description = ChakraDrawer.Description\nexport const Title = ChakraDrawer.Title\nexport const ActionTrigger = ChakraDrawer.ActionTrigger\nexport const Context = DialogContext\n\nexport type RootProps = ChakraDrawer.RootProps\n",
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'empty-state',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: [],
    files: [
      {
        path: 'empty-state',
        content:
          "'use client'\n\nimport { forwardRef } from 'react'\n\nimport {\n  Box,\n  type BoxProps,\n  EmptyState as ChakraEmptyState,\n  useEmptyStateStyles,\n} from '@chakra-ui/react'\n\nexport interface EmptyStateProps extends ChakraEmptyState.RootProps {\n  title: string\n  description?: React.ReactNode\n  icon?: React.ReactNode\n}\n\nconst EmptyStateActions = (props: BoxProps) => {\n  const { actions } = useEmptyStateStyles()\n  return <Box {...props} css={[actions, props.css]} />\n}\n\nexport const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(\n  function EmptyState(props, ref) {\n    const { title, description, icon, children, ...rest } = props\n\n    const as = typeof description === 'string' ? 'p' : 'div'\n\n    return (\n      <ChakraEmptyState.Root ref={ref} {...rest}>\n        <ChakraEmptyState.Content>\n          {icon && (\n            <ChakraEmptyState.Indicator>{icon}</ChakraEmptyState.Indicator>\n          )}\n\n          <ChakraEmptyState.Title>{title}</ChakraEmptyState.Title>\n          {description ? (\n            <ChakraEmptyState.Description as={as}>\n              {description}\n            </ChakraEmptyState.Description>\n          ) : null}\n\n          <EmptyStateActions>{children}</EmptyStateActions>\n        </ChakraEmptyState.Content>\n      </ChakraEmptyState.Root>\n    )\n  },\n)\n",
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'file-upload',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: ['../button/index.ts', '../close-button/index.ts'],
    files: [
      {
        path: 'file-upload',
        content:
          "'use client'\n\nimport * as React from 'react'\n\nimport {\n  FileUpload as ChakraFileUpload,\n  useFileUploadContext,\n} from '@chakra-ui/react/file-upload'\nimport { Span } from '@chakra-ui/react/span'\nimport { type RecipeProps, useRecipe } from '@chakra-ui/react/styled-system'\n\nimport { Button, type ButtonProps } from '../button/index.ts'\nimport { CloseButton } from '../close-button/index.ts'\n\nexport interface RootProps extends ChakraFileUpload.RootProps {\n  inputProps?: React.InputHTMLAttributes<HTMLInputElement>\n}\n\nexport const Root = React.forwardRef<HTMLInputElement, RootProps>(\n  function FileUploadRoot(props, ref) {\n    const { children, inputProps, ...rest } = props\n    return (\n      <ChakraFileUpload.Root {...rest}>\n        <ChakraFileUpload.HiddenInput ref={ref} {...inputProps} />\n        {children}\n      </ChakraFileUpload.Root>\n    )\n  },\n)\n\nexport interface DropzoneProps extends ChakraFileUpload.DropzoneProps {}\n\nexport const Dropzone = React.forwardRef<HTMLInputElement, DropzoneProps>(\n  function FileUploadDropzone(props, ref) {\n    const { children, ...rest } = props\n    return (\n      <ChakraFileUpload.Dropzone ref={ref} {...rest}>\n        <ChakraFileUpload.DropzoneContent>\n          {children}\n        </ChakraFileUpload.DropzoneContent>\n      </ChakraFileUpload.Dropzone>\n    )\n  },\n)\n\ninterface VisibilityProps {\n  showSize?: boolean\n  clearable?: boolean\n}\n\ninterface ItemProps extends VisibilityProps {\n  file: File\n  icon?: React.ReactNode\n}\n\nconst Item = React.forwardRef<HTMLLIElement, ItemProps>(\n  function FileUploadItem(props, ref) {\n    const { file, showSize, icon, clearable } = props\n    return (\n      <ChakraFileUpload.Item file={file} ref={ref}>\n        <ChakraFileUpload.ItemPreview>{icon}</ChakraFileUpload.ItemPreview>\n\n        {showSize ? (\n          <ChakraFileUpload.ItemContent>\n            <ChakraFileUpload.ItemName />\n            <ChakraFileUpload.ItemSizeText />\n          </ChakraFileUpload.ItemContent>\n        ) : (\n          <ChakraFileUpload.ItemName flex=\"1\" />\n        )}\n\n        {clearable && (\n          <ChakraFileUpload.ItemDeleteTrigger asChild>\n            <CloseButton size=\"xs\" />\n          </ChakraFileUpload.ItemDeleteTrigger>\n        )}\n      </ChakraFileUpload.Item>\n    )\n  },\n)\n\ninterface ListProps extends VisibilityProps, ChakraFileUpload.ItemGroupProps {\n  files?: File[]\n}\n\nexport const List = React.forwardRef<HTMLUListElement, ListProps>(\n  function FileUploadList(props, ref) {\n    const { showSize, clearable, files, ...rest } = props\n\n    const fileUpload = useFileUploadContext()\n    const acceptedFiles = files ?? fileUpload.acceptedFiles\n\n    if (acceptedFiles.length === 0) return null\n\n    return (\n      <ChakraFileUpload.ItemGroup ref={ref} {...rest}>\n        {acceptedFiles.map((file: File) => (\n          <Item\n            key={file.name}\n            file={file}\n            showSize={showSize}\n            clearable={clearable}\n          />\n        ))}\n      </ChakraFileUpload.ItemGroup>\n    )\n  },\n)\n\ntype Assign<T, U> = Omit<T, keyof U> & U\n\nexport interface InputProps extends Assign<ButtonProps, RecipeProps<'input'>> {\n  placeholder?: React.ReactNode\n}\n\nexport const Input = React.forwardRef<HTMLButtonElement, InputProps>(\n  function FileInput(props, ref) {\n    const inputRecipe = useRecipe({ key: 'input' })\n    const [recipeProps, restProps] = inputRecipe.splitVariantProps(props)\n    const { placeholder = 'Select file(s)', ...rest } = restProps\n    return (\n      <ChakraFileUpload.Trigger asChild>\n        <Button\n          unstyled\n          py=\"0\"\n          ref={ref}\n          {...rest}\n          css={[inputRecipe(recipeProps), props.css]}\n        >\n          <ChakraFileUpload.Context>\n            {({ acceptedFiles }) => {\n              if (acceptedFiles.length === 1) {\n                return <span>{acceptedFiles[0].name}</span>\n              }\n              if (acceptedFiles.length > 1) {\n                return <span>{acceptedFiles.length} files</span>\n              }\n              return <Span color=\"fg.subtle\">{placeholder}</Span>\n            }}\n          </ChakraFileUpload.Context>\n        </Button>\n      </ChakraFileUpload.Trigger>\n    )\n  },\n)\n\nexport const Label = ChakraFileUpload.Label\nexport const ClearTrigger = ChakraFileUpload.ClearTrigger\nexport const Trigger = ChakraFileUpload.Trigger\nexport const Context = ChakraFileUpload.Context\n",
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'grid-list',
    type: 'registry:ui',
    dependencies: ['@saas-ui'],
    registryDependencies: ['../../types.ts', './grid-list.context.ts'],
    files: [
      {
        path: 'grid-list',
        content:
          "'use client'\n\nimport type { HTMLChakraProps } from '@chakra-ui/react/styled-system'\nimport type { GridListVariantProps } from '@saas-ui/chakra-preset/slot-recipes/grid-list'\nimport { GridList } from '@saas-ui/core/grid-list'\n\nimport type { SlotRecipeProps } from '../../types.ts'\nimport { withContext, withProvider } from './grid-list.context.ts'\n\ninterface GridListRootProps\n  extends HTMLChakraProps<'div'>,\n    SlotRecipeProps<'suiGridList', GridListVariantProps> {}\n\nconst GridListRoot = withProvider<HTMLDivElement, GridListRootProps>(\n  GridList.Root,\n  'root',\n)\n\ninterface GridListItemProps extends HTMLChakraProps<'div'> {}\n\nconst GridListItem = withContext<HTMLDivElement, GridListItemProps>(\n  GridList.Item,\n  'item',\n)\n\ninterface GridListHeaderProps extends HTMLChakraProps<'header'> {}\n\nconst GridListHeader = withContext<HTMLDivElement, GridListHeaderProps>(\n  GridList.Header,\n  'header',\n)\n\ninterface GridListCellProps extends HTMLChakraProps<'div'> {}\n\nconst GridListCell = withContext<HTMLDivElement, GridListCellProps>(\n  GridList.Cell,\n  'cell',\n)\n\nexport {\n  GridListRoot as Root,\n  GridListItem as Item,\n  GridListHeader as Header,\n  GridListCell as Cell,\n}\n\nexport type {\n  GridListRootProps as RootProps,\n  GridListHeaderProps as HeaderProps,\n  GridListItemProps as ItemProps,\n  GridListCellProps as CellProps,\n}\n",
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'hover-card',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: [],
    files: [
      {
        path: 'hover-card',
        content:
          "'use client'\n\nimport * as React from 'react'\n\nimport { HoverCard } from '@chakra-ui/react/hover-card'\nimport { Portal } from '@chakra-ui/react/portal'\n\ninterface ContentProps extends HoverCard.ContentProps {\n  portalled?: boolean\n  portalRef?: React.RefObject<HTMLElement>\n}\n\nexport const Content = React.forwardRef<HTMLDivElement, ContentProps>(\n  function HoverCardContent(props, ref) {\n    const { portalled = true, portalRef, ...rest } = props\n\n    return (\n      <Portal disabled={!portalled} container={portalRef}>\n        <HoverCard.Positioner>\n          <HoverCard.Content ref={ref} {...rest} />\n        </HoverCard.Positioner>\n      </Portal>\n    )\n  },\n)\n\nexport const Arrow = React.forwardRef<HTMLDivElement, HoverCard.ArrowProps>(\n  function HoverCardArrow(props, ref) {\n    return (\n      <HoverCard.Arrow ref={ref} {...props}>\n        <HoverCard.ArrowTip />\n      </HoverCard.Arrow>\n    )\n  },\n)\n\nexport const Root = HoverCard.Root\nexport const Trigger = HoverCard.Trigger\n",
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'icon-badge',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: [],
    files: [
      {
        path: 'icon-badge',
        content:
          "'use client'\n\nimport * as React from 'react'\nimport { cloneElement, isValidElement } from 'react'\n\nimport {\n  type HTMLChakraProps,\n  RecipeProps,\n  chakra,\n  useRecipe,\n} from '@chakra-ui/react/styled-system'\nimport { cx } from '@saas-ui/core/utils'\n\n////////////////////////////////////////////////////////////////////////////////////\n\nexport interface IconBadgeProps\n  extends HTMLChakraProps<'div'>,\n    RecipeProps<'suiIconBadge'> {\n  /**\n   * The icon to display\n   */\n  icon?: React.ReactNode\n\n  /**\n   * A11y: A label that describes the icon\n   */\n  'aria-label'?: string\n}\n\nexport const IconBadge = React.forwardRef<HTMLDivElement, IconBadgeProps>(\n  (props, ref) => {\n    const { icon, children, ...rest } = props\n    const recipe = useRecipe({ key: 'suiIconBadge', recipe: props.recipe })\n    const [variantProps, localProps] = recipe.splitVariantProps(rest)\n    const styles = recipe(variantProps)\n\n    /**\n     * Passing the icon as prop or children should work\n     */\n    const element = icon || children\n    const _children = isValidElement(element)\n      ? cloneElement(element as any, {\n          'aria-hidden': true,\n          focusable: false,\n        })\n      : null\n\n    return (\n      <chakra.div\n        ref={ref}\n        {...localProps}\n        css={[styles, props.css]}\n        className={cx(recipe.className, props.className)}\n      >\n        {_children}\n      </chakra.div>\n    )\n  },\n)\n",
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'icon-button',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: ['../button/index.ts'],
    files: [
      {
        path: 'icon-button',
        content:
          "'use client'\n\nimport { forwardRef } from 'react'\n\nimport { Button, type ButtonProps } from '../button/index.ts'\n\nexport interface IconButtonProps extends ButtonProps {}\n\nexport const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(\n  function IconButton(props, ref) {\n    return (\n      <Button\n        px=\"0\"\n        py=\"0\"\n        _icon={{ fontSize: '1.2em' }}\n        ref={ref}\n        {...props}\n      />\n    )\n  },\n)\n",
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'icons',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: ['./create-icon.tsx'],
    files: [
      {
        path: 'icons',
        content:
          'import { createIcon } from \'./create-icon.tsx\'\n\nexport const ChevronUpIcon = createIcon({\n  displayName: \'ChevronUpIcon\',\n  path: <polyline points="18 15 12 9 6 15"></polyline>,\n})\n\nexport const ChevronDownIcon = createIcon({\n  displayName: \'ChevronDownIcon\',\n  path: <polyline points="6 9 12 15 18 9"></polyline>,\n})\n\nexport const ChevronLeftIcon = createIcon({\n  displayName: \'ChevronLeftIcon\',\n  path: <polyline points="15 18 9 12 15 6"></polyline>,\n})\n\nexport const ChevronRightIcon = createIcon({\n  displayName: \'ChevronRightIcon\',\n  path: <polyline points="9 18 15 12 9 6"></polyline>,\n})\n\nexport const HamburgerIcon = createIcon({\n  displayName: \'ChevronDownIcon\',\n  path: (\n    <g fill="none">\n      <line x1="3" y1="12" x2="21" y2="12"></line>\n      <line x1="3" y1="6" x2="21" y2="6"></line>\n      <line x1="3" y1="18" x2="21" y2="18"></line>\n    </g>\n  ),\n})\n\nexport const CloseIcon = createIcon({\n  displayName: \'CloseIcon\',\n  path: (\n    <g>\n      <line x1="18" y1="6" x2="6" y2="18"></line>\n      <line x1="6" y1="6" x2="18" y2="18"></line>\n    </g>\n  ),\n})\n\nexport const FilterIcon = createIcon({\n  displayName: \'FilterIcon\',\n  path: (\n    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>\n  ),\n})\n\nexport const CalendarIcon = createIcon({\n  displayName: \'CalendarIcon\',\n  path: (\n    <g>\n      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>\n      <line x1="16" y1="2" x2="16" y2="6"></line>\n      <line x1="8" y1="2" x2="8" y2="6"></line>\n      <line x1="3" y1="10" x2="21" y2="10"></line>\n    </g>\n  ),\n})\n\nexport const PlusIcon = createIcon({\n  displayName: \'PlusIcon\',\n  path: (\n    <g>\n      <line x1="12" y1="5" x2="12" y2="19"></line>\n      <line x1="5" y1="12" x2="19" y2="12"></line>\n    </g>\n  ),\n})\n\nexport const MinusIcon = createIcon({\n  displayName: \'MinusIcon\',\n  path: (\n    <g>\n      <line x1="5" y1="12" x2="19" y2="12"></line>\n    </g>\n  ),\n})\n\nexport const ViewOffIcon = createIcon({\n  displayName: \'ViewOffIcon\',\n  path: (\n    <g>\n      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>\n      <line x1="1" y1="1" x2="23" y2="23"></line>\n    </g>\n  ),\n})\n\nexport const ViewIcon = createIcon({\n  displayName: \'ViewOffIcon\',\n  path: (\n    <g>\n      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>\n      <circle cx="12" cy="12" r="3"></circle>\n    </g>\n  ),\n})\n\nexport const SearchIcon = createIcon({\n  displayName: \'SearchIcon\',\n  path: (\n    <g>\n      <circle cx="11" cy="11" r="8"></circle>\n      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>\n    </g>\n  ),\n})\n\nexport const CheckIcon = createIcon({\n  displayName: \'CheckIcon\',\n  path: (\n    <g>\n      <polyline points="20 6 9 17 4 12"></polyline>\n    </g>\n  ),\n})\n\nexport const EllipsisIcon = createIcon({\n  displayName: \'EllipsisIcon\',\n  path: (\n    <g>\n      <circle cx="12" cy="12" r="1" />\n      <circle cx="19" cy="12" r="1" />\n      <circle cx="5" cy="12" r="1" />\n    </g>\n  ),\n})\n\nexport const CopyIcon = createIcon({\n  displayName: \'CopyIcon\',\n  path: (\n    <g>\n      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />\n      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />\n    </g>\n  ),\n})\n\nexport const InfoIcon = createIcon({\n  displayName: \'InfoIcon\',\n  path: (\n    <g>\n      <circle cx="12" cy="12" r="10" />\n      <path d="M12 16v-4" />\n      <path d="M12 8h.01" />\n    </g>\n  ),\n})\n\nexport const ArrowLeftIcon = createIcon({\n  displayName: \'ArrowLeftIcon\',\n  path: (\n    <>\n      <line x1="19" y1="12" x2="5" y2="12"></line>\n      <polyline points="12 19 5 12 12 5"></polyline>\n    </>\n  ),\n})\n\nexport const EyeIcon = createIcon({\n  displayName: \'EyeIcon\',\n  path: (\n    <g>\n      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />\n      <circle cx="12" cy="12" r="3" />\n    </g>\n  ),\n})\n\nexport const EyeOffIcon = createIcon({\n  displayName: \'EyeOffIcon\',\n  path: (\n    <g>\n      <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />\n      <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />\n      <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />\n      <path d="m2 2 20 20" />\n    </g>\n  ),\n})\n',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'info-tip',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: [
      '../icon-button/index.ts',
      '../icons/index.ts',
      '../toggle-tip/index.ts',
    ],
    files: [
      {
        path: 'info-tip',
        content:
          "'use client'\n\nimport * as React from 'react'\n\nimport { IconButton } from '../icon-button/index.ts'\nimport { InfoIcon } from '../icons/index.ts'\nimport { ToggleTip, type ToggleTipProps } from '../toggle-tip/index.ts'\n\nexport interface InfoTipProps extends Omit<ToggleTipProps, 'content'> {\n  children: React.ReactNode\n  icon?: React.ReactNode\n  'aria-label'?: string\n}\n\nexport const InfoTip = React.forwardRef<HTMLDivElement, InfoTipProps>(\n  function InfoTip(props, ref) {\n    const { children, icon, 'aria-label': ariaLabel = 'Info', ...rest } = props\n    return (\n      <ToggleTip content={children} {...rest} ref={ref}>\n        <IconButton variant=\"ghost\" aria-label={ariaLabel} size=\"2xs\">\n          {icon ?? <InfoIcon />}\n        </IconButton>\n      </ToggleTip>\n    )\n  },\n)\n",
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'link',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: ['../../provider/use-link.tsx'],
    files: [
      {
        path: 'link',
        content:
          "'use client'\n\nimport React from 'react'\n\nimport { Link as ChakraLink, type LinkProps } from '@chakra-ui/react/link'\n\nimport { useLink } from '../../provider/use-link.tsx'\n\nexport type { LinkProps }\n\n/**\n * Chakra UI `Link` component wrapped in a router specific link component.\n * Falls back to a plain `Link` if no Saas UI context is available or no `linkComponent` is configured\n * The router link component can be configured in `SaasProvider`.\n * @see https://saas-ui.dev/docs/core/getting-started\n */\nexport const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(\n  (props, ref) => {\n    const LinkComponent = useLink()\n\n    return (\n      <ChakraLink asChild>\n        <LinkComponent ref={ref} {...props} />\n      </ChakraLink>\n    )\n  },\n)\n\nLink.displayName = 'Link'\n",
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'loading-overlay',
    type: 'registry:ui',
    dependencies: ['@ark-ui'],
    registryDependencies: [
      '../spinner/index.ts',
      './loading-overlay.context.ts',
    ],
    files: [
      {
        path: 'loading-overlay',
        content:
          "'use client'\n\nimport React, { forwardRef } from 'react'\n\nimport {\n  Presence,\n  type PresenceBaseProps,\n  splitPresenceProps,\n} from '@ark-ui/react/presence'\nimport { HTMLChakraProps, SlotRecipeProps, chakra } from '@chakra-ui/react'\n\nimport { Spinner } from '../spinner/index.ts'\nimport { withContext, withProvider } from './loading-overlay.context.ts'\n\ninterface LoadingOverlayProps\n  extends HTMLChakraProps<'div'>,\n    SlotRecipeProps<'suiLoadingOverlay'>,\n    PresenceBaseProps {\n  /**\n   * Show or hide the LoadingOverlay.\n   * @default true\n   */\n  loading?: boolean\n}\n\nconst LoadingOverlay = forwardRef<HTMLDivElement, LoadingOverlayProps>(\n  (props, ref) => {\n    const { children, loading = true, ...rest } = props\n\n    const [presenceProps, rootProps] = splitPresenceProps(rest)\n\n    return (\n      <Presence present={loading} {...presenceProps} asChild>\n        <chakra.div ref={ref} {...rootProps}>\n          {children}\n        </chakra.div>\n      </Presence>\n    )\n  },\n)\n\nconst LoadingOverlayRoot = withProvider<HTMLDivElement, LoadingOverlayProps>(\n  LoadingOverlay,\n  'root',\n)\n\nLoadingOverlayRoot.displayName = 'LoadingOverlay'\n\nconst LoadingOverlaySpinner = Spinner\n\ninterface LoadingTextProps extends HTMLChakraProps<'p'> {}\n\nconst LoadingOverlayText = withContext<HTMLParagraphElement, LoadingTextProps>(\n  'p',\n  'text',\n)\n\nexport {\n  LoadingOverlayRoot as Root,\n  LoadingOverlaySpinner as Spinner,\n  LoadingOverlayText as Text,\n}\nexport type { LoadingOverlayProps as RootProps, LoadingTextProps as TextProps }\n",
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'menu',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: ['../button/index.ts', '../icons/index.ts'],
    files: [
      {
        path: 'menu',
        content:
          "'use client'\n\nimport { forwardRef } from 'react'\n\nimport { Flex } from '@chakra-ui/react'\nimport { Menu as ChakraMenu } from '@chakra-ui/react/menu'\nimport { Portal } from '@chakra-ui/react/portal'\n\nimport { Button, type ButtonProps } from '../button/index.ts'\nimport { CheckIcon, ChevronRightIcon } from '../icons/index.ts'\n\ninterface MenuContentProps extends ChakraMenu.ContentProps {\n  portalled?: boolean\n  portalRef?: React.RefObject<HTMLElement>\n}\n\nconst MenuContent = forwardRef<HTMLDivElement, MenuContentProps>(\n  function MenuContent(props, ref) {\n    const { portalled = true, portalRef, ...rest } = props\n    return (\n      <Portal disabled={!portalled} container={portalRef}>\n        <ChakraMenu.Positioner>\n          <ChakraMenu.Content ref={ref} {...rest} />\n        </ChakraMenu.Positioner>\n      </Portal>\n    )\n  },\n)\n\nconst MenuArrow = forwardRef<HTMLDivElement, ChakraMenu.ArrowProps>(\n  function MenuArrow(props, ref) {\n    return (\n      <ChakraMenu.Arrow ref={ref} {...props}>\n        <ChakraMenu.ArrowTip />\n      </ChakraMenu.Arrow>\n    )\n  },\n)\n\ninterface MenuCheckboxItemProps extends ChakraMenu.CheckboxItemProps {\n  startElement?: React.ReactNode\n  endElement?: React.ReactNode\n}\n\nconst MenuCheckboxItem = forwardRef<HTMLDivElement, MenuCheckboxItemProps>(\n  function MenuCheckboxItem(props, ref) {\n    const { children, startElement, endElement, ...rest } = props\n    return (\n      <ChakraMenu.CheckboxItem ref={ref} {...rest}>\n        {startElement}\n        <ChakraMenu.ItemText>{children}</ChakraMenu.ItemText>\n        {endElement}\n      </ChakraMenu.CheckboxItem>\n    )\n  },\n)\n\ninterface MenuRadioItemProps extends ChakraMenu.RadioItemProps {\n  startElement?: React.ReactNode\n  endElement?: React.ReactNode\n}\n\nconst MenuRadioItem = forwardRef<HTMLDivElement, MenuRadioItemProps>(\n  function MenuRadioItem(props, ref) {\n    const { children, startElement, endElement, ...rest } = props\n    return (\n      <ChakraMenu.RadioItem ref={ref} {...rest}>\n        {startElement}\n        <ChakraMenu.ItemText>{children}</ChakraMenu.ItemText>\n        {endElement}\n      </ChakraMenu.RadioItem>\n    )\n  },\n)\n\nconst MenuItemIndicator = forwardRef<\n  HTMLDivElement,\n  ChakraMenu.ItemIndicatorProps\n>(function MenuItemIndicator(props, ref) {\n  const { children = <CheckIcon />, ...rest } = props\n  return (\n    <Flex alignItems=\"center\" justifyContent=\"center\" w=\"4\">\n      <ChakraMenu.ItemIndicator ref={ref} {...rest}>\n        {children}\n      </ChakraMenu.ItemIndicator>\n    </Flex>\n  )\n})\n\nconst MenuItemGroup = forwardRef<HTMLDivElement, ChakraMenu.ItemGroupProps>(\n  function MenuItemGroup(props, ref) {\n    const { title, children, ...rest } = props\n    return (\n      <ChakraMenu.ItemGroup ref={ref} {...rest}>\n        {title && (\n          <ChakraMenu.ItemGroupLabel userSelect=\"none\">\n            {title}\n          </ChakraMenu.ItemGroupLabel>\n        )}\n        {children}\n      </ChakraMenu.ItemGroup>\n    )\n  },\n)\n\ninterface MenuTriggerItemProps extends ChakraMenu.ItemProps {\n  startIcon?: React.ReactNode\n}\n\nconst MenuTriggerItem = forwardRef<HTMLDivElement, MenuTriggerItemProps>(\n  function MenuTriggerItem(props, ref) {\n    const { startIcon, children, ...rest } = props\n    return (\n      <ChakraMenu.TriggerItem ref={ref} {...rest}>\n        {startIcon}\n        {children}\n        <ChevronRightIcon />\n      </ChakraMenu.TriggerItem>\n    )\n  },\n)\n\ninterface MenuButtonProps extends ButtonProps, ChakraMenu.TriggerProps {}\n\nconst MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(\n  function MenuButton(props, ref) {\n    return (\n      <MenuTrigger ref={ref} asChild>\n        <Button {...props} />\n      </MenuTrigger>\n    )\n  },\n)\n\nconst MenuRadioItemGroup = ChakraMenu.RadioItemGroup\nconst MenuContextTrigger = ChakraMenu.ContextTrigger\nconst MenuRoot = ChakraMenu.Root\nconst MenuSeparator = ChakraMenu.Separator\nconst MenuContext = ChakraMenu.Context\n\nconst MenuItem = ChakraMenu.Item\nconst MenuItemText = ChakraMenu.ItemText\nconst MenuItemCommand = ChakraMenu.ItemCommand\nconst MenuTrigger = ChakraMenu.Trigger\n\nexport {\n  MenuRoot as Root,\n  MenuContent as Content,\n  MenuArrow as Arrow,\n  MenuCheckboxItem as CheckboxItem,\n  MenuRadioItem as RadioItem,\n  MenuItemIndicator as ItemIndicator,\n  MenuItemGroup as ItemGroup,\n  MenuTriggerItem as TriggerItem,\n  MenuRadioItemGroup as RadioItemGroup,\n  MenuContextTrigger as ContextTrigger,\n  MenuSeparator as Separator,\n  MenuItem as Item,\n  MenuItemText as ItemText,\n  MenuItemCommand as ItemCommand,\n  MenuTrigger as Trigger,\n  MenuButton as Button,\n  MenuContext as Context,\n}\n\ntype MenuRootProps = ChakraMenu.RootProps\ntype MenuTriggerProps = ChakraMenu.TriggerProps\ntype MenuItemProps = ChakraMenu.ItemProps\n\nexport type {\n  MenuRootProps as RootProps,\n  MenuContentProps as ContentProps,\n  MenuTriggerProps as TriggerProps,\n  MenuTriggerItemProps as TriggerItemProps,\n  MenuItemProps as ItemProps,\n  MenuButtonProps as ButtonProps,\n  MenuRadioItemProps as RadioItemProps,\n}\n",
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'native-select',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: ['../icons/icons.tsx'],
    files: [
      {
        path: 'native-select',
        content:
          "'use client'\n\nimport * as React from 'react'\n\nimport { NativeSelect as Select } from '@chakra-ui/react/native-select'\n\nimport { ChevronDownIcon } from '../icons/icons.tsx'\n\nexport interface NativeSelectProps extends Select.RootProps {\n  icon?: React.ReactNode\n  placeholder?: string\n}\n\nexport const NativeSelect = React.forwardRef<HTMLDivElement, NativeSelectProps>(\n  function NativeSelect(props, ref) {\n    const { icon = <ChevronDownIcon />, placeholder, children, ...rest } = props\n    return (\n      <Select.Root ref={ref} {...rest}>\n        <Select.Field placeholder={placeholder}>\n          {children}\n          <Select.Indicator>{icon}</Select.Indicator>\n        </Select.Field>\n      </Select.Root>\n    )\n  },\n)\n",
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'navbar',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: [
      '../../provider/use-link.tsx',
      './navbar.context.ts',
    ],
    files: [
      {
        path: 'navbar',
        content:
          "'use client'\n\nimport { forwardRef } from 'react'\n\nimport type { HTMLChakraProps, SlotRecipeProps } from '@chakra-ui/react'\nimport { Navbar } from '@saas-ui/core/navbar'\n\nimport { useLink } from '../../provider/use-link.tsx'\nimport { withContext, withProvider } from './navbar.context.ts'\n\ninterface NavbarRootProps\n  extends SlotRecipeProps<'suiNavbar'>,\n    HTMLChakraProps<'div', Navbar.RootProps> {}\n\nconst NavbarRoot = withProvider<HTMLDivElement, NavbarRootProps>(\n  Navbar.Root,\n  'root',\n)\n\nconst NavbarBrand = withContext<HTMLDivElement, HTMLChakraProps<'div'>>(\n  Navbar.Brand,\n  'brand',\n)\n\nconst NavbarContent = withContext<HTMLDivElement, HTMLChakraProps<'div'>>(\n  Navbar.Content,\n  'content',\n)\n\nconst NavbarItemGroup = withContext<HTMLUListElement, HTMLChakraProps<'ul'>>(\n  'ul',\n  'itemGroup',\n)\n\nconst NavbarItem = withContext<\n  HTMLLIElement,\n  HTMLChakraProps<'li', Navbar.ItemProps>\n>(Navbar.Item, 'item')\n\ninterface NavbarLinkProps extends HTMLChakraProps<'a', Navbar.LinkProps> {\n  active?: boolean\n}\n\nconst NavbarLink = withContext<HTMLAnchorElement, NavbarLinkProps>(\n  forwardRef<HTMLAnchorElement, NavbarLinkProps>((props, ref) => {\n    const Link = useLink()\n\n    const { active, ...rest } = props\n\n    return (\n      <Navbar.Link asChild {...rest} ref={ref}>\n        <Link data-active={active ? '' : undefined} {...props} />\n      </Navbar.Link>\n    )\n  }),\n  'link',\n  {\n    forwardAsChild: true,\n  },\n)\n\nexport {\n  NavbarRoot as Root,\n  NavbarContent as Content,\n  NavbarBrand as Brand,\n  NavbarItemGroup as ItemGroup,\n  NavbarItem as Item,\n  NavbarLink as Link,\n}\n\nexport type { NavbarRootProps as RootProps }\n",
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'number-input',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: ['../input-group/index.ts'],
    files: [
      {
        path: 'number-input',
        content:
          "'use client'\n\nimport { forwardRef } from 'react'\n\nimport { NumberInput as ChakraNumberInput } from '@chakra-ui/react/number-input'\n\nimport { InputGroup } from '../input-group/index.ts'\n\nexport interface NumberInputProps\n  extends Omit<ChakraNumberInput.RootProps, 'children'> {\n  rootRef?: React.Ref<HTMLDivElement>\n  hideControls?: boolean\n  startElement?: React.ReactNode\n  endElement?: React.ReactNode\n  inputProps?: React.InputHTMLAttributes<HTMLInputElement>\n}\n\nexport const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(\n  function NumberInput(props, ref) {\n    const {\n      hideControls,\n      startElement,\n      endElement,\n      inputProps,\n      rootRef,\n      ...rest\n    } = props\n    return (\n      <ChakraNumberInput.Root ref={rootRef} {...rest}>\n        <InputGroup\n          startElement={startElement}\n          endElement={endElement}\n          width=\"full\"\n        >\n          <ChakraNumberInput.Input ref={ref} {...inputProps} />\n        </InputGroup>\n\n        {!hideControls && !endElement ? (\n          <ChakraNumberInput.Control>\n            <ChakraNumberInput.IncrementTrigger />\n            <ChakraNumberInput.DecrementTrigger />\n          </ChakraNumberInput.Control>\n        ) : null}\n      </ChakraNumberInput.Root>\n    )\n  },\n)\n",
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'page',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: ['../loading-overlay/index.ts', './page.context.ts'],
    files: [
      {
        path: 'page',
        content:
          "'use client'\n\nimport React, { forwardRef } from 'react'\n\nimport {\n  type HTMLChakraProps,\n  type SlotRecipeProps,\n  chakra,\n} from '@chakra-ui/react'\n\nimport { LoadingOverlay } from '../loading-overlay/index.ts'\nimport {\n  PageProvider,\n  useClassNames,\n  usePageContext,\n  usePageStyles,\n  withContext,\n  withProvider,\n} from './page.context.ts'\n\ninterface PageOptions {\n  children?: React.ReactNode\n  loading?: boolean\n  skeleton?: React.ReactNode\n}\n\ninterface PageRootProps\n  extends PageOptions,\n    HTMLChakraProps<'main'>,\n    SlotRecipeProps<'suiPage'> {}\n\nconst PageRoot = withProvider<HTMLDivElement, PageRootProps>(\n  forwardRef<HTMLDivElement, PageRootProps>(function PageRoot(props, ref) {\n    const { loading, skeleton, children, ...containerProps } = props\n\n    const context = {\n      loading,\n      skeleton,\n    }\n\n    return (\n      <PageProvider value={context}>\n        <chakra.main ref={ref} {...containerProps}>\n          {children}\n        </chakra.main>\n      </PageProvider>\n    )\n  }),\n  'root',\n)\n\ninterface PageHeaderProps\n  extends Omit<HTMLChakraProps<'header'>, 'title' | 'children'> {\n  /**\n   * Page header navigation\n   * Typically breadcrumbs or backbutton.\n   */\n  nav?: React.ReactNode\n  /**\n   * Page header title\n   */\n  title?: React.ReactNode\n  /**\n   * Page header description\n   */\n  description?: React.ReactNode\n  /**\n   * Page header actions, typically a toolbar\n   */\n  actions?: React.ReactNode\n  /**\n   * Page header footer\n   */\n  footer?: React.ReactNode\n}\n\nconst PageHeader = withContext<HTMLDivElement, PageHeaderProps>(\n  forwardRef<HTMLDivElement, PageHeaderProps>(function PageHeader(props, ref) {\n    const { nav, title, description, actions, footer, css, ...rest } = props\n\n    const styles = usePageStyles()\n    const classNames = useClassNames()\n\n    let heading\n    if (title || description) {\n      heading = (\n        <chakra.div\n          gridArea=\"heading\"\n          className={classNames.heading}\n          css={styles.heading}\n        >\n          {typeof title === 'string' ? <PageTitle>{title}</PageTitle> : title}\n          {typeof description === 'string' ? (\n            <PageDescription>{description}</PageDescription>\n          ) : (\n            description\n          )}\n        </chakra.div>\n      )\n    }\n\n    return (\n      <chakra.header ref={ref} css={css} {...rest} className={props.className}>\n        {React.isValidElement(nav)\n          ? React.cloneElement(nav, {\n              gridArea: 'nav',\n            } as any)\n          : null}\n        {heading}\n        {React.isValidElement(actions)\n          ? React.cloneElement(actions, {\n              gridArea: 'actions',\n            } as any)\n          : null}\n\n        {React.isValidElement(footer)\n          ? React.cloneElement(footer, {\n              gridArea: 'footer',\n            } as any)\n          : null}\n      </chakra.header>\n    )\n  }),\n  'header',\n)\n\nconst PageHeaderSection = withContext<HTMLDivElement, HTMLChakraProps<'div'>>(\n  'div',\n  'section',\n)\n\nconst PageTitle = withContext<HTMLDivElement, HTMLChakraProps<'h2'>>(\n  'h2',\n  'title',\n)\n\nconst PageDescription = withContext<HTMLDivElement, HTMLChakraProps<'div'>>(\n  'div',\n  'description',\n)\n\ninterface PageBodyProps extends HTMLChakraProps<'div'> {}\n\nconst PageBody = withContext<HTMLDivElement, PageBodyProps>(\n  forwardRef<HTMLDivElement, PageBodyProps>((props, ref) => {\n    const { children, ...rest } = props\n\n    const { loading, skeleton } = usePageContext()\n\n    let content = children\n    if (loading) {\n      content = skeleton || (\n        <LoadingOverlay.Root>\n          <LoadingOverlay.Spinner />\n        </LoadingOverlay.Root>\n      )\n    }\n\n    return (\n      <chakra.div ref={ref} {...rest}>\n        {content}\n      </chakra.div>\n    )\n  }),\n  'body',\n)\n\nPageBody.displayName = 'PageBody'\n\nexport {\n  PageRoot as Root,\n  PageBody as Body,\n  PageHeader as Header,\n  PageHeaderSection as HeaderSection,\n  PageTitle as Title,\n  PageDescription as Description,\n}\nexport type {\n  PageRootProps as RootProps,\n  PageBodyProps as BodyProps,\n  PageHeaderProps as HeaderProps,\n}\n",
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'pagination',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: [
      '../button/index.ts',
      '../icon-button/index.ts',
      '../icons/icons.tsx',
    ],
    files: [
      {
        path: 'pagination',
        content:
          "'use client'\n\nimport { forwardRef, useMemo } from 'react'\n\nimport {\n  Pagination as ChakraPagination,\n  usePaginationContext,\n} from '@chakra-ui/react/pagination'\nimport { Text, type TextProps } from '@chakra-ui/react/text'\nimport { createContext } from '@saas-ui/core/utils'\n\nimport { Button, type ButtonProps } from '../button/index.ts'\nimport { IconButton } from '../icon-button/index.ts'\nimport {\n  ChevronLeftIcon,\n  ChevronRightIcon,\n  EllipsisIcon,\n} from '../icons/icons.tsx'\n\ninterface ButtonVariantMap {\n  current: ButtonProps['variant']\n  default: ButtonProps['variant']\n  ellipsis: ButtonProps['variant']\n}\n\ntype PaginationVariant = 'outline' | 'solid' | 'subtle'\n\ninterface ButtonVariantContext {\n  size: ButtonProps['size']\n  variantMap: ButtonVariantMap\n}\n\nconst [RootPropsProvider, useRootProps] = createContext<ButtonVariantContext>({\n  name: 'RootPropsProvider',\n})\n\nexport interface RootProps extends Omit<ChakraPagination.RootProps, 'type'> {\n  size?: ButtonProps['size']\n  variant?: PaginationVariant\n}\n\nconst variantMap: Record<PaginationVariant, ButtonVariantMap> = {\n  outline: { default: 'ghost', ellipsis: 'plain', current: 'outline' },\n  solid: { default: 'outline', ellipsis: 'outline', current: 'solid' },\n  subtle: { default: 'ghost', ellipsis: 'plain', current: 'subtle' },\n}\n\nexport const Root = forwardRef<HTMLDivElement, RootProps>(\n  function PaginationRoot(props, ref) {\n    const { size = 'sm', variant = 'outline', ...rest } = props\n    return (\n      <RootPropsProvider value={{ size, variantMap: variantMap[variant] }}>\n        <ChakraPagination.Root ref={ref} type=\"button\" {...rest} />\n      </RootPropsProvider>\n    )\n  },\n)\n\nexport const Ellipsis = forwardRef<\n  HTMLDivElement,\n  ChakraPagination.EllipsisProps\n>(function PaginationEllipsis(props, ref) {\n  const { size, variantMap } = useRootProps()\n  return (\n    <ChakraPagination.Ellipsis ref={ref} {...props} asChild>\n      <Button as=\"span\" variant={variantMap.ellipsis} size={size}>\n        {props.children ?? <EllipsisIcon />}\n      </Button>\n    </ChakraPagination.Ellipsis>\n  )\n})\n\nexport const Item = forwardRef<HTMLButtonElement, ChakraPagination.ItemProps>(\n  function PaginationItem(props, ref) {\n    const { page } = usePaginationContext()\n    const { size, variantMap } = useRootProps()\n\n    const current = page === props.value\n    const variant = current ? variantMap.current : variantMap.default\n\n    return (\n      <ChakraPagination.Item ref={ref} {...props} asChild>\n        <Button variant={variant} size={size}>\n          {props.value}\n        </Button>\n      </ChakraPagination.Item>\n    )\n  },\n)\n\nexport const PrevButton = forwardRef<\n  HTMLButtonElement,\n  ChakraPagination.PrevTriggerProps\n>(function PaginationPrevTrigger(props, ref) {\n  const { size, variantMap } = useRootProps()\n\n  return (\n    <ChakraPagination.PrevTrigger ref={ref} asChild {...props}>\n      <IconButton variant={variantMap.default} size={size}>\n        {props.children ?? <ChevronLeftIcon />}\n      </IconButton>\n    </ChakraPagination.PrevTrigger>\n  )\n})\n\nexport const NextButton = forwardRef<\n  HTMLButtonElement,\n  ChakraPagination.NextTriggerProps\n>(function PaginationNextTrigger(props, ref) {\n  const { size, variantMap } = useRootProps()\n\n  return (\n    <ChakraPagination.NextTrigger ref={ref} asChild {...props}>\n      <IconButton variant={variantMap.default} size={size}>\n        {props.children ?? <ChevronRightIcon />}\n      </IconButton>\n    </ChakraPagination.NextTrigger>\n  )\n})\n\nexport const Items = (props: React.HTMLAttributes<HTMLElement>) => {\n  return (\n    <ChakraPagination.Context>\n      {({ pages }) =>\n        pages.map((page, index) => {\n          return page.type === 'ellipsis' ? (\n            <Ellipsis key={index} index={index} {...props} />\n          ) : (\n            <Item key={index} type=\"page\" value={page.value} {...props} />\n          )\n        })\n      }\n    </ChakraPagination.Context>\n  )\n}\n\nexport interface PageTextProps extends TextProps {\n  format?: 'short' | 'compact' | 'long'\n}\n\nexport const PageText = forwardRef<HTMLParagraphElement, PageTextProps>(\n  function PaginationPageText(props, ref) {\n    const { format = 'compact', ...rest } = props\n    const { page, pages, pageRange, count } = usePaginationContext()\n    const content = useMemo(() => {\n      if (format === 'short') return `${page} / ${pages.length}`\n      if (format === 'compact') return `${page} of ${pages.length}`\n      return `${pageRange.start + 1} - ${pageRange.end} of ${count}`\n    }, [format, page, pages.length, pageRange, count])\n\n    return (\n      <Text fontWeight=\"medium\" ref={ref} {...rest}>\n        {content}\n      </Text>\n    )\n  },\n)\n\nexport const PrevTrigger = ChakraPagination.PrevTrigger\nexport const NextTrigger = ChakraPagination.NextTrigger\nexport const Context = ChakraPagination.Context\n",
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'password-input',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: [
      '../icon-button/index.ts',
      '../icons/icons.tsx',
      '../input-group/index.ts',
      '../input/index.ts',
    ],
    files: [
      {
        path: 'password-input',
        content:
          "'use client'\n\nimport { forwardRef, useRef } from 'react'\n\nimport { mergeRefs, useControllableState } from '@chakra-ui/react'\n\nimport { IconButton, type IconButtonProps } from '../icon-button/index.ts'\nimport { EyeIcon, EyeOffIcon } from '../icons/icons.tsx'\nimport { InputGroup, type InputGroupProps } from '../input-group/index.ts'\nimport { Input, type InputProps } from '../input/index.ts'\n\nexport interface PasswordInputProps\n  extends InputProps,\n    PasswordVisibilityProps {\n  rootProps?: InputGroupProps\n}\n\nexport const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(\n  function PasswordInput(props, ref) {\n    const {\n      rootProps,\n      defaultVisible,\n      visible: visibleProp,\n      onVisibleChange,\n      visibilityIcon = { on: <EyeIcon />, off: <EyeOffIcon /> },\n      ...rest\n    } = props\n\n    const [visible, setVisible] = useControllableState({\n      value: visibleProp,\n      defaultValue: defaultVisible || false,\n      onChange: onVisibleChange,\n    })\n\n    const inputRef = useRef<HTMLInputElement>(null)\n\n    return (\n      <InputGroup\n        width=\"full\"\n        endElement={\n          <VisibilityTrigger\n            disabled={rest.disabled}\n            onPointerDown={(e) => {\n              if (rest.disabled) return\n              if (e.button !== 0) return\n              e.preventDefault()\n              setVisible(!visible)\n            }}\n          >\n            {visible ? visibilityIcon.off : visibilityIcon.on}\n          </VisibilityTrigger>\n        }\n        {...rootProps}\n      >\n        <Input\n          {...rest}\n          ref={mergeRefs(ref, inputRef)}\n          type={visible ? 'text' : 'password'}\n        />\n      </InputGroup>\n    )\n  },\n)\n\nexport interface PasswordVisibilityProps {\n  defaultVisible?: boolean\n  visible?: boolean\n  onVisibleChange?: (visible: boolean) => void\n  visibilityIcon?: { on: React.ReactNode; off: React.ReactNode }\n}\n\nconst VisibilityTrigger = forwardRef<HTMLButtonElement, IconButtonProps>(\n  function VisibilityTrigger(props, ref) {\n    return (\n      <IconButton\n        tabIndex={-1}\n        ref={ref}\n        me=\"-2\"\n        aspectRatio=\"square\"\n        size=\"sm\"\n        variant=\"ghost\"\n        colorPalette=\"gray\"\n        height=\"calc(100% - {spacing.2})\"\n        aria-label=\"Toggle password visibility\"\n        {...props}\n      />\n    )\n  },\n)\n",
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'persona',
    type: 'registry:ui',
    dependencies: ['@saas-ui'],
    registryDependencies: [
      '../avatar/avatar.tsx',
      './persona.context.ts',
      './presence.ts',
    ],
    files: [
      {
        path: 'persona',
        content:
          "'use client'\n\nimport React, { forwardRef, useMemo } from 'react'\n\nimport {\n  AvatarPropsProvider,\n  HTMLChakraProps,\n  type ImageProps,\n  type SlotRecipeProps,\n  chakra,\n  mergeProps,\n} from '@chakra-ui/react'\nimport type { PersonaVariantProps } from '@saas-ui/chakra-preset/slot-recipes/persona'\nimport { dataAttr } from '@saas-ui/core/utils'\nimport { cx } from '@saas-ui/core/utils'\n\nimport { Avatar, type AvatarProps } from '../avatar/avatar.tsx'\nimport {\n  ClassNamesProvider,\n  StylesProvider,\n  usePropsContext,\n  useRecipeResult,\n  withContext,\n} from './persona.context.ts'\nimport type { PersonaPresence } from './presence.ts'\n\ninterface PersonaRootProps\n  extends HTMLChakraProps<'div'>,\n    SlotRecipeProps<'suiPersona'>,\n    PersonaVariantProps {\n  /**\n   * Indicates that a person is out of office. Changes the presence badge style.\n   */\n  outOfOffice?: boolean\n  /**\n   * The presence status of the person\n   */\n  presence?: PersonaPresence\n}\n\n/**\n * The root component that provides context and styles.\n *\n * @see Docs https://saas-ui.dev/docs/components/persona\n */\nconst PersonaRoot = forwardRef<HTMLDivElement, PersonaRootProps>(\n  (props, ref) => {\n    const propsContext = usePropsContext()\n\n    const mergedProps = useMemo(\n      () => mergeProps(propsContext, props),\n      [propsContext, props],\n    )\n\n    const {\n      styles,\n      props: rootProps,\n      classNames,\n    } = useRecipeResult(mergedProps)\n\n    const className = classNames['root']\n\n    const { outOfOffice, presence, ...rest } = rootProps\n\n    return (\n      <StylesProvider value={styles}>\n        <ClassNamesProvider value={classNames}>\n          <AvatarPropsProvider\n            value={{\n              size: props.size,\n            }}\n          >\n            <chakra.div\n              ref={ref}\n              {...rest}\n              data-out-of-office={dataAttr(outOfOffice)}\n              data-presence={presence}\n              css={[\n                presence\n                  ? {\n                      '--persona-presence': `colors.presence.${presence}`,\n                    }\n                  : undefined,\n                styles['root'],\n                rest.css,\n              ]}\n              className={cx(className, rest.className)}\n            />\n          </AvatarPropsProvider>\n        </ClassNamesProvider>\n      </StylesProvider>\n    )\n  },\n)\n\ninterface PersonaAvatarOptions {\n  /**\n   * The name of the person in the avatar.\n   *\n   * - if `src` has loaded, the name will be used as the `alt` attribute of the `img`\n   * - If `src` is not loaded, the name will be used to create the initials\n   */\n  name?: string\n}\n\ninterface PersonaAvatarProps extends PersonaAvatarOptions, AvatarProps {\n  src?: string\n  srcSet?: string\n  loading?: ImageProps['loading']\n  icon?: React.ReactElement\n  fallback?: React.ReactNode\n  getInitials?: (name?: string | null) => string | null\n}\n\n/**\n * An avatar with optional status badge.\n *\n * @see Docs https://saas-ui.dev/docs/components/persona\n */\nconst PersonaAvatar = forwardRef<HTMLDivElement, PersonaAvatarProps>(\n  (props, ref) => {\n    const { children, ...rest } = props\n\n    return (\n      <Avatar ref={ref} {...rest}>\n        {children}\n      </Avatar>\n    )\n  },\n)\n\ninterface PersonaPresenceBadgeProps extends HTMLChakraProps<'span'> {}\n\nconst PersonaPresenceBadge = withContext<\n  HTMLSpanElement,\n  PersonaPresenceBadgeProps\n>('span', 'presence')\n\ninterface PersonaDetailsProps extends HTMLChakraProps<'div'> {}\n\n/**\n * Wrapper component for the labels.\n *\n * @see Docs https://saas-ui.dev/docs/components/persona\n */\nconst PersonaDetails = withContext<HTMLDivElement, PersonaDetailsProps>(\n  'div',\n  'details',\n)\n\ninterface PersonaLabelProps extends HTMLChakraProps<'span'> {}\n\n/**\n * The main label, usually a name.\n *\n * @see Docs https://saas-ui.dev/docs/components/persona\n */\nconst PersonaLabel = withContext<HTMLSpanElement, PersonaLabelProps>(\n  'span',\n  'label',\n)\n\nPersonaLabel.displayName = 'PersonaLabel'\n\n/**\n * The secondary label, usually the role of a person.\n *\n * @see Docs https://saas-ui.dev/docs/components/persona\n */\nconst PersonaSecondaryLabel = withContext<HTMLSpanElement, PersonaLabelProps>(\n  'span',\n  'secondaryLabel',\n)\n\n/**\n * The tertiary label, typically a status message.\n *\n * @see Docs https://saas-ui.dev/docs/components/persona\n */\nconst PersonaTertiaryLabel = withContext<HTMLSpanElement, PersonaLabelProps>(\n  'span',\n  'tertiaryLabel',\n)\n\nexport {\n  PersonaRoot as Root,\n  PersonaAvatar as Avatar,\n  PersonaPresenceBadge as PresenceBadge,\n  PersonaDetails as Details,\n  PersonaLabel as Label,\n  PersonaSecondaryLabel as SecondaryLabel,\n  PersonaTertiaryLabel as TertiaryLabel,\n}\n\nexport type {\n  PersonaRootProps as RootProps,\n  PersonaAvatarProps as AvatarProps,\n  PersonaPresenceBadgeProps as PresenceBadgeProps,\n  PersonaDetailsProps as DetailsProps,\n  PersonaLabelProps as LabelProps,\n}\n",
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'pin-input',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: [],
    files: [
      {
        path: 'pin-input',
        content:
          "'use client'\n\nimport { forwardRef } from 'react'\n\nimport { Group } from '@chakra-ui/react/group'\nimport { PinInput as ChakraPinInput } from '@chakra-ui/react/pin-input'\n\nexport interface PinInputProps extends ChakraPinInput.RootProps {\n  rootRef?: React.Ref<HTMLDivElement>\n  pinLength?: number\n  inputProps?: React.InputHTMLAttributes<HTMLInputElement>\n  attached?: boolean\n}\n\nexport const PinInput = forwardRef<HTMLInputElement, PinInputProps>(\n  function PinInput(props, ref) {\n    const {\n      pinLength = 4,\n      inputProps,\n      rootRef,\n      attached,\n      gap = attached ? 0 : 2,\n      ...rest\n    } = props\n\n    return (\n      <ChakraPinInput.Root ref={rootRef} {...rest}>\n        <ChakraPinInput.HiddenInput ref={ref} {...inputProps} />\n        <ChakraPinInput.Control>\n          <Group attached={attached} gap={gap}>\n            {Array.from({ length: pinLength }).map((_, index) => (\n              <ChakraPinInput.Input key={index} index={index} />\n            ))}\n          </Group>\n        </ChakraPinInput.Control>\n      </ChakraPinInput.Root>\n    )\n  },\n)\n",
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'popover',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: ['../close-button/index.ts'],
    files: [
      {
        path: 'popover',
        content:
          "'use client'\n\nimport { forwardRef } from 'react'\n\nimport { Popover as ChakraPopover } from '@chakra-ui/react/popover'\n\nimport { CloseButton, type CloseButtonProps } from '../close-button/index.ts'\n\ninterface PopoverContentProps extends ChakraPopover.ContentProps {}\n\nconst PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(\n  function PopoverContent(props, ref) {\n    return (\n      <ChakraPopover.Positioner>\n        <ChakraPopover.Content ref={ref} {...props} />\n      </ChakraPopover.Positioner>\n    )\n  },\n)\n\nconst PopoverArrow = forwardRef<HTMLDivElement, ChakraPopover.ArrowProps>(\n  function PopoverArrow(props, ref) {\n    return (\n      <ChakraPopover.Arrow {...props} ref={ref}>\n        <ChakraPopover.ArrowTip />\n      </ChakraPopover.Arrow>\n    )\n  },\n)\n\ninterface PopoverCloseButtonProps\n  extends CloseButtonProps,\n    ChakraPopover.CloseTriggerProps {}\n\nconst PopoverCloseButton = forwardRef<\n  HTMLButtonElement,\n  PopoverCloseButtonProps\n>(function PopoverCloseTrigger(props, ref) {\n  return (\n    <ChakraPopover.CloseTrigger ref={ref} asChild>\n      <CloseButton position=\"absolute\" top=\"1\" insetEnd=\"1\" {...props} />\n    </ChakraPopover.CloseTrigger>\n  )\n})\n\nconst PopoverCloseTrigger = ChakraPopover.CloseTrigger\nconst PopoverTitle = ChakraPopover.Title\nconst PopoverDescription = ChakraPopover.Description\nconst PopoverFooter = ChakraPopover.Footer\nconst PopoverHeader = ChakraPopover.Header\nconst PopoverRoot = ChakraPopover.Root\nconst PopoverBody = ChakraPopover.Body\nconst PopoverTrigger = ChakraPopover.Trigger\nconst PopoverContext = ChakraPopover.Context\n\nexport {\n  PopoverContent as Content,\n  PopoverArrow as Arrow,\n  PopoverCloseButton as CloseButton,\n  PopoverCloseTrigger as CloseTrigger,\n  PopoverTitle as Title,\n  PopoverDescription as Description,\n  PopoverFooter as Footer,\n  PopoverHeader as Header,\n  PopoverRoot as Root,\n  PopoverBody as Body,\n  PopoverTrigger as Trigger,\n  PopoverContext as Context,\n}\n\ntype PopoverRootProps = ChakraPopover.RootProps\n\nexport type { PopoverRootProps as RootProps }\n",
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'radio',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: [],
    files: [
      {
        path: 'radio',
        content:
          "'use client'\n\nimport { forwardRef } from 'react'\n\nimport { RadioGroup as ChakraRadioGroup } from '@chakra-ui/react/radio-group'\n\nexport interface RadioProps extends ChakraRadioGroup.ItemProps {\n  rootRef?: React.Ref<HTMLDivElement>\n  inputProps?: React.InputHTMLAttributes<HTMLInputElement>\n}\n\nexport const Radio = forwardRef<HTMLInputElement, RadioProps>(\n  function Radio(props, ref) {\n    const { children, inputProps, rootRef, ...rest } = props\n    return (\n      <ChakraRadioGroup.Item ref={rootRef} {...rest}>\n        <ChakraRadioGroup.ItemHiddenInput ref={ref} {...inputProps} />\n        <ChakraRadioGroup.ItemIndicator />\n        {children && (\n          <ChakraRadioGroup.ItemText>{children}</ChakraRadioGroup.ItemText>\n        )}\n      </ChakraRadioGroup.Item>\n    )\n  },\n)\n\nexport type RadioGroupProps = ChakraRadioGroup.RootProps\n\nexport const RadioGroup = ChakraRadioGroup.Root\n",
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'radio-card',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: [],
    files: [
      {
        path: 'radio-card',
        content:
          "'use client'\n\nimport { Fragment, forwardRef } from 'react'\n\nimport { RadioCard } from '@chakra-ui/react/radio-card'\n\ninterface RadioCardItemProps extends RadioCard.ItemProps {\n  icon?: React.ReactElement\n  label?: React.ReactNode\n  description?: React.ReactNode\n  addon?: React.ReactNode\n  indicator?: React.ReactNode | null\n  indicatorPlacement?: 'start' | 'end' | 'inside'\n  inputProps?: React.InputHTMLAttributes<HTMLInputElement>\n}\n\nconst RadioCardItem = forwardRef<HTMLInputElement, RadioCardItemProps>(\n  function RadioCardItem(props, ref) {\n    const {\n      inputProps,\n      label,\n      description,\n      addon,\n      icon,\n      indicator = <RadioCard.ItemIndicator />,\n      indicatorPlacement = 'end',\n      ...rest\n    } = props\n\n    const hasContent = label || description || icon\n    const ContentWrapper = indicator ? RadioCard.ItemContent : Fragment\n\n    return (\n      <RadioCard.Item {...rest}>\n        <RadioCard.ItemHiddenInput ref={ref} {...inputProps} />\n        <RadioCard.ItemControl>\n          {indicatorPlacement === 'start' && indicator}\n          {hasContent && (\n            <ContentWrapper>\n              {icon}\n              {label && <RadioCard.ItemText>{label}</RadioCard.ItemText>}\n              {description && (\n                <RadioCard.ItemDescription>\n                  {description}\n                </RadioCard.ItemDescription>\n              )}\n              {indicatorPlacement === 'inside' && indicator}\n            </ContentWrapper>\n          )}\n          {indicatorPlacement === 'end' && indicator}\n        </RadioCard.ItemControl>\n        {addon && <RadioCard.ItemAddon>{addon}</RadioCard.ItemAddon>}\n      </RadioCard.Item>\n    )\n  },\n)\n\nconst RadioCardRoot = RadioCard.Root\nconst RadioCardLabel = RadioCard.Label\nconst RadioCardItemIndicator = RadioCard.ItemIndicator\n\nexport {\n  RadioCardRoot as Root,\n  RadioCardLabel as Label,\n  RadioCardItemIndicator as ItemIndicator,\n  RadioCardItem as Item,\n}\n\nexport type ItemProps = RadioCardItemProps\nexport type RootProps = RadioCard.RootProps\nexport type LabelProps = RadioCard.LabelProps\nexport type ItemIndicatorProps = RadioCard.ItemIndicatorProps\n",
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'search-input',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: ['../icons/index.ts'],
    files: [
      {
        path: 'search-input',
        content:
          '\'use client\'\n\nimport React, { forwardRef } from \'react\'\n\nimport {\n  Group,\n  IconButton,\n  type IconButtonProps,\n  Input,\n  InputElement,\n  InputProps,\n  mergeRefs,\n  useControllableState,\n} from \'@chakra-ui/react\'\nimport { callAll } from \'@saas-ui/core/utils\'\n\nimport { CloseIcon, SearchIcon } from \'../icons/index.ts\'\n\nexport interface SearchInputProps extends InputProps {\n  value?: string\n  defaultValue?: string\n  placeholder?: string\n  icon?: React.ReactElement\n  resetIcon?: React.ReactElement\n  endElement?: React.ReactElement\n  onReset?: () => void\n}\n\nexport const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(\n  (props, ref) => {\n    const {\n      placeholder = \'Search\',\n      value: valueProp,\n      defaultValue: defaultValueProp,\n      size,\n      variant,\n      width = \'full\',\n      icon = <SearchIcon />,\n      resetIcon,\n      endElement: endElementProp,\n      onChange: onChangeProp,\n      onReset: onResetProp,\n      onKeyDown: onKeyDownProp,\n      disabled,\n      ...inputProps\n    } = props\n\n    const inputRef = React.useRef<HTMLInputElement>(null)\n\n    const [value, setValue] = useControllableState({\n      value: valueProp,\n      defaultValue: defaultValueProp,\n    })\n\n    const onChange = React.useCallback(\n      (e: React.ChangeEvent<HTMLInputElement>) => {\n        setValue(e.target.value)\n      },\n      [setValue],\n    )\n\n    const onKeyDown = React.useCallback(\n      (event: React.KeyboardEvent) => {\n        if (event.key === \'Escape\') {\n          setValue(\'\')\n          onReset()\n        }\n      },\n      [onResetProp, setValue],\n    )\n\n    const onReset = () => {\n      setValue(\'\')\n      onResetProp?.()\n      inputRef.current?.focus()\n    }\n\n    const showReset = value && !props.disabled\n\n    const endElement = showReset ? (\n      <SearchInputResetButton size={size}>{resetIcon}</SearchInputResetButton>\n    ) : (\n      endElementProp\n    )\n\n    return (\n      <Group width={width}>\n        <InputElement\n          placement="start"\n          px="0"\n          aspectRatio="9/10"\n          fontSize={size}\n        >\n          {icon}\n        </InputElement>\n        <Input\n          type="text"\n          placeholder={placeholder}\n          variant={variant}\n          size={size}\n          value={value}\n          disabled={disabled}\n          ref={mergeRefs(ref, inputRef)}\n          onChange={callAll(onChange, onChangeProp)}\n          onKeyDown={callAll(onKeyDown, onKeyDownProp)}\n          ps="calc(var(--input-height) - var(--input-height) / 10)"\n          pe="calc(var(--input-height) - var(--input-height) / 10)"\n          {...inputProps}\n        />\n        <InputElement placement="end">{endElement}</InputElement>\n      </Group>\n    )\n  },\n)\n\nconst SearchInputResetButton = forwardRef<HTMLButtonElement, IconButtonProps>(\n  (props, ref) => {\n    const { children = <CloseIcon />, ...rest } = props\n\n    return (\n      <IconButton\n        ref={ref}\n        variant="ghost"\n        aria-label="Reset search"\n        me="-2"\n        aspectRatio="square"\n        height="calc(100% - {spacing.2})"\n        {...rest}\n      >\n        {children}\n      </IconButton>\n    )\n  },\n)\n\nSearchInput.displayName = \'SearchInput\'\n',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'section',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: ['./section.context.ts'],
    files: [
      {
        path: 'section',
        content:
          "'use client'\n\nimport * as React from 'react'\n\nimport {\n  type HTMLChakraProps,\n  type SlotRecipeProps,\n  chakra,\n} from '@chakra-ui/react'\n\nimport { withContext, withProvider } from './section.context.ts'\n\ninterface SectionRootProps\n  extends HTMLChakraProps<'div'>,\n    SlotRecipeProps<'suiSection'> {}\n\nconst SectionRoot = withProvider<HTMLDivElement, SectionRootProps>(\n  'div',\n  'root',\n)\n\ninterface SectionBodyProps extends HTMLChakraProps<'div'> {}\n\nconst SectionBody = withContext<HTMLDivElement, SectionBodyProps>('div', 'body')\n\ninterface SectionHeaderProps extends Omit<HTMLChakraProps<'div'>, 'title'> {\n  title?: React.ReactNode\n  description?: React.ReactNode\n}\n\nconst SectionHeader = withContext<HTMLDivElement, SectionHeaderProps>(\n  (props) => {\n    const { title, description, children, ...rest } = props\n\n    return (\n      <chakra.div {...rest}>\n        {typeof title === 'string' ? (\n          <SectionTitle>{title}</SectionTitle>\n        ) : (\n          title\n        )}\n        {typeof description === 'string' ? (\n          <SectionDescription>{description}</SectionDescription>\n        ) : (\n          description\n        )}\n        {children}\n      </chakra.div>\n    )\n  },\n  'header',\n)\n\nconst SectionTitle = withContext<HTMLHeadingElement, HTMLChakraProps<'h3'>>(\n  'h3',\n  'title',\n)\n\nconst SectionDescription = withContext<HTMLDivElement, HTMLChakraProps<'div'>>(\n  'div',\n  'description',\n)\n\nexport {\n  SectionRoot as Root,\n  SectionHeader as Header,\n  SectionTitle as Title,\n  SectionDescription as Description,\n  SectionBody as Body,\n}\nexport type {\n  SectionRootProps as RootProps,\n  SectionHeaderProps as HeaderProps,\n  SectionBodyProps as BodyProps,\n}\n",
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'segmented-control',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: [],
    files: [
      {
        path: 'segmented-control',
        content:
          "'use client'\n\nimport { forwardRef, useMemo } from 'react'\n\nimport { For } from '@chakra-ui/react/for'\nimport { SegmentGroup } from '@chakra-ui/react/segment-group'\n\ninterface Item {\n  value: string\n  label: React.ReactNode\n  disabled?: boolean\n}\n\nexport interface SegmentedControlProps extends SegmentGroup.RootProps {\n  items: Array<string | Item>\n}\n\nfunction normalize(items: Array<string | Item>): Item[] {\n  return items.map((item) => {\n    if (typeof item === 'string') return { value: item, label: item }\n    return item\n  })\n}\n\nexport const SegmentedControl = forwardRef<\n  HTMLDivElement,\n  SegmentedControlProps\n>(function SegmentedControl(props, ref) {\n  const { items, ...rest } = props\n  const data = useMemo(() => normalize(items), [items])\n\n  return (\n    <SegmentGroup.Root ref={ref} {...rest}>\n      <SegmentGroup.Indicator />\n      <For each={data}>\n        {(item) => (\n          <SegmentGroup.Item\n            key={item.value}\n            value={item.value}\n            disabled={item.disabled}\n          >\n            <SegmentGroup.ItemText>{item.label}</SegmentGroup.ItemText>\n            <SegmentGroup.ItemHiddenInput />\n          </SegmentGroup.Item>\n        )}\n      </For>\n    </SegmentGroup.Root>\n  )\n})\n",
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'select',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: ['../close-button/index.ts'],
    files: [
      {
        path: 'select',
        content:
          "'use client'\n\nimport { forwardRef } from 'react'\n\nimport type {\n  CollectionItem,\n  ListCollection,\n} from '@chakra-ui/react/collection'\nimport { Portal } from '@chakra-ui/react/portal'\nimport { Select as SelectPrimitive } from '@chakra-ui/react/select'\n\nimport { CloseButton } from '../close-button/index.ts'\n\nexport interface SelectTriggerProps extends SelectPrimitive.ControlProps {\n  clearable?: boolean\n}\n\nexport const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(\n  function SelectTrigger(props, ref) {\n    const { children, clearable, ...rest } = props\n    return (\n      <SelectPrimitive.Control {...rest}>\n        <SelectPrimitive.Trigger ref={ref}>{children}</SelectPrimitive.Trigger>\n        <SelectPrimitive.IndicatorGroup>\n          {clearable && <SelectClearTrigger />}\n          <SelectPrimitive.Indicator />\n        </SelectPrimitive.IndicatorGroup>\n      </SelectPrimitive.Control>\n    )\n  },\n)\n\nconst SelectClearTrigger = forwardRef<\n  HTMLButtonElement,\n  SelectPrimitive.ClearTriggerProps\n>(function SelectClearTrigger(props, ref) {\n  return (\n    <SelectPrimitive.ClearTrigger asChild {...props} ref={ref}>\n      <CloseButton\n        size=\"xs\"\n        variant=\"plain\"\n        focusVisibleRing=\"inside\"\n        focusRingWidth=\"2px\"\n        pointerEvents=\"auto\"\n      />\n    </SelectPrimitive.ClearTrigger>\n  )\n})\n\nexport interface SelectContentProps extends SelectPrimitive.ContentProps {\n  portalled?: boolean\n  portalRef?: React.RefObject<HTMLElement>\n}\n\nexport const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(\n  function SelectContent(props, ref) {\n    const { portalled = true, portalRef, ...rest } = props\n    return (\n      <Portal disabled={!portalled} container={portalRef}>\n        <SelectPrimitive.Positioner>\n          <SelectPrimitive.Content {...rest} ref={ref} />\n        </SelectPrimitive.Positioner>\n      </Portal>\n    )\n  },\n)\n\nexport const SelectItem = forwardRef<HTMLDivElement, SelectPrimitive.ItemProps>(\n  function SelectItem(props, ref) {\n    const { item, children, ...rest } = props\n    return (\n      <SelectPrimitive.Item key={item.value} item={item} {...rest} ref={ref}>\n        {children}\n        <SelectPrimitive.ItemIndicator />\n      </SelectPrimitive.Item>\n    )\n  },\n)\n\nexport interface SelectValueTextProps\n  extends Omit<SelectPrimitive.ValueTextProps, 'children'> {\n  children?(items: CollectionItem[]): React.ReactNode\n}\n\nexport const SelectValueText = forwardRef<\n  HTMLSpanElement,\n  SelectValueTextProps\n>(function SelectValueText(props, ref) {\n  const { children, ...rest } = props\n  return (\n    <SelectPrimitive.ValueText {...rest} ref={ref}>\n      <SelectPrimitive.Context>\n        {(select) => {\n          const items = select.selectedItems\n          if (items.length === 0) return props.placeholder\n          if (children) return children(items)\n          if (items.length === 1)\n            return select.collection.stringifyItem(items[0])\n          return `${items.length} selected`\n        }}\n      </SelectPrimitive.Context>\n    </SelectPrimitive.ValueText>\n  )\n})\n\nexport interface SelectRootProps<T> extends SelectPrimitive.RootProps<T> {\n  collection: ListCollection<T>\n}\n\nexport const SelectRoot = forwardRef(function SelectRoot<\n  T extends CollectionItem = CollectionItem,\n>(props: SelectRootProps<T>, ref: React.Ref<HTMLDivElement>) {\n  return (\n    <SelectPrimitive.Root\n      {...props}\n      ref={ref}\n      positioning={{ sameWidth: true, ...props.positioning }}\n    />\n  )\n}) as <T extends CollectionItem = CollectionItem>(\n  props: SelectRootProps<T> & React.RefAttributes<HTMLDivElement>,\n) => React.ReactElement\n\nexport interface SelectItemGroupProps extends SelectPrimitive.ItemGroupProps {\n  label: React.ReactNode\n}\n\nexport const SelectItemGroup = forwardRef<HTMLDivElement, SelectItemGroupProps>(\n  function SelectItemGroup(props, ref) {\n    const { children, label, ...rest } = props\n    return (\n      <SelectPrimitive.ItemGroup {...rest} ref={ref}>\n        <SelectPrimitive.ItemGroupLabel>{label}</SelectPrimitive.ItemGroupLabel>\n        {children}\n      </SelectPrimitive.ItemGroup>\n    )\n  },\n)\n\nexport const SelectLabel = SelectPrimitive.Label\nexport const SelectItemText = SelectPrimitive.ItemText\n",
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'sidebar',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: ['./sidebar.context.ts'],
    files: [
      {
        path: 'sidebar',
        content:
          "'use client'\n\nimport React from 'react'\n\nimport type {\n  HTMLChakraProps,\n  SlotRecipeProps,\n} from '@chakra-ui/react/styled-system'\nimport { Sidebar, useSidebar } from '@saas-ui/core/sidebar'\n\nimport {\n  ClassNamesProvider,\n  StylesProvider,\n  useRecipeResult,\n  withContext,\n  withItemContext,\n  withItemProvider,\n} from './sidebar.context.ts'\n\ninterface SidebarProviderProps\n  extends Sidebar.ProviderProps,\n    Omit<SlotRecipeProps<'suiSidebar'>, 'mode'> {}\n\nfunction SidebarProvider(props: SidebarProviderProps) {\n  return (\n    <Sidebar.Provider {...props}>\n      <RecipeProvider {...props}>{props.children}</RecipeProvider>\n    </Sidebar.Provider>\n  )\n}\n\nfunction RecipeProvider(\n  props: SlotRecipeProps<'suiSidebar'> & { children: React.ReactNode },\n) {\n  const { mode } = useSidebar()\n\n  const { styles, classNames } = useRecipeResult({\n    ...props,\n    mode,\n  })\n\n  return (\n    <StylesProvider value={styles}>\n      <ClassNamesProvider value={classNames}>\n        {props.children}\n      </ClassNamesProvider>\n    </StylesProvider>\n  )\n}\n\ninterface SidebarRootProps\n  extends HTMLChakraProps<'div'>,\n    Sidebar.RootBaseProps {}\n\n/**\n * Side navigation, commonly used as the primary navigation\n *\n * @see Docs https://saas-ui.dev/docs/components/layout/sidebar\n */\nconst SidebarRoot = withContext<HTMLDivElement, SidebarRootProps>(\n  Sidebar.Root,\n  'root',\n)\n\ninterface SidebarTriggerProps extends HTMLChakraProps<'button'> {}\n\n/**\n * Button that toggles the sidebar visibility.\n *\n * @see Docs https://saas-ui.dev/docs/components/layout/sidebar\n */\nconst SidebarTrigger = withContext<HTMLButtonElement, SidebarTriggerProps>(\n  Sidebar.Trigger,\n  'trigger',\n  {\n    forwardAsChild: true,\n  },\n)\n\ninterface SidebarFlyoutTriggerProps extends HTMLChakraProps<'button'> {}\n\n/**\n * Opens the sidebar when hovering over the trigger.\n *\n * @see Docs https://saas-ui.dev/docs/components/layout/sidebar\n */\nconst SidebarFlyoutTrigger = withContext<\n  HTMLButtonElement,\n  SidebarFlyoutTriggerProps\n>(Sidebar.FlyoutTrigger, 'flyoutTrigger', {\n  forwardAsChild: true,\n})\n\n/**\n * Overlay shown when sidebar is open on mobile.\n *\n * @see Docs https://saas-ui.dev/docs/components/layout/sidebar\n */\nconst SidebarBackdrop = withContext<HTMLDivElement, HTMLChakraProps<'div'>>(\n  Sidebar.Backdrop,\n  'backdrop',\n  {\n    forwardAsChild: true,\n  },\n)\n\n/**\n * Sidebar header section.\n *\n * @see Docs https://saas-ui.dev/docs/components/layout/sidebar\n */\nconst SidebarHeader = withContext<HTMLDivElement, HTMLChakraProps<'div'>>(\n  Sidebar.Header,\n  'header',\n)\n\n/**\n * Sidebar body section, used for the main content of the sidebar.\n *\n * @see Docs https://saas-ui.dev/docs/components/layout/sidebar\n */\nconst SidebarBody = withContext<HTMLDivElement, HTMLChakraProps<'div'>>(\n  Sidebar.Body,\n  'body',\n)\n\n/**\n * Sidebar footer section.\n *\n * @see Docs https://saas-ui.dev/docs/components/layout/sidebar\n */\nconst SidebarFooter = withContext<HTMLDivElement, HTMLChakraProps<'div'>>(\n  Sidebar.Footer,\n  'footer',\n)\n\n/**\n * Sidebar track section.\n *\n * @see Docs https://saas-ui.dev/docs/components/layout/sidebar\n */\nconst SidebarTrack = withContext<HTMLDivElement, HTMLChakraProps<'div'>>(\n  Sidebar.Track,\n  'track',\n  {\n    forwardAsChild: true,\n  },\n)\n\n/**\n * Sidebar inset.\n *\n * @see Docs https://saas-ui.dev/docs/components/layout/sidebar\n */\nconst SidebarInset = withContext<HTMLDivElement, HTMLChakraProps<'div'>>(\n  'div',\n  'inset',\n)\n\nconst SidebarGroup = withContext<HTMLDivElement, HTMLChakraProps<'div'>>(\n  Sidebar.Group,\n  'group',\n  {\n    defaultProps: {\n      role: 'group',\n    },\n  },\n)\n\nconst SidebarGroupHeader = withContext<HTMLDivElement, HTMLChakraProps<'div'>>(\n  Sidebar.GroupHeader,\n  'groupHeader',\n)\n\nconst SidebarGroupTitle = withContext<\n  HTMLHeadingElement,\n  HTMLChakraProps<'h5'>\n>(Sidebar.GroupTitle, 'groupTitle')\n\nconst SidebarGroupEndElement = withContext<\n  HTMLDivElement,\n  HTMLChakraProps<'div'>\n>(Sidebar.GroupEndElement, 'groupEndElement')\n\nconst SidebarGroupContent = withContext<HTMLDivElement, HTMLChakraProps<'div'>>(\n  Sidebar.GroupContent,\n  'groupContent',\n)\n\ninterface SidebarNavItemProps\n  extends SlotRecipeProps<'suiSidebarNavItem'>,\n    HTMLChakraProps<'div'> {}\n\nconst SidebarNavItem = withItemProvider<HTMLDivElement, SidebarNavItemProps>(\n  Sidebar.NavItem,\n  'item',\n)\n\ninterface SidebarNavButtonProps extends HTMLChakraProps<'button'> {\n  active?: boolean\n}\n\nconst SidebarNavButton = withItemContext<\n  HTMLButtonElement,\n  SidebarNavButtonProps\n>(Sidebar.NavButton, 'button', {\n  forwardAsChild: true,\n})\n\nconst SidebarNavButtonEndElement = withItemContext<\n  HTMLDivElement,\n  HTMLChakraProps<'div'>\n>(Sidebar.NavItemEndElement, 'endElement', {\n  defaultProps: {\n    'data-slot': 'endElement',\n  },\n})\n\nconst SidebarContext = Sidebar.Context\n\nexport {\n  SidebarProvider as Provider,\n  SidebarContext as Context,\n  SidebarRoot as Root,\n  SidebarTrigger as Trigger,\n  SidebarFlyoutTrigger as FlyoutTrigger,\n  SidebarBackdrop as Backdrop,\n  SidebarHeader as Header,\n  SidebarBody as Body,\n  SidebarFooter as Footer,\n  SidebarTrack as Track,\n  SidebarInset as Inset,\n  SidebarGroup as Group,\n  SidebarGroupHeader as GroupHeader,\n  SidebarGroupTitle as GroupTitle,\n  SidebarGroupEndElement as GroupEndElement,\n  SidebarGroupContent as GroupContent,\n  SidebarNavItem as NavItem,\n  SidebarNavButton as NavButton,\n  SidebarNavButtonEndElement as NavButtonEndElement,\n}\n\nexport type {\n  SidebarProviderProps as ProviderProps,\n  SidebarRootProps as RootProps,\n  SidebarTriggerProps as TriggerProps,\n  SidebarFlyoutTriggerProps as FlyoutTriggerProps,\n  SidebarNavItemProps as NavItemProps,\n  SidebarNavButtonProps as NavButtonProps,\n}\n",
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'skeleton',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: [],
    files: [
      {
        path: 'skeleton',
        content:
          "'use client'\n\nimport { forwardRef } from 'react'\n\nimport { Circle, type CircleProps } from '@chakra-ui/react/circle'\nimport type { SkeletonProps as ChakraSkeletonProps } from '@chakra-ui/react/skeleton'\nimport { Skeleton as ChakraSkeleton } from '@chakra-ui/react/skeleton'\nimport { Stack } from '@chakra-ui/react/stack'\n\nexport interface SkeletonCircleProps extends ChakraSkeletonProps {\n  size?: CircleProps['size']\n}\n\nexport const SkeletonCircle = (props: SkeletonCircleProps) => {\n  const { size, ...rest } = props\n  return (\n    <Circle size={size} asChild>\n      <ChakraSkeleton {...rest} />\n    </Circle>\n  )\n}\n\nexport interface SkeletonTextProps extends ChakraSkeletonProps {\n  noOfLines?: number\n}\n\nexport const SkeletonText = forwardRef<HTMLDivElement, SkeletonTextProps>(\n  function SkeletonText(props, ref) {\n    const { noOfLines = 3, gap, ...rest } = props\n    return (\n      <Stack gap={gap} width=\"full\" ref={ref}>\n        {Array.from({ length: noOfLines }).map((_, index) => (\n          <ChakraSkeleton\n            height=\"4\"\n            key={index}\n            {...props}\n            _last={{ maxW: '80%' }}\n            {...rest}\n          />\n        ))}\n      </Stack>\n    )\n  },\n)\n\nexport type SkeletonProps = ChakraSkeletonProps\n\nexport const Skeleton = ChakraSkeleton\n",
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'slider',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: [],
    files: [
      {
        path: 'slider',
        content:
          "'use client'\n\nimport { forwardRef } from 'react'\n\nimport { Slider as ChakraSlider } from '@chakra-ui/react/slider'\n\nexport interface SliderProps extends ChakraSlider.RootProps {\n  marks?: Array<number | { value: number; label: React.ReactNode }>\n  label?: React.ReactNode\n}\n\nexport const Slider = forwardRef<HTMLDivElement, SliderProps>(\n  function Slider(props, ref) {\n    const { marks: marksProp, label, ...rest } = props\n    const value = props.defaultValue ?? props.value\n\n    const marks = marksProp?.map((mark) => {\n      if (typeof mark === 'number') return { value: mark, label: undefined }\n      return mark\n    })\n\n    const hasMarkLabel = !!marks?.some((mark) => mark.label)\n\n    return (\n      <ChakraSlider.Root ref={ref} thumbAlignment=\"center\" {...rest}>\n        {label && (\n          <ChakraSlider.Label fontWeight=\"medium\">{label}</ChakraSlider.Label>\n        )}\n        <ChakraSlider.Control mb={hasMarkLabel ? '4' : undefined}>\n          <ChakraSlider.Track>\n            <ChakraSlider.Range />\n          </ChakraSlider.Track>\n          {value?.map((_, index) => (\n            <ChakraSlider.Thumb key={index} index={index}>\n              <ChakraSlider.HiddenInput />\n            </ChakraSlider.Thumb>\n          ))}\n        </ChakraSlider.Control>\n        {marks?.length && (\n          <ChakraSlider.MarkerGroup>\n            {marks.map((mark, index) => {\n              const value = typeof mark === 'number' ? mark : mark.value\n              const label = typeof mark === 'number' ? undefined : mark.label\n              return (\n                <ChakraSlider.Marker key={index} value={value}>\n                  <ChakraSlider.MarkerIndicator />\n                  {label}\n                </ChakraSlider.Marker>\n              )\n            })}\n          </ChakraSlider.MarkerGroup>\n        )}\n      </ChakraSlider.Root>\n    )\n  },\n)\n",
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'spinner',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: [],
    files: [
      {
        path: 'spinner',
        content:
          "'use client'\n\nimport { forwardRef } from 'react'\n\nimport { Spinner as ChakraSpinner } from '@chakra-ui/react/spinner'\nimport type { SpinnerProps as ChakraSpinnerProps } from '@chakra-ui/react/spinner'\n\nexport interface SpinnerProps extends ChakraSpinnerProps {\n  loading?: boolean\n  children?: React.ReactNode\n}\n\nexport const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(\n  function Spinner(props, ref) {\n    const { loading, children, ...rest } = props\n\n    if (loading === false) {\n      return <>{children}</>\n    }\n\n    return <ChakraSpinner ref={ref} {...rest} />\n  },\n)\n",
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'stat',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: [],
    files: [
      {
        path: 'stat',
        content:
          "'use client'\n\nimport * as React from 'react'\n\nimport { Badge, type BadgeProps } from '@chakra-ui/react/badge'\nimport { FormatNumber } from '@chakra-ui/react/format'\nimport { Stat as ChakraStat } from '@chakra-ui/react/stat'\n\ninterface StatValueTextProps extends ChakraStat.ValueTextProps {\n  value?: number\n  formatOptions?: Intl.NumberFormatOptions\n}\n\nconst StatValueText = React.forwardRef<HTMLDivElement, StatValueTextProps>(\n  function StatValueText(props, ref) {\n    const { value, formatOptions, children, ...rest } = props\n    return (\n      <ChakraStat.ValueText {...rest} ref={ref}>\n        {children ||\n          (value != null && <FormatNumber value={value} {...formatOptions} />)}\n      </ChakraStat.ValueText>\n    )\n  },\n)\n\nconst StatUpTrend = React.forwardRef<HTMLDivElement, BadgeProps>(\n  function StatUpTrend(props, ref) {\n    return (\n      <Badge colorPalette=\"green\" gap=\"0\" {...props} ref={ref}>\n        <ChakraStat.UpIndicator />\n        {props.children}\n      </Badge>\n    )\n  },\n)\n\nconst StatDownTrend = React.forwardRef<HTMLDivElement, BadgeProps>(\n  function StatDownTrend(props, ref) {\n    return (\n      <Badge colorPalette=\"red\" gap=\"0\" {...props} ref={ref}>\n        <ChakraStat.DownIndicator />\n        {props.children}\n      </Badge>\n    )\n  },\n)\n\nexport const Root = ChakraStat.Root\nexport const Label = ChakraStat.Label\nexport const HelpText = ChakraStat.HelpText\nexport const ValueUnit = ChakraStat.ValueUnit\n\nexport type RootProps = ChakraStat.RootProps\nexport type ValueTextProps = StatValueTextProps\n\nexport {\n  StatValueText as ValueText,\n  StatUpTrend as UpTrend,\n  StatDownTrend as DownTrend,\n}\n",
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'status',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: [],
    files: [
      {
        path: 'status',
        content:
          "'use client'\n\nimport { forwardRef } from 'react'\n\nimport { Status as ChakraStatus } from '@chakra-ui/react/status'\nimport type { Token } from '@chakra-ui/react/styled-system'\n\nexport type StatusTokens = Extract<Token, `colors.status.${string}`>\n\nexport interface StatusProps extends ChakraStatus.RootProps {\n  /**\n   * The status value, used to determine the color of the status\n   * colors can be configured as semantic tokens under the `colors.status` key.\n   */\n  value?: StatusTokens extends never ? string : StatusTokens\n}\n\n/**\n * Status component\n */\nexport const Status = forwardRef<HTMLDivElement, StatusProps>(\n  function Status(props, ref) {\n    const { children, value, ...rest } = props\n\n    const color = value ? `status.${value}` : undefined\n\n    return (\n      <ChakraStatus.Root ref={ref} {...rest}>\n        <ChakraStatus.Indicator bg={color} />\n        {children}\n      </ChakraStatus.Root>\n    )\n  },\n)\n",
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'steps',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: ['../icons/index.ts'],
    files: [
      {
        path: 'steps',
        content:
          "'use client'\n\nimport { Box } from '@chakra-ui/react/box'\nimport { Steps as ChakraSteps, useStepsContext } from '@chakra-ui/react/steps'\n\nimport { CheckIcon } from '../icons/index.ts'\n\ninterface StepInfoProps {\n  title?: React.ReactNode\n  description?: React.ReactNode\n}\n\ninterface StepsItemProps\n  extends Omit<ChakraSteps.ItemProps, 'title'>,\n    StepInfoProps {\n  completedIcon?: React.ReactNode\n  icon?: React.ReactNode\n}\n\nconst StepsItem = (props: StepsItemProps) => {\n  const { title, description, completedIcon, icon, ...rest } = props\n  return (\n    <ChakraSteps.Item {...rest}>\n      <ChakraSteps.Trigger>\n        <ChakraSteps.Indicator>\n          <ChakraSteps.Status\n            complete={completedIcon || <CheckIcon />}\n            incomplete={icon || <ChakraSteps.Number />}\n          />\n        </ChakraSteps.Indicator>\n        <StepInfo title={title} description={description} />\n      </ChakraSteps.Trigger>\n      <ChakraSteps.Separator />\n    </ChakraSteps.Item>\n  )\n}\n\nconst StepInfo = (props: StepInfoProps) => {\n  const { title, description } = props\n  if (title && description) {\n    return (\n      <Box>\n        <ChakraSteps.Title>{title}</ChakraSteps.Title>\n        <ChakraSteps.Description>{description}</ChakraSteps.Description>\n      </Box>\n    )\n  }\n  return (\n    <>\n      {title && <ChakraSteps.Title>{title}</ChakraSteps.Title>}\n      {description && (\n        <ChakraSteps.Description>{description}</ChakraSteps.Description>\n      )}\n    </>\n  )\n}\n\ninterface StepsIndicatorProps {\n  completedIcon: React.ReactNode\n  icon?: React.ReactNode\n}\n\nconst StepsIndicator = (props: StepsIndicatorProps) => {\n  const { icon = <ChakraSteps.Number />, completedIcon } = props\n  return (\n    <ChakraSteps.Indicator>\n      <ChakraSteps.Status complete={completedIcon} incomplete={icon} />\n    </ChakraSteps.Indicator>\n  )\n}\n\nconst StepsList = ChakraSteps.List\n\ntype StepsRootProps = ChakraSteps.RootProps\nconst StepsRoot = ChakraSteps.Root\nconst StepsContent = ChakraSteps.Content\nconst StepsCompletedContent = ChakraSteps.CompletedContent\n\nconst StepsNextTrigger = (props: ChakraSteps.NextTriggerProps) => {\n  return <ChakraSteps.NextTrigger {...props} />\n}\n\nconst StepsPrevTrigger = (props: ChakraSteps.PrevTriggerProps) => {\n  return <ChakraSteps.PrevTrigger {...props} />\n}\n\nexport {\n  StepsRoot as Root,\n  StepsContent as Content,\n  StepsCompletedContent as CompletedContent,\n  StepsList as List,\n  StepsIndicator as Indicator,\n  StepsItem as Item,\n  StepsNextTrigger as NextTrigger,\n  StepsPrevTrigger as PrevTrigger,\n  useStepsContext as useContext,\n}\n\nexport type {\n  StepsRootProps as RootProps,\n  StepsItemProps as ItemProps,\n  StepsIndicatorProps as IndicatorProps,\n}\n",
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'switch',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: [],
    files: [
      {
        path: 'switch',
        content:
          "'use client'\n\nimport { forwardRef } from 'react'\n\nimport { Switch as ChakraSwitch } from '@chakra-ui/react/switch'\n\nexport interface SwitchProps extends ChakraSwitch.RootProps {\n  inputProps?: React.InputHTMLAttributes<HTMLInputElement>\n  rootRef?: React.Ref<HTMLLabelElement>\n  trackLabel?: { on: React.ReactNode; off: React.ReactNode }\n  thumbLabel?: { on: React.ReactNode; off: React.ReactNode }\n}\n\nexport const Switch = forwardRef<HTMLInputElement, SwitchProps>(\n  function Switch(props, ref) {\n    const { inputProps, children, rootRef, trackLabel, thumbLabel, ...rest } =\n      props\n\n    return (\n      <ChakraSwitch.Root ref={rootRef} {...rest}>\n        <ChakraSwitch.HiddenInput ref={ref} {...inputProps} />\n        <ChakraSwitch.Control>\n          <ChakraSwitch.Thumb>\n            {thumbLabel && (\n              <ChakraSwitch.ThumbIndicator fallback={thumbLabel?.off}>\n                {thumbLabel?.on}\n              </ChakraSwitch.ThumbIndicator>\n            )}\n          </ChakraSwitch.Thumb>\n          {trackLabel && (\n            <ChakraSwitch.Indicator fallback={trackLabel.off}>\n              {trackLabel.on}\n            </ChakraSwitch.Indicator>\n          )}\n        </ChakraSwitch.Control>\n        {children != null && (\n          <ChakraSwitch.Label>{children}</ChakraSwitch.Label>\n        )}\n      </ChakraSwitch.Root>\n    )\n  },\n)\n",
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'tag',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: [],
    files: [
      {
        path: 'tag',
        content:
          "'use client'\n\nimport { forwardRef } from 'react'\n\nimport { Tag as ChakraTag } from '@chakra-ui/react/tag'\n\nexport interface TagProps extends ChakraTag.RootProps {\n  startElement?: React.ReactNode\n  endElement?: React.ReactNode\n  onClose?: VoidFunction\n  closable?: boolean\n}\n\nexport const Tag = forwardRef<HTMLSpanElement, TagProps>(\n  function Tag(props, ref) {\n    const {\n      startElement,\n      endElement,\n      onClose,\n      closable = !!onClose,\n      children,\n      ...rest\n    } = props\n\n    return (\n      <ChakraTag.Root ref={ref} {...rest}>\n        {startElement && (\n          <ChakraTag.StartElement>{startElement}</ChakraTag.StartElement>\n        )}\n        <ChakraTag.Label>{children}</ChakraTag.Label>\n        {endElement && (\n          <ChakraTag.EndElement>{endElement}</ChakraTag.EndElement>\n        )}\n        {closable && (\n          <ChakraTag.EndElement>\n            <ChakraTag.CloseTrigger onClick={onClose} />\n          </ChakraTag.EndElement>\n        )}\n      </ChakraTag.Root>\n    )\n  },\n)\n",
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'toaster',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: ['../close-button/index.ts', '../spinner/index.ts'],
    files: [
      {
        path: 'toaster',
        content:
          "'use client'\n\nimport React, { useCallback, useMemo, useState } from 'react'\n\nimport { Portal } from '@chakra-ui/react/portal'\nimport { Stack } from '@chakra-ui/react/stack'\nimport {\n  Toaster as ChakraToaster,\n  type CreateToasterProps,\n  CreateToasterReturn,\n  Toast,\n  createToaster,\n} from '@chakra-ui/react/toast'\n\nimport { CloseButton } from '../close-button/index.ts'\nimport { Spinner } from '../spinner/index.ts'\n\nexport type { CreateToasterProps, CreateToasterReturn }\n\nconst defaultOptions: CreateToasterProps = {\n  placement: 'bottom-end',\n  pauseOnPageIdle: true,\n}\n\nexport let toast = createToaster(defaultOptions) as CreateToasterReturn\n\nexport interface ToasterProps extends Partial<CreateToasterProps> {\n  closable?: boolean\n}\n\nexport const Toaster = (props?: ToasterProps) => {\n  const { closable: defaultClosable = true, ...options } = props || {}\n\n  const toaster = useMemo(() => {\n    toast = createToaster({\n      ...defaultOptions,\n      ...options,\n    })\n\n    return toast\n  }, [options])\n\n  return (\n    <Portal>\n      <ChakraToaster toaster={toaster} insetInline={{ mdDown: '4' }}>\n        {(toast) => {\n          const closable =\n            toast.meta?.closable === false\n              ? false\n              : defaultClosable && toast.type !== 'loading'\n\n          return (\n            <ToastRoot>\n              {toast.type === 'loading' ? (\n                <Spinner size=\"sm\" color=\"colorPalette.solid\" mt=\"0.5\" />\n              ) : (\n                <Toast.Indicator />\n              )}\n              <Stack gap=\"1\" flex=\"1\" maxWidth=\"100%\">\n                {toast.title && <Toast.Title>{toast.title}</Toast.Title>}\n                {toast.description && (\n                  <Toast.Description>{toast.description}</Toast.Description>\n                )}\n\n                {toast.action && (\n                  <Toast.ActionTrigger>\n                    {toast.action.label}\n                  </Toast.ActionTrigger>\n                )}\n              </Stack>\n\n              {closable !== false && (\n                <Toast.CloseTrigger asChild>\n                  <CloseButton size=\"xs\" />\n                </Toast.CloseTrigger>\n              )}\n            </ToastRoot>\n          )\n        }}\n      </ChakraToaster>\n    </Portal>\n  )\n}\n\n/**\n * Since the height of the toast is dynamic, we need to set the height\n * in the CSS variable `--toast-height` so css transitions can be applied.\n */\nfunction ToastRoot(props: { children: React.ReactNode }) {\n  const [rect, setRect] = useState<DOMRect>()\n\n  const rectCallbackRef = useCallback((el: HTMLDivElement) => {\n    setRect(el?.getBoundingClientRect())\n  }, [])\n\n  return (\n    <Toast.Root\n      ref={rectCallbackRef}\n      width={{ md: 'sm' }}\n      css={{\n        '--toast-height': `${rect?.height}px`,\n      }}\n    >\n      {props.children}\n    </Toast.Root>\n  )\n}\n",
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'toggle-tip',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: ['../popover/index.ts', '../portal/index.ts'],
    files: [
      {
        path: 'toggle-tip',
        content:
          '\'use client\'\n\nimport * as React from \'react\'\n\nimport { Popover } from \'../popover/index.ts\'\nimport { Portal } from \'../portal/index.ts\'\n\nexport interface ToggleTipProps extends Popover.RootProps {\n  /**\n   * Whether to show the arrow.\n   * @default true\n   */\n  showArrow?: boolean\n  /**\n   * Whether to portall the content.\n   * @default true\n   */\n  portalled?: boolean\n  /**\n   * The ref to the portal.\n   */\n  portalRef?: React.RefObject<HTMLElement>\n  /**\n   * The content to display in the tooltip.\n   */\n  content?: React.ReactNode\n  /**\n   * The trigger element.\n   */\n  children: React.ReactNode\n}\n\nexport const ToggleTip = React.forwardRef<HTMLDivElement, ToggleTipProps>(\n  function ToggleTip(props, ref) {\n    const {\n      showArrow,\n      children,\n      portalled = true,\n      content,\n      portalRef,\n      ...rest\n    } = props\n\n    return (\n      <Popover.Root {...rest} positioning={{ ...rest.positioning, gutter: 4 }}>\n        <Popover.Trigger asChild>{children}</Popover.Trigger>\n\n        <Portal disabled={!portalled} container={portalRef}>\n          <Popover.Content\n            width="auto"\n            px="2"\n            py="1"\n            textStyle="xs"\n            rounded="sm"\n            ref={ref}\n          >\n            {showArrow && <Popover.Arrow />}\n            {content}\n          </Popover.Content>\n        </Portal>\n      </Popover.Root>\n    )\n  },\n)\n',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'tooltip',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: [],
    files: [
      {
        path: 'tooltip',
        content:
          "'use client'\n\nimport { forwardRef } from 'react'\n\nimport { Portal } from '@chakra-ui/react/portal'\nimport { Tooltip as ChakraTooltip } from '@chakra-ui/react/tooltip'\n\nexport interface TooltipProps extends ChakraTooltip.RootProps {\n  showArrow?: boolean\n  portalled?: boolean\n  portalRef?: React.RefObject<HTMLElement>\n  content: React.ReactNode\n  contentProps?: ChakraTooltip.ContentProps\n  disabled?: boolean\n}\n\nexport const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(\n  function Tooltip(props, ref) {\n    const {\n      showArrow,\n      children,\n      disabled,\n      portalled,\n      content,\n      contentProps,\n      portalRef,\n      ...rest\n    } = props\n\n    if (disabled) return children\n\n    return (\n      <ChakraTooltip.Root {...rest}>\n        <ChakraTooltip.Trigger asChild>{children}</ChakraTooltip.Trigger>\n        <Portal disabled={!portalled} container={portalRef}>\n          <ChakraTooltip.Positioner>\n            <ChakraTooltip.Content ref={ref} {...contentProps}>\n              {showArrow && (\n                <ChakraTooltip.Arrow>\n                  <ChakraTooltip.ArrowTip />\n                </ChakraTooltip.Arrow>\n              )}\n              {content}\n            </ChakraTooltip.Content>\n          </ChakraTooltip.Positioner>\n        </Portal>\n      </ChakraTooltip.Root>\n    )\n  },\n)\n",
        type: 'registry:ui',
      },
    ],
  },
] satisfies RegistryEntry[]
