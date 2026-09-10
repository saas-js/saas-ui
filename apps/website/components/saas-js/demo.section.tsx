'use client'

import { Box, Container } from '@chakra-ui/react'
import { ErrorBoundary } from 'next/dist/client/components/error-boundary'
import dynamic from 'next/dynamic'

const CRMDemo = dynamic(
  () => import('@/components/site/demo/crm-demo').then((mod) => mod.CRMDemo),
  {
    ssr: false,
  },
)

export const DemoSection = () => {
  return (
    <Box
      position="relative"
      aria-hidden="true"
      display={{ base: 'none', md: 'block' }}
    >
      <Container maxW="8xl">
        <Box
          borderRadius="md"
          borderWidth="1px"
          height={{ base: '480px' }}
          overflow="clip"
          position="relative"
        >
          <ErrorBoundary errorComponent={ErrorFallback}>
            <CRMDemo />
          </ErrorBoundary>
        </Box>

        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          pointerEvents="none"
          bgGradient="to-b"
          gradientFrom="transparent"
          gradientVia="transparent"
          gradientTo="bg.muted"
        />
      </Container>
    </Box>
  )
}

function ErrorFallback(props: { error: unknown }) {
  console.error(props.error)
  return <div>Error</div>
}
