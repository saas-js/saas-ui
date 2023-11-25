import * as React from 'react'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import weakMemoize from '@emotion/weak-memoize'
import { FrameContextConsumer, useFrame } from 'react-frame-component'
import { SaasProvider } from '@saas-ui/react'
import theme from '../../../../styles/theme'
import { useColorMode } from '@chakra-ui/system'

let memoizedCreateCacheWithContainer = weakMemoize((container: Node) => {
  let newCache = createCache({ key: 'frame', container })
  return newCache
})

export const FrameProvider = (props) => {
  const { colorMode } = useColorMode()

  return (
    <FrameContextConsumer>
      {({ document, window }) => {
        if (!document) {
          return null
        }

        return (
          <CacheProvider
            value={memoizedCreateCacheWithContainer(document.head)}
          >
            <ColorModeScript />
            <SaasProvider theme={theme}>{props.children}</SaasProvider>
          </CacheProvider>
        )
      }}
    </FrameContextConsumer>
  )
}

const ColorModeScript = () => {
  const { document, window } = useFrame()

  React.useEffect(() => {
    try {
      if (!document || !window) return
      var a = function (c) {
          var v = '(prefers-color-scheme: dark)',
            h = window.matchMedia(v).matches ? 'dark' : 'light',
            r = c === 'system' ? h : c,
            o = document.documentElement,
            s = document.body,
            l = 'chakra-ui-light',
            d = 'chakra-ui-dark',
            i = r === 'dark'
          return (
            s.classList.add(i ? d : l),
            s.classList.remove(i ? l : d),
            (o.style.colorScheme = r),
            (o.dataset.theme = r),
            r
          )
        },
        n = a,
        m = 'dark',
        e = 'chakra-ui-color-mode',
        t = localStorage.getItem(e)
      t ? a(t) : localStorage.setItem(e, a(m))
    } catch (a) {
      console.log(a)
    }
  }, [])
  return null
}
