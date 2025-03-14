export function callAll<T extends (...args: any[]) => any>(
  ...fns: (T | undefined)[]
) {
  return function mergedFn(...args: Parameters<T>) {
    fns.forEach((fn) => fn?.(...args))
  }
}
