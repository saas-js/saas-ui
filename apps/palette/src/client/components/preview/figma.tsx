import NextLink from 'next/link'
import Image from 'next/image'
import {
  Button,
  ButtonGroup,
  Code,
  Heading,
  HStack,
  Icon,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
} from '@chakra-ui/react'

import { usePalette } from '@/providers/palette'
import { FiArrowRight, FiCheck } from 'react-icons/fi'

const JsonPreview = () => {
  const [{ colors }] = usePalette()
  const json = JSON.stringify(colors, undefined, 2)
  return (
    <Stack>
      <HStack
        alignItems="flex-start"
        spacing="8"
        flexDirection={{ base: 'column', lg: 'row' }}
      >
        <Stack spacing="8">
          <Text fontSize="xl">
            With Supa Palette you can easily create beautiful, harmonious and
            accessible-first palettes for Chakra UI in Figma.
          </Text>

          <List color="muted" spacing="3">
            <ListItem>
              <ListIcon as={FiCheck} color="primary.500" />
              Generate &apos;Hues&apos; or &apos;Opacities&apos; palettes
            </ListItem>
            <ListItem>
              <ListIcon as={FiCheck} color="primary.500" />
              Automatic contrast calculation/correction
            </ListItem>
            <ListItem>
              <ListIcon as={FiCheck} color="primary.500" />
              Powerful color stop editor for unlimited customisation
            </ListItem>
            <ListItem>
              <ListIcon as={FiCheck} color="primary.500" />
              Select the amount of colors
            </ListItem>
          </List>

          <ButtonGroup>
            <NextLink
              href="https://gumroad.com/a/507971507/pucdw"
              passHref
              legacyBehavior
            >
              <Button
                variant="primary"
                as="a"
                rightIcon={<Icon as={FiArrowRight} />}
              >
                More information
              </Button>
            </NextLink>
          </ButtonGroup>
        </Stack>
        <Stack
          position="relative"
          width={{ sm: '180px', xl: '360px' }}
          height={{ sm: '285px', xl: '573px' }}
          flexShrink="0"
          display={{ base: 'none', lg: 'flex' }}
        >
          <Image
            src="/screen-1-dark.webp"
            alt="SupaPalette interface"
            layout="fill"
          />
        </Stack>
      </HStack>
    </Stack>
  )
}

export default JsonPreview
