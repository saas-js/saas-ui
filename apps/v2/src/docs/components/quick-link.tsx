import { Box, Button, Icon, Text } from '@chakra-ui/react'
import { FiArrowRight } from 'react-icons/fi'
import { LinkCard } from './link-card'

export const QuickLink = (props) => {
  const {
    href,
    title,
    description,
    label = 'Learn more...',
    icon,
    ...rest
  } = props

  return (
    <LinkCard href={href} mt="0" {...rest}>
      {icon && (
        <Box w="24px" h="24px" mb="4" fontSize="xl" color="primary.500">
          {icon}
        </Box>
      )}
      <Text fontWeight="semibold" mb="1">
        {title}
      </Text>
      <Text color="muted" fontSize="md" mb="4">
        {description}
      </Text>
      <Button
        variant="link"
        color="inherit"
        rightIcon={
          <Icon
            as={FiArrowRight}
            mt="1px"
            transform="translateX(-5px)"
            transitionProperty="common"
            transitionDuration="fast"
            sx={{ '.chakra-card:hover &': { transform: 'translateX(0)' } }}
          />
        }
        _hover={{
          textDecoration: 'none',
        }}
      >
        {label}
      </Button>
    </LinkCard>
  )
}
