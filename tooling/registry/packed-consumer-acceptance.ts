import { spawn } from 'node:child_process'
import { promises as fs } from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import { startLocalRegistryServer } from '../../packages/saas-ui-cli/scripts/run-local-registry'
import { expectedInstallAllDependencies } from '../../packages/saas-ui-cli/test/consumer/fixture'
import { repositoryRoot } from './public-registry'

function packageDeclaration(value: string) {
  const scopeSeparator = value.indexOf('/')
  const separator =
    value.startsWith('@') && scopeSeparator !== -1
      ? value.indexOf('@', scopeSeparator + 1)
      : value.startsWith('@')
        ? -1
        : value.indexOf('@')
  return separator === -1
    ? { name: value }
    : { name: value.slice(0, separator), specifier: value.slice(separator + 1) }
}

const packedWorkspacePackages = [
  '@saas-ui/appearance',
  '@saas-ui/react',
  '@saas-ui/hooks',
] as const

async function run(
  command: string,
  args: readonly string[],
  cwd: string,
  env: NodeJS.ProcessEnv = process.env,
  timeoutMs = 120_000,
) {
  return await new Promise<string>((resolve, reject) => {
    const child = spawn(command, [...args], {
      cwd,
      env,
      stdio: ['ignore', 'pipe', 'pipe'],
    })
    let output = ''
    child.stdout.on('data', (chunk) => (output += String(chunk)))
    child.stderr.on('data', (chunk) => (output += String(chunk)))
    const timeout = setTimeout(() => {
      child.kill('SIGTERM')
      reject(new Error(`Command timed out: ${command} ${args.join(' ')}`))
    }, timeoutMs)
    child.once('error', (error) => {
      clearTimeout(timeout)
      reject(error)
    })
    child.once('exit', (code, signal) => {
      clearTimeout(timeout)
      if (code === 0) resolve(output)
      else {
        reject(
          new Error(
            `Command failed (${signal ?? code}): ${command} ${args.join(' ')}\n${output}`,
          ),
        )
      }
    })
  })
}

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

async function singleTarball(directory: string, prefix: string) {
  const names = (await fs.readdir(directory)).filter(
    (name) => name.startsWith(prefix) && name.endsWith('.tgz'),
  )
  assert(
    names.length === 1,
    `Expected one ${prefix} tarball, found ${names.length}.`,
  )
  return path.join(directory, names[0])
}

const installedRoots = [
  repositoryRoot,
  path.join(repositoryRoot, 'apps', 'website'),
  path.join(repositoryRoot, 'apps', 'compositions'),
  path.join(repositoryRoot, 'packages', 'saas-ui-cli'),
  path.join(repositoryRoot, 'packages', 'saas-ui-chakra-preset'),
]

async function installedPackageDirectory(packageName: string) {
  for (const root of installedRoots) {
    try {
      return await fs.realpath(path.join(root, 'node_modules', packageName))
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error
    }
  }
  throw new Error(`Cannot resolve installed package ${packageName}.`)
}

async function installedVersion(packageName: string) {
  const directory = await installedPackageDirectory(packageName)
  const manifest = JSON.parse(
    await fs.readFile(path.join(directory, 'package.json'), 'utf8'),
  ) as { version?: unknown }
  assert(
    typeof manifest.version === 'string',
    `Installed package ${packageName} has no version.`,
  )
  return manifest.version
}

function dependencyRoot(packageDirectory: string) {
  let current = packageDirectory
  while (path.dirname(current) !== current) {
    if (path.basename(current) === 'node_modules') return current
    current = path.dirname(current)
  }
  throw new Error(`Cannot locate dependency root for ${packageDirectory}.`)
}

