import {
  Box,
  Center,
  Link as ChakraLink,
  SimpleGrid,
  Text,
} from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import {
  BlitzSvg,
  CreateReactAppSvg,
  GatsbySvg,
  NextjsSvg,
  RedwoodSvg,
  RemixSvg,
} from './framework-svg'

const FrameworkLink = (props) => {
  const { accentColor, href, children, name } = props
  return (
    <Link passHref href={href}>
      <ChakraLink textDecoration='none' _hover={{ textDecoration: 'none' }}>
        <Box boxShadow='md' bg='white' borderRadius='lg' pt='4'>
          {children}

          <Center
            bg={accentColor}
            borderBottomStartRadius='lg'
            borderBottomEndRadius='lg'
            height='30px'
            mt='4'
          >
            <Text color='white' fontSize='sm' fontWeight='bold'>
              {name}
            </Text>
          </Center>
        </Box>
      </ChakraLink>
    </Link>
  )
}

export const FrameworkLinks = () => {
  return (
    <SimpleGrid mt='12' minChildWidth='160px' spacing='40px' fontSize='6xl'>
      <FrameworkLink
        href='/guides/getting-started/cra-guide'
        accentColor='#0AC09D'
        name='Create React App'
      >
        <CreateReactAppSvg style={{ margin: 'auto' }} />
      </FrameworkLink>

      <FrameworkLink
        href='/guides/getting-started/nextjs-guide'
        accentColor='black'
        name='Next.js'
      >
        <NextjsSvg style={{ margin: 'auto' }} />
      </FrameworkLink>

      <FrameworkLink
        href='/guides/getting-started/gatsby-guide'
        accentColor='#663399'
        name='Gatsby'
      >
        <GatsbySvg style={{ margin: 'auto' }} />
      </FrameworkLink>

      <FrameworkLink
        href='/guides/getting-started/blitzjs-guide'
        accentColor='#6700EB'
        name='BlitzJS'
      >
        <BlitzSvg style={{ margin: 'auto' }} />
      </FrameworkLink>

      <FrameworkLink
        href='/guides/getting-started/redwoodjs-guide'
        accentColor='#BF4722'
        name='RedwoodJS'
      >
        <RedwoodSvg style={{ margin: 'auto' }} />
      </FrameworkLink>

      <FrameworkLink
        href='/guides/getting-started/remix-guide'
        accentColor='#121212'
        name='Remix'
      >
        <RemixSvg style={{ margin: 'auto' }} />
      </FrameworkLink>
    </SimpleGrid>
  )
}
