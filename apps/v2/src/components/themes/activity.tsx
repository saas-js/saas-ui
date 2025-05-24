import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  Tooltip,
} from '@chakra-ui/react'
import {
  Timeline,
  TimelineContent,
  TimelineIcon,
  TimelineItem,
  TimelineSeparator,
  TimelineTrack,
} from '@saas-ui/react'

import { format, formatDistanceToNow, subDays } from 'date-fns'

const activites = [
  {
    name: 'Helmut Magomedov',
    action: 'signed up',
    date: new Date(),
  },
  {
    name: 'Dariusz Thomas',
    action: 'signed up',
    date: subDays(new Date(), 1),
  },
  {
    name: 'Christian Amadi',
    action: 'upgraded to Pro',
    color: 'green.400',
    date: subDays(new Date(), 1),
  },
  {
    name: 'Kanchana Nowak',
    action: 'signed up',
    date: subDays(new Date(), 1),
  },
  {
    name: 'Aisha Njuguna',
    action: 'cancelled subscription',
    date: subDays(new Date(), 2),
  },
]

export const Activity = () => {
  return (
    <Card>
      <CardHeader>
        <Heading as="h3" size="sm">
          Activity
        </Heading>
      </CardHeader>
      <CardBody fontSize="sm">
        <Timeline variant="outline">
          {activites.map(({ name, action, date, color }, i) => (
            <TimelineItem key={i}>
              <TimelineSeparator>
                <TimelineIcon color={color} />
                {i < activites.length - 1 && <TimelineTrack />}
              </TimelineSeparator>
              <TimelineContent>
                <strong>{name}</strong> <span>{action}</span>.{' '}
                <Text as="span" color="muted">
                  {formatDistanceToNow(date)}
                </Text>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </CardBody>
    </Card>
  )
}
