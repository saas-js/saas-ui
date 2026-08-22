import { LogoIcon } from '@/components/logo'
import { Chart, useChart } from '@saas-ui/charts'
import { areaY, lineY } from '@tanstack/charts'
import { scaleBand } from '@tanstack/charts/scales/band'
import { scaleLinear } from '@tanstack/charts/scales/linear'
import {
  Badge,
  Box,
  Button,
  Card,
  DataList,
  Field,
  Flex,
  Grid,
  HStack,
  Heading,
  Icon,
  Progress,
  ProgressCircle,
  Separator,
  Span,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Form, useAppForm } from 'compositions/components/forms'
import { ErrorBoundary } from 'next/dist/client/components/error-boundary'
import { useMemo } from 'react'
import {
  FaFilePdf,
  FaFilePowerpoint,
  FaFileWord,
  FaGoogle,
} from 'react-icons/fa'
import { LuCheck, LuDownload, LuUserPlus } from 'react-icons/lu'

import { Avatar, AvatarGroup } from '#components/ui/avatar'
import { GridList } from '#components/ui/grid-list'
import { IconButton } from '#components/ui/icon-button'
import { Link } from '#components/ui/link'
import { Menu } from '#components/ui/menu'
import { PinInput } from '#components/ui/pin-input'
import { RadioCard } from '#components/ui/radio-card'
import { Stat } from '#components/ui/stat'
import { Switch } from '#components/ui/switch'

export const ComponentsDemo = () => {
  return (
    <Box overflow="clip" height="100%" position="relative">
      <Grid templateColumns="1fr 1fr 1.5fr" gap="8">
        <Stack gap="8">
          <SetupCard />
          <ErrorBoundary errorComponent={(props) => <div>Error</div>}>
            <MetricsCard />
          </ErrorBoundary>

          <DetailsCard />
        </Stack>
        <Stack gap="8">
          <LoginForm />
          <PinForm />
        </Stack>
        <Stack gap="8">
          <FilesCard />
          <NotificationsCard />
          <TeamCard />
        </Stack>
      </Grid>
    </Box>
  )
}

function DemoCard(props: { children: React.ReactNode }) {
  return (
    <Card.Root variant="elevated" textStyle="sm">
      {props.children}
    </Card.Root>
  )
}

function AuthCard(props: {
  title: string
  children: React.ReactNode
  footer: React.ReactNode
}) {
  return (
    <Card.Root
      size="lg"
      variant="elevated"
      overflow="hidden"
      textStyle="sm"
    >
      <Card.Body borderBottomWidth="1px" p="6">
        <Flex mx="auto" mb="6">
          <LogoIcon color="var(--chakra-colors-accent-solid)" height="32px" />
        </Flex>

        <Heading as="h2" size="lg" mb="4" textAlign="center">
          {props.title}
        </Heading>

        {props.children}
      </Card.Body>
      <Card.Footer
        bg="bg.muted"
        pb="3"
        textAlign="center"
        justifyContent="center"
      >
        {props.footer}
      </Card.Footer>
    </Card.Root>
  )
}

function LoginForm() {
  const form = useAppForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: ({ value }) => {
      console.log(value)
    },
  })

  return (
    <AuthCard
      title="Log in to your account"
      footer={
        <Text color="fg.muted">
          Don&apos;t have an account yet? <Link href="#">Sign up</Link>.
        </Text>
      }
    >
      <Stack>
        <Button variant="outline">
          <FaGoogle /> Continue with Google
        </Button>
      </Stack>

      <HStack my="4">
        <Separator />
        <Text flexShrink={0} color="fg.muted">
          or continue with
        </Text>
        <Separator />
      </HStack>

      <Form form={form}>
        <form.Layout>
          <form.AppField name="email">
            {(field) => (
              <field.TextField
                label="Email"
                type="email"
                autoComplete="email"
              />
            )}
          </form.AppField>

          <form.SubmitButton>Log in</form.SubmitButton>
        </form.Layout>
      </Form>
    </AuthCard>
  )
}

