import { Group } from '@chakra-ui/react'
import { Badge } from '@saas-ui/react'

export const BadgeWithGroup = () => {
  return (
    <Group attached>
      <Badge variant="solid" colorPalette="blue">
        Commit status
      </Badge>
      <Badge variant="solid" colorPalette="green">
        90+
      </Badge>
    </Group>
  )
}
