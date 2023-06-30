import * as React from 'react'
import { Story, Meta } from '@storybook/react'

import { useLocalStorage } from '../src'

import { Container, Button, ButtonGroup } from '@chakra-ui/react'

export default {
  title: 'Hooks/useLocalStorage',
} as Meta

export const Basic = () => {
  const [value, setValue] = useLocalStorage<string | undefined>(
    'story.basic',
    ''
  )

  return (
    <Container>
      <ButtonGroup>
        <Button onClick={() => setValue('Clicked')}>Value: {value}</Button>

        <Button onClick={() => setValue(undefined)}>Reset</Button>
      </ButtonGroup>
    </Container>
  )
}

export const DefaultValue = () => {
  const [value, setValue] = useLocalStorage<string | undefined>(
    'story.default',
    'Not clicked'
  )

  return (
    <Container>
      <ButtonGroup>
        <Button onClick={() => setValue('Clicked')}>Value: {value}</Button>

        <Button onClick={() => setValue(undefined)}>Reset</Button>
      </ButtonGroup>
    </Container>
  )
}
