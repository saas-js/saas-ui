import * as React from 'react'

import { EnvironmentProvider } from '@chakra-ui/react'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import weakMemoize from '@emotion/weak-memoize'
import { FrameContextConsumer } from 'react-frame-component'

import {
  Provider as SuiProvider,
  ProviderProps as SuiProviderProps,
} from '#components/setup/provider/provider'

let memoizedCreateCacheWithContainer = weakMemoize((container: Node) => {
  let newCache = createCache({ key: 'chakra', container })
  return newCache
})

export const FrameProvider = (props: SuiProviderProps) => {
  return (
    <FrameContextConsumer>
      {({ document, window }) => {
        if (!document || !window) {
          return null
        }

        return (
          <EnvironmentProvider value={document}>
            <CacheProvider
              value={memoizedCreateCacheWithContainer(document.head)}
            >
              {/* <ColorModeScript colorMode={colorMode} /> */}

              <SuiProvider {...props}>
                {/* <SyncColorMode colorMode={colorMode}> */}
                {props.children}
                {/* </SyncColorMode> */}
              </SuiProvider>
            </CacheProvider>
          </EnvironmentProvider>
        )
      }}
    </FrameContextConsumer>
  )
}
