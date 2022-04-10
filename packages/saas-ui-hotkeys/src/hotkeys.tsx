import * as React from 'react'
import {
  chakra,
  forwardRef,
  StylesProvider,
  useStyles,
  HTMLChakraProps,
  ThemingProps,
  omitThemingProps,
  useMultiStyleConfig,
} from '@chakra-ui/system'

import { createContext } from '@chakra-ui/react-utils'

import { Kbd } from '@chakra-ui/layout'

import { SearchInput } from '@saas-ui/search-input'

const regExpSyntaxCharacter = /[.*+?^${}()|[\]\\]/g

function escapeRegExp(value: string) {
  return value.replace(regExpSyntaxCharacter, '\\$&')
}

import { splitKeys } from './use-hotkeys'

export interface HotkeysItemOptions {
  /**
   * Label describing the function of this keyboard shortcut
   */
  label: string
  /**
   * The key combination.
   * Supports shorthands: ⌥ ⇧ ⌃ ⌘
   *
   * Shifted keys like ? and + are handled automatically
   */
  command: string
}

export interface HotkeysGroupListOptions {
  [item: string]: HotkeysItemOptions
}

export interface HotkeysGroupOptions {
  /**
   * The group title
   */
  title?: string
  /**
   * Hotkeys in this group
   */
  hotkeys: HotkeysGroupListOptions
}

export interface HotkeysListOptions {
  [group: string]: HotkeysGroupOptions
}

export interface HotkeysOptions {
  hotkeys: HotkeysListOptions
}

export interface HotkeysGroupProps {
  title?: string
  children: React.ReactNode
}

export interface UseHotkeysListReturn {
  query?: string
  setQuery: (query: string) => void
  hotkeys: HotkeysListOptions
}

const [HotkeysListProvider, useHotkeysListContext] =
  createContext<UseHotkeysListReturn>({
    name: 'HotkeysListContext',
  })

const useHotkeysList = (props: HotkeysListProps) => {
  const [query, setQuery] = React.useState<string>('')

  const { hotkeys } = props

  return {
    hotkeys,
    query,
    setQuery,
  }
}

export interface HotkeysListProps
  extends HotkeysOptions,
    HTMLChakraProps<'div'>,
    ThemingProps<'Hotkeys'> {}

export const HotkeysList = forwardRef<HotkeysListProps, 'div'>(
  ({ children, ...props }, ref) => {
    const styles = useMultiStyleConfig('Hotkeys', props)
    const ownProps = omitThemingProps(props)

    const context = useHotkeysList(ownProps)

    return (
      <chakra.div {...props} ref={ref} __css={styles.container}>
        <HotkeysListProvider value={context}>
          <StylesProvider value={styles}>{children}</StylesProvider>
        </HotkeysListProvider>
      </chakra.div>
    )
  }
)

export const useHotkeysSearch = () => {
  return useHotkeysListContext()
}

// @TODO infer types from SearchInputProps
interface HotkeysSearchProps
  extends Omit<HTMLChakraProps<'input'>, 'onReset' | 'size'> {}

export const HotkeysSearch = forwardRef<HotkeysSearchProps, typeof SearchInput>(
  (props, ref) => {
    const { query, setQuery } = useHotkeysSearch()

    return (
      <SearchInput
        ref={ref}
        value={query}
        onChange={({ target }) => setQuery(target.value)}
        onReset={() => setQuery('')}
        {...props}
      />
    )
  }
)

const filterHotkeys = (
  hotkeys: HotkeysGroupListOptions,
  query?: string
): HotkeysItemOptions[] | null => {
  const results = Object.values(hotkeys).reduce(
    (hotkeys: Array<HotkeysItemOptions>, key) => {
      const { label, command } = key
      const re = query && new RegExp(escapeRegExp(query), 'i')
      if (!re || label.match(re) || command.match(re)) {
        hotkeys.push(key)
      }

      return hotkeys
    },
    []
  )

  if (!results?.length) {
    return null
  }

  return results
}

export const HotkeysListItems = forwardRef<HTMLChakraProps<'div'>, 'div'>(
  (props, ref) => {
    const { hotkeys, query } = useHotkeysListContext()
    return (
      <chakra.div {...props} ref={ref}>
        {Object.values(hotkeys).map((group, i) => {
          const results = filterHotkeys(group.hotkeys, query)

          if (!results?.length) {
            return null
          }

          return (
            <HotkeysGroup title={group.title} key={i}>
              {results.map(({ label, command }: HotkeysItemOptions) => {
                return (
                  <HotkeysItem command={command} key={command}>
                    {label}
                  </HotkeysItem>
                )
              })}
            </HotkeysGroup>
          )
        })}
      </chakra.div>
    )
  }
)

export const HotkeysGroup: React.FC<HotkeysGroupProps> = (props) => {
  const { title, children, ...rest } = props
  const styles = useStyles()

  const groupStyles = {
    my: 2,
    py: 2,
    ...styles.group,
  }

  const titleStyles = {
    py: 2,
    fontWeight: 'semibold',
    ...styles.groupTitle,
  }

  return (
    <chakra.div {...rest} __css={groupStyles}>
      {title && <chakra.p __css={titleStyles}>{title}</chakra.p>}
      {children}
    </chakra.div>
  )
}

export const HotkeysCommand: React.FC<HTMLChakraProps<'span'>> = (props) => {
  const { children, ...rest } = props
  const styles = useStyles()

  let keys
  if (typeof children === 'string') {
    keys = splitKeys(children).map((key, i) => {
      if (key === 'then') {
        return (
          <chakra.span key={key} __css={styles.then}>
            {key}
          </chakra.span>
        )
      }
      return <Kbd key={key}>{key}</Kbd>
    })
  }

  return (
    <chakra.span {...rest} __css={styles.command}>
      {keys || children}
    </chakra.span>
  )
}

export interface HotkeysItemProps extends HTMLChakraProps<'div'> {
  command: string
}

export const HotkeysItem: React.FC<HotkeysItemProps> = ({
  command,
  children,
}) => {
  const styles = useStyles()

  const itemStyles = {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'start',
    flex: '0 0 auto',
    py: 2,
    fontSize: 'lg',
    ...styles.item,
  }

  return (
    <chakra.div __css={itemStyles}>
      <chakra.span flex="1">{children}</chakra.span>
      <HotkeysCommand>{command}</HotkeysCommand>
    </chakra.div>
  )
}
