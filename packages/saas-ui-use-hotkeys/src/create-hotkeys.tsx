import {
  HotkeysConfig,
  HotkeysContextValues,
  HotkeysProviderProps,
  useHotkeysContext,
} from './provider'

export const createHotkeys = <Config extends HotkeysConfig>(
  hotkeys: Config
) => {
  return {
    hotkeys,
    HotkeysProvider: (props: { children: React.ReactNode }) => (
      <HotkeysProviderProps {...props} hotkeys={hotkeys} />
    ),
    useHotkeysContext: () =>
      useHotkeysContext() as HotkeysContextValues<Config>,
  }
}
