import * as React from 'react'

import { createContext } from '@chakra-ui/react'
import { queryAll } from '@zag-js/dom-utils'

import { callAll } from '../utils/call-all'

interface GridListContext {
  id: string
  containerRef: React.RefObject<HTMLUListElement>
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
  onBlur?: React.FocusEventHandler<HTMLUListElement>
}

export const useGridList = (props: UseGridListProps) => {
  const id = React.useId()

  const ref = React.useRef<HTMLUListElement>(null)

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
