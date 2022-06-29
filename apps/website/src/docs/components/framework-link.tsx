import {
  Box,
  Center,
  Link as ChakraLink,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { Card } from '@saas-ui/react'
import Link from 'next/link'
import React from 'react'
import {
  BlitzSvg,
  CreateReactAppSvg,
  NextjsSvg,
  RedwoodSvg,
  RemixSvg,
  ViteSvg,
} from './framework-svg'
import { LinkCard } from './link-card'

const FrameworkLink = (props) => {
  const { href, children, name } = props
  return (
    <LinkCard href={href}>
      {children}

      <Center
        borderBottomStartRadius="lg"
        borderBottomEndRadius="lg"
        height="30px"
        mt="4"
      >
        <Text fontSize="sm" fontWeight="bold">
          {name}
        </Text>
      </Center>
    </LinkCard>
  )
}

export const FrameworkLinks = () => {
  return (
    <SimpleGrid mt="12" columns={3} spacing="40px" fontSize="6xl">
      <FrameworkLink
        href="/docs/installation/nextjs-guide"
        accentColor="black"
        name="Next.js"
      >
        <NextjsSvg style={{ margin: 'auto' }} />
      </FrameworkLink>

      <FrameworkLink
        href="/docs/installation/vite-guide"
        accentColor="#C07600"
        name="Vite"
      >
        <ViteSvg style={{ margin: 'auto' }} />
      </FrameworkLink>

      <FrameworkLink
        href="/docs/installation/blitzjs-guide"
        accentColor="#6700EB"
        name="BlitzJS"
      >
        <BlitzSvg style={{ margin: 'auto' }} />
      </FrameworkLink>

      <FrameworkLink
        href="/docs/installation/redwoodjs-guide"
        accentColor="#BF4722"
        name="RedwoodJS"
      >
        <RedwoodSvg style={{ margin: 'auto' }} />
      </FrameworkLink>

      <FrameworkLink
        href="/docs/installation/remix-guide"
        accentColor="#121212"
        name="Remix"
      >
        <RemixSvg style={{ margin: 'auto' }} />
      </FrameworkLink>

      <FrameworkLink
        href="/docs/installation/cra-guide"
        accentColor="#0AC09D"
        name="Create React App"
      >
        <CreateReactAppSvg style={{ margin: 'auto' }} />
      </FrameworkLink>
    </SimpleGrid>
  )
}

export const FrameworkLinksPro = () => {
  return (
    <SimpleGrid mt="12" columns={3} spacing="40px" fontSize="6xl">
      <FrameworkLink
        href="/docs/installation/nextjs-guide"
        accentColor="black"
        name="Next.js"
      >
        <NextjsSvg style={{ margin: 'auto' }} />
      </FrameworkLink>

      <FrameworkLink
        href="/docs/installation/cra-guide"
        accentColor="#0AC09D"
        name="Create React App"
      >
        <CreateReactAppSvg style={{ margin: 'auto' }} />
      </FrameworkLink>
    </SimpleGrid>
  )
}
