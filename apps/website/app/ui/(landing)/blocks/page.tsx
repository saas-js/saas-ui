import { CATEGORIES } from '@/blocks'
import {
  countComponentsByCategory,
  getAllComponents,
} from '@/blocks/components'
import { CategoriesList } from '@/components/blocks/categories-list'
import { Box, Container, HStack, Heading, Text } from '@saas-ui/react'

export default async function Page() {
  const componentsCountByCategory = await countComponentsByCategory()

  const allComponents = await getAllComponents()

  const allComponentsCount = Object.keys(componentsCountByCategory).reduce(
    (acc, category) => acc + componentsCountByCategory[category],
    0,
  )

  return (
    <Container maxWidth="8xl" px="8" py="20">
      <Box position="relative" zIndex="1">
        <HStack alignItems="start">
          <Box mb="12" flex="1">
            <Heading as="h2" size="2xl" textStyle="pageTitle">
              Blocks
            </Heading>
            <Text fontSize="md" mt="5" color="fg.muted">
              Build delightful apps and dashboards faster with{' '}
              {allComponentsCount} pre-built blocks and templates.
            </Text>
          </Box>

          {/* {!isAuthenticated && (
            <LinkButton href="/login" size="sm" variant="outline">
              Log in
            </LinkButton>
          )} */}
        </HStack>

        <CategoriesList
          groups={CATEGORIES}
          componentsCountByCategory={componentsCountByCategory}
        />
      </Box>
    </Container>
  )
}
