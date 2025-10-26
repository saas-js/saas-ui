import { buildCommand } from '@stricli/core'

import { add } from './impl'

export const addCommand = buildCommand({
  loader: async () => {
    const { add } = await import('./impl')
    return add
  },
  parameters: {
    flags: {
      all: {
        kind: 'boolean',
        brief: 'Add all available components',
      },
      yes: {
        kind: 'boolean',
        brief: 'Skip confirmation prompt.',
      },
      overwrite: {
        kind: 'boolean',
        brief: 'Overwrite existing files.',
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
      srcDir: {
        kind: 'boolean',
        optional: true,
        brief: 'Use the src directory when creating a new project.',
      },
      path: {
        kind: 'parsed',
        parse: String,
        optional: true,
        brief: 'The path to add the component to.',
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
