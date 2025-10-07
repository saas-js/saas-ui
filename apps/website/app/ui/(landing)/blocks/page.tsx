import { CATEGORIES } from '@/blocks'
import {
  countComponentsByCategory,
  getAllComponents,
} from '@/blocks/components'
import { CategoriesList } from '@/components/blocks/categories-list'
import { LinkButton } from '@/components/link-button'
import {
  Box,
  ButtonGroup,
  Container,
  HStack,
  Heading,
  Text,
} from '@saas-ui/react'
import { TbLock } from 'react-icons/tb'

export default async function Page() {
  const componentsCountByCategory = await countComponentsByCategory()

  const allComponentsCount = Object.keys(componentsCountByCategory).reduce(
    (acc, category) => acc + componentsCountByCategory[category],
    0,
  )

  const isAuthenticated = false

  return (
    <Container maxWidth="8xl" px="8" py="16">
      <Box position="relative" zIndex="1">
        <HStack alignItems="start">
          <Box mb="12" flex="1">
            <Heading as="h2" textStyle="4xl">
              {allComponentsCount} blocks for Chakra UI v3
            </Heading>
            <Text fontSize="lg" color="fg.muted">
              Copy-paste our top tier B2B SaaS components and templates.
            </Text>
          </Box>

          {!isAuthenticated && (
            <ButtonGroup>
              <LinkButton
                href="/pricing"
                size="lg"
                variant="surface"
                bg="white"
              >
                <TbLock size="16" /> Unlock all
              </LinkButton>
            </ButtonGroup>
          )}
        </HStack>

        <CategoriesList
          groups={CATEGORIES}
          componentsCountByCategory={componentsCountByCategory}
        />
      </Box>
    </Container>
  )
}
