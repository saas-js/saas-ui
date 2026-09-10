import { handle } from 'hono/vercel'

import { createRegistryApp } from '@/app/r/registry-app'

const app = createRegistryApp()

export const GET = handle(app)
