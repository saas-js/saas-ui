import { spawn } from 'node:child_process'
import { promises as fs } from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import { startLocalRegistryServer } from '../../packages/saas-ui-cli/scripts/run-local-registry'
import { SUPPORTED_PRESET_VERSION } from '../../packages/saas-ui-cli/src/utils/package-compatibility'
import { version as reactVersion } from '../../packages/saas-ui-react/package.json'
import { repositoryRoot } from './public-registry'

const cliEntry = path.join(
  repositoryRoot,
  'packages',
  'saas-ui-cli',
  'lib',
  'cli.js',
)
const fixtureTemplate = path.join(
  repositoryRoot,
  'packages',
  'saas-ui-cli',
  'test',
  'consumer',
  'template',
)

async function runCli(
  registryUrl: string,
  args: readonly string[],
  timeoutMs = 60_000,
) {
  const result = await runCliResult(registryUrl, args, timeoutMs)
  if (result.code === 0) return result.output
  throw new Error(
    `Built CLI failed (${result.signal ?? result.code}): saas-ui ${args.join(' ')}\n${result.output}`,
  )
}

async function runCliResult(
  registryUrl: string,
  args: readonly string[],
  timeoutMs = 60_000,
) {
  return await new Promise<{
    code: number | null
    signal: NodeJS.Signals | null
    output: string
  }>((resolve, reject) => {
    const child = spawn(process.execPath, [cliEntry, ...args], {
      cwd: repositoryRoot,
      env: { ...process.env, SAAS_UI_REGISTRY_URL: registryUrl },
      stdio: ['ignore', 'pipe', 'pipe'],
    })
    let output = ''
    child.stdout.on('data', (chunk) => (output += String(chunk)))
    child.stderr.on('data', (chunk) => (output += String(chunk)))
    const timeout = setTimeout(() => {
      child.kill('SIGTERM')
      reject(new Error(`Built CLI timed out: saas-ui ${args.join(' ')}`))
    }, timeoutMs)
    child.once('error', (error) => {
      clearTimeout(timeout)
      reject(error)
    })
    child.once('exit', (code, signal) => {
      clearTimeout(timeout)
      resolve({ code, signal, output })
    })
  })
}

async function snapshot(directory: string) {
  const result = new Map<string, string>()
  const visit = async (current: string): Promise<void> => {
    for (const entry of await fs.readdir(current, { withFileTypes: true })) {
      const target = path.join(current, entry.name)
      if (entry.isDirectory()) await visit(target)
      else if (entry.isFile()) {
        result.set(
          path.relative(directory, target).split(path.sep).join('/'),
          await fs.readFile(target, 'utf8'),
        )
      }
    }
  }
  await visit(directory)
  return [...result].sort(([left], [right]) =>
    left < right ? -1 : left > right ? 1 : 0,
  )
}

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

