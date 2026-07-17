import { useEffect } from 'react'

import { addons } from 'storybook/preview-api'

import { EVENTS } from '../constants'

/**
 * Render <ColorModeSync /> to sync the storybook color mode with Chakra UI
 */
export function ColorModeSync() {
  useEffect(() => {
    const channel = addons.getChannel()

    const colorModeToolCallback = (value: string) => {
      const dark = value === 'dark'
      document.documentElement.classList.toggle('dark', dark)
      document.documentElement.style.colorScheme = dark ? 'dark' : 'light'
    }
    channel.on(EVENTS.TOGGLE_COLOR_MODE, colorModeToolCallback)

    return () => {
      channel.removeListener(EVENTS.TOGGLE_COLOR_MODE, colorModeToolCallback)
    }
  }, [])

  return null
}
