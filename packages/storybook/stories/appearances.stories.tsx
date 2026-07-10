import * as React from 'react'

import {
  ChakraProvider,
  Flex,
  Grid,
  HStack,
  IconButton,
  Separator,
  Stack,
  Text,
  createSystem,
  defineConfig,
} from '@chakra-ui/react'
import { defaultConfig } from '@saas-ui/chakra-preset'
import {
  type AppearanceOptions,
  createAppearance,
} from '@saas-ui/chakra-preset/appearance'
import {
  AppShell,
  Avatar,
  Badge,
  Button,
  Card,
  Field,
  IconBadge,
  Input,
  Page,
  Section,
  Sidebar,
  Switch,
  Table,
} from '@saas-ui/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  LuBell,
  LuBoxes,
  LuCheck,
  LuChevronRight,
  LuClock3,
  LuEllipsis,
  LuGitPullRequest,
  LuLayoutDashboard,
  LuPlus,
  LuRocket,
  LuSearch,
  LuSettings,
  LuUsers,
} from 'react-icons/lu'

const meta = {
  title: 'Foundations/Appearances',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta

export default meta

type Story = StoryObj

const appearanceOptions = {
  graphite: {
    neutral: { h: 260, c: 0.012 },
    accent: {
      l: 0.511,
      c: 0.262,
      h: 276.966,
      foreground: 'light',
    },
    sidebar: 'neutral',
  },
  ocean: {
    neutral: { h: 225, c: 0.01, contrast: 'soft' },
    accent: {
      l: 0.53,
      c: 0.18,
      h: 235,
      foreground: 'light',
    },
    sidebar: { h: 215, c: 0.018 },
  },
  ember: {
    neutral: { h: 35, c: 0.008 },
    accent: {
      l: 0.64,
      c: 0.18,
      h: 35,
      foreground: 'dark',
    },
    sidebar: { h: 20, c: 0.016, contrast: 'strong' },
  },
  violet: {
    neutral: { h: 260, c: 0.012 },
    accent: {
      l: 0.511,
      c: 0.262,
      h: 276.966,
      foreground: 'light',
    },
    sidebar: {
      solid: { l: 0.511, c: 0.262, h: 276.966 },
      foreground: 'light',
    },
  },
} as const satisfies Record<string, AppearanceOptions>

function createAppearanceSystem(options: AppearanceOptions) {
  return createSystem(
    defaultConfig,
    defineConfig({
      theme: {
        semanticTokens: {
          colors: createAppearance(options),
        },
      },
    }),
  )
}

const systems = {
  graphite: createAppearanceSystem(appearanceOptions.graphite),
  ocean: createAppearanceSystem(appearanceOptions.ocean),
  ember: createAppearanceSystem(appearanceOptions.ember),
  violet: createAppearanceSystem(appearanceOptions.violet),
}

const navItems = [
  { label: 'Overview', icon: LuLayoutDashboard, active: true },
  { label: 'Releases', icon: LuRocket },
  { label: 'Pull requests', icon: LuGitPullRequest, count: 8 },
  { label: 'Team', icon: LuUsers },
]

const releases = [
  {
    version: 'v3.18.0',
    branch: 'release/3.18',
    status: 'Ready',
    color: 'green',
    time: 'Today, 14:30',
  },
  {
    version: 'v3.17.2',
    branch: 'hotfix/billing-sync',
    status: 'Review',
    color: 'orange',
    time: 'Today, 11:04',
  },
  {
    version: 'v3.17.1',
    branch: 'release/3.17.1',
    status: 'Shipped',
    color: 'neutral',
    time: 'Yesterday, 17:48',
  },
] as const

function SidebarNav() {
  return (
    <Sidebar.Root>
      <Sidebar.Header>
        <HStack width="full" gap="3">
          <Flex
            boxSize="8"
            flexShrink="0"
            align="center"
            justify="center"
            borderRadius="control.md"
            bg="sidebar.accent.bg"
            color="sidebar.accent.fg"
          >
            <LuBoxes />
          </Flex>
          <Stack gap="0" flex="1" minW="0">
            <Text textStyle="sm" fontWeight="semibold">
              Northstar
            </Text>
            <Text textStyle="xs" opacity="0.65" truncate>
              Product engineering
            </Text>
          </Stack>
          <IconButton
            aria-label="Workspace settings"
            size="xs"
            variant="ghost"
            color="sidebar.fg"
          >
            <LuEllipsis />
          </IconButton>
        </HStack>
      </Sidebar.Header>

      <Sidebar.Body>
        <Sidebar.Group>
          <Sidebar.GroupContent>
            {navItems.map((item) => (
              <Sidebar.NavItem key={item.label}>
                <Sidebar.NavButton active={item.active}>
                  <item.icon />
                  {item.label}
                  {item.count ? (
                    <Sidebar.NavButtonEndElement>
                      <Text textStyle="xs" opacity="0.65">
                        {item.count}
                      </Text>
                    </Sidebar.NavButtonEndElement>
                  ) : null}
                </Sidebar.NavButton>
              </Sidebar.NavItem>
            ))}
          </Sidebar.GroupContent>
        </Sidebar.Group>
      </Sidebar.Body>

      <Sidebar.Footer>
        <HStack>
          <Avatar size="xs" name="Avery Stone" />
          <Stack gap="0" flex="1" minW="0">
            <Text textStyle="sm" fontWeight="medium">
              Avery Stone
            </Text>
            <Text textStyle="xs" opacity="0.6" truncate>
              Platform lead
            </Text>
          </Stack>
          <IconButton
            aria-label="Open settings"
            size="xs"
            variant="ghost"
            color="sidebar.fg"
          >
            <LuSettings />
          </IconButton>
        </HStack>
      </Sidebar.Footer>
      <Sidebar.Track />
    </Sidebar.Root>
  )
}

function ReleaseRow(props: (typeof releases)[number]) {
  return (
    <Table.Row>
      <Table.Cell>
        <HStack gap="3">
          <IconBadge colorPalette="neutral">
            {props.status === 'Ready' ? <LuCheck /> : <LuClock3 />}
          </IconBadge>
          <Stack gap="0">
            <Text fontWeight="semibold">{props.version}</Text>
            <Text textStyle="xs" color="fg.muted">
              {props.branch}
            </Text>
          </Stack>
        </HStack>
      </Table.Cell>
      <Table.Cell display={{ base: 'none', lg: 'table-cell' }}>
        14 changes
      </Table.Cell>
      <Table.Cell>
        <Badge colorPalette={props.color}>{props.status}</Badge>
      </Table.Cell>
      <Table.Cell display={{ base: 'none', lg: 'table-cell' }}>
        <Text color="fg.muted">{props.time}</Text>
      </Table.Cell>
    </Table.Row>
  )
}

function ReleasePanel() {
  return (
    <Card.Root>
      <Card.Header>
        <HStack justify="space-between" align="flex-start" flexWrap="wrap">
          <Stack gap="0.5">
            <Card.Title>Release queue</Card.Title>
            <Card.Description>
              Production candidates from the last 48 hours
            </Card.Description>
          </Stack>
          <Button size="sm">View history</Button>
        </HStack>
      </Card.Header>
      <Card.Body>
        <Table.Root
          interactive
          variant="inset"
          colorPalette="neutral"
          aria-label="Release queue"
        >
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Release</Table.ColumnHeader>
              <Table.ColumnHeader display={{ base: 'none', lg: 'table-cell' }}>
                Changes
              </Table.ColumnHeader>
              <Table.ColumnHeader>Status</Table.ColumnHeader>
              <Table.ColumnHeader display={{ base: 'none', lg: 'table-cell' }}>
                Updated
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {releases.map((release) => (
              <ReleaseRow key={release.version} {...release} />
            ))}
          </Table.Body>
        </Table.Root>
      </Card.Body>
    </Card.Root>
  )
}

function SchedulePanel() {
  return (
    <Card.Root>
      <Card.Header>
        <HStack justify="space-between">
          <Stack gap="0.5">
            <Card.Title>Next window</Card.Title>
            <Card.Description>Thursday, 14:30 UTC</Card.Description>
          </Stack>
          <IconBadge colorPalette="accent">
            <LuRocket />
          </IconBadge>
        </HStack>
      </Card.Header>

      <Card.Body>
        <Stack gap="4">
          <Field.Root>
            <Field.Label>Release name</Field.Label>
            <Input defaultValue="Summer cleanup" />
          </Field.Root>

          <HStack align="flex-start">
            <Stack gap="0.5" flex="1">
              <Text textStyle="sm" fontWeight="medium">
                Gradual rollout
              </Text>
              <Text textStyle="xs" color="fg.muted">
                Start at 10% and increase after health checks.
              </Text>
            </Stack>
            <Switch
              defaultChecked
              colorPalette="accent"
              aria-label="Gradual rollout"
            />
          </HStack>
        </Stack>
      </Card.Body>

      <Card.Footer>
        <Button colorPalette="accent" variant="solid">
          Schedule release
          <LuChevronRight />
        </Button>
      </Card.Footer>
    </Card.Root>
  )
}

const tokenSamples = [
  { label: 'Canvas', value: 'bg' },
  { label: 'Surface', value: 'bg.surface' },
  { label: 'Elevated', value: 'bg.elevated' },
  { label: 'Inset', value: 'bg.inset' },
  { label: 'Selected', value: 'interaction.selected' },
  { label: 'Accent', value: 'accent.solid' },
] as const

function TokenCards() {
  return (
    <Grid templateColumns="repeat(auto-fit, minmax(140px, 1fr))" gap="2">
      {tokenSamples.map((token) => (
        <Card.Root key={token.label} size="sm">
          <Card.Body>
            <HStack>
              <Flex
                boxSize="6"
                flexShrink="0"
                bg={token.value}
                borderWidth="1px"
                borderColor="border"
                borderRadius="control.sm"
              />
              <Stack gap="0">
                <Card.Title>{token.label}</Card.Title>
                <Text textStyle="2xs" color="fg.muted">
                  {token.value}
                </Text>
              </Stack>
            </HStack>
          </Card.Body>
        </Card.Root>
      ))}
    </Grid>
  )
}

function AppearancePreview(props: { name: string }) {
  return (
    <Sidebar.Provider>
      <AppShell
        className="chakra-theme"
        sidebar={
          <>
            <SidebarNav />
            <Sidebar.Backdrop />
          </>
        }
      >
        <Page.Root>
          <Page.Header
            nav={
              <Sidebar.Trigger asChild>
                <IconButton
                  display={{ base: 'inline-flex', md: 'none' }}
                  aria-label="Open navigation"
                  size="sm"
                  variant="ghost"
                  colorPalette="neutral"
                >
                  <LuLayoutDashboard />
                </IconButton>
              </Sidebar.Trigger>
            }
            title="Releases"
            actions={
              <HStack gap="1" justify="flex-end">
                <IconButton
                  aria-label="Search"
                  size="sm"
                  variant="ghost"
                  colorPalette="neutral"
                  display={{ base: 'none', md: 'inline-flex' }}
                >
                  <LuSearch />
                </IconButton>
                <IconButton
                  aria-label="Notifications"
                  size="sm"
                  variant="ghost"
                  colorPalette="neutral"
                  display={{ base: 'none', md: 'inline-flex' }}
                >
                  <LuBell />
                </IconButton>
                <Separator
                  orientation="vertical"
                  height="5"
                  mx="2"
                  display={{ base: 'none', md: 'block' }}
                />
                <Button size="sm" colorPalette="accent" variant="solid">
                  <LuPlus />
                  New release
                </Button>
              </HStack>
            }
          />

          <Page.Body>
            <Stack gap="6">
              <Grid
                templateColumns={{
                  base: '1fr',
                  xl: 'minmax(0, 1fr) 320px',
                }}
                gap="5"
                alignItems="start"
              >
                <ReleasePanel />
                <SchedulePanel />
              </Grid>

              <Section.Root>
                <Section.Header
                  title={
                    <HStack gap="2">
                      <Section.Title>Theme tokens</Section.Title>
                      <Badge variant="outline" colorPalette="neutral">
                        {props.name}
                      </Badge>
                    </HStack>
                  }
                  description="Semantic colors generated for this appearance."
                />
                <Section.Body>
                  <TokenCards />
                </Section.Body>
              </Section.Root>
            </Stack>
          </Page.Body>
        </Page.Root>
      </AppShell>
    </Sidebar.Provider>
  )
}

function appearanceStory(
  system: (typeof systems)[keyof typeof systems],
  name: string,
): Story {
  return {
    decorators: [
      (Story) => (
        <ChakraProvider value={system}>
          <Story />
        </ChakraProvider>
      ),
    ],
    render: () => <AppearancePreview name={name} />,
  }
}

export const Graphite = appearanceStory(systems.graphite, 'Graphite')

export const Ocean = appearanceStory(systems.ocean, 'Ocean')

export const Ember = appearanceStory(systems.ember, 'Ember')

export const SolidSidebar = appearanceStory(systems.violet, 'Solid sidebar')
