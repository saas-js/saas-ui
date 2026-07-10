import * as React from 'react'

import {
  Flex,
  Grid,
  HStack,
  IconButton,
  Separator,
  Stack,
  Text,
} from '@chakra-ui/react'
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
  Theme,
  type ThemeProps,
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
  LuShuffle,
  LuUsers,
} from 'react-icons/lu'

import './appearances.css'

const meta = {
  title: 'Foundations/Appearances',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta

export default meta

type Story = StoryObj

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
          <IconBadge colorPalette="base">
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
          colorPalette="base"
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
  { label: 'Base', value: 'base.solid' },
  { label: 'Neutral', value: 'neutral.solid' },
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

interface AppearancePreviewProps {
  name: string
  className?: string
  baseContrast?: 'soft' | 'strong'
  accentForeground?: 'dark'
  sidebarContrast?: 'soft' | 'strong'
  sidebarMode?: 'solid'
  sidebarForeground?: 'dark'
  isThemeScope?: boolean
  action?: React.ReactNode
  details?: React.ReactNode
}

function AppearancePreview(props: AppearancePreviewProps) {
  const className =
    props.isThemeScope === false
      ? props.className
      : ['chakra-theme', 'sui-theme', props.className].filter(Boolean).join(' ')

  return (
    <Sidebar.Provider>
      <AppShell
        className={className}
        data-base-contrast={props.baseContrast}
        data-accent-foreground={props.accentForeground}
        data-sidebar-contrast={props.sidebarContrast}
        data-sidebar={props.sidebarMode}
        data-sidebar-foreground={props.sidebarForeground}
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
                  colorPalette="base"
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
                  colorPalette="base"
                  display={{ base: 'none', md: 'inline-flex' }}
                >
                  <LuSearch />
                </IconButton>
                <IconButton
                  aria-label="Notifications"
                  size="sm"
                  variant="ghost"
                  colorPalette="base"
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
                {props.action ?? (
                  <Button size="sm" colorPalette="accent" variant="solid">
                    <LuPlus />
                    New release
                  </Button>
                )}
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

              {props.details}

              <Section.Root>
                <Section.Header
                  title={
                    <HStack gap="2">
                      <Section.Title>Theme tokens</Section.Title>
                      <Badge variant="outline" colorPalette="base">
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

function appearanceStory(props: AppearancePreviewProps): Story {
  return {
    render: () => <AppearancePreview {...props} />,
  }
}

type ThemeColorPalette = NonNullable<ThemeProps['colorPalette']>
type ThemeContrast = 'soft' | 'strong' | undefined

interface RandomThemeConfig {
  iteration: number
  appearance: 'light' | 'dark'
  hasBackground: boolean
  colorPalette: ThemeColorPalette
  scaleFactor: number
  controlRadius: number
  panelRadius: number
  indicatorRadius: number
  overlayEffect: string
  base: string
  accent: string
  sidebar: string
  sidebarSolid: string
  baseContrast: ThemeContrast
  accentForeground: 'dark' | undefined
  sidebarContrast: ThemeContrast
  sidebarMode: 'solid' | undefined
  sidebarForeground: 'dark' | undefined
}

const colorPalettes = [
  'base',
  'gray',
  'neutral',
  'red',
  'orange',
  'amber',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
] as const satisfies readonly ThemeColorPalette[]

const scaleFactors = [0.9, 0.95, 1, 1.05, 1.1] as const
const controlRadii = [0, 0.75, 1, 1.5, 9999] as const
const panelRadii = [0, 0.75, 1, 1.5, 2] as const
const indicatorRadii = [0, 0.75, 1, 1.5, 9999] as const
const overlayEffects = [
  'none',
  'blur(6px)',
  'blur(12px)',
  'blur(16px) saturate(1.15)',
] as const
const contrasts = [undefined, 'soft', 'strong'] as const

const initialRandomTheme: RandomThemeConfig = {
  iteration: 0,
  appearance: 'light',
  hasBackground: true,
  colorPalette: 'violet',
  scaleFactor: 1,
  controlRadius: 1,
  panelRadius: 1,
  indicatorRadius: 1,
  overlayEffect: 'blur(10px)',
  base: 'oklch(0.5 0.012 260)',
  accent: 'oklch(0.511 0.262 276.966)',
  sidebar: 'oklch(0.5 0.016 260)',
  sidebarSolid: 'oklch(0.511 0.262 276.966)',
  baseContrast: undefined,
  accentForeground: undefined,
  sidebarContrast: undefined,
  sidebarMode: undefined,
  sidebarForeground: undefined,
}

function randomValue<T>(values: readonly T[]) {
  return values[Math.floor(Math.random() * values.length)]!
}

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min)
}

function oklch(lightness: number, chroma: number, hue: number) {
  return `oklch(${lightness.toFixed(3)} ${chroma.toFixed(3)} ${Math.round(hue)})`
}

function wrapHue(hue: number) {
  return (hue + 360) % 360
}

function createRandomTheme(iteration: number): RandomThemeConfig {
  const baseHue = randomBetween(0, 360)
  const accentHue = randomBetween(0, 360)
  const accentForeground = Math.random() > 0.7 ? 'dark' : undefined
  const sidebarForeground = Math.random() > 0.7 ? 'dark' : undefined

  const accentLightness = accentForeground
    ? randomBetween(0.72, 0.82)
    : randomBetween(0.46, 0.58)
  const sidebarLightness = sidebarForeground
    ? randomBetween(0.72, 0.82)
    : randomBetween(0.44, 0.56)

  return {
    iteration,
    appearance: Math.random() > 0.5 ? 'dark' : 'light',
    hasBackground: Math.random() > 0.2,
    colorPalette: randomValue(colorPalettes),
    scaleFactor: randomValue(scaleFactors),
    controlRadius: randomValue(controlRadii),
    panelRadius: randomValue(panelRadii),
    indicatorRadius: randomValue(indicatorRadii),
    overlayEffect: randomValue(overlayEffects),
    base: oklch(0.5, randomBetween(0.004, 0.024), baseHue),
    accent: oklch(accentLightness, randomBetween(0.14, 0.27), accentHue),
    sidebar: oklch(
      0.5,
      randomBetween(0.008, 0.034),
      wrapHue(baseHue + randomBetween(-35, 35)),
    ),
    sidebarSolid: oklch(
      sidebarLightness,
      randomBetween(0.14, 0.27),
      wrapHue(accentHue + randomBetween(-30, 30)),
    ),
    baseContrast: randomValue(contrasts),
    accentForeground,
    sidebarContrast: randomValue(contrasts),
    sidebarMode: Math.random() > 0.55 ? 'solid' : undefined,
    sidebarForeground,
  }
}

function ThemeDetails({ theme }: { theme: RandomThemeConfig }) {
  const values = [
    { label: 'Mode', value: theme.appearance },
    { label: 'Palette', value: theme.colorPalette },
    { label: 'Background', value: theme.hasBackground ? 'filled' : 'clear' },
    { label: 'Scale', value: `${theme.scaleFactor * 100}%` },
    {
      label: 'Radii',
      value: `${theme.controlRadius} / ${theme.panelRadius} / ${theme.indicatorRadius}`,
    },
    { label: 'Base contrast', value: theme.baseContrast ?? 'normal' },
    { label: 'Sidebar', value: theme.sidebarMode ?? 'tonal' },
    {
      label: 'Sidebar contrast',
      value: theme.sidebarContrast ?? 'normal',
    },
    { label: 'Overlay', value: theme.overlayEffect },
  ]

  return (
    <Card.Root size="sm">
      <Card.Header>
        <HStack justify="space-between" align="flex-start" flexWrap="wrap">
          <Stack gap="0.5">
            <Card.Title>Current Theme props</Card.Title>
            <Card.Description>
              Control / panel / indicator radii are shown in that order.
            </Card.Description>
          </Stack>
          <HStack gap="2">
            {[
              { label: 'Base', color: theme.base },
              { label: 'Accent', color: theme.accent },
              { label: 'Sidebar', color: theme.sidebarSolid },
            ].map((swatch) => (
              <Flex
                key={swatch.label}
                boxSize="6"
                bg={swatch.color}
                borderWidth="1px"
                borderColor="border"
                borderRadius="indicator.md"
                title={`${swatch.label}: ${swatch.color}`}
              />
            ))}
          </HStack>
        </HStack>
      </Card.Header>
      <Card.Body>
        <Grid templateColumns="repeat(auto-fit, minmax(120px, 1fr))" gap="4">
          {values.map((item) => (
            <Stack key={item.label} gap="0.5">
              <Text textStyle="xs" color="fg.muted">
                {item.label}
              </Text>
              <Text textStyle="sm" fontWeight="medium">
                {item.value}
              </Text>
            </Stack>
          ))}
        </Grid>
      </Card.Body>
    </Card.Root>
  )
}

function ThemeRandomizerPreview() {
  const [theme, setTheme] = React.useState(initialRandomTheme)

  const themeStyle = {
    '--sui-base': theme.base,
    '--sui-accent': theme.accent,
    '--sui-sidebar': theme.sidebar,
    '--sui-sidebar-solid': theme.sidebarSolid,
  } as React.CSSProperties

  return (
    <Theme
      appearance={theme.appearance}
      hasBackground={theme.hasBackground}
      colorPalette={theme.colorPalette}
      scaleFactor={theme.scaleFactor}
      controlRadius={theme.controlRadius}
      panelRadius={theme.panelRadius}
      indicatorRadius={theme.indicatorRadius}
      overlayEffect={theme.overlayEffect}
      data-base-contrast={theme.baseContrast}
      data-accent-foreground={theme.accentForeground}
      data-sidebar-contrast={theme.sidebarContrast}
      data-sidebar={theme.sidebarMode}
      data-sidebar-foreground={theme.sidebarForeground}
      minH="100dvh"
      style={themeStyle}
    >
      <AppearancePreview
        name={`Random ${theme.iteration + 1}`}
        isThemeScope={false}
        action={
          <Button
            size="sm"
            colorPalette="accent"
            variant="solid"
            onClick={() =>
              setTheme((current) => createRandomTheme(current.iteration + 1))
            }
          >
            <LuShuffle />
            Randomize theme
          </Button>
        }
        details={<ThemeDetails theme={theme} />}
      />
    </Theme>
  )
}

export const Graphite = appearanceStory({
  name: 'Graphite',
  className: 'appearance-graphite',
})

export const Ocean = appearanceStory({
  name: 'Ocean',
  className: 'appearance-ocean',
  baseContrast: 'soft',
})

export const Ember = appearanceStory({
  name: 'Ember',
  className: 'appearance-ember',
  accentForeground: 'dark',
  sidebarContrast: 'strong',
})

export const Emerald = appearanceStory({
  name: 'Emerald',
  className: 'appearance-emerald',
  baseContrast: 'soft',
})

export const SolidSidebar = appearanceStory({
  name: 'Solid sidebar',
  className: 'appearance-violet-sidebar',
  sidebarMode: 'solid',
})

export const ThemeRandomizer: Story = {
  render: () => <ThemeRandomizerPreview />,
}
