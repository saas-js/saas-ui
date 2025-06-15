import { Badge, type BadgeProps } from '@chakra-ui/react'

export const ProBadge = (props: BadgeProps) => {
  return (
    <Badge
      size="xs"
      variant="outline"
      colorPalette="indigo"
      borderRadius="4px"
      boxShadow="none"
      borderWidth="1.5px"
      borderColor="indigo.600"
      fontSize="10px"
      height="4"
      px="0.5"
      fontWeight="semibold"
      {...props}
    >
      PRO
    </Badge>
  )
}
