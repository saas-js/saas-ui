import {
  Button,
  ButtonGroup,
  HStack,
  Icon,
  List,
  Stack,
  Text,
} from '@chakra-ui/react'
import Image from 'next/image'
import NextLink from 'next/link'
import { FiArrowRight, FiCheck } from 'react-icons/fi'

const JsonPreview = () => {
  return (
    <Stack>
      <HStack
        alignItems="flex-start"
        gap="8"
        flexDirection={{ base: 'column', lg: 'row' }}
      >
        <Stack gap="8">
          <Text fontSize="xl">
            With Supa Palette you can easily create beautiful, harmonious and
            accessible-first palettes for Chakra UI in Figma.
          </Text>

          <List.Root color="muted" gap="3">
            <List.Item>
              <List.Indicator asChild color="primary.500">
                <FiCheck />
              </List.Indicator>
              Generate &apos;Hues&apos; or &apos;Opacities&apos; palettes
            </List.Item>
            <List.Item>
              <List.Indicator asChild color="primary.500">
                <FiCheck />
              </List.Indicator>
              Automatic contrast calculation/correction
            </List.Item>
            <List.Item>
              <List.Indicator asChild color="primary.500">
                <FiCheck />
              </List.Indicator>
              Powerful color stop editor for unlimited customisation
            </List.Item>
            <List.Item>
              <List.Indicator asChild color="primary.500">
                <FiCheck />
              </List.Indicator>
              Select the amount of colors
            </List.Item>
          </List.Root>

          <ButtonGroup>
            <Button asChild variant="solid">
              <NextLink href="https://gumroad.com/a/507971507/pucdw">
                More information
                <Icon as={FiArrowRight} />
              </NextLink>
            </Button>
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
            fill
            sizes="(min-width: 1280px) 360px, 180px"
          />
        </Stack>
      </HStack>
    </Stack>
  )
}

export default JsonPreview
