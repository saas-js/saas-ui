'use client'

import { Button, Card, Heading } from '@chakra-ui/react'
import { Field, SegmentedControl } from '@saas-ui/react'
import { LuSearch } from 'react-icons/lu'

export const SegmentedControlInCard = () => {
  return (
    <Card.Root width="320px">
      <Card.Header>
        <Heading size="lg">Find your dream home</Heading>
      </Card.Header>
      <Card.Body gap="6">
        <Field.Root>
          <Field.Label>Bedrooms</Field.Label>
          <SegmentedControl
            defaultValue="Any"
            items={['Any', '1', '2', '3', '3+']}
          />
        </Field.Root>
        <Field.Root>
          <Field.Label>Beds</Field.Label>
          <SegmentedControl defaultValue="1" items={['Any', '1', '2', '2+']} />
        </Field.Root>
        <Field.Root>
          <Field.Label>Bathrooms</Field.Label>
          <SegmentedControl defaultValue="3" items={['Any', '1', '2', '3']} />
        </Field.Root>
      </Card.Body>
      <Card.Footer justifyContent="space-between" mt="3">
        <Button variant="surface">Reset</Button>
        <Button>
          <LuSearch /> 20 results
        </Button>
      </Card.Footer>
    </Card.Root>
  )
}
