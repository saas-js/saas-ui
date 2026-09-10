import '@dotenvx/dotenvx'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'tsup'

import { version as presetVersion } from '../saas-ui-chakra-preset/package.json'
import { version as cliVersion } from './package.json'

const packageRoot = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ watch }) => {
  const authOrigin = process.env.AUTH_ORIGIN ?? 'https://saas-ui.dev'
  const registryUrl = process.env.REGISTRY_URL ?? 'https://saas-ui.dev/r'
  const schemaUrl =
    process.env.SCHEMA_URL ?? 'https://saas-ui.dev/r/schema/components.json'

  return {
    entry: {
      cli: 'src/bin/cli.ts',
      'bash-complete': 'src/bin/bash-complete.ts',
      'consumer/index': 'src/consumer/index.ts',
    },
    outDir: 'lib',
    format: ['esm'],
    tsconfig: 'tsconfig.json',
    sourcemap: !!watch,
    external: ['fs'],
    noExternal: ['@saas-ui/registry'],
    dts: { entry: { index: 'src/consumer/index.ts' } },
    platform: 'node',
    env: {
      SUPABASE_URL: process.env.SUPABASE_URL ?? '',
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY ?? '',
      AUTH_ORIGIN: authOrigin,
      REGISTRY_URL: registryUrl,
      SCHEMA_URL: schemaUrl,
    },
    onSuccess: async () => {
      const output = path.join(packageRoot, 'lib', 'build-info.json')
      await mkdir(path.dirname(output), { recursive: true })
      await writeFile(
        output,
        `${JSON.stringify(
          {
            authOrigin,
            cliVersion,
            kind: 'saas-ui.cli-build-info',
            presetVersion,
            registryUrl,
            schemaUrl,
            version: 1,
          },
          null,
          2,
        )}\n`,
      )
    },
    clean: true,
    splitting: true,
    minify: true,
  }
})
