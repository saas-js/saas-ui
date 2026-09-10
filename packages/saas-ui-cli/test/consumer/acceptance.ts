import { spawn } from 'node:child_process'
import { existsSync, promises as fs } from 'node:fs'
import path from 'node:path'

import {
  type ColorModeVariant,
  assertConsumerFixture,
  assertInstallAllConsumerFixture,
  installAllConsumerFixture,
  installConsumerFixture,
  reinstallAllConsumerFixture,
  reinstallConsumerFixture,
  removeConsumerDirectory,
} from './fixture'
import { WEBSITE_ROOT } from './local-registry'

function run(command: string, args: string[], cwd: string) {
  return new Promise<void>((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      env: {
        ...process.env,
        NEXT_TELEMETRY_DISABLED: '1',
        NODE_ENV: 'production',
      },
      stdio: 'inherit',
    })
    child.once('error', reject)
    child.once('exit', (code, signal) => {
      if (code === 0) resolve()
      else {
        reject(
          new Error(
            `${path.basename(command)} ${args.join(' ')} failed with ${
              signal ? `signal ${signal}` : `exit code ${code}`
            }.`,
          ),
        )
      }
    })
  })
}

async function workspaceBinary(name: string) {
  const target = path.join(WEBSITE_ROOT, 'node_modules/.bin', name)
  if (!existsSync(target)) {
    throw new Error(
      `Missing workspace binary ${target}. Restore the frozen workspace ` +
        'dependencies before running registry:consumer:acceptance.',
    )
  }
  return target
}

async function createAcceptanceDirectory() {
  const temporaryRoot = path.join(WEBSITE_ROOT, '.next')
  await fs.mkdir(temporaryRoot, { recursive: true })
  return fs.mkdtemp(path.join(temporaryRoot, 'registry-consumer-'))
}

async function acceptVariant(
  colorMode: ColorModeVariant,
  tsc: string,
  next: string,
) {
  const cwd = await createAcceptanceDirectory()
  try {
    const fixture = await installConsumerFixture({ cwd, colorMode })
    await assertConsumerFixture(fixture)
    await reinstallConsumerFixture(fixture)
    await run(tsc, ['--project', 'tsconfig.json', '--pretty', 'false'], cwd)
    await run(next, ['build'], cwd)
  } finally {
    await removeConsumerDirectory(cwd)
    await fs.rmdir(path.join(WEBSITE_ROOT, '.next')).catch(() => undefined)
  }
}

async function acceptInstallAll(tsc: string, next: string) {
  const cwd = await createAcceptanceDirectory()
  try {
    const fixture = await installAllConsumerFixture(cwd)
    await assertInstallAllConsumerFixture(fixture)
    await reinstallAllConsumerFixture(fixture)
    process.stdout.write(
      `Selected ${fixture.selectedItems.length} of ${fixture.index.length} ` +
        `public registry entries; excluded ${fixture.excludedItems.join(', ')}.\n`,
    )
    await run(tsc, ['--project', 'tsconfig.json', '--pretty', 'false'], cwd)
    await run(next, ['build'], cwd)
  } finally {
    await removeConsumerDirectory(cwd)
    await fs.rmdir(path.join(WEBSITE_ROOT, '.next')).catch(() => undefined)
  }
}

async function main() {
  // Unit fixtures use OS temp directories. Acceptance fixtures live below the
  // website so Node/Next can reuse its already-installed dependencies without
  // running a package manager or reaching the network.
  const [tsc, next] = await Promise.all([
    workspaceBinary('tsc'),
    workspaceBinary('next'),
  ])

  if (process.argv.includes('--install-all')) {
    process.stdout.write(
      'Accepting generated install-all registry consumer...\n',
    )
    await acceptInstallAll(tsc, next)
    return
  }

  for (const colorMode of ['on', 'off'] as const) {
    process.stdout.write(
      `Accepting registry consumer (color mode ${colorMode})...\n`,
    )
    await acceptVariant(colorMode, tsc, next)
  }
}

await main()
