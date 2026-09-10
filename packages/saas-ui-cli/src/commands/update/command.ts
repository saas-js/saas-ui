import { buildCommand } from '@stricli/core'

export const updateCommand = buildCommand({
  loader: async () => {
    const { update } = await import('./impl')
    return update
  },
  parameters: {
    flags: {
      all: {
        kind: 'boolean',
        brief: 'Update every installed item in components.json.',
      },
      dryRun: {
        kind: 'boolean',
        brief: 'Show the update plan without changing the project.',
      },
      cwd: {
        kind: 'parsed',
        optional: true,
        parse: String,
        brief: 'The working directory. Defaults to the current directory.',
      },
      silent: {
        kind: 'boolean',
        brief: 'Mute output.',
      },
    },
    positional: {
      kind: 'array',
      parameter: {
        parse: String,
        brief: 'Installed registry items to update.',
      },
      minimum: 0,
    },
  },
  docs: {
    brief: 'Update installed registry items from the current registry',
  },
})
