import { Container, Button } from '@chakra-ui/react'
import * as React from 'react'

import { useSnackbar } from '../'

export default {
  title: 'Components/Feedback/Snackbar',
  decorators: [
    (Story: any) => (
      <Container mt="40px">
        <Story />
      </Container>
    ),
  ],
}

export const basic = () => {
  const snackbar = useSnackbar()

  return (
    <Button onClick={() => snackbar.success('Success!')}>Show snackbar</Button>
  )
}
