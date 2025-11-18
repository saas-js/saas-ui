import { buildCommand } from '@stricli/core'

export const registryCommand = buildCommand({
  loader: async () => {
    const { registry } = await import('./impl')
    return registry
  },
  parameters: {
    flags: {
      cwd: {
        kind: 'parsed',
        parse: String,
        brief: 'The working directory. defaults to the current directory.',
        default: process.cwd(),
      },
      silent: {
        kind: 'boolean',
        default: false,
        brief: 'Mute output.',
      },
      remove: {
        kind: 'boolean',
        default: false,
        brief: 'Remove the specified registry.',
      },
    },
    positional: {
      kind: 'array',
      parameter: {
        parse: String,
        brief: 'The name of the registry (without @) and optionally the URL (URL not needed when using --remove)',
      },
      minimum: 1,
      maximum: 2,
    },
  },
  docs: {
    brief: 'Add, update, or remove a registry in components.json',
  },
})

