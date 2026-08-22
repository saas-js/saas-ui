import { appearanceColors } from '../appearance.ts'
import { defineSemanticTokens } from '../def'
import { createPalettes } from '../palette.ts'

export const semanticColors = defineSemanticTokens.colors({
  presence: {
    online: { value: '{colors.success.solid}' },
    offline: { value: '{colors.gray.solid}' },
    busy: { value: '{colors.warning.solid}' },
    dnd: { value: '{colors.destructive.solid}' },
    away: { value: '{colors.gray.solid}' },
  },

  status: {
    success: { value: '{colors.success.solid}' },
    error: { value: '{colors.destructive.solid}' },
    warning: { value: '{colors.warning.solid}' },
    info: { value: '{colors.info.solid}' },
  },

  shadow: {
    value: { _light: '{colors.black}', _dark: '{colors.black}' },
  },

  sidebar: appearanceColors.sidebar,

  bg: {
    ...appearanceColors.bg,
    error: { value: '{colors.destructive.muted}' },
    warning: { value: '{colors.warning.muted}' },
    success: { value: '{colors.success.muted}' },
    info: { value: '{colors.info.muted}' },
    destructive: { value: '{colors.destructive.muted}' },
  },

  fg: {
    ...appearanceColors.fg,
    error: { value: '{colors.destructive.fg}' },
    warning: { value: '{colors.warning.fg}' },
    success: { value: '{colors.success.fg}' },
    info: { value: '{colors.info.fg}' },
    destructive: { value: '{colors.destructive.fg}' },
  },

  border: {
    ...appearanceColors.border,
    error: { value: '{colors.destructive.border}' },
    warning: { value: '{colors.warning.border}' },
    success: { value: '{colors.success.border}' },
    info: { value: '{colors.info.border}' },
    destructive: { value: '{colors.destructive.border}' },
  },

  interaction: appearanceColors.interaction,
  accent: appearanceColors.accent,
  info: appearanceColors.info,
  success: appearanceColors.success,
  warning: appearanceColors.warning,
  destructive: appearanceColors.destructive,
  ...createPalettes(),
})
