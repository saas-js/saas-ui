import CTA from '@/components/marketing/cta'
import { Container, useColorModeValue } from '@chakra-ui/react'
import { SignupForm } from '../signup-form'

export const RequestAccess = () => {
  return (
    <>
      <CTA
        id="request-access"
        title="Stay up to date"
        py="14"
        description={
          <>
            <p>
              Not ready to pre-order yet? Leave your details and we&apos;ll keep
              you informed.
            </p>
          </>
        }
        variant="subtle"
      >
        <Container
          borderRadius="md"
          bg={useColorModeValue('white', 'gray.700')}
          borderWidth="1px"
          borderColor={useColorModeValue('gray.300', 'gray.700')}
          p={8}
          width={['90vw', null, 'md']}
        >
          <SignupForm />
        </Container>
      </CTA>
    </>
  )
}
