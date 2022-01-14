import { transparentize } from '@chakra-ui/theme-tools'

import colors from './colors'

const shadows = {
  outline: `0 0 0 2px ${transparentize(colors.primary[500], 0.6)({ colors })}`,
}

export default shadows
