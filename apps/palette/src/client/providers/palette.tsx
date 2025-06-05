import React, {
  type PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'

import { createPalette } from '@saas-ui/palette'

type PaletteContextType = [
  {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    colors: Record<string, any>
    color: string
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    options?: Record<string, any>
  },
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  (color: string, options: Record<string, any>) => void,
]

export const PaletteContext = React.createContext<PaletteContextType | null>(
  null,
)

interface PaletteProviderProps
  extends PropsWithChildren<{
    color: string
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    options?: Record<string, any>
  }> {}

const PaletteProvider = ({
  color = '#6d28d9',
  options: optionsProp = {
    colors: {
      gray: '#1f2937',
      primary: '#6d28d9',
    },
    blackLuminance: 0.005,
    theme: 'Saas UI',
  },
  children,
}: PaletteProviderProps) => {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [colors, setColors] = useState<Record<string, any>>(() =>
    createPalette(color, optionsProp),
  )
  const [options, setOptions] = useState<Record<string, string>>(optionsProp)

  const [worker, setWorker] = useState<Worker | null>(null)

  useEffect(() => {
    const newWorker = new Worker(
      new URL('../components/palette-worker.ts', import.meta.url),
      {
        type: 'module',
      },
    )
    setWorker(newWorker)

    const handleMessage = (e: MessageEvent) => {
      const { palette } = e.data
      setColors(palette)
    }

    newWorker.addEventListener('message', handleMessage)

    return () => {
      newWorker.removeEventListener('message', handleMessage)
      newWorker.terminate()
    }
  }, [])

  const setPalette = React.useCallback(
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    (color: string, options: Record<string, any>) => {
      console.log('setting palette', color, options)
      worker?.postMessage({ color, options })
      setOptions(options)
    },
    [worker],
  )

  // useEffect(() => {
  // 	if (color) {
  // 		setPalette(color, optionsProp);
  // 	}
  // }, [color, optionsProp, setPalette]);

  const value = [{ color, options, colors }, setPalette] as PaletteContextType

  return (
    <PaletteContext.Provider value={value}>{children}</PaletteContext.Provider>
  )
}

export function usePalette() {
  const ctx = useContext(PaletteContext)
  if (!ctx) {
    throw new Error('usePalette must be used within a PaletteProvider')
  }
  return ctx
}

export default PaletteProvider
