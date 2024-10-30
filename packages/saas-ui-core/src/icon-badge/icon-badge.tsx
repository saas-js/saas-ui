'use client'

import * as React from 'react'
import { cloneElement, isValidElement } from 'react'

import { cx } from '@chakra-ui/utils'

import { type HTMLSystemProps, RecipeProps, sui, useRecipe } from '#system'

////////////////////////////////////////////////////////////////////////////////////

export interface IconBadgeProps
  extends HTMLSystemProps<'div'>,
    RecipeProps<'iconBadge'> {
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
    const recipe = useRecipe({ key: 'iconBadge', recipe: props.recipe })
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
      <sui.div
        ref={ref}
        {...localProps}
        css={[styles, props.css]}
        className={cx(recipe.className, props.className)}
      >
        {_children}
      </sui.div>
    )
  },
)
