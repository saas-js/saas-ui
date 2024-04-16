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
  Flex,
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
  Spacer,
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
  Beacon,
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
  Navbar,
  SelectOption,
  SelectList,
  Link,
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineContent,
  TimelineTrack,
  TimelineIcon,
} from '@saas-ui/react'
import NextLink from 'next/link'
import {
  FiBold,
  FiCheck,
  FiFilter,
  FiHome,
  FiItalic,
  FiMaximize,
  FiPlus,
  FiUnderline,
  FiUsers,
} from 'react-icons/fi'
import SaasUIGlyph from '../saas-ui-glyph'
import { SelectButton } from '@saas-ui/forms'

const autoform = `z.object({
  name: z.string()
})`

const componentIllustrations = {
  authprovider: <img src="/img/components/AuthProvider.svg" />,
  auth: <img src="/img/components/Auth.svg" />,
  'app-shell': (
    <img src="/img/components/AppShell4.svg" />
  ),
  page: (
    <img src="/img/components/Page.svg" />
  ),
  splitpage: (
    <img src="/img/components/SplitPages1.svg" />
  ),
  section: (
    <img src="/img/components/SettingSection3.svg" />
  ),
  commandbar: <img src="/img/components/CommandBar.svg" />,
  togglebutton: (
    <img src="/img/components/ToggleButton5.svg" />
  ),
  web3address: (
    <Web3Address address="0x71C7656EC7ab88b098defB751B7401B5f6d8976F" />
  ),
  dateInput: (
     <img src="/img/components/DateInput.svg" />
  ),
  datePicker: (
     <img src="/img/components/DatePicker.svg" />
  ),
  datePickerModal: (
     <img src="/img/components/DatePickerModal2.svg" />
  ),
  datePickerStatic: (
     <img src="/img/components/DatePickerStatic1.svg" />
  ),
  dateRangeInput: (
     <img src="/img/components/DateRangeInput.svg" />
  ),
  dateRangePicker: (
     <img src="/img/components/dateRangePicker.svg" />
  ),
  toolbar: (
    <img src="/img/components/Toolbar.svg" />
  ),
  hotkeys: <img src="/img/components/Hotkeys4.svg" />,
  stepper: (
    <img src="/img/components/Stepper1.svg" />
  ),
  navbar: (
    <img src="/img/components/Navbar.svg" />
  ),
  sidebar: (
    <img src="/img/components/Sidebar.svg" />
  ),
  address: (
    <Button variant="outline" colorScheme="primary">
      <Web3Address address="0x71C7656EC7ab88b098defB751B7401B5f6d8976F" />
    </Button>
  ),
  form: (
    <img src="/img/components/Form1.svg" />
  ),
  stepform: (
    <img src="/img/components/StepForm1.svg" />
  ),
  formlayout: (
    <img src="/img/components/FormLayout1.svg" />
  ),
  autoform: (
    <Code colorScheme="primary" p="2" rounded="md">
      <pre>{autoform}</pre>
    </Code>
  ),
  field: (
    <img src="/img/components/Field.svg" />
  ),
  arrayfield: (
    <img src="/img/components/ArrayField2.svg" />
  ),
  objectfield: (
    <Code colorScheme="primary" p="2" rounded="md">
      {`<Field name="author.name" />`}
    </Code>
  ),
  select: (
    <img src="/img/components/Select.svg" />
  ),
  passwordinput: (
    <img src="/img/components/PasswordInput.svg" />
  ),
  searchinput: (
    <img src="/img/components/SearchInput2.svg" />
  ),
  fileupload: (
    <img src="/img/components/FileUpload3.svg" />
  ),
  datatable: (
    <img src="/img/components/DataTable3.svg" />
  ),
  emptystate: (
    <img src="/img/components/EmptyState.svg" />
  ),
  structuredlist: (
    <img src="/img/components/StructureList1.svg" />
  ),
  property: (
    <img src="/img/components/Property1.svg" />
  ),
  persona: (
    <img src="/img/components/Persona2.svg" />
  ),
  timeline: (
    <img src="/img/components/Timeline.svg" />
  ),
  command: <img src="/img/components/Command.svg" />,
  datagrid: (
    <img src="/img/components/DataGrid2.svg" />
  ),
  bulkactions: (
    <img src="/img/components/BulkAction5.svg" />
  ),
  filters: (
    <img src="/img/components/Filters5.svg" />
  ),
  kanban: (
    <img src="/img/components/Kanban2.svg" />
  ),
  banner: (
    <img src="/img/components/Banner3.svg" />
  ),
  nprogress: (
    <img src="/img/components/NProgress1.svg" />
  ),
  snackbar: (
    <img src="/img/components/Snackbar2.svg" />
  ),
  loadingoverlay: (
    <img src="/img/components/LoadingOverlay1.svg" />
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
  beacon: <img src="/img/components/Beacon1.svg" />,
  'benefits-modal': (
    <img src="/img/components/BenefitsModal1.svg" />
  ),
  tour: (
    <img src="/img/components/Tour1.svg" />
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
