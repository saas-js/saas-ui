import { supabase } from '@/lib/supabase'
import { Button } from '@chakra-ui/react'

export function DiscordRoles() {
  return (
    <Button
      variant="primary"
      onClick={() => {
        supabase.auth.signInWithOAuth({
          provider: 'discord',
          options: {
            redirectTo: 'http://localhost:3020/api/discord',
            scopes: 'guilds.join',
          },
        })
      }}
    >
      Join Private Discord
    </Button>
  )
}
