import {
  Accordion,
  Box,
  Button,
  Card,
  Center,
  Field,
  HStack,
  Input,
  Menu,
  Switch,
} from '@saas-ui/react'

export const ComponentsSection = () => {
  return (
    <Box overflowX="auto">
      <Box maxW="8xl" ps="max(calc(50% - {sizes.8xl} / 2), 80px)">
        <HStack width="fit-content" py="4">
          <ComponentCard>
            <Button variant="solid" colorPalette="accent">
              Button
            </Button>
          </ComponentCard>
          <ComponentCard>
            <Menu.Root open>
              <Menu.Button mt="-20" ml="-12">
                Menu
              </Menu.Button>
              <Menu.Content>
                <Menu.Item value="1">Item 1</Menu.Item>
                <Menu.Item value="2">Item 2</Menu.Item>
                <Menu.Item value="3">Item 3</Menu.Item>
              </Menu.Content>
            </Menu.Root>
          </ComponentCard>
          <ComponentCard>
            <Field.Root>
              <Field.Label>Email</Field.Label>
              <Input placeholder="john@doe.com" />
            </Field.Root>
          </ComponentCard>
          <ComponentCard>
            <Accordion.Root defaultValue={['1']} collapsible>
              <Accordion.Item value="1">
                <Accordion.ItemTrigger>Item 1</Accordion.ItemTrigger>
                <Accordion.ItemContent>Item 1</Accordion.ItemContent>
              </Accordion.Item>
              <Accordion.Item value="2">
                <Accordion.ItemTrigger>Item 2</Accordion.ItemTrigger>
                <Accordion.ItemContent>Item 2</Accordion.ItemContent>
              </Accordion.Item>
            </Accordion.Root>
          </ComponentCard>
          <ComponentCard>
            <Switch defaultChecked />
          </ComponentCard>
        </HStack>
      </Box>
    </Box>
  )
}

function ComponentCard({ children }: { children: React.ReactNode }) {
  return (
    <Card.Root p="8" boxSize="300px">
      <Center boxSize="100%">{children}</Center>
    </Card.Root>
  )
}
