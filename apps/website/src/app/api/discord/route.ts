const DISCORD_API = 'https://discord.com/api/v10/'
const GUILD_ID = '937049452349382677'
const PRO_ROLE_ID = '990532440126808094'

import { NextRequest, NextResponse } from 'next/server'

export const GET = async () => {
  const supabase = createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json({
      success: false,
      message: 'You need to be logged in.',
    })
  }
  console.log(session)
  if (!session.provider_token) {
    return NextResponse.json({
      success: false,
      message: 'Please log in with Discord first.',
    })
  }

  const { data } = await supabase.auth.getUser()

  if (!data.user) {
    return NextResponse.json({
      success: false,
      message: 'Could not find your account on Supabase.',
    })
  }

  const licenses = data.user.user_metadata.licenses

  if (!licenses) {
    return NextResponse.json({
      success: false,
      message: 'You do not have a license.',
    })
  }

  const user = await getUser(session.provider_token)

  if (!user) {
    return NextResponse.json({
      success: false,
      message: 'Could not find your account on Discord.',
    })
  }

  // add user to discord server
  await addMember(user.id)

  // add pro role to user
  await addRole(user.id)

  return NextResponse.redirect(process.env.DISCORD_PRO_INVITE!)
}

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}

async function addMember(userId: string) {
  const response = await fetch(
    DISCORD_API + 'guilds/' + GUILD_ID + '/members/' + userId,
    {
      method: 'PUT',
      headers: {
        Authorization: 'Bot ' + process.env.DISCORD_BOT_TOKEN,
      },
    }
  )

  if (response.status === 204) {
    return true
  }

  return false
}

async function getUser(accessToken: string) {
  const response = await fetch(DISCORD_API + 'users/@me', {
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
  })
  const json = await response.json()
  return json
}

async function addRole(userId: string) {
  // requires Bot authorization
  const response = await fetch(
    DISCORD_API +
      'guilds/' +
      GUILD_ID +
      '/members/' +
      userId +
      '/roles/' +
      PRO_ROLE_ID,
    {
      method: 'PUT',
      headers: {
        Authorization: 'Bot ' + process.env.DISCORD_BOT_TOKEN,
      },
    }
  )

  if (response.status === 204) {
    return true
  }

  return false
}

async function removeRole(userId: string) {
  // requires Bot authorization
  const response = await fetch(
    DISCORD_API +
      'guilds/' +
      GUILD_ID +
      '/members/' +
      userId +
      '/roles/' +
      PRO_ROLE_ID,
    {
      method: 'DELETE',
      headers: {
        Authorization: 'Bot ' + process.env.DISCORD_BOT_TOKEN,
      },
    }
  )

  if (response.status === 204) {
    return true
  }

  return false
}
