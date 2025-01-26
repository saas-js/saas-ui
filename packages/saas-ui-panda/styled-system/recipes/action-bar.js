import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.js';
import { createRecipe } from './create-recipe.js';

const actionBarDefaultVariants = {}
const actionBarCompoundVariants = []

const actionBarSlotNames = [
  [
    "positioner",
    "action-bar__positioner"
  ],
  [
    "content",
    "action-bar__content"
  ],
  [
    "separator",
    "action-bar__separator"
  ],
  [
    "selectionTrigger",
    "action-bar__selectionTrigger"
  ],
  [
    "closeTrigger",
    "action-bar__closeTrigger"
  ]
]
const actionBarSlotFns = /* @__PURE__ */ actionBarSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, actionBarDefaultVariants, getSlotCompoundVariant(actionBarCompoundVariants, slotName))])

const actionBarFn = memo((props = {}) => {
  return Object.fromEntries(actionBarSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const actionBarVariantKeys = []
const getVariantProps = (variants) => ({ ...actionBarDefaultVariants, ...compact(variants) })

export const actionBar = /* @__PURE__ */ Object.assign(actionBarFn, {
  __recipe__: false,
  __name__: 'actionBar',
  raw: (props) => props,
  variantKeys: actionBarVariantKeys,
  variantMap: {},
  splitVariantProps(props) {
    return splitProps(props, actionBarVariantKeys)
  },
  getVariantProps
})