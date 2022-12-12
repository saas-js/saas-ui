import {
  ChakraProvider,
  extendTheme,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  useColorMode,
  useColorModeValue,
  localStorageManager,
} from '@chakra-ui/react'
import { StoryContext } from '@storybook/react'
import * as React from 'react'
// import { FaMoon, FaSun } from 'react-icons/fa'
import { FiMoon, FiSun } from 'react-icons/fi'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { SaasProvider } from '@saas-ui/react'
import { baseTheme, theme as suiTheme } from '@saas-ui/theme'
import { useLocalStorage } from '@saas-ui/react'

/**
 * Add global context for RTL-LTR switching
 */
export const globalTypes = {
  direction: {
    name: 'Direction',
    description: 'Direction for layout',
    defaultValue: 'LTR',
    toolbar: {
      icon: 'globe',
      items: ['LTR', 'RTL'],
    },
  },
}

export const parameters = {
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
}

const ThemeSelect = ({ value, onChange }) => {
  const themes = ['Chakra UI', 'Saas UI']
  return (
    <Menu>
      <MenuButton>Theme: {themes[value]}</MenuButton>
      <MenuList>
        <MenuOptionGroup defaultValue={value} type="radio" onChange={onChange}>
          <MenuItemOption value="0">Chakra UI</MenuItemOption>
          <MenuItemOption value="1">Saas UI</MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  )
}

const ColorModeToggle = () => {
  const { toggleColorMode } = useColorMode()
  const SwitchIcon = useColorModeValue(FiMoon, FiSun)
  const nextMode = useColorModeValue('dark', 'light')

  return (
    <IconButton
      size="md"
      fontSize="lg"
      aria-label={`Switch to ${nextMode} mode`}
      variant="ghost"
      color="current"
      marginLeft="2"
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
    />
  )
}

const withChakra = (StoryFn: Function, context: StoryContext) => {
  const [themeId, setTheme] = useLocalStorage('storybook.theme', '0')

  const { direction } = context.globals
  const dir = direction.toLowerCase()

  const getTheme = React.useCallback(() => {
    if (themeId === '1') {
      return suiTheme
    }
    return baseTheme
  }, [themeId])

  const theme = context.parameters.theme || getTheme()
  const themeOverride = !!context.parameters.theme
  return (
    <SaasProvider theme={extendTheme({ ...theme, direction: dir })}>
      <div dir={dir} id="story-wrapper" style={{ minHeight: '100vh' }}>
        <Flex
          justify="flex-end"
          mb={4}
          position="absolute"
          top="4"
          right="4"
          fontSize="sm"
          zIndex="sticky"
        >
          {!themeOverride && (
            <ThemeSelect
              value={themeId}
              onChange={(id) => {
                setTheme(id)
              }}
            />
          )}
          <ColorModeToggle />
        </Flex>

        <StoryFn />
      </div>
    </SaasProvider>
  )
}

export const decorators = [withChakra]
