import { Badge, Tabs } from '@saas-ui/react'

import CodePreview from './code'
import ComponentPreview from './components'
import FigmaPreview from './figma'
import JsonPreview from './json'
import PalettePreview from './palette'

export const Preview = () => {
  return (
    <Tabs.Root colorPalette="primary" variant="outline" defaultValue="colors">
      <Tabs.List mb="4">
        <Tabs.Trigger value="colors">Colors</Tabs.Trigger>
        <Tabs.Trigger value="components">Components</Tabs.Trigger>
        <Tabs.Trigger value="code">Code</Tabs.Trigger>
        <Tabs.Trigger value="json">JSON</Tabs.Trigger>
        <Tabs.Trigger value="figma">
          Figma{' '}
          <Badge bg="primary.500" fontSize="xs" ms="2">
            new
          </Badge>
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="colors">
        <PalettePreview />
      </Tabs.Content>
      <Tabs.Content value="components">
        <ComponentPreview />
      </Tabs.Content>
      <Tabs.Content value="code" pos={'relative'}>
        <CodePreview />
      </Tabs.Content>
      <Tabs.Content value="json" pos={'relative'}>
        <JsonPreview />
      </Tabs.Content>
      <Tabs.Content value="figma">
        <FigmaPreview />
      </Tabs.Content>
    </Tabs.Root>
  )
}
