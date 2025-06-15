import * as React from 'react'

import {
  HTMLChakraProps,
  type SlotRecipeProps,
  chakra,
  useSlotRecipe,
} from '@chakra-ui/react'
import { cx, dataAttr } from '@saas-ui/core/utils'
import { useNProgress } from '@tanem/react-nprogress'

import { nprogressSlotRecipe } from './nprogress.recipe.ts'

interface NProgressOptions {
  /**
   * Set to true to start the progress animation.
   */
  isAnimating: boolean
}

export interface NProgressProps
  extends NProgressOptions,
    HTMLChakraProps<'div'>,
    SlotRecipeProps<'nprogress'> {}
/**
 * Show feedback when switching pages and content is loading in the background.
 *
 * @see Docs https://saas-ui.dev/docs/components/feedback/nprogress
 */
export const NProgress = React.forwardRef<HTMLDivElement, NProgressProps>(
  (props, ref) => {
    const { isAnimating, colorPalette = 'accent', ...rest } = props

    const recipe = useSlotRecipe({
      key: 'nprogress',
      recipe: nprogressSlotRecipe,
    })

    const [variantProps, restProps] = recipe.splitVariantProps({
      colorPalette,
      ...rest,
    })

    const styles = recipe(variantProps)

    const { animationDuration, isFinished, progress } = useNProgress({
      isAnimating,
    })

    return (
      <chakra.div
        ref={ref}
        data-finished={dataAttr(isFinished)}
        {...restProps}
        className={cx('sui-nprogress', props.className)}
        css={[styles.root, props.css]}
        style={
          {
            '--nprogress-duration': `${animationDuration}ms`,
            '--nprogress-offset': `${(-1 + progress) * 100}%`,
            ...props.style,
          } as React.CSSProperties
        }
      >
        <chakra.div css={styles.bar}></chakra.div>
      </chakra.div>
    )
  },
)

NProgress.displayName = 'NProgress'
