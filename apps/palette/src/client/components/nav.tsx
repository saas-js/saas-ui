import { Badge, Box, HStack, Text } from '@chakra-ui/react'
import { Button, IconButton } from '@saas-ui/react'

import { FaTwitter, FaGithub } from 'react-icons/fa'

export const Nav = () => {
  return (
    <>
      <Button as="a" href="https://saas-ui.dev/themes" variant="ghost">
        <HStack justifyContent="center">
          <Text>Themes</Text>
          <Box lineHeight={1.4}>
            <Badge
              variant="solid"
              colorScheme="primary"
              rounded="full"
              px="2"
              fontWeight="medium"
            >
              New!
            </Badge>
          </Box>
        </HStack>
      </Button>

      <Button
        as="a"
        href="https://saas-ui.dev/docs/introduction"
        variant="ghost"
      >
        Documentation
      </Button>

      <IconButton
        as="a"
        href="https://twitter.com/intent/tweet?text=Check%20out%20this%20color%20palette%20generator%20for%20%40chakra_ui.%20Build%20by%20%40saas_js%0Ahttps%3A//palette.saas-ui.dev"
        icon={<FaTwitter />}
        variant="ghost"
        aria-label="Share on Twitter"
      />

      <IconButton
        as="a"
        href="https://github.com/saas-js/saas-ui"
        icon={<FaGithub />}
        variant="ghost"
        aria-label="Star on Github"
      />
    </>
  )
}
