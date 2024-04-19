import {
  AspectRatio,
  Box,
  Card,
  CloseButton,
  Code,
  Heading,
  HStack,
  LinkBox,
  LinkOverlay,
  Text,
  VStack,
} from '@chakra-ui/react'

import Image from 'next/image'
import NextLink from 'next/link'

const ComponentImage = ({ name }: { name: string }) => {
  return (
    <>
      <Image
        src={`/img/components/${name}.svg`}
        alt={`Illustration of ${name} component`}
        width="296"
        height="141"
        data-light
      />
      <Image
        src={`/img/components/${name}.svg`} // Change this to `/img/components/${name}-dark.svg`
        alt={`Illustration of ${name} component in dark mode`}
        width="296"
        height="141"
        data-dark
      />
    </>
  )
}

const componentIllustrations = {
  authprovider: <ComponentImage name="AuthProvider" />,
  auth: <ComponentImage name="Auth" />,
  'app-shell': <ComponentImage name="AppShell" />,
  page: <ComponentImage name="Page" />,
  splitpage: <ComponentImage name="SplitPage" />,
  section: <ComponentImage name="SettingSections" />,
  commandbar: <ComponentImage name="CommandBar" />,
  togglebutton: <ComponentImage name="ToggleButton" />,
  web3address: <ComponentImage name="Web3Address" />,
  dateinput: <ComponentImage name="DateInput" />,
  datepicker: <ComponentImage name="DatePicker" />,
  datepickermodal: <ComponentImage name="DatePickerModal" />,
  datepickerstatic: <ComponentImage name="DatePickerStatic" />,
  daterangeinput: <ComponentImage name="DateRangeInput" />,
  daterangepicker: <ComponentImage name="dateRangePicker" />,
  toolbar: <ComponentImage name="Toolbar" />,
  hotkeys: <ComponentImage name="Hotkeys" />,
  stepper: <ComponentImage name="Stepper" />,
  navbar: <ComponentImage name="Navbar" />,
  sidebar: <ComponentImage name="Sidebar" />,
  form: <ComponentImage name="Form" />,
  stepform: <ComponentImage name="StepForm" />,
  formlayout: <ComponentImage name="FormLayout" />,
  autoform: <ComponentImage name="Form" />,
  field: <ComponentImage name="Field" />,
  arrayfield: <ComponentImage name="ArrayField" />,
  objectfield: (
    <Code colorScheme="primary" p="2" rounded="md">
      {`<Field name="author.name" />`}
    </Code>
  ),
  select: <ComponentImage name="Select" />,
  passwordinput: <ComponentImage name="PasswordInput" />,
  searchinput: <ComponentImage name="SearchInput" />,
  fileupload: <ComponentImage name="FileUpload" />,
  datatable: <ComponentImage name="DataTable" />,
  emptystate: <ComponentImage name="EmptyState" />,
  iconbadge: <ComponentImage name="IconBadge" />,
  structuredlist: <ComponentImage name="StructuredList" />,
  property: <ComponentImage name="Property" />,
  persona: <ComponentImage name="Persona" />,
  timeline: <ComponentImage name="Timeline" />,
  command: <ComponentImage name="Command" />,
  datagrid: <ComponentImage name="DataGrid" />,
  bulkactions: <ComponentImage name="BulkActions" />,
  filters: <ComponentImage name="Filters" />,
  kanban: <ComponentImage name="Kanban" />,
  banner: <ComponentImage name="Banner" />,
  nprogress: <ComponentImage name="NProgress" />,
  snackbar: <ComponentImage name="Snackbar" />,
  loadingoverlay: <ComponentImage name="LoadingOverlay" />,
  'modals-manager': <ComponentImage name="ModalsManager" />,
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
  formdialog: <ComponentImage name="FormDialog" />,
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
  beacon: <ComponentImage name="Beacon" />,
  'benefits-modal': <ComponentImage name="BenefitsModal" />,
  tour: <ComponentImage name="Tour" />,
  errorboundary: <ComponentImage name="ErrorBoundary" />,
  'feature-flags': <ComponentImage name="FeatureFlags" />,
  resizebox: <ComponentImage name="ResizeBox" />,
}

type Props = {
  url: string
  title: string
  description: string | null
  slug: string
}

const OverviewItem = ({ url, title, description, slug }: Props) => {
  return (
    <Card as={LinkBox} height="full" role="group">
      <AspectRatio
        ratio={4 / 2}
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
            ['& [data-light]']: { display: 'none' },
          }}
          _light={{ ['& [data-dark]']: { display: 'none' } }}
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
      </VStack>
    </Card>
  )
}

export default OverviewItem
