import {
  Badge,
  Card,
  Collapsible,
  DataList,
  Flex,
  Grid,
  HStack,
  Heading,
  Icon,
  IconButton,
  List,
  Portal,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react'
import { SaasUIIcon } from '@saas-ui/assets'
import { BarChart, PieChart } from '@saas-ui/charts'
import {
  AppShell,
  Menu,
  SegmentedControl,
  Sidebar,
  useSidebar,
} from '@saas-ui/react'
import {
  LuActivity,
  LuBarChart,
  LuBuilding2,
  LuChevronRight,
  LuListTodo,
  LuPanelLeftClose,
  LuPanelLeftOpen,
  LuPlus,
  LuSearch,
  LuUser,
  LuWorkflow,
  LuX,
} from 'react-icons/lu'

export function CRMDemo() {
  return (
    <Sidebar.Provider mode="collapsible">
      <Sidebar.FlyoutTrigger />
      <AppShell sidebar={<AppSidebar />} height="100%" bg="bg">
        <ReportsPage />
      </AppShell>
    </Sidebar.Provider>
  )
}

function AppSidebar() {
  return (
    <>
      <Sidebar.Root borderRightWidth="1px">
        <Sidebar.Header direction="row">
          <WorkspaceMenu />
          <Spacer />
          <IconButton variant="ghost" rounded="full">
            <LuSearch />
          </IconButton>

          <Sidebar.Trigger asChild>
            <IconButton
              variant="ghost"
              aria-label="Toggle sidebar"
              rounded="full"
            >
              <LuPanelLeftClose />
            </IconButton>
          </Sidebar.Trigger>
        </Sidebar.Header>
        <Sidebar.Body flex="1" overflowY="auto">
          <Sidebar.Group>
            <Sidebar.GroupContent>
              <Sidebar.NavItem>
                <Sidebar.NavButton>
                  <LuActivity />
                  Updates
                  <Spacer />
                  <Sidebar.NavButtonEndElement>
                    <Badge bg="none" px="2">
                      12
                    </Badge>
                  </Sidebar.NavButtonEndElement>
                </Sidebar.NavButton>
              </Sidebar.NavItem>
              <Sidebar.NavItem>
                <Sidebar.NavButton>
                  <LuListTodo />
                  Tasks
                </Sidebar.NavButton>
              </Sidebar.NavItem>
            </Sidebar.GroupContent>
          </Sidebar.Group>

          <Collapsible.Root asChild defaultOpen>
            <Sidebar.Group>
              <Sidebar.GroupHeader>
                <Collapsible.Trigger asChild>
                  <Sidebar.GroupTitle>
                    Favourites{' '}
                    <Icon
                      ms="1"
                      transition="transform"
                      _groupOpen={{ transform: 'rotate(90deg)' }}
                    >
                      <LuChevronRight />
                    </Icon>
                  </Sidebar.GroupTitle>
                </Collapsible.Trigger>

                <Sidebar.GroupEndElement>
                  <IconButton
                    variant="ghost"
                    aria-label="Add to favourites"
                    size="xs"
                    opacity="0"
                    _groupHover={{ opacity: 0.6, _hover: { opacity: 1 } }}
                  >
                    <LuPlus />
                  </IconButton>
                </Sidebar.GroupEndElement>
              </Sidebar.GroupHeader>
              <Collapsible.Content>
                <Sidebar.GroupContent>
                  <Sidebar.NavItem>
                    <Sidebar.NavButton as="a">
                      <Text>🌟</Text>
                      Leads
                      <Spacer />
                      <Sidebar.NavButtonEndElement
                        opacity="0"
                        _parentHover={{
                          opacity: 0.6,
                          _hover: { opacity: 1 },
                        }}
                      >
                        <IconButton
                          variant="ghost"
                          aria-label="Remove from favourites"
                          title="Remove from favourites"
                          size="xs"
                          fontSize="2xs"
                        >
                          <LuX />
                        </IconButton>
                      </Sidebar.NavButtonEndElement>
                    </Sidebar.NavButton>
                  </Sidebar.NavItem>
                  <Sidebar.NavItem>
                    <Sidebar.NavButton as="a">
                      <Text>🤝</Text>
                      Closed
                      <Spacer />
                      <Sidebar.NavButtonEndElement
                        opacity="0"
                        _parentHover={{
                          opacity: 0.6,
                          _hover: { opacity: 1 },
                        }}
                      >
                        <IconButton
                          variant="ghost"
                          aria-label="Remove from favourites"
                          size="xs"
                          fontSize="2xs"
                        >
                          <LuX />
                        </IconButton>
                      </Sidebar.NavButtonEndElement>
                    </Sidebar.NavButton>
                  </Sidebar.NavItem>
                </Sidebar.GroupContent>
              </Collapsible.Content>
            </Sidebar.Group>
          </Collapsible.Root>

          <Collapsible.Root asChild defaultOpen>
            <Sidebar.Group>
              <Sidebar.GroupHeader>
                <Collapsible.Trigger asChild>
                  <Sidebar.GroupTitle>
                    Workspace
                    <Icon
                      ms="1"
                      transition="transform"
                      _groupOpen={{ transform: 'rotate(90deg)' }}
                    >
                      <LuChevronRight />
                    </Icon>
                  </Sidebar.GroupTitle>
                </Collapsible.Trigger>
              </Sidebar.GroupHeader>
              <Collapsible.Content>
                <Sidebar.GroupContent>
                  <Sidebar.NavItem>
                    <Sidebar.NavButton>
                      <LuUser />
                      People
                    </Sidebar.NavButton>
                  </Sidebar.NavItem>
                  <Sidebar.NavItem>
                    <Sidebar.NavButton>
                      <LuBuilding2 />
                      Companies
                    </Sidebar.NavButton>
                  </Sidebar.NavItem>
                  <Sidebar.NavItem>
                    <Sidebar.NavButton>
                      <LuWorkflow />
                      Workflows
                    </Sidebar.NavButton>
                  </Sidebar.NavItem>
                  <Sidebar.NavItem>
                    <Sidebar.NavButton active>
                      <LuBarChart />
                      Reports
                    </Sidebar.NavButton>
                  </Sidebar.NavItem>
                </Sidebar.GroupContent>
              </Collapsible.Content>
            </Sidebar.Group>
          </Collapsible.Root>
        </Sidebar.Body>
        <Sidebar.Footer></Sidebar.Footer>

        <Sidebar.Track />
        <Sidebar.Backdrop />
      </Sidebar.Root>
    </>
  )
}

function WorkspaceMenu() {
  return (
    <Sidebar.NavItem>
      <Menu.Root>
        <Menu.Trigger asChild>
          <Sidebar.NavButton>
            <Flex
              boxSize="5"
              p="5px"
              rounded="full"
              bg="bg.inverted"
              alignItems="center"
              justifyContent="center"
            >
              <SaasUIIcon color="white" />
            </Flex>
            Saas.js
          </Sidebar.NavButton>
        </Menu.Trigger>
        <Menu.Content>
          <Menu.Item value="account">Account</Menu.Item>
          <Menu.Item value="settings">Workspace settings</Menu.Item>
          <Menu.Separator />
          <Menu.Root>
            <Menu.TriggerItem value="switch">Switch workspace</Menu.TriggerItem>

            <Portal>
              <Menu.Content>
                <Menu.Item value="saasjs">Saas.js</Menu.Item>
                <Menu.Item value="acme">ACME</Menu.Item>
                <Menu.Separator />
                <Menu.Item value="create">Create new workspace</Menu.Item>
              </Menu.Content>
            </Portal>
          </Menu.Root>
          <Menu.Item value="signout">Sign out</Menu.Item>
        </Menu.Content>
      </Menu.Root>
    </Sidebar.NavItem>
  )
}

function ReportsPage() {
  const { open } = useSidebar()

  return (
    <Stack height="100%" bg="bg.muted/50" gap="0">
      <HStack
        px="4"
        py="2"
        borderBottomWidth="1px"
        alignItems="center"
        height="10"
      >
        {!open && (
          <Sidebar.Trigger asChild>
            <IconButton variant="ghost">
              <LuPanelLeftOpen />
            </IconButton>
          </Sidebar.Trigger>
        )}
        <Heading as="h2" size="sm" fontWeight="medium">
          Reports
        </Heading>
        <Spacer />
        <SegmentedControl
          size="xs"
          items={['Last year', 'Last month', 'Last 7 days']}
          defaultValue="Last year"
        />
      </HStack>
      <Grid templateColumns="repeat(3, 1fr)" gap="4" p="4">
        <Card.Root gridColumn="span 2">
          <Card.Header gap="0">
            <Heading as="h3" size="sm" fontWeight="medium" color="fg.muted">
              Revenue
            </Heading>
            <Text fontSize="lg" color="fg" fontWeight="medium">
              {Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(12500)}
            </Text>
          </Card.Header>
          <Card.Body>
            <RevenueChart />
          </Card.Body>
        </Card.Root>
        <Card.Root gridColumn="span 1">
          <Card.Header gap="0">
            <Heading as="h3" size="sm" fontWeight="medium" color="fg.subtle">
              Customer metrics
            </Heading>
          </Card.Header>
          <Card.Body>
            <DataList.Root
              orientation="vertical"
              display="grid"
              gridTemplateColumns="1fr 1fr"
              gap="4"
            >
              <DataList.Item fontSize="xs">
                <DataList.ItemLabel>Acquisition cost</DataList.ItemLabel>
                <DataList.ItemValue fontWeight="medium" fontSize="lg">
                  {Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(233)}
                </DataList.ItemValue>
              </DataList.Item>
              <DataList.Item fontSize="xs">
                <DataList.ItemLabel>Lifetime value</DataList.ItemLabel>
                <DataList.ItemValue fontWeight="medium" fontSize="lg">
                  {Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(893)}
                </DataList.ItemValue>
              </DataList.Item>
              <DataList.Item fontSize="xs">
                <DataList.ItemLabel>Churn rate</DataList.ItemLabel>
                <DataList.ItemValue fontWeight="medium" fontSize="lg">
                  4.5%
                </DataList.ItemValue>
              </DataList.Item>
              <DataList.Item fontSize="xs">
                <DataList.ItemLabel>Retention rate</DataList.ItemLabel>
                <DataList.ItemValue fontWeight="medium" fontSize="lg">
                  95.5%
                </DataList.ItemValue>
              </DataList.Item>
              <DataList.Item fontSize="xs" gridColumn="span 2">
                <DataList.ItemLabel>Churn by tier</DataList.ItemLabel>
                <DataList.ItemValue alignItems="center" gap="4">
                  <ChurnRateByTierChart />

                  <List.Root variant="plain">
                    <List.Item alignItems="center">
                      <List.Indicator
                        bg="indigo.solid"
                        boxSize="2"
                        borderRadius="full"
                        minH="2"
                      />
                      Starter: 7%
                    </List.Item>
                    <List.Item alignItems="center">
                      <List.Indicator
                        bg="pink.solid"
                        boxSize="2"
                        borderRadius="full"
                        minH="2"
                      />
                      Pro: 4%
                    </List.Item>
                    <List.Item alignItems="center">
                      <List.Indicator
                        bg="fg"
                        boxSize="2"
                        borderRadius="full"
                        minH="2"
                      />
                      Enterprise: 2.5%
                    </List.Item>
                  </List.Root>
                </DataList.ItemValue>
              </DataList.Item>
            </DataList.Root>
          </Card.Body>
        </Card.Root>
      </Grid>
    </Stack>
  )
}

function RevenueChart() {
  return null
  // return (
  //   <BarChart
  //     categories={['Revenue']}
  //     valueFormatter={(value) =>
  //       Intl.NumberFormat('en-US', {
  //         style: 'currency',
  //         currency: 'USD',
  //       }).format(value)
  //     }
  //     yAxisWidth={100}
  //     showLegend={false}
  //     barSize={22}
  //     data={[
  //       { date: 'Jan', Revenue: 12500 },
  //       { date: 'Feb', Revenue: 15800 },
  //       { date: 'Mar', Revenue: 14200 },
  //       { date: 'Apr', Revenue: 16900 },
  //       { date: 'May', Revenue: 13600 },
  //       { date: 'Jun', Revenue: 11200 },
  //       { date: 'Jul', Revenue: 17500 },
  //       { date: 'Aug', Revenue: 19200 },
  //       { date: 'Sep', Revenue: 18100 },
  //       { date: 'Oct', Revenue: 21500 },
  //     ]}
  //     height={240}
  //   />
  // )
}

function ChurnRateByTierChart() {
  return (
    <PieChart
      category="tier"
      categoryColors={['indigo', 'pink', 'fg']}
      data={[
        { tier: 'Starter', value: 7 },
        { tier: 'Pro', value: 4 },
        { tier: 'Enterprise', value: 2.5 },
      ]}
      valueFormatter={(value) => `${value}%`}
      width={100}
      height={100}
    />
  )
}
