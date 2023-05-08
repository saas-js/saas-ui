import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  Text,
  useClipboard,
} from '@chakra-ui/react'
import {
  DisplayField,
  FormLayout,
  InputRightButton,
  useLocalStorage,
} from '@saas-ui/react'
import React from 'react'
import { FiCheck, FiClipboard } from 'react-icons/fi'

export const NpmAuthToken = () => {
  const [data] = useLocalStorage<any>('saas-ui.data', {})

  const [token, setToken] = React.useState(
    data?.licenseKey
      ? `${data.githubAccount}:${data.licenseKey}`.toLowerCase()
      : ''
  )

  const encodedToken = React.useMemo(() => {
    return typeof window !== 'undefined' ? window.btoa(token) : ''
  }, [token])

  const copyToken = useClipboard(token)
  const copyEncoded = useClipboard(encodedToken)

  return (
    <Card mt="4">
      <CardHeader fontWeight="medium" fontSize="md" pb="0">
        NPM Auth token
      </CardHeader>
      <CardBody>
        <FormLayout>
          <FormControl>
            <FormLabel>Your token</FormLabel>
            <InputGroup>
              <Input value={token} onChange={(e) => setToken(e.target.value)} />
              <InputRightButton onClick={copyToken.onCopy}>
                {copyToken.hasCopied ? <FiCheck /> : <FiClipboard />}
              </InputRightButton>
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel>Encoded token</FormLabel>
            <InputGroup>
              <Input value={encodedToken} readOnly />
              <InputRightButton onClick={copyEncoded.onCopy}>
                {copyEncoded.hasCopied ? <FiCheck /> : <FiClipboard />}
              </InputRightButton>
            </InputGroup>
          </FormControl>
        </FormLayout>
      </CardBody>
    </Card>
  )
}
