import { memo, splitProps } from '../helpers.js';
import { createRecipe, mergeRecipes } from './create-recipe.js';

const checkmarkFn = /* @__PURE__ */ createRecipe('checkmark', {
  "variant": "solid",
  "size": "md"
}, [])

const checkmarkVariantMap = {
  "size": [
    "xs",
    "sm",
    "md",
    "lg"
  ],
  "variant": [
    "solid",
    "outline",
    "subtle",
    "plain",
    "inverted"
  ]
}

const checkmarkVariantKeys = Object.keys(checkmarkVariantMap)

export const checkmark = /* @__PURE__ */ Object.assign(memo(checkmarkFn.recipeFn), {
  __recipe__: true,
  __name__: 'checkmark',
  __getCompoundVariantCss__: checkmarkFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: checkmarkVariantKeys,
  variantMap: checkmarkVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, checkmarkVariantKeys)
  },
  getVariantProps: checkmarkFn.getVariantProps,
})