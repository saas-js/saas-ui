import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  Card,
  CardFooter,
  Checkbox,
  CloseButton,
  Code,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  LinkBox,
  LinkOverlay,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react'
import {
  Page,
  PageHeader,
  Section,
  SectionHeader,
  Toolbar,
  ToolbarButton,
  Command,
  ActiveFilter,
} from '@saas-ui-pro/react'
import {
  AppShell,
  FormLayout,
  PasswordInput,
  SearchInput,
  Select,
  EmptyState,
  Sidebar,
  NavGroup,
  NavItem,
  SidebarSection,
  StructuredList,
  StructuredListItem,
  StructuredListCell,
  StructuredListIcon,
  Property,
  PropertyList,
  Persona,
  Banner,
  BannerCloseButton,
  BannerTitle,
  BannerContent,
  NProgress,
  LoadingOverlay,
  LoadingSpinner,
  Web3Address,
  Steps,
  StepsItem,
} from '@saas-ui/react'
import NextLink from 'next/link'
import {
  FiBold,
  FiCheck,
  FiHome,
  FiItalic,
  FiMaximize,
  FiPlus,
  FiUnderline,
  FiUsers,
} from 'react-icons/fi'

const autoform = `z.object({
  name: z.string()
})`

const componentIllustrations = {
  authprovider: <Code colorScheme="primary">const auth = useAuth()</Code>,
  auth: <Button variant="primary">Log in</Button>,
  'app-shell': (
    <AppShell
      variant="static"
      height="80%"
      width="80%"
      borderWidth="1px"
      rounded="md"
      overflow="hidden"
      navbar={<Box bg="primary.500" height="20px" />}
      sidebar={<Box borderRightWidth="2px" width="30%" />}
    >
      <div />
    </AppShell>
  ),
  page: (
    <Page height="100%">
      <PageHeader
        title="Contacts"
        toolbar={
          <Toolbar>
            <Button variant="primary">Add</Button>
          </Toolbar>
        }
      />
    </Page>
  ),
  section: (
    <Section>
      <SectionHeader title="Settings" description="Manage your settings" />
    </Section>
  ),
  toolbar: (
    <Toolbar flex="0" borderWidth="1px" rounded="md">
      <ToolbarButton label="bold" icon={<FiBold />} />
      <ToolbarButton label="italic" icon={<FiItalic />} />
      <ToolbarButton label="underline" icon={<FiUnderline />} />
    </Toolbar>
  ),
  hotkeys: <Code colorScheme="primary">{`useHotkeys('G then D')`}</Code>,
  stepper: (
    <Steps orientation="vertical">
      <StepsItem title="Information" />
      <StepsItem title="Account" />
    </Steps>
  ),
  sidebar: (
    <Sidebar width="80%" borderRadius="md">
      <SidebarSection>
        <NavItem icon={<FiHome />} isActive>
          Dashboard
        </NavItem>
        <NavItem icon={<FiUsers />}>Contacts</NavItem>
      </SidebarSection>
    </Sidebar>
  ),
  address: (
    <Button variant="outline" colorScheme="primary">
      <Web3Address address="0x71C7656EC7ab88b098defB751B7401B5f6d8976F" />
    </Button>
  ),
  form: (
    <FormLayout>
      <FormControl size="xs">
        <FormLabel>Email</FormLabel>
        <Input />
      </FormControl>
      <Button variant="primary">Submit</Button>
    </FormLayout>
  ),
  stepform: (
    <Steps orientation="vertical">
      <StepsItem title="Information">
        <Input placeholder="Name" size="sm" />
      </StepsItem>
      <StepsItem title="Account" />
    </Steps>
  ),
  formlayout: (
    <FormLayout>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input size="sm" />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input size="sm" />
      </FormControl>
    </FormLayout>
  ),
  autoform: (
    <Code colorScheme="primary" p="2" rounded="md">
      <pre>{autoform}</pre>
    </Code>
  ),
  field: (
    <FormControl isRequired isInvalid width="80%">
      <FormLabel>Name</FormLabel>
      <Input size="sm" />
      <FormErrorMessage>Please enter a name</FormErrorMessage>
    </FormControl>
  ),
  arrayfield: (
    <HStack alignItems="flex-end" width="80%">
      <FormControl>
        <FormLabel>Todo</FormLabel>
        <Input size="sm" />
      </FormControl>
      <Button>
        <FiPlus />
      </Button>
    </HStack>
  ),
  objectfield: (
    <Code colorScheme="primary" p="2" rounded="md">
      {`<Field name="author.name" />`}
    </Code>
  ),
  select: (
    <Select
      name="type"
      options={['Fullstack Developer']}
      value="Fullstack Developer"
    />
  ),
  passwordinput: (
    <Box width="80%">
      <PasswordInput size="sm" value="Secret password" onChange={(e) => {}} />
    </Box>
  ),
  searchinput: (
    <Box width="80%">
      <SearchInput size="sm" />
    </Box>
  ),
  datatable: (
    <Box>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>
              <Checkbox isChecked />
            </Th>
            <Th>Name</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>
              <Checkbox isChecked />
            </Td>
            <Td>Elliot Alderson</Td>
          </Tr>
          <Tr>
            <Td>
              <Checkbox isChecked />
            </Td>
            <Td>Mr Robot</Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  ),
  emptystate: (
    <EmptyState
      title="No results"
      description={`No results found for "ui"`}
      actions={<Button variant="link">Reset search</Button>}
    />
  ),
  list: (
    <StructuredList width="90%">
      <StructuredListItem>
        <StructuredListIcon>
          <Avatar src="/showcase-avatar.jpg" size="sm" />
        </StructuredListIcon>
        <StructuredListCell>
          <Text noOfLines={1}>Love your product.</Text>
          <Text noOfLines={2} color="muted" fontSize="xs">
            Renata - We just launched our first product build with Saas UI.
          </Text>
        </StructuredListCell>
      </StructuredListItem>
    </StructuredList>
  ),
  property: (
    <PropertyList fontSize="sm">
      <Property label="Name" value="Michael Scott" />
      <Property label="Role" value="CTO" />
    </PropertyList>
  ),
  persona: (
    <Persona
      src="/showcase-avatar.jpg"
      size="sm"
      presence="away"
      name="Renata Alink"
      secondaryLabel="Founder"
      tertiaryLabel="Out for lunch"
    />
  ),
  command: <Command>G then D</Command>,
  datagrid: (
    <Box>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>
              <Checkbox isChecked />
            </Th>
            <Th>Name</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>
              <Checkbox isChecked />
            </Td>
            <Td>Elliot Alderson</Td>
          </Tr>
          <Tr>
            <Td>
              <Checkbox isChecked />
            </Td>
            <Td>Mr Robot</Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  ),
  bulkactions: (
    <Box
      py="2"
      px="4"
      rounded="md"
      bg="primary.500"
      fontSize="sm"
      color="white"
    >
      3 items selected
    </Box>
  ),
  filters: (
    <ActiveFilter id="status" label="Status" operator="is" value="Active" />
  ),
  banner: (
    <Banner width="80%" colorScheme="primary" variant="solid" rounded="md">
      <BannerContent>
        <BannerTitle>Test</BannerTitle>
      </BannerContent>
      <BannerCloseButton />
    </Banner>
  ),
  nprogress: (
    <Box position="relative" width="100%">
      <NProgress isAnimating position="absolute" width="100%" />
    </Box>
  ),
  snackbar: (
    <HStack rounded="md" bg="white" _dark={{ bg: 'gray.800' }} py="2" px="4">
      <Text color="black" _dark={{ color: 'white' }} fontWeight="semibold">
        Settings saved
      </Text>
      <CloseButton size="sm" />
    </HStack>
  ),
  loader: (
    <LoadingOverlay>
      <LoadingSpinner />
    </LoadingOverlay>
  ),
  'modals-manager': (
    <Code colorScheme="primary">const modals = useModals()</Code>
  ),
  menudialog: (
    <VStack
      rounded="md"
      bg="white"
      _dark={{ bg: 'gray.700' }}
      py="2"
      px="4"
      boxShadow="xl"
      alignItems="flex-start"
      width="80%"
      maxW="300px"
      borderWidth="1px"
    >
      <HStack width="100%">
        <Text fontWeight="semibold" flex="1">
          Commands
        </Text>
        <CloseButton size="sm" alignSelf="flex-end" />
      </HStack>

      <Box>Assign</Box>
      <Box>Close</Box>
    </VStack>
  ),
  formdialog: (
    <VStack
      rounded="md"
      bg="white"
      _dark={{ bg: 'gray.700' }}
      py="2"
      px="4"
      boxShadow="xl"
      alignItems="flex-start"
      width="80%"
      maxW="300px"
      borderWidth="1px"
    >
      <HStack width="100%">
        <Text fontWeight="semibold" flex="1">
          Edit
        </Text>
        <CloseButton size="sm" alignSelf="flex-end" />
      </HStack>

      <Input size="sm" />

      <Button variant="primary">Save</Button>
    </VStack>
  ),
  responsivemenu: (
    <VStack
      rounded="md"
      bg="white"
      _dark={{ bg: 'gray.700' }}
      py="2"
      px="4"
      boxShadow="xl"
      alignItems="flex-start"
      width="80%"
      maxW="300px"
      borderWidth="1px"
    >
      <Box>Edit</Box>
      <Box>Remove</Box>
    </VStack>
  ),
  'benefits-modal': (
    <VStack
      rounded="md"
      bg="white"
      _dark={{ bg: 'gray.700' }}
      py="2"
      px="4"
      boxShadow="xl"
      alignItems="flex-start"
      width="80%"
      maxW="300px"
      borderWidth="1px"
    >
      <HStack width="100%">
        <Text fontWeight="semibold" flex="1">
          New feature
        </Text>
        <CloseButton size="sm" alignSelf="flex-end" />
      </HStack>

      <HStack width="100%">
        <Icon as={FiCheck} color="green.500" />
        <Box
          flex="1"
          height="4px"
          bg="gray.100"
          _dark={{ bg: 'gray.600' }}
        ></Box>
      </HStack>

      <HStack width="100%">
        <Icon as={FiCheck} color="green.500" />
        <Box
          flex="1"
          height="4px"
          bg="gray.100"
          _dark={{ bg: 'gray.600' }}
        ></Box>
      </HStack>

      <Button variant="primary" size="xs" alignSelf="flex-end">
        Get started
      </Button>
    </VStack>
  ),
  tour: (
    <Box position="relative">
      <Button>Add contact</Button>
      <Box
        position="absolute"
        width="110px"
        height="40px"
        borderWidth="2px"
        borderColor="primary.500"
        rounded="md"
        mt="-36px"
        ml="-4px"
      ></Box>
    </Box>
  ),
  errorboundary: (
    <Box>
      <Heading size="sm">Oops, something went wrong</Heading>
    </Box>
  ),
  'feature-flags': (
    <Code colorScheme="primary">{`<Has feature="premium" />`}</Code>
  ),
  resizebox: <FiMaximize size="32" />,
}

type Props = {
  url: string
  title: string
  description: string
  slug: string
}

const OverviewItem = ({ url, title, description, slug }: Props) => {
  return (
    <Card as={LinkBox} height="full" role="group">
      <AspectRatio
        ratio={4 / 3}
        w="full"
        overflow="hidden"
        borderTopRadius="md"
      >
        <Box
          w="full"
          h="full"
          fontSize="sm"
          bgGradient="linear(to-bl,white, gray.50)"
          _dark={{
            bg: 'whiteAlpha.100',
            bgGradient: 'linear(to-bl,transparent, whiteAlpha.50)',
          }}
        >
          {componentIllustrations[slug]}
        </Box>
      </AspectRatio>
      <VStack
        alignItems="flex-start"
        spacing={2}
        p="4"
        borderTopWidth="1px"
        _dark={{ borderTopWidth: 0 }}
      >
        <NextLink href={url} passHref legacyBehavior>
          <LinkOverlay>
            <Heading as="h3" size="sm">
              {title}
            </Heading>
          </LinkOverlay>
        </NextLink>
        <Text fontSize="sm" noOfLines={2} color="muted">
          {description}
        </Text>
      </VStack>
    </Card>
  )
}

export default OverviewItem
