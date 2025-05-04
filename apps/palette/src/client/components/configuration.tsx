import { useCallback } from 'react'

import { useEditorContext } from '@/providers/editor'
import {
  Button,
  ButtonGroup,
  Field,
  HStack,
  Input,
  VStack,
} from '@chakra-ui/react'
import { Select, Slider } from '@saas-ui/react'
import { FaXTwitter } from 'react-icons/fa6'

import Section from './section'

const PaletteConfiguration = () => {
  const [state, setState] = useEditorContext()

  const { theme, color, gray, blackLuminance } = state

  const handleChange = useCallback(
    (key: string) => {
      return (e: any) => {
        setState((state) => ({
          ...state,
          [key]: e.target?.value,
        }))
      }
    },
    [setState],
  )

  const onReset = useCallback(() => {
    setState((state) => {
      // @todo get these values from the default themes
      return {
        ...state,
        color: '#6d28d9',
        gray: '#1f2937',
        blackLuminance: 0.005,
      }
    })
  }, [setState])

  return (
    <form onSubmit={() => null}>
      <Section title="Configuration">
        <VStack gap={4}>
          <Field.Root>
            <Field.Label>Theme</Field.Label>

            <Select.Root
              name="theme"
              value={theme}
              onChange={(theme) =>
                setState((state) => ({ ...state, theme: theme as string }))
              }
            >
              <Select.Trigger>
                <Select.ValueText>{theme}</Select.ValueText>
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="Glass">Glass</Select.Item>
                <Select.Item value="Chakra UI">Chakra UI</Select.Item>
                <Select.Item value="Saas UI">Saas UI</Select.Item>
              </Select.Content>
            </Select.Root>
          </Field.Root>
          <Field.Root>
            <Field.Label>Primary color</Field.Label>
            <HStack>
              <Input
                type="color"
                onChange={handleChange('color')}
                value={color}
                w="10"
                p="0"
              />
              <Input
                type="text"
                onChange={handleChange('color')}
                value={color}
              />
            </HStack>
            <Field.HelperText>
              Select your primary brand color here, all other colors will be
              generated based of this.
            </Field.HelperText>
          </Field.Root>
          <Field.Root>
            <Field.Label>Gray tint</Field.Label>
            <HStack>
              <Input
                type="color"
                onChange={handleChange('gray')}
                value={gray}
                w="10"
                p="0"
              />
              <Input type="text" onChange={handleChange('gray')} value={gray} />
            </HStack>
            <Field.HelperText>
              Choose a gray tint that compliments your base color to make your
              theme pop.
            </Field.HelperText>
          </Field.Root>
          <Field.Root>
            <Field.Label>Black luminance</Field.Label>
            <Slider
              onChange={(value) =>
                setState((state) => ({
                  ...state,
                  blackLuminance: value,
                }))
              }
              value={blackLuminance}
              min={0}
              max={0.01}
              step={0.001}
            />

            <Field.HelperText>
              Slightly increase the luminance to make your blacks more organic.
            </Field.HelperText>
          </Field.Root>

          {/* TODO: */}
          {/* <Divider /> */}

          <ButtonGroup>
            <Button asChild variant="solid" colorScheme="primary">
              <FaXTwitter />
              <a href="https://twitter.com/intent/tweet?text=I%20created%20my%20%40chakra_ui%20color%20palette%20with%20%40saas_js%20%F0%9F%A4%A9%0A%0A%0Ahttps%3A//palette.saas-ui.dev%20">
                Share on Twitter
              </a>
            </Button>

            <Button onClick={onReset}>Reset</Button>
          </ButtonGroup>
        </VStack>
      </Section>
    </form>
  )
}

export default PaletteConfiguration
