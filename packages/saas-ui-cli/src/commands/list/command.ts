import { buildCommand } from '@stricli/core'

export const listCommand = buildCommand({
  loader: async () => {
    const { list } = await import('./impl')
    return list
  },
  parameters: {
    flags: {
      category: {
        kind: 'parsed',
        parse: String,
        optional: true,
        brief: 'Filter components by category.',
      },
      search: {
        kind: 'parsed',
        parse: String,
        optional: true,
        brief: 'Search components by name or description.',
      },
      cwd: {
        kind: 'parsed',
        parse: String,
        optional: true,
        brief: 'The working directory. Defaults to the current directory.',
      },
    },
    positional: {
      kind: 'array',
      parameter: {
        parse: String,
        brief: 'Registry namespace (e.g., @saas-ui or saas-ui)',
      },
      minimum: 0,
    },
  },
  docs: {
    brief: 'List all available components from a registry.',
  },
})
