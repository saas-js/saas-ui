import * as React from 'react'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import weakMemoize from '@emotion/weak-memoize'
import { FrameContextConsumer, useFrame } from 'react-frame-component'
import { SaasProvider, SaasProviderProps } from '@saas-ui/react'
import { ColorMode, ColorModeContext, useColorMode } from '@chakra-ui/react'

let memoizedCreateCacheWithContainer = weakMemoize((container: Node) => {
  let newCache = createCache({ key: 'chakra', container })
  return newCache
})

export const FrameProvider = (props: SaasProviderProps) => {
  const { colorMode } = useColorMode()

  return (
    <FrameContextConsumer>
      {({ document, window }) => {
        if (!document || !window) {
          return null
        }

        return (
          <CacheProvider
            value={memoizedCreateCacheWithContainer(document.head)}
          >
            <ColorModeScript colorMode={colorMode} />
            <SaasProvider
              environment={{
                getDocument: () => document,
                getWindow: () => window,
              }}
              {...props}
            >
              <SyncColorMode colorMode={colorMode}>
                {props.children}
              </SyncColorMode>
            </SaasProvider>
          </CacheProvider>
        )
      }}
    </FrameContextConsumer>
  )
}

const SyncColorMode = ({ children, colorMode: resolvedValue }) => {
  const [colorMode, setColorMode] = React.useState<ColorMode>(resolvedValue)

  const toggleColorMode = React.useCallback(() => {
    setColorMode(resolvedValue === 'dark' ? 'light' : 'dark')
  }, [resolvedValue, setColorMode])

  React.useEffect(() => {
    setColorMode(resolvedValue)
  }, [setColorMode, resolvedValue])

  return (
    <ColorModeContext.Provider
      value={{ colorMode, setColorMode, toggleColorMode }}
    >
      {children}
    </ColorModeContext.Provider>
  )
}

const ColorModeScript = ({ colorMode }) => {
  const { getSystemTheme, setClassName, setDataset, addListener } =
    useColorModeUtils()

  const setColorMode = React.useCallback(
    (value: ColorMode | 'system') => {
      const resolved = value === 'system' ? getSystemTheme() : value

      setClassName(resolved === 'dark')
      setDataset(resolved)
    },
    [getSystemTheme, setClassName, setDataset]
  )

  React.useEffect(() => {
    setColorMode(colorMode)
  }, [colorMode, setColorMode])

  React.useEffect(() => {
    return addListener(setColorMode)
  }, [addListener, setColorMode])

  return null
}

const classNames = {
  light: 'chakra-ui-light',
  dark: 'chakra-ui-dark',
}

type UtilOptions = {
  preventTransition?: boolean
  document?: Document
}

function useColorModeUtils(options: UtilOptions = {}) {
  const { preventTransition = true } = options

  const frame = useFrame()

  const doc = frame?.document ?? document
  const win = frame?.window ?? window

  const utils = {
    setDataset: (value: ColorMode) => {
      const cleanup = preventTransition ? utils.preventTransition() : undefined
      doc.documentElement.dataset.theme = value
      doc.documentElement.style.colorScheme = value
      cleanup?.()
    },
    setClassName(dark: boolean) {
      doc.body.classList.add(dark ? classNames.dark : classNames.light)
      doc.body.classList.remove(dark ? classNames.light : classNames.dark)
    },
    query() {
      return win.matchMedia('(prefers-color-scheme: dark)')
    },
    getSystemTheme(fallback?: ColorMode) {
      const dark = utils.query().matches ?? fallback === 'dark'
      return dark ? 'dark' : 'light'
    },
    addListener(fn: (cm: ColorMode) => unknown) {
      const mql = utils.query()
      const listener = (e: MediaQueryListEvent) => {
        fn(e.matches ? 'dark' : 'light')
      }

      if (typeof mql.addListener === 'function') mql.addListener(listener)
      else mql.addEventListener('change', listener)

      return () => {
        if (typeof mql.removeListener === 'function')
          mql.removeListener(listener)
        else mql.removeEventListener('change', listener)
      }
    },
    preventTransition() {
      const css = document.createElement('style')
      css.appendChild(
        document.createTextNode(
          `*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`
        )
      )
      doc.head.appendChild(css)

      return () => {
        // force a reflow
        ;(() => win.getComputedStyle(doc.body))()

        // wait for next tick
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            doc.head.removeChild(css)
          })
        })
      }
    },
  }

  return utils
}
