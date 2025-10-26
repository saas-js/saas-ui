import { buildCommand } from '@stricli/core'

export const initCommand = buildCommand({
  loader: async () => {
    const { init } = await import('./impl')
    return init
  },
  parameters: {
    flags: {
      yes: {
        kind: 'boolean',
        default: true,
        brief: 'Skip confirmation prompt.',
      },
      defaults: {
        kind: 'boolean',
        default: false,
        brief: 'Use default configuration.',
      },
      force: {
        kind: 'boolean',
        default: false,
        brief: 'Force overwrite of existing configuration.',
      },
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
    },
    positional: {
      kind: 'array',
      parameter: {
        parse: String,
        brief: 'The components to install.',
      },
      minimum: 0,
    },
  },
  docs: {
    brief: 'Initialize a project.',
  },
})
