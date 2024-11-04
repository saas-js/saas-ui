import { HTMLArkProps, ark } from '@ark-ui/react'

export type Dict = Record<string, any>

export const sui = ark

export type HTMLSystemProps<T extends keyof JSX.IntrinsicElements> =
  HTMLArkProps<T>
