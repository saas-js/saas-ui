import { defineSlotRecipe } from '@chakra-ui/react/styled-system'

import { appShellAnatomy } from '../../anatomy'

export const appShellSlotRecipe = defineSlotRecipe({
  className: 'sui-app-shell',
  slots: [...appShellAnatomy.keys()],
  base: {
    root: {
      height: '$100vh',
      display: 'grid',
      gridTemplateColumns: 'auto 1fr auto',
      gridTemplateRows: 'auto 1fr auto',
      gridTemplateAreas:
        '"header header header" "sidebar main aside" "footer footer footer"',
    },
    header: {
      gridArea: 'header',
    },
    main: {
      gridArea: 'main',
    },
    footer: {
      gridArea: 'footer',
    },
  },

  variants: {
    variant: {
      plain: {},
      raised: {
        main: {
          boxShadow: 'sm',
        },
      },
    },
  },

  defaultVariants: {
    variant: 'raised',
    colorPalette: 'gray',
  },
})
