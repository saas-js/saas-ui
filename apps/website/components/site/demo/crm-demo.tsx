'use client'

import { barY } from '@tanstack/charts'
import { pie, polar, radialArc } from '@tanstack/charts/polar'
import { scaleBand } from '@tanstack/charts/scales/band'
import { scaleLinear } from '@tanstack/charts/scales/linear'
import {
  Badge,
  ButtonGroup,
  Card,
  Collapsible,
  DataList,
  Flex,
  Grid,
  Heading,
  Icon,
  List,
  Portal,
  Spacer,
  Text,
} from '@chakra-ui/react'
import { useMemo } from 'react'
import { SaasUIIcon } from '@saas-ui/assets'
import { Chart, useChart } from '@saas-ui/charts'
import {
  LuActivity,
  LuBuilding2,
  LuChartBar,
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
import { AppShell } from '#components/ui/app-shell'
import { IconButton } from '#components/ui/icon-button'
import { Menu } from '#components/ui/menu'
import { Page } from '#components/ui/page'
import { SegmentedControl } from '#components/ui/segmented-control'
import { Sidebar, useSidebar } from '#components/ui/sidebar'

export function CRMDemo() {
  return (
    <Sidebar.Provider mode="collapsible" variant="inset">
      <Sidebar.FlyoutTrigger />
      <AppShell sidebar={<AppSidebar />} height="100%" bg="sidebar.bg">
        <Sidebar.Inset>
          <ReportsPage />
        </Sidebar.Inset>
      </AppShell>
    </Sidebar.Provider>
  )
}

function AppSidebar() {
  return (
    <>
      <Sidebar.Root>
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
              <Sidebar.GroupHeader
                css={{
                  '&[data-state=open] svg': { transform: 'rotate(90deg)' },
                }}
              >
                <Collapsible.Trigger asChild>
                  <Sidebar.GroupTitle>
                    Favourites{' '}
                    <Icon ms="1" transition="transform">
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
                        css={{
                          '[data-group]:hover &': { opacity: 0.6 },
                          '&:hover': { opacity: 1 },
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
                        css={{
                          '[data-group]:hover &': { opacity: 0.6 },
                          '&:hover': { opacity: 1 },
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
              <Sidebar.GroupHeader
                css={{
                  '&[data-state=open] svg': { transform: 'rotate(90deg)' },
                }}
              >
                <Collapsible.Trigger asChild>
                  <Sidebar.GroupTitle>
                    Workspace
                    <Icon ms="1" transition="transform">
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
                      <LuChartBar />
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
    <Page.Root>
      <Page.Header
        nav={
          !open ? (
            <Sidebar.Trigger asChild>
              <IconButton variant="ghost">
                <LuPanelLeftOpen />
              </IconButton>
            </Sidebar.Trigger>
          ) : null
        }
        title="Reports"
        actions={
          <ButtonGroup gridArea="actions" justifyContent="end">
            <SegmentedControl
              size="xs"
              items={['Last year', 'Last month', 'Last 7 days']}
              defaultValue="Last year"
            />
          </ButtonGroup>
        }
      ></Page.Header>
      <Page.Body>
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
                  <DataList.ItemValue
                    alignItems="center"
                    gap="4"
                    flexWrap="wrap"
                  >
                    <ChurnRateByTierChart />

                    <List.Root variant="plain" flexShrink="0">
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
      </Page.Body>
    </Page.Root>
  )
}

const compactCurrency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
  maximumFractionDigits: 1,
})

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

const percent = new Intl.NumberFormat('en-US', {
  style: 'percent',
  maximumFractionDigits: 1,
})

const revenue = [
  { date: 'Jan', revenue: 12500 },
  { date: 'Feb', revenue: 15800 },
  { date: 'Mar', revenue: 14200 },
  { date: 'Apr', revenue: 16900 },
  { date: 'May', revenue: 13600 },
  { date: 'Jun', revenue: 11200 },
  { date: 'Jul', revenue: 17500 },
  { date: 'Aug', revenue: 19200 },
  { date: 'Sep', revenue: 18100 },
  { date: 'Oct', revenue: 21500 },
]

const churnByTier = [
  { name: 'Starter', value: 7 },
  { name: 'Pro', value: 4 },
  { name: 'Enterprise', value: 2.5 },
]

function RevenueChart() {
  const chart = useChart({
    data: revenue,
    series: [{ name: 'revenue', label: 'Revenue', color: 'indigo.solid' }],
  })

  const definition = useMemo(
    () =>
      chart.define({
        marks: [
          barY(chart.data, {
            x: 'date',
            y: 'revenue',
            fill: chart.color('indigo.solid'),
            maxThickness: 20,
            radius: 2,
          }),
        ],
        x: {
          scale: () => scaleBand<string>().padding(0.28),
          grid: false,
          axis: {
            line: false,
            ticks: { size: 0 },
          },
        },
        y: {
          scale: scaleLinear,
          nice: true,
          grid: true,
          axis: {
            line: false,
            ticks: {
              size: 0,
              format: (value: number) => compactCurrency.format(value),
            },
          },
        },
      }),
    [chart],
  )

  return (
    <Chart.Root
      chart={chart}
      definition={definition}
      height={240}
      ariaLabel="Monthly revenue"
      renderTooltipBody={({ points }) => (
        <Chart.Tooltip
          points={points}
          formatter={(value) => currency.format(Number(value))}
        />
      )}
    />
  )
}

function ChurnRateByTierChart() {
  const chart = useChart({
    data: churnByTier,
    series: [
      { name: 'Starter', color: 'indigo.solid' },
      { name: 'Pro', color: 'pink.solid' },
      { name: 'Enterprise', color: 'fg' },
    ],
  })

  const definition = useMemo(() => {
    const slices = pie(chart.data, {
      value: 'value',
      gapAngle: (2 * Math.PI) / 180,
    })

    return chart.define({
      marks: [
        polar({
          marks: [
            radialArc(slices, {
              key: 'name',
              color: 'name',
              innerRadius: ({ radius }) => radius * 0.7,
              stroke: 'none',
            }),
          ],
        }),
      ],
      color: {
        domain: chart.data.map((item) => item.name),
        range: chart.palette,
      },
      margin: 0,
    })
  }, [chart])

  return (
    <Chart.Root
      chart={chart}
      definition={definition}
      width={100}
      height={100}
      ariaLabel="Churn by subscription tier"
      renderTooltipBody={({ points }) => (
        <Chart.Tooltip
          points={points}
          hideSeriesLabel
          formatter={(value) => percent.format(Number(value) / 100)}
        />
      )}
    />
  )
}
