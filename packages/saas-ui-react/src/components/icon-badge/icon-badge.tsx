'use client'

import * as React from 'react'
import { cloneElement, isValidElement } from 'react'

import {
  type HTMLChakraProps,
  RecipeProps,
  chakra,
  useRecipe,
} from '@chakra-ui/react/styled-system'
import { cx } from '@saas-ui/core/utils'

////////////////////////////////////////////////////////////////////////////////////

export interface IconBadgeProps
  extends HTMLChakraProps<'div'>,
    RecipeProps<'suiIconBadge'> {
  /**
   * The icon to display
   */
  icon: React.ReactNode

  /**
   * A11y: A label that describes the icon
   */
  'aria-label'?: string
}

export const IconBadge = React.forwardRef<HTMLDivElement, IconBadgeProps>(
  (props, ref) => {
    const { icon, children, ...rest } = props
    const recipe = useRecipe({ key: 'suiIconBadge', recipe: props.recipe })
    const [variantProps, localProps] = recipe.splitVariantProps(rest)
    const styles = recipe(variantProps)

    /**
     * Passing the icon as prop or children should work
     */
    const element = icon || children
    const _children = isValidElement(element)
      ? cloneElement(element as any, {
          'aria-hidden': true,
          focusable: false,
        })
      : null

    return (
      <chakra.div
        ref={ref}
        {...localProps}
        css={[styles, props.css]}
        className={cx(recipe.className, props.className)}
      >
        {_children}
      </chakra.div>
    )
  },
)
