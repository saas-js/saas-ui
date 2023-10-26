import * as React from 'react'
import { Button, ButtonGroup, Flex, Stack, Text } from '@chakra-ui/react'
import {
  Field,
  Form,
  FormLayout,
  SubmitButton,
  useLocalStorage,
} from '@saas-ui/react'

const options = {
  Yes: '😃',
  Neutral: '😐',
  Disappointed: '😞',
}

export const DocsFeedback = () => {
  const [rating, setRating] = React.useState()

  return (
    <Flex pt="20" justifyContent="center">
      <Stack alignItems="center">
        <Text color="muted">Was this helpful?</Text>

        {rating ? (
          <FeedbackForm rating={rating} />
        ) : (
          <ButtonGroup variant="ghost">
            {Object.entries(options).map(([label, emoji]) => (
              <FeedbackButton
                key={label}
                aria-label={label}
                onClick={setRating}
              >
                {emoji}
              </FeedbackButton>
            ))}
          </ButtonGroup>
        )}
      </Stack>
    </Flex>
  )
}

const FeedbackButton = ({ children, onClick: onClickProp, ...rest }) => {
  const [data] = useLocalStorage('saas-ui.data', null)

  const onClick = () => {
    onClickProp(rest['aria-label'])
    fetch('/api/rate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        page: window.location.href,
        rating: children,
        username: data.githubAccount,
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

const FeedbackForm = (props) => {
  const [data] = useLocalStorage('saas-ui.data', null)
  const { rating } = props

  const [submitted, setSubmitted] = React.useState(false)

  const onSubmit = async (formData) => {
    const result = await fetch('/api/rate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        page: window.location.href,
        rating: options[rating],
        feedback: formData.feedback,
        username: data.githubAccount,
      }),
    })

    if (result.ok) {
      setSubmitted(true)
    }
  }

  const placeholder =
    rating === 'Yes' ? 'What did you like?' : 'What can we do better?'

  return (
    <Form onSubmit={onSubmit}>
      <FormLayout>
        {submitted ? (
          <Text color="muted" mt="8">
            Thanks for your feedback! 🙏
          </Text>
        ) : (
          <FormLayout>
            <Field
              name="feedback"
              type="textarea"
              width="300px"
              placeholder={placeholder}
              autoFocus
            />
            <SubmitButton />
          </FormLayout>
        )}
      </FormLayout>
    </Form>
  )
}
