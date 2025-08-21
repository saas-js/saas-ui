import { ComponentPropsWithoutRef, JSX } from 'react'

import { ark } from '@ark-ui/react'

export type Dict = Record<string, any>

export const sui = ark

export interface PolymorphicProps {
  /**
   * Use the provided child element as the default rendered element, combining their props and behavior.
   */
  asChild?: boolean | undefined
}

export type HTMLProps<T extends keyof JSX.IntrinsicElements> =
  ComponentPropsWithoutRef<T>
export type HTMLSystemProps<T extends keyof JSX.IntrinsicElements> =
  HTMLProps<T> & PolymorphicProps