async function collectInstalledOverrides(
  packageDirectory: string,
  overrides: Record<string, string>,
  visited: Set<string>,
): Promise<void> {
  const resolved = await fs.realpath(packageDirectory)
  if (visited.has(resolved)) return
  visited.add(resolved)
  const manifest = JSON.parse(
    await fs.readFile(path.join(resolved, 'package.json'), 'utf8'),
  ) as {
    name?: string
    version?: string
    dependencies?: Record<string, string>
    optionalDependencies?: Record<string, string>
  }
  if (
    manifest.name &&
    manifest.version &&
    !manifest.name.startsWith('@saas-ui/')
  ) {
    overrides[manifest.name] ??= manifest.version
  }
  const root = dependencyRoot(resolved)
  const dependencies = {
    ...manifest.dependencies,
    ...manifest.optionalDependencies,
  }
  for (const name of Object.keys(dependencies)) {
    try {
      await collectInstalledOverrides(path.join(root, name), overrides, visited)
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error
    }
  }
}

async function main() {
  const root = await fs.mkdtemp(
    path.join(os.tmpdir(), 'saas-ui-packed-consumer-'),
  )
  const packagesDir = path.join(root, 'packages')
  const projectDir = path.join(root, 'project')
  const fixtureTemplate = path.join(
    repositoryRoot,
    'packages',
    'saas-ui-cli',
    'test',
    'consumer',
    'template',
  )
  let server: Awaited<ReturnType<typeof startLocalRegistryServer>> | undefined

  try {
    await fs.mkdir(packagesDir, { recursive: true })
    await Promise.all(
      [
        '@saas-ui/chakra-preset',
        '@saas-ui/cli',
        ...packedWorkspacePackages,
      ].map((name) =>
        run(
          'pnpm',
          ['--filter', name, 'pack', '--pack-destination', packagesDir],
          repositoryRoot,
        ),
      ),
    )
    const [presetTarball, cliTarball, appearanceTarball, reactTarball, hooksTarball] =
      await Promise.all([
        singleTarball(packagesDir, 'saas-ui-chakra-preset-'),
        singleTarball(packagesDir, 'saas-ui-cli-'),
        singleTarball(packagesDir, 'saas-ui-appearance-'),
        singleTarball(packagesDir, 'saas-ui-react-'),
        singleTarball(packagesDir, 'saas-ui-hooks-'),
      ])

    await fs.cp(fixtureTemplate, projectDir, { recursive: true })
    const manifestPath = path.join(projectDir, 'package.json')
    const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8')) as {
      dependencies: Record<string, string>
      devDependencies: Record<string, string>
      packageManager?: string
      pnpm?: { overrides?: Record<string, string> }
    }
    manifest.dependencies['@saas-ui/appearance'] = `file:${appearanceTarball}`
    manifest.dependencies['@saas-ui/chakra-preset'] = `file:${presetTarball}`
    manifest.dependencies['@saas-ui/react'] = `file:${reactTarball}`
    manifest.dependencies['@saas-ui/hooks'] = `file:${hooksTarball}`
    manifest.dependencies['next-themes'] = '^0.4.6'
    manifest.devDependencies['@saas-ui/cli'] = `file:${cliTarball}`
    const restoreSpecifiers = new Map<string, string>()
    for (const declaration of expectedInstallAllDependencies) {
      const parsed = packageDeclaration(declaration)
      if (parsed.name.startsWith('@saas-ui/')) continue
      manifest.dependencies[parsed.name] = parsed.specifier ?? declaration
    }
    for (const [name, specifier] of Object.entries(manifest.dependencies)) {
      if (!specifier.startsWith('file:')) restoreSpecifiers.set(name, specifier)
    }
    manifest.packageManager = 'pnpm@10.26.2'
    for (const dependencies of [
      manifest.dependencies,
      manifest.devDependencies,
    ]) {
      for (const [name, specifier] of Object.entries(dependencies)) {
        if (!specifier.startsWith('file:')) {
          dependencies[name] = await installedVersion(name)
        }
      }
    }
    const overrides: Record<string, string> = {}
    const visited = new Set<string>()
    for (const [name, specifier] of Object.entries({
      ...manifest.dependencies,
      ...manifest.devDependencies,
    })) {
      if (!specifier.startsWith('file:')) {
        await collectInstalledOverrides(
          await installedPackageDirectory(name),
          overrides,
          visited,
        )
      }
    }
    const cliManifest = JSON.parse(
      await fs.readFile(
        path.join(repositoryRoot, 'packages', 'saas-ui-cli', 'package.json'),
        'utf8',
      ),
    ) as { dependencies: Record<string, string> }
    for (const name of Object.keys(cliManifest.dependencies)) {
      await collectInstalledOverrides(
        await installedPackageDirectory(name),
        overrides,
        visited,
      )
    }
    manifest.pnpm = {
      overrides: {
        ...overrides,
        '@saas-ui/appearance': `file:${appearanceTarball}`,
        '@saas-ui/chakra-preset': `file:${presetTarball}`,
        '@saas-ui/hooks': `file:${hooksTarball}`,
        '@saas-ui/react': `file:${reactTarball}`,
      },
    }
    await fs.writeFile(
      manifestPath,
      `${JSON.stringify(manifest, null, 2)}\n`,
      'utf8',
    )
    await fs.writeFile(
      path.join(projectDir, 'src', 'app', 'layout.tsx'),
      `import type { ReactNode } from 'react'\n\nimport { Provider } from '@/components/setup/provider/provider'\n\nexport default function RootLayout(props: { children: ReactNode }) {\n  return <html lang="en"><body><Provider>{props.children}</Provider></body></html>\n}\n`,
      'utf8',
    )
    await fs.writeFile(
      path.join(projectDir, 'src', 'app', 'page.tsx'),
      `import { Sidebar } from '@/components/ui/sidebar'\n\nexport default function Page() {\n  return <Sidebar.Provider><Sidebar.Root><Sidebar.Body>Ready</Sidebar.Body></Sidebar.Root></Sidebar.Provider>\n}\n`,
      'utf8',
    )

    await run(
      'pnpm',
      ['install', '--offline', '--ignore-scripts', '--no-frozen-lockfile'],
      projectDir,
    )
    const installedPreset = await fs.realpath(
      path.join(projectDir, 'node_modules', '@saas-ui', 'chakra-preset'),
    )
    const installedCli = await fs.realpath(
      path.join(projectDir, 'node_modules', '@saas-ui', 'cli'),
    )
    const installedAppearance = await fs.realpath(
      path.join(projectDir, 'node_modules', '@saas-ui', 'appearance'),
    )
    const installedReact = await fs.realpath(
      path.join(projectDir, 'node_modules', '@saas-ui', 'react'),
    )
    const installedHooks = await fs.realpath(
      path.join(projectDir, 'node_modules', '@saas-ui', 'hooks'),
    )
    const canonicalRoot = await fs.realpath(root)
    assert(
      [
        installedPreset,
        installedCli,
        installedAppearance,
        installedReact,
        installedHooks,
      ].every((directory) => directory.startsWith(canonicalRoot + path.sep)),
      'Packed consumer resolved a Saas UI package back to the workspace.',
    )
    const packedVersions = await Promise.all(
      [
        ['@saas-ui/chakra-preset', installedPreset],
        ['@saas-ui/appearance', installedAppearance],
        ['@saas-ui/react', installedReact],
        ['@saas-ui/hooks', installedHooks],
      ] as const,
    ).then((entries) =>
      Promise.all(
        entries.map(async ([name, directory]) => {
          const packedManifest = JSON.parse(
            await fs.readFile(path.join(directory, 'package.json'), 'utf8'),
          ) as { version: string }
          return [name, packedManifest.version] as const
        }),
      ),
    )
    for (const [name, version] of packedVersions) {
      manifest.dependencies[name] = version
    }
    for (const [name, specifier] of restoreSpecifiers) {
      manifest.dependencies[name] = specifier
    }
    if (manifest.pnpm?.overrides) {
      for (const name of Object.keys(manifest.pnpm.overrides)) {
        if (name.startsWith('@saas-ui/')) delete manifest.pnpm.overrides[name]
      }
    }
    await fs.writeFile(
      manifestPath,
      `${JSON.stringify(manifest, null, 2)}\n`,
      'utf8',
    )

    server = await startLocalRegistryServer()
    const cliEntry = path.join(installedCli, 'lib', 'cli.js')
    const cliEnvironment = {
      ...process.env,
      // Package installation has already completed offline. Removing command
      // lookup proves the packed CLI operations below cannot invoke pnpm/npm
      // to hide an incomplete dependency plan.
      PATH: '',
      npm_config_offline: 'true',
      SAAS_UI_REGISTRY_URL: server.registryUrl,
    }
    await run(
      process.execPath,
      [
        cliEntry,
        'init',
        '--cwd',
        projectDir,
        '--yes',
        '--defaults',
        '--color-mode',
        'on',
        '--silent',
      ],
      projectDir,
      cliEnvironment,
    )
    await run(
      process.execPath,
      [cliEntry, 'add', '--all', '--cwd', projectDir, '--yes', '--silent'],
      projectDir,
      cliEnvironment,
    )
    const registryIndex = (await (
      await fetch(`${server.registryUrl}/index.json`)
    ).json()) as Array<{ name: string }>
    const componentsConfig = JSON.parse(
      await fs.readFile(path.join(projectDir, 'components.json'), 'utf8'),
    ) as {
      installed: string[]
    }
    assert(
      componentsConfig.installed.length === registryIndex.length - 1 &&
        componentsConfig.installed.includes('provider') &&
        !componentsConfig.installed.includes('provider-no-color-mode'),
      'Packed CLI add --all did not select every compatible public item.',
    )

    const sidebarPath = path.join(
      projectDir,
      'src',
      'components',
      'ui',
      'sidebar',
      'sidebar.tsx',
    )
    const installedSidebar = await fs.readFile(sidebarPath, 'utf8')
    await fs.writeFile(sidebarPath, '// packed local change\n', 'utf8')
    await run(
      process.execPath,
      [
        cliEntry,
        'update',
        'sidebar',
        '--cwd',
        projectDir,
        '--silent',
      ],
      projectDir,
      cliEnvironment,
    )
    assert(
      (await fs.readFile(sidebarPath, 'utf8')) === installedSidebar,
      'Packed CLI update did not restore registry content.',
    )

    const legacyPath = path.join(projectDir, 'src', 'legacy.tsx')
    await fs.writeFile(
      legacyPath,
      "import { Box, Persona } from '@saas-ui/react'\nexport const Legacy = { Box, Persona }\n",
      'utf8',
    )
    await run(
      process.execPath,
      [
        cliEntry,
        'migrate',
        'react-to-registry',
        'src/legacy.tsx',
        '--cwd',
        projectDir,
        '--write',
        '--json',
      ],
      projectDir,
      cliEnvironment,
    )
    const migratedSource = await fs.readFile(legacyPath, 'utf8')
    assert(
      migratedSource.includes('@chakra-ui/react') &&
        migratedSource.includes('@/components/ui/persona') &&
        !migratedSource.includes('@saas-ui/react'),
      'Packed CLI migration write mode did not rewrite legacy imports.',
    )
    await run(
      path.join(projectDir, 'node_modules', '.bin', 'tsc'),
      ['--project', 'tsconfig.json', '--pretty', 'false'],
      projectDir,
    )
    await run(
      path.join(projectDir, 'node_modules', '.bin', 'next'),
      ['build'],
      projectDir,
      { ...process.env, NEXT_TELEMETRY_DISABLED: '1' },
    )

    const lock = await fs.readFile(
      path.join(projectDir, 'pnpm-lock.yaml'),
      'utf8',
    )
    assert(
      !lock.includes('workspace:'),
      'Packed consumer lock contains workspace ranges.',
    )
    process.stdout.write(
      `Packed consumer acceptance passed: offline install, add-all (${componentsConfig.installed.length} items), write update/migration, typecheck, and Next build.\n`,
    )
  } finally {
    await server?.close()
    await fs.rm(root, { force: true, recursive: true })
  }
}

await main()
