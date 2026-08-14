'use client'

import * as React from 'react'

import {
  type ModalsContextValue,
  ModalsProvider,
  type ModalsProviderProps,
  useModals,
} from './modals-provider'

export interface CreateModalsOptions<
  TModalDefinitions extends Record<string, React.ComponentType<any>>,
> {
  modals: TModalDefinitions
}

export const createModals = <
  TModalDefinitions extends Record<string, React.ComponentType<any>>,
>({
  modals,
}: CreateModalsOptions<TModalDefinitions>) => {
  const Provider = (
    props: Omit<ModalsProviderProps<TModalDefinitions>, 'modals'>,
  ) => <ModalsProvider {...props} modals={modals} />

  Provider.displayName = 'ModalsProvider'

  return {
    ModalsProvider: Provider,
    useModals: useModals as () => ModalsContextValue<TModalDefinitions>,
  }
}
