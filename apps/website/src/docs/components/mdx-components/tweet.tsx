import { useColorMode } from '@chakra-ui/system'
import { Spinner, Stack, chakra } from '@chakra-ui/react'
import { useScript } from '@saas-ui/react'

export const Tweet = (props) => {
  const status = useScript('https://platform.twitter.com/widgets.js')
  const { colorMode } = useColorMode()

  let content = props.children
  if (status !== 'ready') {
    content = <Spinner />
  } else {
  }

  return (
    <Stack minH="200px" width="50%" margin="20px auto">
      <chakra.blockquote
        className="twitter-tweet"
        data-theme={colorMode}
        display="none"
      >
        {content}
      </chakra.blockquote>
    </Stack>
  )
}
