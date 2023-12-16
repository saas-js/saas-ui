import {
  createBrowserClient,
  createServerClient as _createServerClient,
  serialize,
  type CookieOptions,
} from '@supabase/ssr'
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
        res.setHeader('Set-Cookie', serialize(name, value, options))
      },
      remove(name: string, options: CookieOptions) {
        res.setHeader('Set-Cookie', serialize(name, '', options))
      },
    },
  })
}
