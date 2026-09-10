import { existsSync, promises as fs } from 'node:fs'
import path from 'node:path'

const DEFAULT_TIMEOUT_MS = 30_000
const DEFAULT_POLL_MS = 25
const DEFAULT_STALE_MS = 5 * 60_000

interface InstallWriterLockOptions {
  lockTimeoutMs?: number
  lockPollMs?: number
  staleLockMs?: number
}

function wait(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration))
}

async function isStale(lockPath: string, staleMs: number) {
  try {
    const stats = await fs.lstat(lockPath)
    if (stats.isSymbolicLink()) {
      throw new Error(
        `Refusing to use symbolic-link installer lock: ${lockPath}`,
      )
    }
    if (Date.now() - stats.mtimeMs < staleMs) return false
    try {
      const [pid] = (await fs.readFile(lockPath, 'utf8')).trim().split(':')
      const parsedPid = Number(pid)
      if (Number.isSafeInteger(parsedPid) && parsedPid > 0) {
        try {
          process.kill(parsedPid, 0)
          return false
        } catch (error) {
          if ((error as NodeJS.ErrnoException).code === 'EPERM') return false
          if ((error as NodeJS.ErrnoException).code !== 'ESRCH') throw error
        }
      }
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error
    }
    return true
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return false
    throw error
  }
}

/** Serialize registry writers in a project, with bounded stale-lock recovery. */
export async function acquireInstallTransactionLock(
  cwd: string,
  options: InstallWriterLockOptions = {},
) {
  const timeoutMs = options.lockTimeoutMs ?? DEFAULT_TIMEOUT_MS
  const pollMs = options.lockPollMs ?? DEFAULT_POLL_MS
  const staleMs = options.staleLockMs ?? DEFAULT_STALE_MS
  const metadataDir = path.join(cwd, '.saas-ui')
  const lockPath = path.join(metadataDir, 'install.lock')
  const token = `${process.pid}:${Date.now()}:${Math.random().toString(36).slice(2)}`
  const started = Date.now()

  if (
    existsSync(metadataDir) &&
    (await fs.lstat(metadataDir)).isSymbolicLink()
  ) {
    throw new Error(`Refusing to install through symbolic link: ${metadataDir}`)
  }
  await fs.mkdir(metadataDir, { recursive: true })

  while (true) {
    try {
      await fs.writeFile(lockPath, `${token}\n`, {
        encoding: 'utf8',
        flag: 'wx',
      })
      return async () => {
        try {
          if ((await fs.lstat(metadataDir)).isSymbolicLink()) {
            throw new Error(
              `Refusing to release installer lock through symbolic link: ${metadataDir}`,
            )
          }
          if ((await fs.lstat(lockPath)).isSymbolicLink()) {
            throw new Error(
              `Refusing to release symbolic-link installer lock: ${lockPath}`,
            )
          }
          if ((await fs.readFile(lockPath, 'utf8')).trim() === token) {
            await fs.rm(lockPath)
          }
        } catch (error) {
          if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error
        }
      }
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        await fs.mkdir(metadataDir, { recursive: true })
        continue
      }
      if ((error as NodeJS.ErrnoException).code !== 'EEXIST') throw error
      if (await isStale(lockPath, staleMs)) {
        // Rename first so a recovered writer never removes a newly acquired lock.
        const stalePath = `${lockPath}.stale.${token}`
        try {
          await fs.rename(lockPath, stalePath)
          await fs.rm(stalePath, { force: true })
          continue
        } catch (recoveryError) {
          if ((recoveryError as NodeJS.ErrnoException).code === 'ENOENT')
            continue
          throw recoveryError
        }
      }
      if (Date.now() - started >= timeoutMs) {
        throw new Error(
          `Timed out waiting for the project registry installer lock after ${timeoutMs}ms.`,
        )
      }
      await wait(Math.max(1, Math.min(pollMs, timeoutMs)))
    }
  }
}
