/* eslint-disable @typescript-eslint/ban-types */
const isFunction = (value: any): value is Function =>
  typeof value === 'function'

export function runIfFn<T, U>(
  valueOrFn: T | ((...fnArgs: U[]) => T),
  ...args: U[]
): T {
  return isFunction(valueOrFn) ? valueOrFn(...args) : valueOrFn
}

export type MaybeRenderProp<P> =
  | React.ReactNode
  | ((props: P) => React.ReactNode)
