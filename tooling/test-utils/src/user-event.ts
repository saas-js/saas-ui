import $userEvent from '@testing-library/user-event'

import { press } from './press'

const userEvent = {
  ...$userEvent,
  press,
  setup(...args: Parameters<typeof $userEvent.setup>) {
    return {
      ...$userEvent.setup(...args),
      press,
    }
  },
}

export { userEvent }
