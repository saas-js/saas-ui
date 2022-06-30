import * as React from 'react'

import { render, act, fireEvent, testStories } from '@saas-ui/test-utils'
import * as stories from '../stories/banner.stories'
import { useDisclosure } from '@chakra-ui/hooks'

const { Basic } = testStories<typeof stories>(stories)

const Compose = (props) => {
  const { isOpen, onClose } = useDisclosure({
    defaultIsOpen: true,
    ...props,
  })
  return <Basic data-testid="banner" isOpen={isOpen} onClose={onClose} />
}

test('should hide on close', async () => {
  const onClose = jest.fn()
  const { getByLabelText } = render(<Compose onClose={onClose} />)

  const reset = getByLabelText('Close')

  await act(async () => {
    fireEvent.click(reset)
  })

  expect(onClose).toBeCalled()
})