function PinForm() {
  const form = useAppForm({
    defaultValues: {
      pin: '',
    },
    onSubmit: ({ value }) => {
      console.log(value)
    },
  })

  return (
    <AuthCard
      title="Verify your email"
      footer={
        <Text color="fg.muted">
          Didn&apos;t receive a code? <Link href="#">Resend</Link>.
        </Text>
      }
    >
      <Form form={form}>
        <form.Layout>
          <Stack alignItems="center" width="full">
            <form.AppField name="pin">
              {(field) => (
                <PinInput
                  name={field.name}
                  size="lg"
                  value={field.state.value.split('')}
                  placeholder="0"
                  pinLength={6}
                  onValueChange={({ value }) =>
                    field.handleChange(value.join(''))
                  }
                  inputProps={{ onBlur: field.handleBlur }}
                />
              )}
            </form.AppField>
          </Stack>

          <form.SubmitButton width="full">Confirm</form.SubmitButton>
        </form.Layout>
      </Form>
    </AuthCard>
  )
}

export const FilesCard = () => {
  const files = [
    {
      id: 1,
      name: 'Pitch deck.pptx',
      size: '2,3 MB',
      date: '2 days ago',
      icon: <Icon as={FaFilePowerpoint} color="yellow.solid" />,
    },
    {
      id: 2,
      name: 'Blogpost.docx',
      size: '1 MB',
      date: 'a week ago',
      icon: <Icon as={FaFileWord} color="blue.solid" />,
    },
    {
      id: 3,
      name: 'Flyer.pdf',
      size: '76 KB',
      date: '12 days ago',
      icon: <Icon as={FaFilePdf} color="red.solid" />,
    },
  ]

  return (
    <DemoCard>
      <Card.Header>
        <Card.Title>
          Files{' '}
          <Span ms="2" fontSize="xs" fontWeight="normal" color="fg.muted">
            3
          </Span>
        </Card.Title>
      </Card.Header>
      <GridList.Root>
        {files.map((file) => (
          <GridList.Item
            key={file.id}
            borderBottomWidth="1px"
            _last={{ borderWidth: 0 }}
          >
            <GridList.Cell>
              <Flex
                borderWidth="1px"
                rounded="md"
                boxSize="8"
                alignItems="center"
                justifyContent="center"
              >
                {file.icon}
              </Flex>
            </GridList.Cell>
            <GridList.Cell flex="1">
              <Text textStyle="sm" fontWeight="medium">
                {file.name}
              </Text>
              <Text color="fg.muted" textStyle="sm">
                {file.size} • {file.date}
              </Text>
            </GridList.Cell>
            <GridList.Cell>
              <IconButton aria-label="Download" variant="ghost" size="sm">
                <LuDownload />
              </IconButton>
            </GridList.Cell>
          </GridList.Item>
        ))}
      </GridList.Root>
    </DemoCard>
  )
}

function SetupCard() {
  const steps = [
    { label: 'Create workspace', done: true },
    { label: 'Invite a teammate', done: true },
    { label: 'Connect billing', done: false },
    { label: 'Import customers', done: false },
  ]
  const completed = steps.filter((step) => step.done).length

  return (
    <DemoCard>
      <Card.Header>
        <Card.Title>Get started</Card.Title>
        <Text color="fg.muted" textStyle="sm">
          {completed} of {steps.length} complete
        </Text>
      </Card.Header>
      <Card.Body gap="3">
        <Progress.Root
          value={(completed / steps.length) * 100}
          size="xs"
          colorPalette="accent"
        >
          <Progress.Track>
            <Progress.Range />
          </Progress.Track>
        </Progress.Root>
        <Stack gap="2">
          {steps.map((step) => (
            <HStack key={step.label} gap="2.5">
              <Flex
                boxSize="5"
                rounded="full"
                align="center"
                justify="center"
                bg={step.done ? 'accent.solid' : 'bg.muted'}
                color={step.done ? 'accent.fg' : 'fg.muted'}
                borderWidth={step.done ? '0' : '1px'}
                borderColor="border"
              >
                {step.done ? <LuCheck size="12" /> : null}
              </Flex>
              <Text
                textStyle="sm"
                color={step.done ? 'fg.muted' : 'fg'}
                textDecoration={step.done ? 'line-through' : undefined}
              >
                {step.label}
              </Text>
            </HStack>
          ))}
        </Stack>
      </Card.Body>
      <Card.Footer>
        <Button size="sm" colorPalette="neutral" width="full">
          Continue setup
        </Button>
      </Card.Footer>
    </DemoCard>
  )
}

