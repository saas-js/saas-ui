import { detect } from '@antfu/ni'

type PackageManager = 'yarn' | 'pnpm' | 'bun' | 'npm'

interface PackageManagerResult {
  packageManager: PackageManager
  version: string
}

export async function getPackageManager(
  targetDir: string,
  { withFallback }: { withFallback?: boolean } = {
    withFallback: false,
  },
): Promise<PackageManagerResult> {
  const packageManager = await detect({ programmatic: true, cwd: targetDir })

  const [name, version = '0.0.0'] = packageManager?.split('@') ?? ['', '0.0.0']

  if (name === 'yarn') return { packageManager: 'yarn', version: version }
  if (name === 'pnpm') return { packageManager: 'pnpm', version: version }
  if (name === 'bun') return { packageManager: 'bun', version: version }

  if (!withFallback) {
    return { packageManager: 'npm', version: '0.0.0' }
  }

  // Fallback to user agent if not detected.
  const userAgent = process.env.npm_config_user_agent || ''

  if (userAgent.startsWith('yarn')) {
    return { packageManager: 'yarn', version: '0.0.0' }
  }

  if (userAgent.startsWith('pnpm')) {
    return { packageManager: 'pnpm', version: '0.0.0' }
  }

  if (userAgent.startsWith('bun')) {
    return { packageManager: 'bun', version: '0.0.0' }
  }

  return { packageManager: 'npm', version: '0.0.0' }
}

export async function getPackageRunner(cwd: string) {
  const packageManager = await getPackageManager(cwd)

  if (packageManager.packageManager === 'pnpm') return 'pnpm dlx'

  if (packageManager.packageManager === 'bun') return 'bunx'

  return 'npx'
}
