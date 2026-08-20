import { floatingPanelAnatomy } from '@chakra-ui/react/anatomy'
import { defineSlotRecipe } from '@chakra-ui/react/styled-system'

export const floatingPanelSlotRecipe = defineSlotRecipe({
  slots: floatingPanelAnatomy.keys(),
  className: 'chakra-floating-panel',
  base: {
    positioner: {
      '--floating-panel-z-index': 'zIndex.layer-4',
      zIndex: 'calc(var(--floating-panel-z-index) + var(--layer-index, 0))',
      '&:has([data-topmost])': {
        '--layer-index': '100',
      },
      '&:has([data-behind])': {
        '--layer-index': '-100',
      },
    },
    content: {
      layerStyle: 'overlay',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      outline: 0,
      position: 'relative',
      _open: {
        animationName: 'scale-in, fade-in',
        animationDuration: 'moderate',
      },
    },
    dragTrigger: {
      flex: '1',
      display: 'flex',
      alignItems: 'center',
      gap: '2',
      minW: '0',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: '2',
      px: '3',
      py: '2',
      borderBottomWidth: '1px',
      bg: 'bg.subtle',
      flex: 'none',
    },
    title: {
      fontWeight: 'medium',
      textStyle: 'sm',
      flex: '1',
      truncate: true,
    },
    body: {
      flex: '1',
      overflow: 'auto',
      p: '3',
      textStyle: 'sm',
    },
    resizeTrigger: {
      zIndex: '1',
      '--size': 'sizes.2.5',
      '&[data-axis="n"], &[data-axis="s"]': {
        h: 'var(--size)',
      },
      '&[data-axis="e"], &[data-axis="w"]': {
        w: 'var(--size)',
      },
      '&[data-axis]:is([data-axis="ne"], [data-axis="nw"], [data-axis="se"], [data-axis="sw"])':
        {
          w: 'var(--size)',
          h: 'var(--size)',
        },
    },
  },
})
