import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { Badge, Center, Icon, Link, Text } from '@chakra-ui/react'
import {
  Timeline,
  TimelineProps,
  TimelineItem,
  TimelineSeparator,
  TimelineIcon,
  TimelineTrack,
  TimelineContent,
} from './timeline'
import {
  FiCode,
  FiMessageCircle,
  FiPlus,
  FiRefreshCw,
  FiUserCheck,
  FiZap,
} from 'react-icons/fi'
import { Persona, PersonaAvatar } from '@saas-ui/react'

export default {
  title: 'Components/Data Display/Timeline',
  decorators: [
    (Story: any) => (
      <Center minH="100vh">
        <Story />
      </Center>
    ),
  ],
} as Meta

const events = [
  {
    icon: FiPlus,
    description: 'validate',
    color: 'green',
  },
  {
    description: 'build',
  },
  {
    icon: FiMessageCircle,
    description: 'iterate',
  },
]

const Template: Story<TimelineProps> = (args) => {
  return <Timeline {...args} />
}

export const Basic = Template.bind({})
Basic.args = {
  children: (
    <>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineIcon />
          <TimelineTrack />
        </TimelineSeparator>
        <TimelineContent>Validate</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineIcon />
          <TimelineTrack />
        </TimelineSeparator>
        <TimelineContent>Build</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineIcon />
        </TimelineSeparator>
        <TimelineContent>Iterate</TimelineContent>
      </TimelineItem>
    </>
  ),
}

export const Color = Template.bind({})
Color.args = {
  children: (
    <>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineIcon color="primary.500" />
          <TimelineTrack />
        </TimelineSeparator>
        <TimelineContent>Validate</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineIcon color="cyan.500" />
          <TimelineTrack />
        </TimelineSeparator>
        <TimelineContent>Build</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineIcon color="green.500" />
        </TimelineSeparator>
        <TimelineContent>Iterate</TimelineContent>
      </TimelineItem>
    </>
  ),
}

export const Outlined = Template.bind({})
Outlined.args = {
  variant: 'outline',
  children: (
    <>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineIcon color="primary.500" />
          <TimelineTrack />
        </TimelineSeparator>
        <TimelineContent>Validate</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineIcon color="cyan.500" />
          <TimelineTrack />
        </TimelineSeparator>
        <TimelineContent>Build</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineIcon color="green.500" />
        </TimelineSeparator>
        <TimelineContent>Iterate</TimelineContent>
      </TimelineItem>
    </>
  ),
}

export const Icons = Template.bind({})
Icons.args = {
  children: (
    <>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineIcon color="gray.800" _dark={{ color: 'white' }}>
            <FiUserCheck />
          </TimelineIcon>
          <TimelineTrack />
        </TimelineSeparator>
        <TimelineContent>Validate</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineIcon color="gray.800" _dark={{ color: 'white' }}>
            <FiCode />
          </TimelineIcon>
          <TimelineTrack />
        </TimelineSeparator>
        <TimelineContent>Build</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineIcon color="gray.800" _dark={{ color: 'white' }}>
            <FiRefreshCw />
          </TimelineIcon>
        </TimelineSeparator>
        <TimelineContent>Iterate</TimelineContent>
      </TimelineItem>
    </>
  ),
}

export const Custom = Template.bind({})
Custom.args = {
  children: (
    <>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineIcon>
            <PersonaAvatar
              src="/showcase-avatar.jpg"
              colorScheme="purple.300"
              name="Renata Alink"
              size="xs"
              bg="purple.200"
              presence="online"
            />
          </TimelineIcon>
          <TimelineTrack />
        </TimelineSeparator>
        <TimelineContent pt="2">
          <Text color="muted">
            <Link color="black" _dark={{ color: 'white' }}>
              Renata
            </Link>{' '}
            created the issue.
          </Text>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineIcon>
            <Badge
              rounded="full"
              borderWidth="2px"
              borderColor="green.300"
              bg="none"
              boxSize="13px"
            />
          </TimelineIcon>
          <TimelineTrack />
        </TimelineSeparator>
        <TimelineContent>
          <Text color="muted">John changed status to pending.</Text>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineIcon>
            <PersonaAvatar
              src="/showcase-avatar.jpg"
              name="Renata Alink"
              size="xs"
              bg="purple.200"
              presence="online"
            />
          </TimelineIcon>
        </TimelineSeparator>
        <TimelineContent pt="2">
          <Text color="muted">
            <Link color="black" _dark={{ color: 'white' }}>
              Renata
            </Link>{' '}
            completed the issue.
          </Text>
        </TimelineContent>
      </TimelineItem>
    </>
  ),
}
