import { Alert } from '@saas-ui/react'

export const AlertWithCloseButton = () => {
  return (
    <Alert title="Success!" closable>
      Your application has been received. We will review your application and
      respond within the next 48 hours.
    </Alert>
  )
}
