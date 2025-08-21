import { Grid, GridItem } from '@saas-ui/react'

import { DecorativeBox } from '../lib/decorative-box'

export const GridWithColSpan = () => {
  return (
    <Grid templateColumns="repeat(4, 1fr)" gap="6">
      <GridItem colSpan={2}>
        <DecorativeBox h="20" />
      </GridItem>
      <GridItem colSpan={1}>
        <DecorativeBox h="20" />
      </GridItem>
      <GridItem colSpan={1}>
        <DecorativeBox h="20" />
      </GridItem>
    </Grid>
  )
}
