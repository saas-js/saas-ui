import { createContext } from '@chakra-ui/react-utils'
import { debounce } from 'lodash'
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import { usePalette } from './palette'

const baseColor = '#6d28d9'
const grayColor = '#1f2937'

export const [EditorProvider, useEditorContext] =
  createContext<UseEditorReturn>()

export const useEditor = (): UseEditorReturn => {
  const [{ colors: palette, color: base, options }, setPalette] = usePalette()

  const [state, setState] = useState({
    theme: options?.theme || 'Saas UI',
    color: base || baseColor,
    gray: options?.colors?.gray || grayColor,
    blackLuminance: options?.blackLuminance || 0.005,
  })

  const { theme, color, gray, blackLuminance } = state

  const updatePalette = useMemo(
    () =>
      debounce((color: any, options) => {
        if (color.match(/#[0-9a-fA-F]{6}/)) {
          setPalette(color, options)
        }
      }, 200),
    [setPalette]
  )

  useEffect(() => {
    updatePalette(color, {
      colors: {
        gray,
        primary: color,
      },
      blackLuminance,
      theme,
    })
  }, [color, gray, blackLuminance, theme, updatePalette])

  useEffect(() => {
    return () => {
      updatePalette.cancel()
    }
  }, [updatePalette])

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
  Dispatch<SetStateAction<EditorState>>
]
