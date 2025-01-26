import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.js';
import { createRecipe } from './create-recipe.js';

const nativeSelectDefaultVariants = {
  "size": "md",
  "variant": "outline"
}
const nativeSelectCompoundVariants = []

const nativeSelectSlotNames = [
  [
    "root",
    "native-select__root"
  ],
  [
    "field",
    "native-select__field"
  ],
  [
    "indicator",
    "native-select__indicator"
  ]
]
const nativeSelectSlotFns = /* @__PURE__ */ nativeSelectSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, nativeSelectDefaultVariants, getSlotCompoundVariant(nativeSelectCompoundVariants, slotName))])

const nativeSelectFn = memo((props = {}) => {
  return Object.fromEntries(nativeSelectSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const nativeSelectVariantKeys = [
  "variant",
  "size"
]
const getVariantProps = (variants) => ({ ...nativeSelectDefaultVariants, ...compact(variants) })

export const nativeSelect = /* @__PURE__ */ Object.assign(nativeSelectFn, {
  __recipe__: false,
  __name__: 'nativeSelect',
  raw: (props) => props,
  variantKeys: nativeSelectVariantKeys,
  variantMap: {
  "variant": [
    "outline",
    "subtle",
    "plain"
  ],
  "size": [
    "xs",
    "sm",
    "md",
    "lg",
    "xl"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, nativeSelectVariantKeys)
  },
  getVariantProps
})