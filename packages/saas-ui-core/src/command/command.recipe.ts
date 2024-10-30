import { defineRecipe } from '#system'

export const commandRecipe = defineRecipe({
  className: 'sui-command',
  base: {
    display: 'inline-flex',
    gap: 1,
    '[role=tooltip] > &': {
      ms: 1,
      _before: {
        content: '"•"',
        me: 1,
        fontSize: 'xs',
      },
    },
  },
})
