import { buildCommand } from '@stricli/core'

export const reactToRegistryCommand = buildCommand({
  loader: async () => {
    const { reactToRegistry } = await import('./impl')
    return reactToRegistry
  },
  parameters: {
    flags: {
      cwd: {
        kind: 'parsed',
        optional: true,
        parse: String,
        brief: 'The project root. Defaults to the current directory.',
      },
      dryRun: {
        kind: 'boolean',
        default: false,
        brief: 'Plan and report the migration without changing files.',
      },
      write: {
        kind: 'boolean',
        default: false,
        brief: 'Atomically write the planned migration and install templates.',
      },
      overwrite: {
        kind: 'boolean',
        default: false,
        brief: 'Replace unmanaged template files that conflict with the plan.',
      },
      json: {
        kind: 'boolean',
        default: false,
        brief: 'Print the versioned machine-readable JSON report.',
      },
    },
    positional: {
      kind: 'array',
      parameter: {
        parse: String,
        brief: 'Files, directories, or glob patterns. Defaults to the project.',
      },
      minimum: 0,
    },
  },
  docs: {
    brief: 'Migrate @saas-ui/react imports to Chakra and registry templates',
  },
})
