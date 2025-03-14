import * as React from 'react'

import { nextById, prevById, queryAll } from '@zag-js/dom-utils'

import { callAll, createContext, dataAttr } from '#utils'

interface GridListContext {
  id: string
  containerRef: React.RefObject<HTMLDivElement>
  focusId: string | null
  setFocusId: React.Dispatch<React.SetStateAction<string | null>>
}

export const [GridListProvider, useGridListContext] =
  createContext<GridListContext>({
    name: 'GridListContext',
    errorMessage:
      'useGridListContext: `context` is undefined. Seems you forgot to wrap the components in `<GridList />`',
  })

function queryAllItems(root: HTMLElement | null) {
  return queryAll(root, `[role='button']:not([disabled])`)
}

export interface UseGridListProps {
  id?: string
  onBlur?: React.FocusEventHandler<HTMLDivElement>
}

export const useGridList = (props: UseGridListProps) => {
  const id = React.useId()

  const ref = React.useRef<HTMLDivElement>(null)

  const [focusId, setFocusId] = React.useState<string | null>(null)

  const listProps = {
    onBlur: callAll(props.onBlur, (e) => {
      if (e.relatedTarget) {
        const items = queryAllItems(ref.current)
        if (!items.includes(e.relatedTarget as HTMLElement)) {
          setFocusId(null)
        }
      }
    }),
  }

  return {
    id: props.id ?? id,
    containerRef: ref,
    focusId,
    setFocusId,
    listProps,
  }
}

export interface GridListItemOptions {
  id?: string
  disabled?: boolean
  onFocus?: React.FocusEventHandler<HTMLDivElement>
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

export const useGridListItem = (props: GridListItemOptions) => {
  const {
    id: containerId,
    containerRef,
    focusId,
    setFocusId,
  } = useGridListContext()

  const id = `${containerId}-${React.useId()}`
  const buttonId = props.id ?? id

  const isFocused = focusId === buttonId

  function getItems() {
    return queryAll(
      containerRef.current,
      `.sui-list__item-button:not([aria-disabled=true])`,
    )
  }

  const itemProps = {
    id: buttonId,
    ['data-focus']: dataAttr(isFocused),
    ['aria-disabled']: props.disabled ? true : undefined,
    tabIndex: props.disabled ? -1 : 0,
    onFocus: callAll(props.onFocus, () => {
      setFocusId(buttonId)
    }),
    onKeyDown: callAll(
      props.onKeyDown,
      React.useCallback(
        (e: React.KeyboardEvent) => {
          const items = getItems()

          const keyMap: Record<string, React.KeyboardEventHandler> = {
            ArrowUp: () => {
              prevById(items, buttonId)?.focus()
            },
            ArrowDown: () => {
              nextById(items, buttonId)?.focus()
            },
            Home: () => {
              items[0]?.focus()
            },
            End: () => {
              items[items.length - 1]?.focus()
            },
          }

          if (keyMap[e.key]) {
            e.preventDefault()
            keyMap[e.key](e)
          }
        },
        [buttonId],
      ),
    ),
    onClick: (e: React.MouseEvent<HTMLDivElement>) => {
      if (props.disabled) {
        e.preventDefault()
        e.stopPropagation()
        return
      }

      props.onClick?.(e)
    },
  }

  return {
    itemProps,
  }
}
