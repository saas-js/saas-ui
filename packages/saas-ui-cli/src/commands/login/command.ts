import { buildCommand } from '@stricli/core'

export const loginCommand = buildCommand({
  loader: async () => {
    const { login } = await import('./impl')
    return login
  },
  parameters: {},
  docs: {
    brief: 'Log in with your Saas UI account.',
  },
})