function TeamCard() {
  const members = [
    { name: 'Eelco Wiersma', email: 'eelco@saas-ui.dev', role: 'Owner' },
    { name: 'Sarah Chen', email: 'sarah@acme.com', role: 'Admin' },
    { name: 'Marcus Webb', email: 'marcus@acme.com', role: 'Member' },
    { name: 'Priya Shah', email: 'priya@acme.com', role: 'Member' },
  ]

  return (
    <DemoCard>
      <Card.Header>
        <HStack justify="space-between" align="center">
          <Card.Title>
            Team{' '}
            <Span ms="2" fontSize="xs" fontWeight="normal" color="fg.muted">
              {members.length} / 8 seats
            </Span>
          </Card.Title>
          <Button size="xs" variant="ghost" colorPalette="accent">
            <LuUserPlus /> Invite
          </Button>
        </HStack>
      </Card.Header>
      <GridList.Root>
        {members.map((member) => (
          <GridList.Item
            key={member.email}
            borderBottomWidth="1px"
            _last={{ borderWidth: 0 }}
          >
            <GridList.Cell>
              <Avatar name={member.name} size="sm" />
            </GridList.Cell>
            <GridList.Cell flex="1">
              <Text textStyle="sm" fontWeight="medium">
                {member.name}
              </Text>
              <Text color="fg.muted" textStyle="xs">
                {member.email}
              </Text>
            </GridList.Cell>
            <GridList.Cell>
              <Badge
                size="sm"
                variant="subtle"
                colorPalette={member.role === 'Member' ? 'gray' : 'accent'}
              >
                {member.role}
              </Badge>
            </GridList.Cell>
          </GridList.Item>
        ))}
      </GridList.Root>
    </DemoCard>
  )
}

function NotificationsCard() {
  return (
    <DemoCard>
      <Card.Header>
        <Card.Title>Notifications</Card.Title>
      </Card.Header>
      <Card.Body p="0" px="2">
        <GridList.Root>
          <NotificationItem
            name="assigned"
            title="Assigned"
            description="A conversation is assigned to me."
          />
          <NotificationItem
            name="mentioned"
            title="Mentions"
            description="Somebody mentions me."
            defaultChecked
          />
          <NotificationItem
            name="lead-qualified"
            title="Lead qualified"
            description="A lead is qualified."
            defaultChecked
          />
          <NotificationItem
            name="deal-closed"
            title="Deal closed"
            description="A deal is closed."
            defaultChecked
          />
        </GridList.Root>
      </Card.Body>
    </DemoCard>
  )
}

interface NotificationItemProps {
  title: string
  name: string
  description?: string
  isChecked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
}

const NotificationItem: React.FC<NotificationItemProps> = (props) => {
  const { title, name, description, defaultChecked, isChecked, onChange } =
    props
  return (
    <GridList.Item
      asChild
      css={{
        '&:not(&:last-child)::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          display: 'block',
          height: '1px',
          width: '100%',
          backgroundColor: 'var(--chakra-colors-border-subtle)',
        },
      }}
    >
      <Field.Root ps="2">
        <GridList.Cell flex="1">
          <Field.Label textStyle="sm" userSelect="none">
            {title}
          </Field.Label>
          {description ? (
            <Text color="fg.muted" textStyle="xs">
              {description}
            </Text>
          ) : null}
        </GridList.Cell>
        <GridList.Cell>
          <Switch
            size="sm"
            colorPalette="accent"
            defaultChecked={defaultChecked}
            checked={isChecked}
            onCheckedChange={({ checked }) => onChange?.(checked)}
          />
        </GridList.Cell>
      </Field.Root>
    </GridList.Item>
  )
}

