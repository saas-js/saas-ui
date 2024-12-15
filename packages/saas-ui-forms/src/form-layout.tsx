import { forwardRef } from 'react'

import {
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
  extends RecipeProps<'suiFormLayout'>,
    SimpleGridProps {}

/**
 * Create consistent field spacing and positioning.
 *
 * Renders form items in a `SimpleGrid`
 * @see https://chakra-ui.com/docs/components/simple-grid
 *
 * @see https://saas-ui.dev/docs/components/forms/form
 */
export const FormLayout = forwardRef<HTMLDivElement, FormLayoutProps>(
  ({ children, gap = 4, ...props }, ref) => {
    const recipe = useRecipe({
      key: 'suiFormLayout',
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
            gap,
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
