import { defineStyleConfig } from '@chakra-ui/styled-system'

export const formLayoutTheme = defineStyleConfig({
  defaultProps: {
    /* @ts-expect-error */
    spacing: 4, // Chakra UI officially doesn't support custom default props yet, but this works.
  },
})
