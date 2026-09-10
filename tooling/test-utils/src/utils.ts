import { act } from '@testing-library/react'

export function queue(): Promise<void> {
  return act(() => Promise.resolve())
}

export function nextTick(): Promise<void> {
  return act(
    () =>
      new Promise<void>((resolve) => requestAnimationFrame(() => resolve())),
  )
}

export async function sleep(ms = 16): Promise<void> {
  await act(() => new Promise((resolve) => setTimeout(resolve, ms)))
  await nextTick()
}
