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
    },
  },
  docs: {
    brief: 'List all available components.',
  },
})
