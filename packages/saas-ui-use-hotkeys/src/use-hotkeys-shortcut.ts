import { useHotkeysContext } from './provider'
import { useHotkeys, UseHotkeysOptions } from './use-hotkeys'

/**
 * useHotkeysShortcut React Hook
 *
 * Accepts one key combination or a shortcut
 *
 * Shortcuts refer to a predefined hotkeys configuration.
 * @see https://www.saas-ui.dev/docs/navigation/hotkeys
 *
 * For example:
 * ctrl+f or general.search
 *
 * Supports shifted keys like ?, =, >.
 *
 * ⌥ ⇧ ⌃ ⌘ shorthands are supported.
 *
 * @param keyOrShortcut Key combinations or a hotkeys shortcut
 * @param callback The function to execute when the keys are pressed
 * @param deps Deps for the callback function
 * @returns The key combination(s)
 */
export const useHotkeysShortcut = (
  keyOrShortcut: string | string[],
  callback: (event: KeyboardEvent) => void,
  options: UseHotkeysOptions | Array<any> = [],
  deps?: Array<any>
): string => {
  const { hotkeys } = useHotkeysContext()

  let keys = keyOrShortcut

  if (typeof keys === 'string') {
    const [group, key] = keys.split('.')

    if (group && key) {
      keys = hotkeys?.[group]?.hotkeys[key]?.command
    }

    if (!keys) {
      keys = keyOrShortcut
    }
  }

  useHotkeys(keys, callback, options, deps)

  return typeof keys === 'string' ? keys : keys[0]
}
