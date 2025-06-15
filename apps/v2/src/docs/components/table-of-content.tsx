import * as React from 'react'
import { useScrollSpy } from '@/hooks/use-scrollspy'
import {
  Box,
  ListItem,
  OrderedList,
  chakra,
  Text,
  useColorModeValue,
  BoxProps,
} from '@chakra-ui/react'
import { Heading } from '@/docs/components/page-container'
import { t } from '@/docs/utils/i18n'

interface TableOfContentProps extends BoxProps {
  headings: Heading[]
}

function TableOfContent(props: TableOfContentProps) {
  const { headings, ...rest } = props
  const activeId = useScrollSpy(
    headings.map(({ id }) => `[id="${id}"]`),
    {
      rootMargin: '0% 0% -24% 0%',
    }
  )
  const linkColor = useColorModeValue('gray.600', 'whiteAlpha.600')
  const linkHoverColor = useColorModeValue('gray.900', 'white')
  const borderColor = useColorModeValue('gray.300', 'gray.600')
  const borderActiveColor = useColorModeValue('black', 'white')
  return (
    <Box
      as="nav"
      aria-labelledby="toc-title"
      width="12rem"
      flexShrink={0}
      display={{ base: 'none', xl: 'block' }}
      position="sticky"
      py="10"
      pr="4"
      top="6rem"
      right="0"
      fontSize="sm"
      alignSelf="start"
      maxHeight="calc(100vh - 8rem)"
      overflowY="auto"
      sx={{ overscrollBehavior: 'contain' }}
      {...rest}
    >
      <Text
        as="h2"
        id="toc-title"
        fontWeight="bold"
        fontSize="xs"
        color={useColorModeValue('gray.700', 'gray.400')}
        letterSpacing="wide"
      >
        {t('component.table-of-content.on-this-page') || 'On this page'}
      </Text>
      <OrderedList spacing={0} ml="0" mt="4" styleType="none">
        {headings.map(({ id, text, level }) => (
          <ListItem
            key={id}
            title={text}
            borderLeftWidth={id === activeId ? 2 : 1}
            borderColor={id === activeId ? borderActiveColor : borderColor}
            pl={4}
          >
            <chakra.a
              py="1"
              display="block"
              ml={level === 'h3' ? '2' : undefined}
              fontWeight={id === activeId ? 'bold' : 'medium'}
              href={`#${id}`}
              aria-current={id === activeId ? 'location' : undefined}
              color={id === activeId ? linkHoverColor : linkColor}
              transition="all .2s ease-in"
              _hover={{
                color: linkHoverColor,
              }}
            >
              {text}
            </chakra.a>
          </ListItem>
        ))}
      </OrderedList>
    </Box>
  )
}

export default TableOfContent
