import { type Context, Hono } from 'hono'
import { cors } from 'hono/cors'
import { HTTPException } from 'hono/http-exception'
import { handle } from 'hono/vercel'

const defaultHeaders = {
  headers: {
    'Cache-Control': 'max-age=3600',
  },
}

const basePath = process.env.REGISTRY_BASE_PATH ?? '/r'

const app = new Hono()

app.use(
  '*',
  cors({
    origin: '*',
    allowMethods: ['GET'],
    credentials: true,
    allowHeaders: ['Content-Type', 'Authorization'],
  }),
)

if (process.env.NODE_ENV !== 'production') {
  app.use('*', (c, next) => {
    console.log('[req]', c.req.url)
    return next()
  })
}

function authorize(c: Context) {
  const authorization = c.req.header('Authorization')

  const token = authorization?.split(' ')[1]

  if (!token) {
    throw new HTTPException(401, {
      message: 'Unauthorized',
    })
  }
}

app.get(`${basePath}/schema/registry.json`, async (c) => {
  const file = await import('@/public/r/schema/registry.json', {
    with: { type: 'json' },
  })
  return c.json(file.default, defaultHeaders)
})

app.get(`${basePath}/index.json`, async (c) => {
  const file = await import('@/public/r/index.json', {
    with: { type: 'json' },
  })
  return c.json(file.default, defaultHeaders)
})

app.get(`${basePath}/styles/index.json`, async (c) => {
  const file = await import('@/public/r/styles/index.json', {
    with: { type: 'json' },
  })
  return c.json(file.default, defaultHeaders)
})

app.get(`${basePath}/styles/:style/:component{.+\\.json$}`, async (c) => {
  const { style, component } = c.req.param()

  const file = await import(`@/public/r/styles/${style}/${component}`, {
    with: { type: 'json' },
  })

  const content = file.default

  if (file.private) {
    authorize(c)
  }

  return c.json(content, defaultHeaders)
})

export const GET = handle(app)
