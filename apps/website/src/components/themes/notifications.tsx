import { Card, Divider, Heading, Switch, Text } from '@chakra-ui/react'
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
  onChange?: (checked: boolean) => void
}

const NotificationItem: React.FC<NotificationItemProps> = (props) => {
  const { title, description, isChecked, onChange } = props
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
      <StructuredList size="condensed">
        <StructuredListHeader>Contacts</StructuredListHeader>
        <NotificationItem title="A new lead is added." isChecked={true} />
        <NotificationItem title="An account has upgraded." isChecked={true} />
      </StructuredList>
      <Divider />
      <StructuredList size="condensed">
        <StructuredListHeader>Inbox</StructuredListHeader>
        <NotificationItem
          title="A message is assigned to me."
          isChecked={true}
        />
        <NotificationItem title="Somebody mentions me." isChecked={true} />
      </StructuredList>
    </Card>
  )
}
