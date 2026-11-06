import { createAffonsoEmbedToken } from '@/lib/affonso'
import { getAuthUser } from '@/lib/auth-user'
import { NextResponse } from 'next/server'

export async function POST() {
  const user = await getAuthUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const token = await createAffonsoEmbedToken({
    email: user.email,
    name: user.name,
    externalUserId: user.id,
  })

  if (!token) {
    return NextResponse.json(
      { error: 'Affiliate dashboard unavailable' },
      { status: 503 },
    )
  }

  return NextResponse.json({
    publicToken: token.publicToken,
    expiresAt: token.expiresAt,
  })
}
