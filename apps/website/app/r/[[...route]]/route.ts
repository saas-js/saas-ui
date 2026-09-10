import { handle } from 'hono/vercel'

import { createRegistryApp } from '../registry-app'

const app = createRegistryApp()

export const GET = handle(app)
