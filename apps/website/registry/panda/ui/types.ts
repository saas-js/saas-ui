import { ComponentPropsWithoutRef, ElementType } from 'react'

import { PolymorphicProps } from '@ark-ui/react'
import { Dict, DistributiveOmit } from '@saas-ui/panda-preset/types'
import { Assign, JsxStyleProps } from '@saas-ui/panda-preset/types'

interface HtmlProps {
  htmlSize?: number
  htmlWidth?: string | number
  htmlHeight?: string | number
  htmlTranslate?: 'yes' | 'no' | undefined
  htmlContent?: string
}

export type HtmlProp =
  | 'color'
  | 'size'
  | 'translate'
  | 'transition'
  | 'width'
  | 'height'
  | 'content'

type PatchHtmlProps<T> = DistributiveOmit<T, HtmlProp> & HtmlProps
type AssignHtmlProps<T extends Dict, P extends Dict = {}> = Assign<
  PatchHtmlProps<T>,
  P
>

export type HTMLSuiProps<
  T extends ElementType,
  P extends Dict = {},
> = AssignHtmlProps<
  ComponentPropsWithoutRef<T>,
  Assign<JsxStyleProps, P> & PolymorphicProps
>
