import { fileUploadAnatomy } from '@chakra-ui/react/anatomy'
import { defineSlotRecipe } from '@chakra-ui/react/styled-system'

export const fileUploadSlotRecipe = defineSlotRecipe({
  className: 'chakra-file-upload',
  slots: fileUploadAnatomy.keys(),
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4',
      width: '100%',
      alignItems: 'flex-start',
    },
    label: {
      fontWeight: 'medium',
      textStyle: 'sm',
    },
    dropzone: {
      background: 'bg',
      borderRadius: 'panel.md',
      borderWidth: '1px',
      borderStyle: 'dashed',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      gap: '4',
      justifyContent: 'center',
      p: '4',
      transition: 'backgrounds',
      focusVisibleRing: 'outside',
      _dragging: {
        bg: 'colorPalette.subtle',
        borderStyle: 'solid',
        borderColor: 'colorPalette.solid',
      },
    },
    dropzoneContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      gap: '4',
      textStyle: 'sm',
    },
    item: {
      textStyle: 'sm',
      animationName: 'fade-in',
      animationDuration: 'moderate',
      background: 'bg',
      borderRadius: 'panel.md',
      borderWidth: '1px',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: '3',
      px: '4',
      py: '2',
    },
    itemGroup: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '3',
    },
    itemName: {
      color: 'fg',
      fontWeight: 'medium',
      lineClamp: '1',
    },
    itemContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5',
      flex: '1',
    },
    itemSizeText: {
      color: 'fg.muted',
      textStyle: 'xs',
    },
    itemDeleteTrigger: {
      alignSelf: 'flex-start',
    },
    itemPreviewImage: {
      width: '10',
      height: '10',
      objectFit: 'scale-down',
    },
  },

  defaultVariants: {},
})
