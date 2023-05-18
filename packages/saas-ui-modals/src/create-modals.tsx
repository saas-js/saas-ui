import { defaultModals } from './default-modals'
import {
  ModalsContextValue,
  ModalsProvider,
  ModalsProviderProps,
  useModals,
} from './provider'

export interface CreateModalsOptions<
  TModalDefs extends Record<string, React.FC<any>>
> {
  modals: TModalDefs
}

export const createModals = <TModalDefs extends Record<string, React.FC<any>>>(
  options: CreateModalsOptions<TModalDefs>
) => {
  const modals = {
    ...defaultModals,
    ...options.modals,
  }
  const Provider = (props: Omit<ModalsProviderProps, 'modals'>) => {
    return <ModalsProvider children={props.children} modals={modals} />
  }

  return {
    ModalsProvider: Provider,
    useModals: useModals as () => ModalsContextValue<typeof modals>,
  }
}
