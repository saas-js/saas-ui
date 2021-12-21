import React, { useState } from 'react'
import {
  chakra,
  forwardRef,
  StylesProvider,
  useStyles,
  HTMLChakraProps,
  ThemingProps,
  omitThemingProps,
} from '@chakra-ui/system'

import { createContext } from '@chakra-ui/react-utils'

import { Kbd } from '@chakra-ui/layout'

import { useMultiStyleConfig } from '@saas-ui/system'

import { SearchInput } from '@saas-ui/search-input'

const regExpSyntaxCharacter = /[.*+?^${}()|[\]\\]/g

function escapeRegExp(value: string) {
  return value.replace(regExpSyntaxCharacter, '\\$&')
}

import { splitKeys } from './use-hotkeys'

import { HotkeysStyles } from './theme'

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
  const [query, setQuery] = useState<string>('')

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
    const styles = useMultiStyleConfig('Hotkeys', props, {
      defaultStyleConfig: HotkeysStyles,
    })
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

export const HotkeysSearch = forwardRef((props, ref) => {
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
})

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

export const HotkeysListItems = forwardRef((props, ref) => {
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
})

export const HotkeysGroup = ({ title, children }: HotkeysGroupProps) => {
  const styles = useStyles()

  return (
    <chakra.div __css={styles.group}>
      {title && <chakra.p __css={styles.groupTitle}>{title}</chakra.p>}
      {children}
    </chakra.div>
  )
}

export interface HotkeysCommandProps {
  children: React.ReactNode
}

export const HotkeysCommand = ({ children, ...props }: HotkeysCommandProps) => {
  const styles = useStyles()

  let keys
  if (typeof children === 'string') {
    keys = splitKeys(children).map((key) => {
      return <Kbd>{key}</Kbd>
    })
  }

  return (
    <chakra.span {...props} __css={styles.command}>
      {keys || children}
    </chakra.span>
  )
}

export interface HotkeysItemProps {
  command: string
  children: React.ReactNode
}

export const HotkeysItem = ({ command, children }: HotkeysItemProps) => {
  const styles = useStyles()
  return (
    <chakra.div __css={styles.item}>
      <span style={{ flex: 1 }}>{children}</span>
      <HotkeysCommand>{command}</HotkeysCommand>
    </chakra.div>
  )
}
