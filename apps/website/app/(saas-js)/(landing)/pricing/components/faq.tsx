'use client'

import { ActionArrow } from '@/components/action-arrow'
import { LinkButton } from '@/components/link-button'
import {
  Accordion,
  ButtonGroup,
  Container,
  HStack,
  Heading,
  Link,
  Stack,
  Text,
} from '@saas-ui/react'

export function FAQ() {
  return (
    <Container maxW="6xl" py="20">
      <HStack gap="20" alignItems="flex-start">
        <Stack flex="1" alignItems="flex-start" pt="2">
          <Heading as="h2" fontSize="2xl" fontWeight="medium">
            Frequently asked questions
          </Heading>

          <Text fontWeight="medium" color="fg.subtle">
            Can't find what you're looking for? Join our Discord community.
          </Text>

          <ButtonGroup>
            <LinkButton
              href="/discord"
              variant="plain"
              colorPalette="accent"
              size="lg"
            >
              Join Discord <ActionArrow />
            </LinkButton>
          </ButtonGroup>
        </Stack>

        <Stack gap="4" flex="1">
          <Accordion.Root width="full" collapsible>
            <Accordion.Item value="1">
              <Accordion.ItemTrigger fontSize="md" fontWeight="medium">
                How many products can I build with Saas.js?
              </Accordion.ItemTrigger>
              <Accordion.ItemContent fontSize="md">
                The single and team license can be used for unlimited self
                hosted SaaS products or internal tools and maximum one client
                project. You can buy as many licenses as you need.
              </Accordion.ItemContent>
            </Accordion.Item>
            <Accordion.Item value="3">
              <Accordion.ItemTrigger fontSize="md" fontWeight="medium">
                What does the lifetime access mean?
              </Accordion.ItemTrigger>
              <Accordion.ItemContent fontSize="md">
                The Saas.js license is perpetual, you will have access to all
                assets of the Saas.js library forever.
              </Accordion.ItemContent>
            </Accordion.Item>
            <Accordion.Item value="4">
              <Accordion.ItemTrigger fontSize="md" fontWeight="medium">
                Do you offer refunds?
              </Accordion.ItemTrigger>
              <Accordion.ItemContent fontSize="md">
                No, due to the nature of the product being a digital download we
                do not offer refunds. We encourage you to try to open source and
                free components and read through the Pro documentation carefully
                to see if the product is a good fit.
              </Accordion.ItemContent>
            </Accordion.Item>
            <Accordion.Item value="4">
              <Accordion.ItemTrigger fontSize="md" fontWeight="medium">
                Do you offer support?
              </Accordion.ItemTrigger>
              <Accordion.ItemContent fontSize="md">
                Once you sign up you get access to our Discord community, where
                you can ask questions, report bugs or feature requests and get
                help from other customers. If you require more specialised
                support or consultancy contact us at hello@saas-ui.dev
              </Accordion.ItemContent>
            </Accordion.Item>
          </Accordion.Root>
        </Stack>
      </HStack>
    </Container>
  )
}
