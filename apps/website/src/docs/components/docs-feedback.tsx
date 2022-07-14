import { Button, ButtonGroup, Flex, Stack, Text } from '@chakra-ui/react'

export const DocsFeedback = () => {
  return (
    <Flex pt="20" justifyContent="center">
      <Stack alignItems="center">
        <Text color="muted">Was this helpful?</Text>

        <ButtonGroup variant="ghost">
          <FeedbackButton aria-label="Yes">😃</FeedbackButton>
          <FeedbackButton aria-label="Neutral">😐</FeedbackButton>
          <FeedbackButton aria-label="Disappointed">😞</FeedbackButton>
        </ButtonGroup>
      </Stack>
    </Flex>
  )
}

const FeedbackButton = ({ children, ...rest }) => {
  const onClick = () => {
    fetch('/api/rate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        page: window.location.href,
        rating: children,
      }),
    })
  }
  return (
    <Button
      fontSize="2xl"
      transition="all .2s ease-out"
      transformOrigin="center"
      _hover={{ transform: 'scale(1.4)' }}
      onClick={onClick}
      {...rest}
    >
      {children}
    </Button>
  )
}
