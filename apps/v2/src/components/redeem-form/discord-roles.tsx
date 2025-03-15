import { supabase } from '@/lib/supabase'
import { getAbsoluteUrl } from '@/utils/get-absolute-url'
import { Button } from '@chakra-ui/react'

export function DiscordRoles() {
  return (
    <Button
      variant="primary"
      onClick={() => {
        supabase.auth.signInWithOAuth({
          provider: 'discord',
          options: {
            redirectTo: getAbsoluteUrl('/api/discord'),
            scopes: 'guilds.join',
          },
        })
      }}
    >
      Join Private Discord
    </Button>
  )
}
