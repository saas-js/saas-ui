import { Box, Container } from '@chakra-ui/react'

import { Testimonials } from './testimonials/testimonials'

export function TestimonialsSection() {
  return (
    <Box as="section" borderTopWidth="1px">
      <Container maxW="8xl" py="16">
        <Testimonials />
      </Container>
    </Box>
  )
}