async function main() {
  await fs.access(cliEntry)
  const cwd = await fs.mkdtemp(path.join(os.tmpdir(), 'saas-ui-built-cli-'))
  const server = await startLocalRegistryServer()

  try {
    await fs.cp(fixtureTemplate, cwd, { recursive: true })
    const packagePath = path.join(cwd, 'package.json')
    const packageJson = JSON.parse(await fs.readFile(packagePath, 'utf8')) as {
      dependencies: Record<string, string>
    }
    packageJson.dependencies['@saas-ui/chakra-preset'] = SUPPORTED_PRESET_VERSION
    packageJson.dependencies['@saas-ui/react'] = reactVersion
    await fs.writeFile(
      packagePath,
      `${JSON.stringify(packageJson, null, 2)}\n`,
      'utf8',
    )
    await runCli(server.registryUrl, [
      'init',
      '--cwd',
      cwd,
      '--yes',
      '--defaults',
      '--color-mode',
      'off',
      '--silent',
    ])
    const componentsConfig = JSON.parse(
      await fs.readFile(path.join(cwd, 'components.json'), 'utf8'),
    ) as {
      installed?: string[]
    }
    assert(
      componentsConfig.installed?.includes('provider-no-color-mode'),
      'Built CLI init did not record the no-color-mode provider.',
    )

    const beforeAddDryRun = await snapshot(cwd)
    await runCli(server.registryUrl, [
      'add',
      'sidebar',
      '--cwd',
      cwd,
      '--yes',
      '--dry-run',
    ])
    assert(
      JSON.stringify(await snapshot(cwd)) === JSON.stringify(beforeAddDryRun),
      'Built CLI add --dry-run mutated the project.',
    )

    const addDiffOutput = await runCli(server.registryUrl, [
      'add',
      'sidebar',
      '--cwd',
      cwd,
      '--yes',
      '--diff',
      'sidebar.tsx',
    ])
    assert(
      addDiffOutput.includes('Registry diff: sidebar') &&
        addDiffOutput.includes('sidebar.tsx (create)') &&
        addDiffOutput.includes('+'),
      `Built CLI add --diff did not print the expected preview.\n${addDiffOutput}`,
    )
    assert(
      JSON.stringify(await snapshot(cwd)) === JSON.stringify(beforeAddDryRun),
      'Built CLI add --diff mutated the project.',
    )

    await runCli(server.registryUrl, ['add', 'sidebar', '--cwd', cwd, '--yes'])
    const sidebarPath = path.join(
      cwd,
      'src',
      'components',
      'ui',
      'sidebar',
      'sidebar.tsx',
    )
    const installedSidebar = await fs.readFile(sidebarPath, 'utf8')
    await runCli(server.registryUrl, ['diff', '--check', '--yes', '--cwd', cwd])

    const beforeUpdateDryRun = await snapshot(cwd)
    await runCli(server.registryUrl, [
      'update',
      'sidebar',
      '--cwd',
      cwd,
      '--dry-run',
    ])
    assert(
      JSON.stringify(await snapshot(cwd)) ===
        JSON.stringify(beforeUpdateDryRun),
      'Built CLI update --dry-run mutated the project.',
    )

    await fs.writeFile(sidebarPath, '// local conflict\n', 'utf8')
    const checkedDiff = await runCliResult(server.registryUrl, [
      'diff',
      'sidebar',
      '--cwd',
      cwd,
      '--check',
    ])
    assert(
      checkedDiff.code !== 0,
      'Built CLI diff --check did not report the locally modified file.',
    )
    assert(
      (await fs.readFile(sidebarPath, 'utf8')) === '// local conflict\n',
      'Built CLI diff mutated the locally modified file.',
    )
    await runCli(server.registryUrl, [
      'update',
      'sidebar',
      '--cwd',
      cwd,
      '--silent',
    ])
    assert(
      (await fs.readFile(sidebarPath, 'utf8')) === installedSidebar,
      'Built CLI update did not restore registry content.',
    )

    const legacyPath = path.join(cwd, 'src', 'legacy.tsx')
    const legacySource =
      "import { Box, Persona } from '@saas-ui/react'\nexport const Legacy = { Box, Persona }\n"
    await fs.writeFile(legacyPath, legacySource, 'utf8')
    const migrationOutput = await runCli(server.registryUrl, [
      'migrate',
      'react-to-registry',
      'src/legacy.tsx',
      '--cwd',
      cwd,
      '--dry-run',
      '--json',
    ])
    assert(
      migrationOutput.includes('@chakra-ui/react'),
      'Built CLI migration report did not include the Chakra replacement.',
    )
    assert(
      (await fs.readFile(legacyPath, 'utf8')) === legacySource,
      'Built CLI migration --dry-run mutated source.',
    )

    const personaDirectory = path.join(
      cwd,
      'src',
      'components',
      'ui',
      'persona',
    )
    const personaConflictPath = path.join(personaDirectory, 'persona.tsx')
    await fs.mkdir(personaDirectory, { recursive: true })
    await fs.writeFile(personaConflictPath, '// migration conflict\n', 'utf8')
    const beforeFailedMigration = await snapshot(cwd)
    const rejectedMigration = await runCliResult(server.registryUrl, [
      'migrate',
      'react-to-registry',
      'src/legacy.tsx',
      '--cwd',
      cwd,
      '--write',
      '--json',
    ])
    assert(
      rejectedMigration.code !== 0 &&
        rejectedMigration.output.includes('apply-error'),
      `Built CLI migration did not report the template conflict (exit ${rejectedMigration.code}).\n${rejectedMigration.output}`,
    )
    assert(
      JSON.stringify(await snapshot(cwd)) ===
        JSON.stringify(beforeFailedMigration),
      'Failed built CLI migration did not roll source and project files back.',
    )

    await fs.rm(personaDirectory, { force: true, recursive: true })
    await runCli(server.registryUrl, [
      'migrate',
      'react-to-registry',
      'src/legacy.tsx',
      '--cwd',
      cwd,
      '--write',
      '--json',
    ])
    const migratedSource = await fs.readFile(legacyPath, 'utf8')
    assert(
      migratedSource.includes('@chakra-ui/react') &&
        migratedSource.includes('@/components/ui/persona') &&
        !migratedSource.includes('@saas-ui/react'),
      'Built CLI migration write mode did not rewrite legacy imports.',
    )
    await fs.access(path.join(personaDirectory, 'persona.tsx'))

    process.stdout.write(
      'Built CLI acceptance passed: init, add preview, add, diff, write update, write migration, and migration rollback.\n',
    )
  } finally {
    await server.close()
    await fs.rm(cwd, { force: true, recursive: true })
  }
}

await main()
