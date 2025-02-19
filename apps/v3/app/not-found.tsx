import { Header } from '@/components/docs/header'
import { Box } from '@chakra-ui/react'
import { EmptyState } from '@saas-ui/react'
import { LuServerCrash } from 'react-icons/lu'

export default function NotFound() {
  return (
    <Box
      css={{
        '--header-height': '104px',
        '--content-height': 'calc(100dvh - var(--header-height))',
      }}
    >
      <Header />
      <EmptyState
        minH="90dvh"
        icon={<LuServerCrash />}
        title="404. Page not found"
        description="The page you are looking for does not exist."
      />
    </Box>
  )
}