function MetricsCard() {
  const chart = useChart({
    data: [
      { name: 'Jan', value: 12450 },
      { name: 'Feb', value: 14280 },
      { name: 'Mar', value: 15920 },
      { name: 'Apr', value: 18750 },
      { name: 'May', value: 22340 },
      { name: 'Jun', value: 24890 },
      { name: 'Jul', value: 28670 },
      { name: 'Aug', value: 32450 },
    ],
    series: [{ name: 'value', label: 'Revenue', color: 'accent.solid' }],
  })

  const definition = useMemo(
    () =>
      chart.define({
        marks: [
          areaY(chart.data, {
            x: 'name',
            y: 'value',
            fill: chart.color('accent.solid'),
            fillOpacity: 0.16,
          }),
          lineY(chart.data, {
            x: 'name',
            y: 'value',
            stroke: chart.color('accent.solid'),
            strokeWidth: 2,
          }),
        ],
        x: {
          scale: () => scaleBand<string>().padding(0),
          grid: false,
          axis: false,
        },
        y: {
          scale: scaleLinear,
          nice: true,
          grid: false,
          axis: false,
        },
      }),
    [chart],
  )

  return (
    <DemoCard>
      <Card.Header>
        <Stat.Root gap="0">
          <Stat.Label>Revenue</Stat.Label>
          <Stat.ValueText>$12,450</Stat.ValueText>
          <Stat.HelpText>
            <Span color="green.solid">+$2,345 (23.2%)</Span> vs last month
          </Stat.HelpText>
        </Stat.Root>
      </Card.Header>
      <Card.Body p="0" overflow="hidden">
        <Chart.Root
          chart={chart}
          definition={definition}
          height={100}
          ariaLabel="Monthly revenue"
        />
      </Card.Body>
    </DemoCard>
  )
}

function CheckoutCard() {
  return (
    <DemoCard>
      <Card.Header>
        <Card.Title>Checkout</Card.Title>
      </Card.Header>
      <Card.Body>
        <RadioCard.Root>
          <RadioCard.Item value="1"></RadioCard.Item>
        </RadioCard.Root>
      </Card.Body>
    </DemoCard>
  )
}

function DetailsCard() {
  return (
    <DemoCard>
      <Card.Header>
        <Card.Title>Details</Card.Title>
      </Card.Header>
      <Card.Body>
        <DataList.Root>
          <DataList.Item>
            <DataList.ItemLabel>Status</DataList.ItemLabel>
            <DataList.ItemValue>
              <Menu.Root>
                <Menu.Trigger asChild>
                  <Button variant="ghost" size="sm" ml="-2">
                    In Progress
                  </Button>
                </Menu.Trigger>
                <Menu.Content>
                  <Menu.Item value="in-progress">In Progress</Menu.Item>
                  <Menu.Item value="completed">Completed</Menu.Item>
                </Menu.Content>
              </Menu.Root>
            </DataList.ItemValue>
          </DataList.Item>
          <DataList.Item>
            <DataList.ItemLabel>Due date</DataList.ItemLabel>
            <DataList.ItemValue>
              {new Intl.DateTimeFormat('en-US', {
                dateStyle: 'medium',
              }).format(new Date())}
            </DataList.ItemValue>
          </DataList.Item>
          <DataList.Item>
            <DataList.ItemLabel>Assigned to</DataList.ItemLabel>
            <DataList.ItemValue>
              <AvatarGroup size="xs">
                <Avatar name="John Doe" />
                <Avatar name="Elliot Alderson" />
              </AvatarGroup>
            </DataList.ItemValue>
          </DataList.Item>
          <DataList.Item>
            <DataList.ItemLabel>Sentiment</DataList.ItemLabel>
            <DataList.ItemValue display="flex" alignItems="center" gap="2">
              <ProgressCircle.Root size="xs" value={85} colorPalette="green">
                <ProgressCircle.Circle>
                  <ProgressCircle.Track />
                  <ProgressCircle.Range />
                </ProgressCircle.Circle>
              </ProgressCircle.Root>
              <Span>Positive</Span>
            </DataList.ItemValue>
          </DataList.Item>
          <DataList.Item>
            <DataList.ItemLabel>Priority</DataList.ItemLabel>
            <DataList.ItemValue>
              <Badge size="sm" variant="subtle" colorPalette="orange">
                High
              </Badge>
            </DataList.ItemValue>
          </DataList.Item>
        </DataList.Root>
      </Card.Body>
    </DemoCard>
  )
}
