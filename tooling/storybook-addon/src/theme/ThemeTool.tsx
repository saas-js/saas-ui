import { EyeIcon } from '@storybook/icons'
import {
  IconButton,
  TooltipLinkList,
  WithTooltip,
} from 'storybook/internal/components'
import { useAddonState } from 'storybook/manager-api'
import { addons } from 'storybook/preview-api'

import { ADDON_ID, EVENTS } from '../constants'

const themes: Record<string, string> = {
  0: 'Chakra UI',
  1: 'Saas UI',
  2: 'Glass',
}

/**
 * This component is rendered in the Storybook toolbar
 */
export const ThemeTool = () => {
  const themeId = localStorage.getItem('saas-ui-theme')
  const [theme, setTheme] = useAddonState(`${ADDON_ID}/theme`, themeId)

  const channel = addons.getChannel()

  const setActiveTheme = (themeId: string) => {
    channel.emit(EVENTS.SET_THEME, !themeId ? '1' : themeId)
    setTheme(themeId)
  }

  return (
    <WithTooltip
      placement="top"
      closeOnOutsideClick
      trigger="click"
      tooltip={({ onHide }) => (
        <TooltipLinkList
          links={[
            {
              id: '0',
              title: 'Chakra UI',
              onClick: () => {
                setActiveTheme('0')
                onHide()
              },
            },
            {
              id: '1',
              title: 'Saas UI',
              onClick: () => {
                setActiveTheme('1')
                onHide()
              },
            },
            {
              id: '2',
              title: 'Glass',
              onClick: () => {
                setActiveTheme('2')
                onHide()
              },
            },
          ]}
        />
      )}
    >
      <IconButton title="Select theme">
        <EyeIcon /> {themes[theme || '1']}
      </IconButton>
    </WithTooltip>
  )
}
