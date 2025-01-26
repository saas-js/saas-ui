import { memo, splitProps } from '../helpers.js';
import { createRecipe, mergeRecipes } from './create-recipe.js';

const spinnerFn = /* @__PURE__ */ createRecipe('spinner', {
  "size": "md"
}, [])

const spinnerVariantMap = {
  "size": [
    "inherit",
    "xs",
    "sm",
    "md",
    "lg",
    "xl"
  ]
}

const spinnerVariantKeys = Object.keys(spinnerVariantMap)

export const spinner = /* @__PURE__ */ Object.assign(memo(spinnerFn.recipeFn), {
  __recipe__: true,
  __name__: 'spinner',
  __getCompoundVariantCss__: spinnerFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: spinnerVariantKeys,
  variantMap: spinnerVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, spinnerVariantKeys)
  },
  getVariantProps: spinnerFn.getVariantProps,
})