import * as React from 'react'
import { hooks, render, act, fireEvent } from '@saas-ui/test-utils'
import { Button } from '@chakra-ui/button'
import {
  RouterProvider,
  useNavigate,
  useLocation,
  useParams,
  useActivePath,
  RouterContextValue,
  useRouterContext,
} from '../src'

const renderRouter = (router: RouterContextValue, ui: React.ReactNode) => {
  return render(<RouterProvider value={router}>{ui}</RouterProvider>)
}

test('it should navigate', () => {
  const router = {
    navigate: jest.fn(),
    back: jest.fn(),
    params: {},
    location: {
      pathname: '/test',
    },
  }

  const Component = () => {
    const navigate = useNavigate()

    return (
      <Button onClick={() => navigate('/test')} data-testid="btn">
        Navigate
      </Button>
    )
  }

  const { getByTestId } = renderRouter(router, <Component />)

  act(() => {
    fireEvent.click(getByTestId('btn'))
  })

  expect(router.navigate).toBeCalled()
})

test('it should go back', () => {
  const router = {
    navigate: jest.fn(),
    back: jest.fn(),
    params: {},
    location: {
      pathname: '/test',
    },
  }

  const Component = () => {
    const { back } = useRouterContext()

    return (
      <Button onClick={() => back()} data-testid="btn">
        Navigate
      </Button>
    )
  }

  const { getByTestId } = renderRouter(router, <Component />)

  act(() => {
    fireEvent.click(getByTestId('btn'))
  })

  expect(router.back).toBeCalled()
})

test('it should return correct location', () => {
  const router = {
    navigate: jest.fn(),
    back: jest.fn(),
    params: {},
    location: {
      pathname: '/test',
    },
  }

  const Component = () => {
    const location = useLocation()

    return <Button data-testid="btn">{location?.pathname}</Button>
  }

  const { getByText } = renderRouter(router, <Component />)

  const text = getByText('/test')

  expect(text).toBeInTheDocument()
})

test('it should return params', () => {
  const router = {
    navigate: jest.fn(),
    back: jest.fn(),
    params: {
      id: 'test',
    },
    location: {
      pathname: '/test',
    },
  }

  const Component = () => {
    const params = useParams()

    return <Button data-testid="btn">{params?.id}</Button>
  }

  const { getByText } = renderRouter(router, <Component />)

  const text = getByText('test')

  expect(text).toBeInTheDocument()
})

test('it should render active path', () => {
  const router = {
    navigate: jest.fn(),
    back: jest.fn(),
    params: {},
    location: {
      pathname: '/test',
    },
  }

  const Component = () => {
    const isActive = useActivePath('/test')

    return (
      <Button data-testid="btn" isActive={isActive}>
        Test
      </Button>
    )
  }

  const { getByTestId } = renderRouter(router, <Component />)

  expect(getByTestId('btn')).toHaveAttribute('data-active')
})
