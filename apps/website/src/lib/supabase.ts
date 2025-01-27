import {
  createBrowserClient,
  createServerClient as _createServerClient,
  serializeCookieHeader,
  type CookieOptions,
} from '@supabase/ssr'
import { type GetServerSidePropsContext } from 'next'

import type { NextApiRequest, NextApiResponse } from 'next'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!

export const supabase = createBrowserClient(supabaseUrl, supabaseKey)

export const createServerClient = (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  return _createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      get(name: string) {
        return req.cookies[name]
      },
      set(name: string, value: string, options: CookieOptions) {
        res.setHeader('Set-Cookie', serializeCookieHeader(name, value, options))
      },
      remove(name: string, options: CookieOptions) {
        res.setHeader('Set-Cookie', serializeCookieHeader(name, '', options))
      },
    },
  })
}

export const getServerSidePropsClient = ({
  req,
  res,
}: GetServerSidePropsContext) => {
  const supabase = _createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return Object.keys(req.cookies).map((name) => ({
          name,
          value: req.cookies[name] || '',
        }))
      },
      setAll(cookiesToSet) {
        res.setHeader(
          'Set-Cookie',
          cookiesToSet.map(({ name, value, options }) =>
            serializeCookieHeader(name, value, options)
          )
        )
      },
    },
  })

  return supabase
}
