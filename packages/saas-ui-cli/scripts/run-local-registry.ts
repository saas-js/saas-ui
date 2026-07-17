import { spawn } from 'node:child_process'
import { createReadStream, existsSync, promises as fs } from 'node:fs'
import { createServer } from 'node:http'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url))
const packageRoot = path.resolve(scriptDirectory, '..')
const repositoryRoot = path.resolve(packageRoot, '../..')
const registryRoot = path.resolve(
  process.env.SAAS_UI_LOCAL_REGISTRY_ROOT ??
    path.join(repositoryRoot, 'apps/website/public/r'),
)
const cliEntry = path.join(packageRoot, 'lib/cli.js')

function isWithin(root: string, target: string) {
  const relative = path.relative(root, target)
  return (
    relative === '' ||
    (!relative.startsWith('..') && !path.isAbsolute(relative))
  )
}

export async function startLocalRegistryServer() {
  const rootStats = await fs.stat(registryRoot).catch(() => null)
  if (!rootStats?.isDirectory()) {
    throw new Error(`Canonical registry directory is missing: ${registryRoot}`)
  }

  const server = createServer(async (request, response) => {
    try {
      if (request.method !== 'GET' && request.method !== 'HEAD') {
        response.writeHead(405, { Allow: 'GET, HEAD' }).end()
        return
      }

      const requestUrl = new URL(request.url ?? '/', 'http://localhost')
      const resource = decodeURIComponent(requestUrl.pathname).replace(
        /^\/+/,
        '',
      )
      const target = path.resolve(registryRoot, resource)
      if (!resource || !isWithin(registryRoot, target)) {
        response.writeHead(404).end()
        return
      }

      const stats = await fs.stat(target).catch(() => null)
      if (!stats?.isFile()) {
        response.writeHead(404).end()
        return
      }

      response.writeHead(200, {
        'Cache-Control': 'no-store',
        'Content-Length': stats.size,
        'Content-Type': target.endsWith('.json')
          ? 'application/json; charset=utf-8'
          : 'application/octet-stream',
      })
      if (request.method === 'HEAD') response.end()
      else createReadStream(target).pipe(response)
    } catch (error) {
      response
        .writeHead(500)
        .end(error instanceof Error ? error.message : 'Local registry error')
    }
  })

  await new Promise<void>((resolve, reject) => {
    server.once('error', reject)
    server.listen(0, '127.0.0.1', resolve)
  })

  const address = server.address()
  if (!address || typeof address === 'string') {
    server.close()
    throw new Error('Failed to resolve the local registry address.')
  }

  const registryUrl = `http://127.0.0.1:${address.port}`
  return {
    registryUrl,
    async close() {
      await new Promise<void>((resolve, reject) => {
        server.close((error) => (error ? reject(error) : resolve()))
      })
    },
  }
}

async function main() {
  const cliArguments = process.argv.slice(2)
  if (cliArguments[0] === '--') cliArguments.shift()

  if (!cliArguments.length) {
    throw new Error(
      'Pass a CLI command, for example: registry:cli:local -- add sidebar --cwd apps/website --yes',
    )
  }
  if (!existsSync(cliEntry)) {
    throw new Error(
      `The built CLI is missing at ${cliEntry}. Run pnpm --filter @saas-ui/cli build first.`,
    )
  }

  const server = await startLocalRegistryServer()
  process.stdout.write(`Using canonical registry at ${server.registryUrl}\n`)

  try {
    const exitCode = await new Promise<number>((resolve, reject) => {
      const child = spawn(process.execPath, [cliEntry, ...cliArguments], {
        cwd: repositoryRoot,
        env: {
          ...process.env,
          SAAS_UI_REGISTRY_URL: server.registryUrl,
        },
        stdio: 'inherit',
      })
      child.once('error', reject)
      child.once('exit', (code, signal) => {
        if (signal) reject(new Error(`CLI terminated with signal ${signal}.`))
        else resolve(code ?? 1)
      })
    })
    process.exitCode = exitCode
  } finally {
    await server.close()
  }
}

const entryPath = process.argv[1]
if (
  entryPath &&
  import.meta.url === pathToFileURL(path.resolve(entryPath)).href
) {
  await main()
}
