import { mode } from '@chakra-ui/theme-tools'

type Dict = Record<string, any>

const badgeTheme = {
  variants: {
    outline: (props) => {
      const { colorScheme: c } = props
      return {
        boxShadow: 'none',
        borderWidth: 1,
        borderColor: `${c}.400`,
        color: `${c}.400`,
      }
    },
  },
}

export default badgeTheme
