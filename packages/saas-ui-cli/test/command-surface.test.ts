import { ExitCode, generateHelpTextForAllCommands, run } from '@stricli/core'
import { promises as fs } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { describe, expect, it, vi } from 'vitest'

import manifest from '../package.json'
import { app, applicationName } from '../src/app'
import {
  confirmMissingConfigInit,
  resolveAddCommandOptions,
} from '../src/commands/add/impl'
import { buildContext } from '../src/context'

function allHelp() {
  return generateHelpTextForAllCommands(app)
    .map(([route, documentation]) => `${route}\n${documentation}`)
    .join('\n')
}

describe('public CLI command surface', () => {
  it('uses the product name and preserves every executable alias', () => {
    expect(applicationName).toBe('saas-ui')
    expect(allHelp()).toContain('saas-ui')
    expect(manifest.name).toBe('@saas-ui/cli')
    expect(manifest.bin).toMatchObject({
      'saas-ui': 'lib/cli.js',
      sui: 'lib/cli.js',
      '@saas-ui/cli': 'lib/cli.js',
    })
  })

  it('registers the Phase 5 commands and renders camel-case flags as kebab-case', () => {
    const routes = generateHelpTextForAllCommands(app).map(([route]) => route)
    const help = allHelp()

    for (const route of [
      'saas-ui init',
      'saas-ui add',
      'saas-ui diff',
      'saas-ui update',
      'saas-ui migrate react-to-registry',
    ]) {
      expect(routes).toContain(route)
    }

    for (const flag of [
      '--color-mode',
      '--check',
      '--components-alias',
      '--dry-run',
      '--diff',
      '--hooks-alias',
      '--icons-alias',
      '--lib-alias',
      '--ui-alias',
      '--utils-alias',
    ]) {
      expect(help).toContain(flag)
    }

    expect(help).not.toContain('--colorMode')
    expect(help).not.toContain('--dryRun')
  })

  it('does not advertise the removed add path and src-dir flags', () => {
    const addHelp = generateHelpTextForAllCommands(app)
      .filter(([route]) => route === `${applicationName} add`)
      .map(([, documentation]) => documentation)
      .join('\n')

    expect(addHelp).not.toBe('')
    expect(addHelp).not.toContain('--path')
    expect(addHelp).not.toContain('--src-dir')
  })

  it('makes add --diff a dry run with an optional path filter', () => {
    const baseFlags = {
      all: false,
      cwd: undefined,
      dryRun: false,
      overwrite: false,
      silent: false,
      yes: false,
    }

    expect(
      resolveAddCommandOptions(
        { ...baseFlags, diff: '' },
        ['@acme/button'],
        '/project',
      ),
    ).toMatchObject({
      components: ['@acme/button'],
      cwd: '/project',
      diff: '',
      dryRun: true,
    })
    expect(
      resolveAddCommandOptions(
        { ...baseFlags, diff: 'button.tsx' },
        ['button'],
        '/project',
      ),
    ).toMatchObject({ diff: 'button.tsx', dryRun: true })
  })

  it('makes unmanaged migration conflicts an explicit opt-in', () => {
    const migrationHelp = generateHelpTextForAllCommands(app)
      .filter(
        ([route]) => route === `${applicationName} migrate react-to-registry`,
      )
      .map(([, documentation]) => documentation)
      .join('\n')

    expect(migrationHelp).toContain('--overwrite')
    expect(migrationHelp).toContain('unmanaged template files')
  })

  it.each(['--path', '--src-dir'])(
    'rejects the removed %s flag during application parsing',
    async (flag) => {
      let stderr = ''
      const cliProcess = {
        env: { STRICLI_NO_COLOR: '1' },
        exitCode: 0,
        stderr: {
          write(chunk: unknown) {
            stderr += String(chunk)
            return true
          },
        },
        stdout: {
          write() {
            return true
          },
        },
      } as unknown as NodeJS.Process

      await run(app, ['add', flag, 'legacy-value'], buildContext(cliProcess))

      expect(cliProcess.exitCode).toBe(ExitCode.InvalidArgument)
      expect(stderr).toContain(`No flag registered for ${flag}`)
    },
  )

  it('recognizes kebab-case flags during application parsing', async () => {
    let stderr = ''
    const cliProcess = {
      env: { STRICLI_NO_COLOR: '1' },
      exitCode: 0,
      stderr: {
        write(chunk: unknown) {
          stderr += String(chunk)
          return true
        },
      },
      stdout: {
        write() {
          return true
        },
      },
    } as unknown as NodeJS.Process

    await run(
      app,
      ['init', '--color-mode', 'invalid'],
      buildContext(cliProcess),
    )

    expect(cliProcess.exitCode).toBe(ExitCode.InvalidArgument)
    expect(stderr).toMatch(
      /Failed to parse "invalid" for (?:--)?color-mode(?::|\b)/,
    )
    expect(stderr).not.toContain('No flag registered for --color-mode')
  })

  it('returns a failing process status when migration diagnostics reject write mode', async () => {
    const cwd = await fs.mkdtemp(path.join(os.tmpdir(), 'sui-command-'))
    let stderr = ''
    const cliProcess = {
      env: { STRICLI_NO_COLOR: '1' },
      exitCode: 0,
      stderr: {
        write(chunk: unknown) {
          stderr += String(chunk)
          return true
        },
      },
      stdout: {
        write() {
          return true
        },
      },
    } as unknown as NodeJS.Process
    const json = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    try {
      await fs.mkdir(path.join(cwd, 'src'), { recursive: true })
      await fs.writeFile(
        path.join(cwd, 'components.json'),
        `${JSON.stringify({
          system: 'chakra',
          style: 'default',
          rsc: true,
          tsx: true,
          aliases: {
            components: '@/components',
            utils: '@/lib/utils',
            ui: '@/components/ui',
            lib: '@/lib',
            hooks: '@/hooks',
            icons: '@/components/icons',
          },
        })}\n`,
      )
      await fs.writeFile(
        path.join(cwd, 'package.json'),
        `${JSON.stringify({
          name: 'migration-command-fixture',
          private: true,
          dependencies: { '@saas-ui/react': '3.0.0-next.54' },
        })}\n`,
      )
      await fs.writeFile(
        path.join(cwd, 'src', 'invalid.tsx'),
        "import { Box from '@saas-ui/react'\n",
      )

      await run(
        app,
        [
          'migrate',
          'react-to-registry',
          'src/invalid.tsx',
          '--cwd',
          cwd,
          '--write',
          '--json',
        ],
        buildContext(cliProcess),
      )

      expect(cliProcess.exitCode).toBe(ExitCode.CommandRunError)
      expect(stderr).toContain('Migration could not be applied')
      expect(json).toHaveBeenCalledWith(
        expect.stringContaining('"success": false'),
      )
      await expect(
        fs.readFile(path.join(cwd, 'src', 'invalid.tsx'), 'utf8'),
      ).resolves.toBe("import { Box from '@saas-ui/react'\n")
    } finally {
      json.mockRestore()
      await fs.rm(cwd, { force: true, recursive: true })
    }
  })
})

describe('add missing-config confirmation', () => {
  it('does not call the interactive confirmation when --yes is set', async () => {
    const confirm = vi.fn(async () => false)

    await expect(confirmMissingConfigInit(true, confirm)).resolves.toBe(true)
    expect(confirm).not.toHaveBeenCalled()
  })

  it('preserves the interactive result by default', async () => {
    const confirm = vi.fn(async () => false)

    await expect(confirmMissingConfigInit(false, confirm)).resolves.toBe(false)
    expect(confirm).toHaveBeenCalledOnce()
  })
})
