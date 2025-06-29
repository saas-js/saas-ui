import { LogoIcon } from '@/components/logo'
import { Chart, useChart } from '@chakra-ui/charts'
import { Controller, FormLayout, SubmitButton, useForm } from '@saas-ui/forms'
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  DataList,
  Dialog,
  Field,
  Flex,
  Grid,
  GridList,
  HStack,
  Heading,
  Icon,
  IconButton,
  Link,
  Menu,
  PinInput,
  ProgressCircle,
  RadioCard,
  Separator,
  Span,
  Stack,
  Stat,
  Switch,
  Text,
} from '@saas-ui/react'
import {
  FaFilePdf,
  FaFilePowerpoint,
  FaFileWord,
  FaGoogle,
} from 'react-icons/fa'
import { LuDownload } from 'react-icons/lu'
import { Area, AreaChart, Tooltip } from 'recharts'

export const ComponentsDemo = () => {
  return (
    <Box overflow="clip" height="100%" position="relative">
      <Grid templateColumns="1fr 1fr 1.5fr" gap="8">
        <Stack gap="8">
          <ConfirmDialog />
          <MetricsCard />
          <DetailsCard />
        </Stack>
        <Stack gap="8">
          <LoginForm />
          <PinForm />
        </Stack>
        <Stack gap="8">
          <FilesCard />
          <NotificationsCard />
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
      bg="bg.subtle"
      _dark={{ bg: 'whiteAlpha.100' }}
      textStyle="sm"
    >
      <Card.Body borderRadius="lg" borderBottomWidth="1px" bg="bg.panel" p="6">
        <Flex mx="auto" mb="6">
          <LogoIcon color="var(--chakra-colors-accent-solid)" height="32px" />
        </Flex>

        <Heading as="h2" size="lg" mb="4" textAlign="center">
          {props.title}
        </Heading>

        {props.children}
      </Card.Body>
      <Card.Footer
        pb="3"
        borderBottomRadius="md"
        textAlign="center"
        justifyContent="center"
      >
        {props.footer}
      </Card.Footer>
    </Card.Root>
  )
}

function LoginForm() {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: (data) => {
      console.log(data)
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

      <form.Form>
        <FormLayout>
          <form.Field
            name="email"
            label="Email"
            type="email"
            autoComplete="email"
          />

          <SubmitButton>Log in</SubmitButton>
        </FormLayout>
      </form.Form>
    </AuthCard>
  )
}

function PinForm() {
  const form = useForm({
    defaultValues: {
      pin: '',
    },
    onSubmit: (data) => {
      console.log(data)
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
      <form.Form>
        <FormLayout>
          <Stack alignItems="center" width="full">
            <Controller
              control={form.control}
              name="pin"
              render={({ field }) => (
                <PinInput
                  {...field}
                  size="lg"
                  value={field.value.split('')}
                  placeholder="0"
                  pinLength={6}
                  onValueChange={({ value }) => field.onChange(value.join(''))}
                />
              )}
            />
          </Stack>

          <SubmitButton width="full">Confirm</SubmitButton>
        </FormLayout>
      </form.Form>
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

function ConfirmDialog() {
  return (
    <Dialog.Root
      modal={false}
      skipAnimationOnMount
      open
      preventScroll={false}
      trapFocus={false}
    >
      <Dialog.Content
        my="0"
        borderWidth="1px"
        boxShadow="md"
        transition="none"
        animationDuration="0ms"
      >
        <Dialog.Header>
          <Dialog.Title>Confirm</Dialog.Title>
        </Dialog.Header>
        <Dialog.Body>
          <Text>
            Are you sure you want to delete this file? This action cannot be
            undone.
          </Text>
        </Dialog.Body>
        <Dialog.Footer>
          <Button variant="outline">Cancel</Button>
          <Button variant="solid" colorPalette="red">
            Confirm
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
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
      {
        name: 'Jan',
        value: 12450,
      },
      {
        name: 'Feb',
        value: 14280,
      },
      {
        name: 'Mar',
        value: 15920,
      },
      {
        name: 'Apr',
        value: 18750,
      },
      {
        name: 'May',
        value: 22340,
      },
      {
        name: 'Jun',
        value: 24890,
      },
      {
        name: 'Jul',
        value: 28670,
      },
      {
        name: 'Aug',
        value: 32450,
      },
    ],
    series: [
      {
        name: 'value',
        label: 'Revenue',
        color: 'accent.solid',
      },
    ],
  })
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
        <Chart.Root chart={chart} height="100px">
          <AreaChart
            data={chart.data}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <Tooltip
              cursor={false}
              animationDuration={100}
              content={<Chart.Tooltip />}
            />
            {chart.series.map((item) => (
              <Area
                key={item.name}
                isAnimationActive={false}
                dataKey={chart.key(item.name)}
                fill={chart.color(item.color)}
                fillOpacity={0.05}
                stroke={chart.color(item.color)}
              />
            ))}
          </AreaChart>
        </Chart.Root>
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
        </DataList.Root>
      </Card.Body>
    </DemoCard>
  )
}
