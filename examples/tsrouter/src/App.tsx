import { ClientOnly } from '@chakra-ui/react'
import {
  Box,
  Button,
  Checkbox,
  Heading,
  HStack,
  Image,
  Progress,
  RadioGroup,
  Skeleton,
  VStack,
} from '@saas-ui/react'
import { ColorModeToggle } from './components/color-mode-toggle'

export default function App() {
  return (
    <Box textAlign="center" fontSize="xl" pt="30vh">
      <VStack gap="8">
        <Image
          alt="saas ui logo"
          src="/static/saasui.svg"
          height="20"
          _dark={{
            display: 'none',
          }}
        />
        <Image
          alt="saas ui logo"
          src="/static/saasui-dark.svg"
          height="20"
          _light={{
            display: 'none',
          }}
        />
        <Heading size="2xl" letterSpacing="tight">
          Welcome to SaaS UI v3 + TanStack Router
        </Heading>

        <HStack gap="10">
          <Checkbox>Checkbox</Checkbox>

          <RadioGroup.Root display="inline-flex" defaultValue="1">
            <RadioGroup.Item value="1" mr="2">
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemControl>
                <RadioGroup.ItemIndicator />
              </RadioGroup.ItemControl>
              <RadioGroup.ItemText lineHeight="1">Radio</RadioGroup.ItemText>
            </RadioGroup.Item>

            <RadioGroup.Item value="2">
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemControl>
                <RadioGroup.ItemIndicator />
              </RadioGroup.ItemControl>
              <RadioGroup.ItemText lineHeight="1">Radio</RadioGroup.ItemText>
            </RadioGroup.Item>
          </RadioGroup.Root>
        </HStack>

        <Progress.Root width="300px" value={65} striped animated>
          <Progress.Track>
            <Progress.Range />
          </Progress.Track>
        </Progress.Root>

        <HStack>
          <Button>Lets go</Button>
          <Button variant="outline">bun install @saas-ui/react</Button>
        </HStack>
      </VStack>

      <Box pos="absolute" top="4" right="4">
        <ClientOnly fallback={<Skeleton w="10" h="10" rounded="md" />}>
          <ColorModeToggle />
        </ClientOnly>
      </Box>
    </Box>
  )
}
