export {
  HotkeysProvider,
  useHotkeysContext,
  splitKeys,
  useHotkeys,
  useHotkeysShortcut,
  Hotkey,
  createHotkeys,
} from '@saas-ui/use-hotkeys'
export type {
  HotkeysProviderProps,
  UseHotkeysOptions,
  HotkeysConfig,
  HotkeyProps,
  HotkeysContextValues,
  HotkeysGroupConfig,
  HotkeysGroupItems,
  HotkeysItemConfig,
} from '@saas-ui/use-hotkeys'

export {
  HotkeysCommand,
  HotkeysGroup,
  HotkeysItem,
  HotkeysList,
  HotkeysListItems,
  HotkeysSearch,
  useHotkeysSearch,
} from './hotkeys'
export type {
  HotkeysGroupProps,
  HotkeysItemProps,
  HotkeysListProps,
  HotkeysOptions,
  UseHotkeysListReturn,
} from './hotkeys'

import { HotkeysConfig } from '@saas-ui/use-hotkeys'

/**
 * @deprecated Use `HotkeysConfig` instead.
 */
export type HotkeysListOptions = HotkeysConfig
