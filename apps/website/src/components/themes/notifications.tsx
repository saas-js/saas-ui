import {
  Card,
  CardHeader,
  Divider,
  Heading,
  Switch,
  Text,
} from '@chakra-ui/react'
import {
  StructuredList,
  StructuredListCell,
  StructuredListHeader,
  StructuredListItem,
} from '@saas-ui/react'
import { Section, SectionBody, SectionHeader } from '@saas-ui-pro/react'

interface NotificationItemProps {
  title: string
  description?: string
  isChecked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
}

const NotificationItem: React.FC<NotificationItemProps> = (props) => {
  const { title, description, defaultChecked, isChecked, onChange } = props
  return (
    <StructuredListItem>
      <StructuredListCell flex="1">
        <Heading size="sm" fontWeight="normal">
          {title}
        </Heading>
        {description ? (
          <Text color="muted" size="sm">
            {description}
          </Text>
        ) : null}
      </StructuredListCell>
      <StructuredListCell>
        <Switch
          defaultChecked={defaultChecked}
          isChecked={isChecked}
          onChange={(e) => onChange?.(!!e.target.value)}
        />
      </StructuredListCell>
    </StructuredListItem>
  )
}

export function ThemeNotifications() {
  return (
    <Card>
      <CardHeader>
        <Heading size="sm" fontWeight="semibold">
          Notifications
        </Heading>
      </CardHeader>
      <StructuredList size="condensed">
        <StructuredListHeader fontWeight="regular" fontSize="sm">
          Contacts
        </StructuredListHeader>
        <NotificationItem title="A new lead is added." defaultChecked />
        <NotificationItem title="An account has upgraded." />
      </StructuredList>
      <Divider />
      <StructuredList size="condensed">
        <StructuredListHeader fontWeight="regular" fontSize="sm">
          Inbox
        </StructuredListHeader>
        <NotificationItem title="A message is assigned to me." />
        <NotificationItem title="Somebody mentions me." defaultChecked />
      </StructuredList>
    </Card>
  )
}
