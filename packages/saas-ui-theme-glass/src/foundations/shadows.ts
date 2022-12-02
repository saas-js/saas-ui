import { transparentize } from '@chakra-ui/theme-tools'

import colors from './colors'

const shadows = {
  xs: 'rgb(0 0 0 / 7%) 0px 1px 1px',
  'dark-xs': 'rgb(0 0 0 / 7%) 0px 1px 1px',
  outline: `0 0 0 2px ${transparentize(colors.primary[500], 0.6)({ colors })}`,
}

export default shadows
