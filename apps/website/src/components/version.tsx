import { Badge } from '@chakra-ui/react'
import pkg from '../../../../packages/saas-ui-react/package.json'

const PRO_VERSION = '0.42.3'

export const Version = (props: { version?: string; pro?: boolean }) => {
  return (
    <Badge
      variant="outline"
      textTransform="none"
      fontWeight="normal"
      px="12px"
      display="flex"
      alignItems="center"
      minH="32px"
      borderWidth="1px"
      borderColor="chakra-border-color"
      borderRadius="md"
      color="gray.600"
      _dark={{
        color: 'whiteAlpha.700',
      }}
    >
      {props.version || (props.pro && PRO_VERSION) || pkg.version} (latest)
    </Badge>
  )
}
