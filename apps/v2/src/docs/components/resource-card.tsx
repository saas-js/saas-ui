import {
  Badge,
  BoxProps,
  Heading,
  LinkBox,
  LinkOverlay,
  Text,
  useColorModeValue,
  Wrap,
  WrapItem,
  VStack,
} from '@chakra-ui/react'
import * as React from 'react'

export interface Resource {
  heading: string
  type: 'blog' | 'talk' | 'video'
  description: string
  url: string
  author: string
  tags?: string[]
}

interface ResourceCardProps extends BoxProps {
  data: Resource
}

function ResourceCard(props: ResourceCardProps) {
  const { data, ...rest } = props
  const { heading, author, description, url, tags } = data
  const color = useColorModeValue('teal.600', 'teal.400')

  return (
    <LinkBox
      {...rest}
      p={4}
      rounded='lg'
      transitionProperty='all'
      transitionDuration='slower'
      transitionTimingFunction='ease-out'
      _hover={{
        transform: 'scale(1.025)',
        boxShadow: 'var(--chakra-shadows-md)',
      }}
      bg={useColorModeValue('gray.50', 'gray.700')}
    >
      <VStack spacing={2} align='stretch'>
        <Wrap className='algolia-exclude' spacing='3' mb='2' align='center'>
          {tags?.map((tag, index) => (
            <WrapItem key={index} overflow='hidden'>
              <Badge
                as='a'
                rel='tag'
                color={color}
                textTransform='uppercase'
                fontSize='xs'
                fontWeight='bold'
                whiteSpace='break-spaces'
              >
                {tag}
              </Badge>
            </WrapItem>
          ))}
        </Wrap>

        <LinkOverlay isExternal href={url}>
          <VStack spacing={2} align='stretch'>
            <Heading as='h3' size='sm'>
              <span className='content'>{heading}</span>
            </Heading>
            <Text fontSize='sm' color='gray.500'>
              by {author}
            </Text>
            <Text lineHeight='tall' opacity={0.8}>
              {description}
            </Text>
          </VStack>
        </LinkOverlay>
      </VStack>
    </LinkBox>
  )
}

export default ResourceCard
