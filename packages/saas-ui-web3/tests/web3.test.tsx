import { render } from '@chakra-ui/test-utils'

import { Web3 } from '../src'

test('renders Web3 component with title', () => {
  const { getByText } = render(<Web3 title="Web3" />)
  const title = getByText(/Web3/)
  expect(title).toBeInTheDocument()
})
