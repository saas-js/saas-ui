'use client'

import {
  Alert,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Checkbox,
  Field,
  Grid,
  HStack,
  Input,
  Progress,
  RadioGroup,
  Separator,
  Stack,
  Switch,
  Tabs,
  Text,
} from '@chakra-ui/react'

const buttonPalettes = ['accent', 'base', 'destructive'] as const
const variants = ['solid', 'subtle', 'surface', 'outline', 'ghost'] as const
const badgePalettes = [
  'accent',
  'gray',
  'success',
  'warning',
  'destructive',
  'info',
  'red',
  'orange',
  'green',
  'teal',
  'blue',
  'purple',
  'pink',
] as const

function Block(props: { title: string; children: React.ReactNode }) {
  return (
    <Card.Root variant="outline">
      <Card.Header pb="0">
        <Card.Title textStyle="sm">{props.title}</Card.Title>
      </Card.Header>
      <Card.Body>{props.children}</Card.Body>
    </Card.Root>
  )
}

function Invite() {
  return (
    <Card.Root variant="elevated">
      <Card.Header>
        <Card.Title>Invite your team</Card.Title>
        <Card.Description>
          Teammates get access to every project in this workspace.
        </Card.Description>
      </Card.Header>
      <Card.Body>
        <Stack gap="4">
          <Field.Root>
            <Field.Label>Email address</Field.Label>
            <Input placeholder="jane@example.com" />
            <Field.HelperText>Separate multiple addresses with commas.</Field.HelperText>
          </Field.Root>
          <RadioGroup.Root defaultValue="member" size="sm">
            <HStack gap="4">
              {['admin', 'member', 'viewer'].map((role) => (
                <RadioGroup.Item key={role} value={role}>
                  <RadioGroup.ItemHiddenInput />
                  <RadioGroup.ItemIndicator />
                  <RadioGroup.ItemText textTransform="capitalize">
                    {role}
                  </RadioGroup.ItemText>
                </RadioGroup.Item>
              ))}
            </HStack>
          </RadioGroup.Root>
          <Checkbox.Root defaultChecked size="sm">
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label>Send a welcome email</Checkbox.Label>
          </Checkbox.Root>
        </Stack>
      </Card.Body>
      <Card.Footer justifyContent="flex-end" gap="2">
        <Button variant="ghost">Cancel</Button>
        <Button variant="solid" colorPalette="accent">
          Send invites
        </Button>
      </Card.Footer>
    </Card.Root>
  )
}

function Usage() {
  return (
    <Card.Root variant="outline">
      <Card.Header>
        <HStack justify="space-between">
          <Card.Title>Usage this month</Card.Title>
          <Badge colorPalette="success">On track</Badge>
        </HStack>
      </Card.Header>
      <Card.Body>
        <Stack gap="5">
          {[
            { label: 'API requests', value: 72, detail: '72k of 100k' },
            { label: 'Seats', value: 90, detail: '9 of 10' },
            { label: 'Storage', value: 34, detail: '3.4 of 10 GB' },
          ].map((item) => (
            <Stack key={item.label} gap="1.5">
              <HStack justify="space-between" textStyle="sm">
                <Text>{item.label}</Text>
                <Text color="fg.muted">{item.detail}</Text>
              </HStack>
              <Progress.Root
                value={item.value}
                size="sm"
                colorPalette={item.value >= 90 ? 'warning' : 'accent'}
              >
                <Progress.Track>
                  <Progress.Range />
                </Progress.Track>
              </Progress.Root>
            </Stack>
          ))}
          <Separator />
          <HStack justify="space-between">
            <HStack gap="-2">
              {['Ada Lovelace', 'Grace Hopper', 'Alan Turing'].map((name) => (
                <Avatar.Root key={name} size="xs" borderWidth="2px" borderColor="bg.panel">
                  <Avatar.Fallback name={name} />
                </Avatar.Root>
              ))}
            </HStack>
            <Switch.Root defaultChecked size="sm" colorPalette="accent">
              <Switch.HiddenInput />
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
              <Switch.Label>Usage alerts</Switch.Label>
            </Switch.Root>
          </HStack>
        </Stack>
      </Card.Body>
    </Card.Root>
  )
}

export function ComponentsPreview() {
  return (
    <Stack gap="4">
      <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap="4">
        <Invite />
        <Usage />
      </Grid>

      <Block title="Buttons">
        <Stack gap="3" overflowX="auto">
          {buttonPalettes.map((palette) => (
            <HStack key={palette} gap="2">
              {variants.map((variant) => (
                <Button
                  key={variant}
                  size="sm"
                  colorPalette={palette}
                  variant={variant}
                  textTransform="capitalize"
                >
                  {variant}
                </Button>
              ))}
            </HStack>
          ))}
        </Stack>
      </Block>

      <Block title="Badges">
        <Stack gap="3">
          {(['solid', 'subtle', 'outline'] as const).map((variant) => (
            <HStack key={variant} gap="2" wrap="wrap">
              {badgePalettes.map((palette) => (
                <Badge key={palette} colorPalette={palette} variant={variant}>
                  {palette}
                </Badge>
              ))}
            </HStack>
          ))}
        </Stack>
      </Block>

      <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap="4">
        <Stack gap="3">
          <Alert.Root status="info">
            <Alert.Indicator />
            <Alert.Title>A new version is available.</Alert.Title>
          </Alert.Root>
          <Alert.Root status="success">
            <Alert.Indicator />
            <Alert.Title>Your changes have been saved.</Alert.Title>
          </Alert.Root>
          <Alert.Root status="warning">
            <Alert.Indicator />
            <Alert.Title>Your trial ends in 3 days.</Alert.Title>
          </Alert.Root>
          <Alert.Root status="error">
            <Alert.Indicator />
            <Alert.Title>The payment could not be processed.</Alert.Title>
          </Alert.Root>
        </Stack>
        <Block title="Tabs">
          <Tabs.Root defaultValue="overview" variant="subtle" colorPalette="accent" size="sm">
            <Tabs.List>
              <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
              <Tabs.Trigger value="activity">Activity</Tabs.Trigger>
              <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
            </Tabs.List>
            <Box pt="4" color="fg.muted" textStyle="sm">
              Subtle tabs use the accent muted and fg slots.
            </Box>
          </Tabs.Root>
        </Block>
      </Grid>
    </Stack>
  )
}
