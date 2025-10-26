import '@dotenvx/dotenvx'
import { defineConfig } from 'tsup'

export default defineConfig(({ watch }) => {
  return {
    entry: ['src/bin/cli.ts', 'src/bin/bash-complete.ts'],
    outDir: 'lib',
    format: ['esm'],
    tsconfig: 'tsconfig.json',
    sourcemap: !!watch,
    external: ['fs'],
    platform: 'node',
    env: {
      SUPABASE_URL: process.env.SUPABASE_URL ?? '',
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY ?? '',
      AUTH_ORIGIN: process.env.AUTH_ORIGIN!,
      REGISTRY_URL: process.env.REGISTRY_URL!,
      SCHEMA_URL: process.env.SCHEMA_URL!,
    },
    clean: true,
    splitting: true,
    minify: true,
  }
})
