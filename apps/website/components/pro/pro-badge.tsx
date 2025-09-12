import { Badge, type BadgeProps } from '@saas-ui/react'

export const ProBadge = (props: BadgeProps) => {
  return (
    <Badge
      size="xs"
      variant="outline"
      colorPalette="cyan"
      borderRadius="4px"
      boxShadow="none"
      borderWidth="1.5px"
      borderColor="cyan.500"
      color="cyan.500"
      fontSize="10px"
      height="4"
      px="0.5"
      fontWeight="bold"
      _dark={{
        borderColor: 'cyan.600',
        color: 'cyan.600',
      }}
      {...props}
    >
      PRO
    </Badge>
  )
}
