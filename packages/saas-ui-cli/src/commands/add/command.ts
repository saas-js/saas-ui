import { buildCommand } from '@stricli/core'

export const addCommand = buildCommand({
  loader: async () => {
    const { add } = await import('./impl')
    return add
  },
  parameters: {
    flags: {
      all: {
        kind: 'boolean',
        brief:
          'Add every public installable item, using defaults for exclusive groups.',
      },
      yes: {
        kind: 'boolean',
        brief: 'Skip confirmation prompt.',
      },
      overwrite: {
        kind: 'boolean',
        brief: 'Overwrite existing files.',
      },
      dryRun: {
        kind: 'boolean',
        brief: 'Show the install plan without changing the project.',
      },
      diff: {
        kind: 'parsed',
        parse: String,
        optional: true,
        inferEmpty: true,
        placeholder: 'path',
        brief:
          'Show registry file differences without changing the project. Optionally filter by path.',
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
        brief: 'The components to add or a url to the component.',
      },
      minimum: 0,
    },
  },
  docs: {
    brief: 'Add components to your project',
  },
})
