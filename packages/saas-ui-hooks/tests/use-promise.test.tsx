import { renderHook, invoke } from '@saas-ui/test-utils'

import { usePromise } from '../src'

const TestFn = (shouldReject: boolean) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => (shouldReject ? reject() : resolve(true)))
  })
}

describe('usePromise', () => {
  test('it should return', () => {
    const { result } = renderHook(() => usePromise(TestFn))

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
    const { result } = renderHook(() => usePromise(TestFn))

    expect(result.current[0].isLoading).toBeFalsy()

    const promise = invoke(() => result.current[1]())

    expect(result.current[0].isLoading).toBeTruthy()

    await promise

    expect(result.current[0].isLoading).toBeFalsy()
  })

  test('it should resolve', async () => {
    const { result } = renderHook(() => usePromise(TestFn))

    await invoke(() => result.current[1]())

    expect(result.current[0].data).toBeTruthy()

    expect(result.current[0].isResolved).toBeTruthy()
  })

  test('it should reject', async () => {
    const { result } = renderHook(() => usePromise(TestFn))

    try {
      await invoke(() => result.current[1](true))
    } catch (e) {
      expect(e).toBeFalsy()
    }

    expect(result.current[0].isRejected).toBeTruthy()
  })

  test('it should trigger onSuccess', async () => {
    const { result } = renderHook(() => usePromise(TestFn))

    const onSuccess = jest.fn((result) => expect(result).toBeTruthy())

    await invoke(() => result.current[1]().then(onSuccess))

    expect(onSuccess).toBeCalled()
  })

  test('it should trigger onError', async () => {
    const { result } = renderHook(() => usePromise(TestFn))

    const onError = jest.fn(() => null)

    await invoke(() => result.current[1](true).catch(onError))

    expect(onError).toBeCalled()
  })
})
