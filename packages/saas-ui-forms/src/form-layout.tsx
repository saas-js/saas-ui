import { forwardRef } from 'react'

import {
  type HTMLChakraProps,
  type RecipeProps,
  SimpleGrid,
  SimpleGridProps,
  useRecipe,
} from '@chakra-ui/react'
import { cx } from '@saas-ui/core/utils'

export interface FormLayoutOptions {
  columns?: SimpleGridProps['columns']
  gap?: SimpleGridProps['gap']
}

export interface FormLayoutProps
  extends RecipeProps<'formLayout'>,
    FormLayoutOptions,
    Omit<HTMLChakraProps<'div'>, 'columns'> {}

/**
 * Create consistent field spacing and positioning.
 *
 * Renders form items in a `SimpleGrid`
 * @see https://chakra-ui.com/docs/layout/simple-grid
 *
 * @see https://saas-ui.dev/docs/components/forms/form
 */
export const FormLayout = forwardRef<HTMLDivElement, FormLayoutProps>(
  ({ children, rowGap = 4, ...props }, ref) => {
    const recipe = useRecipe({
      key: 'formLayout',
    })

    const [variantProps, gridProps] = recipe.splitVariantProps(props)

    const styles = recipe(variantProps)

    return (
      <SimpleGrid
        ref={ref}
        {...gridProps}
        className={cx('sui-form-layout', props.className)}
        css={[
          {
            rowGap,
          },
          styles,
          props.css,
        ]}
      >
        {children}
      </SimpleGrid>
    )
  },
)

FormLayout.displayName = 'FormLayout'
