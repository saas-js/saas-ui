import { buildCommand } from '@stricli/core'

export const diffCommand = buildCommand({
  loader: async () => {
    const { diff } = await import('./impl')
    return diff
  },
  parameters: {
    flags: {
      yes: {
        kind: 'boolean',
        brief: 'Skip confirmation prompt.',
        default: false,
      },
      check: {
        kind: 'boolean',
        brief: 'Exit with an error when installed registry items have drifted.',
        default: false,
      },
      cwd: {
        kind: 'parsed',
        parse: String,
        brief: 'The working directory. Defaults to the current directory.',
        optional: true,
      },
    },
    positional: {
      kind: 'array',
      parameter: {
        parse: String,
        brief: 'The component to check for updates.',
      },
      minimum: 0,
    },
  },
  docs: {
    brief: 'Compare installed registry items with local files and the registry',
  },
})
