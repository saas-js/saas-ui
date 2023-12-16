import { GetStaticProps } from 'next'
import {
  countComponentsByCategory,
  getAllComponents,
} from '../../data/blocks/components'
import { OverviewPage } from '../../components/blocks/overview-page'

export default OverviewPage

export const getStaticProps: GetStaticProps = () => ({
  props: {
    componentsCountByCategory: countComponentsByCategory(),
    allComponents: getAllComponents(),
  },
})
