import { addons, types } from '@storybook/manager-api'
import {
  ADDON_ID,
  COLOR_MODE_TOOL_ID,
  DIRECTION_TOOL_ID,
  THEME_TOOL_ID,
} from './constants'
import { ColorModeTool } from './color-mode/ColorModeTool'
import { DirectionTool } from './direction/DirectionTool'
import { ThemeTool } from './theme/ThemeTool'

addons.register(ADDON_ID, (api) => {
  const match = ({ viewMode }: { viewMode?: string }) =>
    Boolean(viewMode && viewMode.match(/^(story|docs)$/))

  addons.add(DIRECTION_TOOL_ID, {
    type: types.TOOL,
    title: 'Direction',
    render: DirectionTool,
    match,
  })

  addons.add(COLOR_MODE_TOOL_ID, {
    type: types.TOOL,
    title: 'Color Mode',
    render: ColorModeTool,
    match,
  })

  addons.add(THEME_TOOL_ID, {
    type: types.TOOL,
    title: 'Theme',
    render: ThemeTool,
    match,
  })
})
