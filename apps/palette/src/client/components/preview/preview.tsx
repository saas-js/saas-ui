import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Badge,
} from '@chakra-ui/react'

import PalettePreview from './palette'
import ComponentPreview from './components'

import CodePreview from './code'
import JsonPreview from './json'
import FigmaPreview from './figma'

export const Preview = () => {
  return (
    <Tabs colorScheme="primary" variant="enclosed">
      <TabList mb="4">
        <Tab>Colors</Tab>
        <Tab>Components</Tab>
        <Tab>Code</Tab>
        <Tab>JSON</Tab>
        <Tab>
          Figma{' '}
          <Badge bg="primary.500" fontSize="xs" ms="2">
            new
          </Badge>
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <PalettePreview />
        </TabPanel>
        <TabPanel>
          <ComponentPreview />
        </TabPanel>
        <TabPanel position="relative">
          <CodePreview />
        </TabPanel>
        <TabPanel position="relative">
          <JsonPreview />
        </TabPanel>
        <TabPanel>
          <FigmaPreview />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
