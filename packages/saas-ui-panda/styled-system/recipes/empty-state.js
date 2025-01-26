import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.js';
import { createRecipe } from './create-recipe.js';

const emptyStateDefaultVariants = {
  "size": "md"
}
const emptyStateCompoundVariants = []

const emptyStateSlotNames = [
  [
    "root",
    "empty-state__root"
  ],
  [
    "content",
    "empty-state__content"
  ],
  [
    "indicator",
    "empty-state__indicator"
  ],
  [
    "title",
    "empty-state__title"
  ],
  [
    "description",
    "empty-state__description"
  ]
]
const emptyStateSlotFns = /* @__PURE__ */ emptyStateSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, emptyStateDefaultVariants, getSlotCompoundVariant(emptyStateCompoundVariants, slotName))])

const emptyStateFn = memo((props = {}) => {
  return Object.fromEntries(emptyStateSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const emptyStateVariantKeys = [
  "size"
]
const getVariantProps = (variants) => ({ ...emptyStateDefaultVariants, ...compact(variants) })

export const emptyState = /* @__PURE__ */ Object.assign(emptyStateFn, {
  __recipe__: false,
  __name__: 'emptyState',
  raw: (props) => props,
  variantKeys: emptyStateVariantKeys,
  variantMap: {
  "size": [
    "sm",
    "md",
    "lg"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, emptyStateVariantKeys)
  },
  getVariantProps
})