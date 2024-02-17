import { supabase } from '#lib/supabase'
import { Box, Button, Heading } from '@chakra-ui/react'
import { createFileRoute, Link, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser()

    if (!error) {
      const workspace = data.user?.user_metadata?.workspace
      const path = workspace ? `/${workspace}` : '/getting-started'
      throw redirect({
        to: path,
      })
    }
  },
})

function Home() {
  return (
    <Box p="8">
      <Heading as="h1" mb="4">
        Welcome Home!
      </Heading>

      <Button as={Link} to="/login" variant="primary">
        Log in
      </Button>
    </Box>
  )
}
