import Head from 'next/head'
import { CATEGORIES } from '../../data/blocks'
import { CategoriesList } from './categories-list'
import { Box, Container, Heading, Text } from '@chakra-ui/react'
import { BackgroundGradientRadial } from '../background-gradient-radial'

interface OverviewPageProps {
  componentsCountByCategory: Record<string, number>
}

export function OverviewPage({ componentsCountByCategory }: OverviewPageProps) {
  const allComponentsCount = Object.keys(componentsCountByCategory).reduce(
    (acc, category) => acc + componentsCountByCategory[category],
    0
  )

  return (
    <Container maxWidth="container.2xl" px="8" py="20">
      <Head>
        <title>Saas UI Blocks</title>
      </Head>

      <BackgroundGradientRadial
        top="-1200px"
        bottom="auto"
        opacity="0.3"
        _dark={{ opacity: 0.5 }}
        zIndex="-1"
        height="1000px"
      />

      <Box position="relative" zIndex="1">
        <Box mb="12">
          <Heading as="h2" size="2xl" textStyle="pageTitle">
            Blocks
          </Heading>
          <Text fontSize="xl" mt="5" color="muted">
            Build delightful apps and dashboards faster with pre-built
            templates.
            <br />
            Crafted with precision and proven design patterns.
          </Text>
        </Box>

        <CategoriesList
          groups={CATEGORIES}
          componentsCountByCategory={componentsCountByCategory}
        />
      </Box>
    </Container>
  )
}
