import * as React from 'react'

import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'

export interface AuthFormSuccessProps {
  title: React.ReactNode
  description: React.ReactNode
}

export const AuthFormSuccess: React.FC<AuthFormSuccessProps> = ({
  title,
  description,
  ...rest
}) => {
  return (
    <Alert
      status="success"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      {...rest}
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        {title}
      </AlertTitle>
      <AlertDescription maxWidth="sm">{description}</AlertDescription>
    </Alert>
  )
}
