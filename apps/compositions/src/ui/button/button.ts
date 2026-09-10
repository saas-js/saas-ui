import type { ForwardRefExoticComponent, RefAttributes } from 'react'

import {
  Button as ChakraButton,
  type ButtonProps as ChakraButtonProps,
} from '@chakra-ui/react/button'
import type { ButtonVariantProps } from '@saas-ui/chakra-preset/recipes/button'

type ChakraButtonPropsWithoutPresetVariants = Omit<
  ChakraButtonProps,
  keyof ButtonVariantProps
>

export interface ButtonProps
  extends ChakraButtonPropsWithoutPresetVariants, ButtonVariantProps {}

/**
 * Chakra's Button with the variants supplied by the Saas UI preset.
 *
 * The cast only replaces Chakra's generated recipe variant props. The runtime
 * component remains Chakra's ref-forwarding Button.
 */
export const Button = ChakraButton as ForwardRefExoticComponent<
  ButtonProps & RefAttributes<HTMLButtonElement>
>
