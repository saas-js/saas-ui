import { Badge, Box, HStack, Text, Button, IconButton } from '@chakra-ui/react'

import { FaGithub } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

export const Nav = () => {
  return (
    <>
      <Button as="a" href="https://saas-ui.dev/themes" variant="ghost">
        Themes
      </Button>

      <Button as="a" href="https://saas-ui.dev/docs" variant="ghost">
        Documentation
      </Button>

      <IconButton
        as="a"
        href="https://twitter.com/intent/tweet?text=Check%20out%20this%20color%20palette%20generator%20for%20%40chakra_ui.%20Build%20by%20%40saas_js%0Ahttps%3A//palette.saas-ui.dev"
        icon={<FaXTwitter />}
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
