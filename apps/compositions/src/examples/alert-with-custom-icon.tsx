import { Alert } from '@saas-ui/react'
import { LuAlarmClockPlus } from 'react-icons/lu'

export const AlertWithCustomIcon = () => {
  return (
    <Alert
      icon={<LuAlarmClockPlus />}
      status="warning"
      title="Submitting this form will delete your account"
    />
  )
}
