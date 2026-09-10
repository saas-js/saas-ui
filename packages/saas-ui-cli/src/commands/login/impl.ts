import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import open from 'open'
import ora from 'ora'

import { AUTH_ORIGIN } from '#constants'
import type { LocalContext } from '#context'
import { createSupabaseClient } from '#lib/supabase'
import { writeConfig } from '#utils/auth'

interface LoginResponse {
  token?: string
}

export async function login(this: LocalContext) {
  const responsePromise = new Promise<LoginResponse>((resolve, reject) => {
    const app = new Hono()

    let token: string | undefined

    app.use(
      cors({
        origin: AUTH_ORIGIN,
        allowMethods: ['GET'],
        allowHeaders: ['Authorization'],
      }),
    )

    app.use('/callback', async (c, next) => {
      await next()
      resolve({ token })
    })

    app.get('/callback', async (c) => {
      const authHeader = c.req.header('Authorization')

      if (!authHeader) {
        return c.json(
          { success: false, error: 'No authorization header provided' },
          400,
        )
      }

      token = authHeader.split(' ')[1]

      if (!token) {
        return c.json({ success: false, error: 'No token provided' }, 400)
      }

      return c.json({ success: true }, 200)
    })

    app.get('/success', async (c) =>
      c.text('Login successful, you can close this tab.'),
    )

    app.get('/cancel', async (c) => {
      reject(new Error('Login cancelled'))
      return c.text('Login cancelled, you can close this tab.')
    })

    app.get('/error', async (c) => {
      reject(new Error('Login error'))
      return c.text('Login failed, you can close this tab.')
    })

    const server = serve({
      fetch: app.fetch,
      hostname: 'localhost',
    })

    server.listen()

    const address = server.address()

    let port: number | undefined
    if (!address) {
      reject(new Error('Failed to start server'))
      return
    }

    if (typeof address === 'string') {
      port = parseInt(address.split(':')[2] ?? '')
    } else {
      port = address.port
    }

    open(`${AUTH_ORIGIN}/login?callbackPort=${port}`)

    console.log(
      `If nothing happens, open the following URL in your browser: ${AUTH_ORIGIN}/login?callbackPort=${port}`,
    )
  })

  const spinner = ora({
    text: 'Authenticating...',
    color: 'green',
  })

  try {
    spinner.start()

    const response = await responsePromise

    spinner.stop()

    if (!response.token) {
      console.error('Failed to authenticate, please try again.')
      return
    }

    const supabase = createSupabaseClient(response.token)

    const { data, error } = await supabase.auth.getUser()

    if (error) {
      console.error('Failed to authenticate, please try again.')
      return
    }

    console.log(`Hi ${data.user.email}, you are now logged in.`)

    writeConfig({ token: response.token })
  } catch (error) {
    spinner.stop()
    console.error(error)
  }
}
