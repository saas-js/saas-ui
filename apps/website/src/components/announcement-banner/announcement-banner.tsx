import NextLink from 'next/link'
import {
  Box,
  Container,
  Flex,
  HStack,
  Icon,
  LinkBox,
  LinkOverlay,
  useColorModeValue,
} from '@chakra-ui/react'
import {
  Banner,
  BannerActions,
  BannerContent,
  BannerDescription,
  BannerTitle,
  Button,
} from '@saas-ui/react'
import { FiArrowRight } from 'react-icons/fi'
import { FallInPlace } from '../motion/fall-in-place'

export interface AnnouncementBannerProps {
  title: string
  description: string
  href: string
  action?: string
}

export const AnnouncementBanner: React.FC<AnnouncementBannerProps> = (
  props
) => {
  const { title, description, href, action } = props
  const bg = useColorModeValue('white', 'gray.900')
  if (!title) {
    return null
  }

  return (
    <Flex
      position="absolute"
      zIndex="10"
      top={{ base: '100px', xl: '200px' }}
      width="100%"
    >
      <Container maxW="container.2xl" px="8">
        <FallInPlace initialInView delay={1.4} translateY="-10px">
          <NextLink href={href}>
            <Banner
              as={LinkBox}
              display="flex"
              bg={bg}
              fontSize="sm"
              justifyContent="center"
              colorScheme="purple"
              backgroundClip="padding-box"
              borderRadius="full"
              maxW="400px"
              margin="0 auto"
              borderWidth="2px"
              borderTopWidth="0"
              borderColor="transparent"
              position="relative"
              py="4px"
              px="3"
              overflow="visible"
              cursor="pointer"
              transition="all .2s ease-out"
              _before={{
                content: `""`,
                position: 'absolute',
                zIndex: -1,
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                borderRadius: 'inherit',
                margin: '-2px',
                bgGradient: 'linear(to-r, purple.500, cyan.500)',
                transition: 'background .2s ease-out',
              }}
              _hover={{
                '& .chakra-icon': {
                  transform: 'translate(0)',
                },
                boxShadow: 'md',
              }}
            >
              <HStack zIndex="2">
                <BannerTitle fontWeight="semibold">{title}</BannerTitle>
                <BannerDescription
                  as={LinkOverlay}
                  href={href}
                  display={{ base: 'none', md: 'block' }}
                  dangerouslySetInnerHTML={{ __html: description }}
                />

                {action && (
                  <BannerActions>
                    <Button
                      size="xs"
                      variant="link"
                      color="muted"
                      _hover={{
                        textDecoration: 'none',
                      }}
                      rightIcon={
                        <Icon
                          as={FiArrowRight}
                          transform="translate(-5px)"
                          transitionProperty="common"
                          transitionDuration="normal"
                        />
                      }
                    >
                      Read more
                    </Button>
                  </BannerActions>
                )}
              </HStack>
            </Banner>
          </NextLink>
        </FallInPlace>
      </Container>
    </Flex>
  )
}
