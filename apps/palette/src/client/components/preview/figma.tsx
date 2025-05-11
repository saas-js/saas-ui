import { usePalette } from '@/providers/palette'
import {
  Button,
  ButtonGroup,
  HStack,
  Icon,
  List,
  Stack,
  Text,
} from '@saas-ui/react'
import Image from 'next/image'
import NextLink from 'next/link'
import { FiArrowRight, FiCheck } from 'react-icons/fi'

const FigmaPreview = () => {
  const [{ colors }] = usePalette()

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
              <Icon as={FiCheck} color="primary.500" />
              Generate &apos;Hues&apos; or &apos;Opacities&apos; palettes
            </List.Item>
            <List.Item>
              <Icon as={FiCheck} color="primary.500" />
              Automatic contrast calculation/correction
            </List.Item>
            <List.Item>
              <Icon as={FiCheck} color="primary.500" />
              Powerful color stop editor for unlimited customisation
            </List.Item>
            <List.Item>
              <Icon as={FiCheck} color="primary.500" />
              Select the amount of colors
            </List.Item>
          </List.Root>

          <ButtonGroup>
            <NextLink
              href="https://gumroad.com/a/507971507/pucdw"
              passHref
              legacyBehavior
            >
              <Button colorPalette="primary" as="a">
                More information
                <Icon as={FiArrowRight} />
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

export default FigmaPreview
