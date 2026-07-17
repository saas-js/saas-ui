'use client'

import * as React from 'react'

export type ModalId = string | number

export interface ModalOptions {
  title?: React.ReactNode
  body?: React.ReactNode
  open?: boolean
  onOpenChange?: (details: { open: boolean }) => void
  onClose?: (args: { force?: boolean }) => Promise<boolean | undefined> | void
  [key: string]: any
}

export interface AlertDialogOptions extends ModalOptions {
  onConfirm?: () => Promise<void> | void
}

export interface ConfirmDialogOptions extends AlertDialogOptions {
  leastDestructiveFocus?: 'cancel' | 'confirm'
  onCancel?: () => Promise<void> | void
}

export type ModalScope = 'modal' | 'alert' | (string & {})

export interface OpenOptions<TModalTypes extends string> extends ModalOptions {
  type?: TModalTypes
  scope?: ModalScope
}

export interface ModalConfig<
  TModalOptions extends ModalOptions = ModalOptions,
  TModalTypes extends string = string,
> {
  id?: ModalId | null
  props?: TModalOptions | null
  scope?: ModalScope
  type?: TModalTypes
  component?: React.ComponentType<any>
  open?: boolean
}

type ModalDefinitions = Record<string, React.ComponentType<any>>

type WithModalOptions<T> = Omit<T, 'open' | 'onOpenChange'> & ModalOptions

type DefaultModalOptions<TModals extends ModalDefinitions> =
  'modal' extends keyof TModals
    ? WithModalOptions<React.ComponentPropsWithRef<TModals['modal']>>
    : never

type ResolvedOpenOptions = ModalOptions & {
  id?: ModalId
  type?: string
  scope?: ModalScope
  component?: React.ComponentType<any>
}

export interface ModalsContextValue<
  TModals extends ModalDefinitions = ModalDefinitions,
  TTypes extends Extract<keyof TModals, string> = Extract<
    keyof TModals,
    string
  >,
> {
  open: {
    <TType extends TTypes>(
      options: { type: TType } & WithModalOptions<
        React.ComponentPropsWithRef<TModals[TType]>
      >,
    ): ModalId
    <TComponent extends React.ComponentType<any>>(
      options: { component: TComponent } & WithModalOptions<
        React.ComponentPropsWithRef<TComponent>
      >,
    ): ModalId
    <TComponent extends React.ComponentType<any>>(
      component: TComponent,
      options: WithModalOptions<React.ComponentPropsWithRef<TComponent>>,
    ): ModalId
    (options: DefaultModalOptions<TModals>): ModalId
  }
  alert: (options: AlertDialogOptions) => ModalId
  confirm: (options: ConfirmDialogOptions) => ModalId
  close: (id: ModalId) => void
  closeAll: () => void
}

export const ModalsContext = React.createContext<ModalsContextValue | null>(
  null,
)

export interface ModalsProviderProps<
  TModals extends ModalDefinitions = ModalDefinitions,
> {
  children: React.ReactNode
  modals: TModals
}

const initialModalState: ModalConfig = {
  id: null,
  props: null,
  type: 'modal',
}

export function ModalsProvider<TModals extends ModalDefinitions>({
  children,
  modals,
}: ModalsProviderProps<TModals>) {
  const instances = React.useRef(new Set<ModalConfig>())
  const nextId = React.useRef(0)
  const [activeModals, setActiveModals] = React.useState<
    Record<string, ModalConfig>
  >({
    modal: initialModalState,
  })

  const getModalComponent = React.useCallback(
    (type = 'modal') => modals[type] || modals.modal,
    [modals],
  )

  const setActiveModal = React.useCallback(
    (modal: ModalConfig, scope = 'modal') => {
      setActiveModals((current) => ({ ...current, [scope]: modal }))
    },
    [],
  )

  const open = React.useCallback(
    (
      componentOrOptions: React.ComponentType<any> | ResolvedOpenOptions,
      options?: ModalOptions,
    ): ModalId => {
      const resolvedOptions: ResolvedOpenOptions =
        typeof componentOrOptions === 'function'
          ? { component: componentOrOptions, ...options }
          : componentOrOptions
      const {
        id = ++nextId.current,
        type = 'modal',
        scope = 'modal',
        component,
        ...props
      } = resolvedOptions
      const modal: ModalConfig = {
        id,
        props,
        type,
        scope,
        component,
        open: true,
      }

      instances.current.add(modal)
      setActiveModal(modal, scope as string)

      return id
    },
    [setActiveModal],
  )

  const alert = React.useCallback(
    (options: AlertDialogOptions) =>
      open({ ...options, type: 'alert', scope: 'alert' }),
    [open],
  )

  const confirm = React.useCallback(
    (options: ConfirmDialogOptions) =>
      open({ ...options, type: 'confirm', scope: 'alert' }),
    [open],
  )

  const closeComplete = React.useCallback(
    (id?: ModalId | null) => {
      const modal = Array.from(instances.current).find(
        (instance) => instance.id === id,
      )
      if (!modal) return

      instances.current.delete(modal)
      const scoped = Array.from(instances.current).filter(
        ({ scope }) => scope === modal.scope,
      )
      if (scoped.length === 0) {
        setActiveModal(initialModalState, modal.scope)
      }
    },
    [setActiveModal],
  )

  const close = React.useCallback(
    async (id?: ModalId | null, force?: boolean) => {
      const allModals = Array.from(instances.current)
      const modal = allModals.find((instance) => instance.id === id)
      if (!modal) return

      const shouldClose = await modal.props?.onClose?.({ force })
      if (shouldClose === false) return

      const scoped = allModals.filter(({ scope }) => scope === modal.scope)
      if (scoped.length > 1) {
        setActiveModal(scoped[scoped.length - 2], modal.scope)
      } else {
        setActiveModal({ ...modal, open: false }, modal.scope)
      }

      setTimeout(() => closeComplete(id), 200)
    },
    [closeComplete, setActiveModal],
  )

  const closeAll = React.useCallback(() => {
    instances.current.forEach((modal) =>
      modal.props?.onClose?.({ force: true }),
    )
    instances.current.clear()
    setActiveModals({ modal: initialModalState })
  }, [])

  const context = React.useMemo<ModalsContextValue<TModals>>(
    () => ({
      open: open as ModalsContextValue<TModals>['open'],
      alert,
      confirm,
      close,
      closeAll,
    }),
    [alert, close, closeAll, confirm, open],
  )

  return (
    <ModalsContext.Provider value={context as ModalsContextValue}>
      {Object.entries(activeModals).map(([scope, config]) => {
        const Component = config.component || getModalComponent(config.type)
        if (!Component) return null

        const { title, body, ...props } = config.props || {}
        return (
          <Component
            key={scope}
            title={title}
            {...props}
            open={!!config.open}
            onOpenChange={(details: { open: boolean }) => {
              if (!details.open && config.id != null) void close(config.id)
            }}
            onExitComplete={() => closeComplete(config.id)}
          >
            {body}
          </Component>
        )
      })}
      {children}
    </ModalsContext.Provider>
  )
}

export const useModalsContext = () => React.useContext(ModalsContext)

export const useModals = () => {
  const modals = useModalsContext()
  if (!modals) {
    throw new Error('useModals must be used within a ModalsProvider')
  }
  return modals
}
