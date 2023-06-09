import { hooks } from '@saas-ui/test-utils'

import { usePromise } from '../src'
import { vi } from 'vitest'

const TestFn = (shouldReject?: boolean) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => (shouldReject ? reject() : resolve(true)))
  })
}

describe('usePromise', () => {
  test('it should return', () => {
    const { result } = hooks.render(() => usePromise(TestFn))

    expect(result.current).toBeInstanceOf(Array)

    expect(result.current[0]).toStrictEqual({
      error: null,
      data: null,
      isLoading: false,
      isResolved: false,
      isRejected: false,
    })

    expect(result.current[1]).toBeInstanceOf(Function)
  })

  test('it should update isLoading', async () => {
    const { result } = hooks.render(() => usePromise(TestFn))

    expect(result.current[0].isLoading).toBeFalsy()

    const promise = hooks.act(() => result.current[1]())

    expect(result.current[0].isLoading).toBeTruthy()

    await promise

    expect(result.current[0].isLoading).toBeFalsy()
  })

  test('it should resolve', async () => {
    const { result } = hooks.render(() => usePromise(TestFn))

    await hooks.act(() => result.current[1]())

    expect(result.current[0].data).toBeTruthy()

    expect(result.current[0].isResolved).toBeTruthy()
  })

  test('it should reject', async () => {
    const { result } = hooks.render(() => usePromise(TestFn))

    try {
      await hooks.act(() => result.current[1](true))
    } catch (e) {
      expect(e).toBeFalsy()
    }

    expect(result.current[0].isRejected).toBeTruthy()
  })

  test('it should trigger onSuccess', async () => {
    const { result } = hooks.render(() => usePromise(TestFn))

    const onSuccess = vi.fn((result) => expect(result).toBeTruthy())

    await hooks.act(() => result.current[1]().then(onSuccess))

    expect(onSuccess).toBeCalled()
  })

  test('it should trigger onError', async () => {
    const { result } = hooks.render(() => usePromise(TestFn))

    const onError = vi.fn(() => null)

    await hooks.act(() => result.current[1](true).catch(onError))

    expect(onError).toBeCalled()
  })
})
