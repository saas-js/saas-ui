'use client'

import * as React from 'react'

import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { useServerInsertedHTML } from 'next/navigation'

/**
 * Flush Emotion styles into <head> during streaming SSR. Without this the
 * inline <style> tags Emotion renders on the server don't exist on the client
 * and hydration fails.
 */
export function EmotionRegistry(props: { children: React.ReactNode }) {
  const [registry] = React.useState(() => {
    const cache = createCache({ key: 'css' })
    cache.compat = true
    const insert = cache.insert
    let inserted: { name: string; global: boolean }[] = []
    cache.insert = (...args) => {
      const [selector, serialized] = args
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push({ name: serialized.name, global: !selector })
      }
      return insert(...args)
    }
    const flush = () => {
      const previous = inserted
      inserted = []
      return previous
    }
    return { cache, flush }
  })

  useServerInsertedHTML(() => {
    const inserted = registry.flush()
    if (inserted.length === 0) return null

    let styles = ''
    let dataEmotionAttribute = registry.cache.key
    const globals: { name: string; style: string }[] = []

    for (const { name, global } of inserted) {
      const style = registry.cache.inserted[name]
      if (typeof style !== 'string') continue
      if (global) {
        globals.push({ name, style })
      } else {
        styles += style
        dataEmotionAttribute += ` ${name}`
      }
    }

    return (
      <>
        {globals.map(({ name, style }) => (
          <style
            key={name}
            data-emotion={`${registry.cache.key}-global ${name}`}
            dangerouslySetInnerHTML={{ __html: style }}
          />
        ))}
        {styles && (
          <style
            data-emotion={dataEmotionAttribute}
            dangerouslySetInnerHTML={{ __html: styles }}
          />
        )}
      </>
    )
  })

  return <CacheProvider value={registry.cache}>{props.children}</CacheProvider>
}
