import { Box, Button } from '@chakra-ui/react'
import { Theme } from 'compositions/ui/theme'

export const ThemeNested = () => {
  return (
    <Box p="8" borderWidth="1px">
      Hello Normal <Button>Click me</Button>
      <Theme appearance="dark" colorPalette="red">
        <Box p="8" borderWidth="1px">
          Hello Dark <Button>Click me</Button>
          <Theme appearance="light" colorPalette="pink">
            <Box p="8" borderWidth="1px">
              Hello Light <Button>Click me</Button>
            </Box>
          </Theme>
        </Box>
      </Theme>
    </Box>
  )
}
