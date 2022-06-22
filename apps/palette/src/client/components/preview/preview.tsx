import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react'

import PalettePreview from './palette'
import ComponentPreview from './components'

import CodePreview from './code'
import JsonPreview from './json'

export const Preview = () => {
  return (
    <Tabs colorScheme="primary" variant="enclosed">
      <TabList mb="4">
        <Tab>Colors</Tab>
        <Tab>Components</Tab>
        <Tab>Code</Tab>
        <Tab>JSON</Tab>
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
      </TabPanels>
    </Tabs>
  )
}
