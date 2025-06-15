'use client'

import { HeaderSection } from '@/components/site/header.section'
import { Box } from '@chakra-ui/react'
import { EmptyState } from '@saas-ui/react'
import { TbError404 } from 'react-icons/tb'

export default function NotFound() {
  return (
    <Box
      css={{
        '--header-height': '104px',
        '--content-height': 'calc(100dvh - var(--header-height))',
      }}
    >
      <HeaderSection />
      <EmptyState
        minH="90dvh"
        icon={<TbError404 />}
        title="Page not found"
        description="The page you are looking for does not exist."
      />
    </Box>
  )
}
