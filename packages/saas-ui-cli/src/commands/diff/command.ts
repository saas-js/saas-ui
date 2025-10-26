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
      maximum: 1,
    },
  },
  docs: {
    brief: 'Check for component updates',
  },
})
