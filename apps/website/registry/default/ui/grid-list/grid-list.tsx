'use client'

import * as React from 'react'

import { type HTMLChakraProps, chakra, mergeRefs } from '@chakra-ui/react'
import type { SlotRecipeProps } from '@saas-ui/chakra-preset'
import type { GridListVariantProps } from '@saas-ui/chakra-preset/slot-recipes/grid-list'

import { withContext, withProvider } from './grid-list.context.ts'

interface GridListContextValue {
  id: string
  rootRef: React.RefObject<HTMLDivElement | null>
  focusId: string | null
  setFocusId: React.Dispatch<React.SetStateAction<string | null>>
}

const GridListContext = React.createContext<GridListContextValue | null>(null)

function useGridListContext() {
  const context = React.useContext(GridListContext)

  if (!context) {
    throw new Error(
      'useGridListContext: `context` is undefined. Seems you forgot to wrap the components in `<GridList />`',
    )
  }

  return context
}

function callAll<T extends (...args: any[]) => void>(
  ...handlers: Array<T | undefined>
) {
  return (...args: Parameters<T>) => {
    handlers.forEach((handler) => handler?.(...args))
  }
}

interface GridListRootProps
  extends
    HTMLChakraProps<'div'>,
    SlotRecipeProps<'suiGridList', GridListVariantProps> {}

const GridListRootBase = React.forwardRef<HTMLDivElement, GridListRootProps>(
  (props, ref) => {
    const { children, id: idProp, onBlur: onBlurProp, ...rest } = props
    const generatedId = React.useId()
    const rootRef = React.useRef<HTMLDivElement>(null)
    const [focusId, setFocusId] = React.useState<string | null>(null)
    const id = idProp ?? generatedId

    const onBlur = React.useCallback<React.FocusEventHandler<HTMLDivElement>>(
      (event) => {
        if (event.relatedTarget) {
          const buttons = Array.from(
            rootRef.current?.querySelectorAll<HTMLElement>(
              "[role='button']:not([disabled])",
            ) ?? [],
          )

          if (!buttons.includes(event.relatedTarget as HTMLElement)) {
            setFocusId(null)
          }
        }
      },
      [],
    )

    const context = React.useMemo(
      () => ({ id, rootRef, focusId, setFocusId }),
      [id, focusId],
    )

    return (
      <GridListContext.Provider value={context}>
        <chakra.div
          ref={mergeRefs(ref, rootRef)}
          role="grid"
          aria-readonly
          {...rest}
          id={idProp}
          onBlur={callAll(onBlurProp, onBlur)}
        >
          {children}
        </chakra.div>
      </GridListContext.Provider>
    )
  },
)

const GridListRoot = withProvider<HTMLDivElement, GridListRootProps>(
  GridListRootBase,
  'root',
)

interface GridListItemProps extends HTMLChakraProps<'div'> {
  disabled?: boolean
}

const GridListItemBase = React.forwardRef<HTMLDivElement, GridListItemProps>(
  (props, ref) => {
    const {
      disabled,
      id: idProp,
      onClick: onClickProp,
      onFocus: onFocusProp,
      onKeyDown: onKeyDownProp,
      tabIndex,
      ...rest
    } = props
    const { id: rootId, rootRef, focusId, setFocusId } = useGridListContext()
    const generatedId = React.useId()
    const id = idProp ?? `${rootId}-${generatedId}`
    const isFocused = focusId === id

    const getItems = React.useCallback(() => {
      return Array.from(
        rootRef.current?.querySelectorAll<HTMLElement>(
          '[role="row"][tabindex]:not([aria-disabled="true"])',
        ) ?? [],
      )
    }, [rootRef])

    const onFocus = React.useCallback(() => setFocusId(id), [id, setFocusId])

    const onKeyDown = React.useCallback<
      React.KeyboardEventHandler<HTMLDivElement>
    >(
      (event) => {
        const items = getItems()
        const currentIndex = items.findIndex((item) => item.id === id)

        const target =
          event.key === 'ArrowUp'
            ? items[(currentIndex - 1 + items.length) % items.length]
            : event.key === 'ArrowDown'
              ? items[(currentIndex + 1) % items.length]
              : event.key === 'Home'
                ? items[0]
                : event.key === 'End'
                  ? items[items.length - 1]
                  : undefined

        if (['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) {
          event.preventDefault()
          target?.focus()
        }
      },
      [getItems, id],
    )

    const onClick = React.useCallback<React.MouseEventHandler<HTMLDivElement>>(
      (event) => {
        if (disabled) {
          event.preventDefault()
          event.stopPropagation()
          return
        }

        onClickProp?.(event)
      },
      [disabled, onClickProp],
    )

    return (
      <chakra.div
        ref={ref}
        role="row"
        {...rest}
        id={id}
        aria-disabled={disabled || undefined}
        data-focus={isFocused ? '' : undefined}
        tabIndex={disabled ? -1 : (tabIndex ?? 0)}
        onClick={onClick}
        onFocus={callAll(onFocusProp, onFocus)}
        onKeyDown={callAll(onKeyDownProp, onKeyDown)}
      />
    )
  },
)

const GridListItem = withContext<HTMLDivElement, GridListItemProps>(
  GridListItemBase,
  'item',
)

interface GridListHeaderProps extends HTMLChakraProps<'header'> {}

const GridListHeaderBase = React.forwardRef<
  HTMLDivElement,
  GridListHeaderProps
>((props, ref) => <chakra.div ref={ref} role="columnheader" {...props} />)

const GridListHeader = withContext<HTMLDivElement, GridListHeaderProps>(
  GridListHeaderBase,
  'header',
)

interface GridListCellProps extends HTMLChakraProps<'div'> {}

const GridListCellBase = React.forwardRef<HTMLDivElement, GridListCellProps>(
  (props, ref) => <chakra.div ref={ref} role="gridcell" {...props} />,
)

const GridListCell = withContext<HTMLDivElement, GridListCellProps>(
  GridListCellBase,
  'cell',
)

export {
  GridListRoot as Root,
  GridListItem as Item,
  GridListHeader as Header,
  GridListCell as Cell,
}

export type {
  GridListRootProps as RootProps,
  GridListHeaderProps as HeaderProps,
  GridListItemProps as ItemProps,
  GridListCellProps as CellProps,
}
