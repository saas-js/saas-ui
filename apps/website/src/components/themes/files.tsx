import { DownloadIcon } from '@chakra-ui/icons'
import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  CircularProgress,
  Flex,
  HStack,
  Heading,
  Icon,
  IconButton,
  Progress,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import {
  StructuredList,
  StructuredListCell,
  StructuredListItem,
} from '@saas-ui/react'
import { FaFilePdf, FaFilePowerpoint, FaFileWord } from 'react-icons/fa'

export const DiskUsage = () => {
  return (
    <Card flex="1">
      <CardHeader
        display="flex"
        flexDirection="column"
        alignItems="center"
        pt="10"
      >
        <CircularProgress
          value={60}
          color="primary.500"
          trackColor="var(--track-color)" // CircularProgress doesnt support theming, so we use css variables here.
          mb="2"
          aria-label="Disk usage"
          sx={{
            '--track-color': 'colors.blackAlpha.200',
            '[data-theme=dark] &': {
              '--track-color': 'colors.whiteAlpha.200',
            },
            '[data-theme=dark][data-theme-id=glass] &': {
              '--track-color': 'colors.blackAlpha.500',
            },
          }}
        />

        <Heading as="h4" fontWeight="regular" fontSize="xl">
          2,72 GB
        </Heading>
      </CardHeader>
      <CardBody>
        <HStack justifyContent="space-between">
          <Box fontSize="sm">
            <Box color="muted" mb="2">
              <Badge rounded="full" bg="primary.500" boxSize="2" /> Used
            </Box>
            <Text fontSize="md">0,65 GB</Text>
            <Text color="muted" fontSize="xs">
              31%
            </Text>
          </Box>
          <Box fontSize="sm">
            <Box color="muted" mb="2">
              <Badge rounded="full" colorScheme="primary" boxSize="2" /> Free
            </Box>
            <Text fontSize="md">1,87 GB</Text>
            <Text color="muted" fontSize="xs">
              69%
            </Text>
          </Box>
        </HStack>
      </CardBody>
    </Card>
  )
}

export const Files = () => {
  const files = [
    {
      id: 1,
      name: 'Pitch deck.pptx',
      size: '2,3 MB',
      date: '2 days ago',
      icon: <Icon as={FaFilePowerpoint} color="yellow.400" />,
    },
    {
      id: 2,
      name: 'Blogpost.docx',
      size: '1 MB',
      date: 'a week ago',
      icon: <Icon as={FaFileWord} color="blue.400" />,
    },
    {
      id: 3,
      name: 'Flyer.pdf',
      size: '76 KB',
      date: '12 days ago',
      icon: <Icon as={FaFilePdf} color="red.400" />,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <Heading size="sm" fontWeight="semibold">
          Files{' '}
          <Text
            as="span"
            ms="2"
            fontSize="xs"
            fontWeight="normal"
            color="muted"
          >
            3
          </Text>
        </Heading>
      </CardHeader>
      <StructuredList>
        {files.map((file) => (
          <StructuredListItem
            key={file.id}
            borderBottomWidth="1px"
            _last={{ borderWidth: 0 }}
          >
            <StructuredListCell>
              <Flex
                borderWidth="1px"
                rounded="md"
                boxSize="8"
                alignItems="center"
                justifyContent="center"
              >
                {file.icon}
              </Flex>
            </StructuredListCell>
            <StructuredListCell flex="1">
              <Heading as="h4" size="sm" fontWeight="medium">
                {file.name}
              </Heading>
              <Text color="muted" size="sm">
                {file.size} • {file.date}
              </Text>
            </StructuredListCell>
            <StructuredListCell>
              <IconButton
                icon={<DownloadIcon />}
                aria-label="Download"
                variant="ghost"
              />
            </StructuredListCell>
          </StructuredListItem>
        ))}
      </StructuredList>
    </Card>
  )
}
