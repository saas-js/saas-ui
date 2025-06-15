import { toastAnatomy } from '@chakra-ui/react/anatomy'
import { defineSlotRecipe } from '@chakra-ui/react/styled-system'

export const toastSlotRecipe = defineSlotRecipe({
  slots: toastAnatomy.keys(),
  className: 'chakra-toast',
  base: {
    root: {
      width: 'full',
      display: 'flex',
      alignItems: 'flex-start',
      position: 'relative',
      gap: '2',
      py: '3',
      ps: '3',
      pe: '6',
      borderRadius: 'md',
      borderWidth: '1px',
      translate: 'var(--x) var(--y)',
      scale: 'var(--scale)',
      zIndex: 'var(--z-index)',
      height: 'var(--height, var(--toast-height))',
      opacity: 'var(--opacity)',
      willChange: 'translate, opacity, scale, height',
      transition:
        'translate 400ms, scale 400ms, opacity 400ms, height 200ms, box-shadow 200ms',
      transitionTimingFunction: 'bounce-in',
      _closed: {
        transition: 'translate 400ms, scale 400ms, height 200ms, opacity 200ms',
        transitionTimingFunction: 'bounce-out',
      },

      bg: 'bg.panel',
      color: 'fg',
      boxShadow: 'lg',
      overflow: 'hidden',
      '--toast-indicated-color': 'colors.fg.muted',
      '&[data-type=warning]': {
        '--toast-indicated-color': 'colors.fg.warning',
      },
      '&[data-type=success]': {
        '--toast-indicated-color': 'colors.fg.success',
      },
      '&[data-type=error]': {
        '--toast-indicated-color': 'colors.fg.error',
      },
      '&[data-overlap]': {
        _before: {
          content: '""',
          position: 'absolute',
          inset: '0',
          maskImage: 'linear-gradient(to bottom, transparent, black 50%)',
        },
      },
    },
    title: {
      fontWeight: 'medium',
      textStyle: 'sm',
      marginEnd: '2',
    },
    description: {
      display: 'inline',
      textStyle: 'sm',
      opacity: '0.8',
    },
    indicator: {
      flexShrink: '0',
      boxSize: '5',
      color: 'var(--toast-indicated-color)',
    },
    actionTrigger: {
      cursor: 'button',
      textStyle: 'sm',
      fontWeight: 'medium',
      height: '6',
      px: '3',
      ms: '-3',
      borderRadius: 'sm',
      alignSelf: 'flex-start',
      transition: 'background 200ms',
      color: 'colorPalette.solid/80',
      _hover: {
        bg: 'bg.subtle',
        color: 'colorPalette.solid',
      },
    },
    closeTrigger: {
      position: 'absolute',
      top: '2',
      insetEnd: '2',
    },
  },
})
