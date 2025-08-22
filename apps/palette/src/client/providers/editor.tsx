import {
  type Dispatch,
  type SetStateAction,
  startTransition,
  useEffect,
  useState,
} from 'react'

import { createContext } from '@chakra-ui/react'

import { usePalette } from './palette'

const baseColor = '#6d28d9'
const grayColor = '#1f2937'

export const [EditorProvider, useEditorContext] =
  createContext<UseEditorReturn>()

export const useEditor = (): UseEditorReturn => {
  const [{ colors: palette, color: base, options }, setPalette] = usePalette()

  const [state, setState] = useState<EditorState>({
    theme: options?.theme || 'Saas UI',
    color: base || baseColor,
    gray: options?.colors?.gray || grayColor,
    blackLuminance: options?.blackLuminance || 0.005,
  })

  const { theme, color, gray, blackLuminance } = state

  // const updatePalette = useMemo(
  // 	() =>
  // 		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
  // 		// debounce((color: string, options: Record<string, any>) => {
  // 			// if (color.match(/#[0-9a-fA-F]{6}/)) {
  // 			setPalette(color, options)
  // 			// }
  // 		// }, 200),
  // 		,
  // 	[setPalette],
  // );

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    startTransition(() => {
      setPalette(color, {
        colors: {
          gray,
          primary: color,
        },
        blackLuminance,
        theme,
      })
    })
  }, [color, gray, blackLuminance, theme])

  // useEffect(() => {
  // 	return () => {
  // 		updatePalette.cancel();
  // 	};
  // }, [updatePalette]);

  return [state, setState]
}

interface EditorState {
  theme: string
  color: string
  gray: string
  blackLuminance: number
}

export type UseEditorReturn = [
  EditorState,
  Dispatch<SetStateAction<EditorState>>,
]
