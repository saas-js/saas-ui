import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.js';
import { createRecipe } from './create-recipe.js';

const checkboxCardDefaultVariants = {
  "size": "md",
  "variant": "outline",
  "align": "start",
  "orientation": "horizontal"
}
const checkboxCardCompoundVariants = []

const checkboxCardSlotNames = [
  [
    "root",
    "checkbox-card__root"
  ],
  [
    "control",
    "checkbox-card__control"
  ],
  [
    "label",
    "checkbox-card__label"
  ],
  [
    "description",
    "checkbox-card__description"
  ],
  [
    "addon",
    "checkbox-card__addon"
  ],
  [
    "indicator",
    "checkbox-card__indicator"
  ],
  [
    "content",
    "checkbox-card__content"
  ]
]
const checkboxCardSlotFns = /* @__PURE__ */ checkboxCardSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, checkboxCardDefaultVariants, getSlotCompoundVariant(checkboxCardCompoundVariants, slotName))])

const checkboxCardFn = memo((props = {}) => {
  return Object.fromEntries(checkboxCardSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const checkboxCardVariantKeys = [
  "size",
  "variant",
  "justify",
  "align",
  "orientation"
]
const getVariantProps = (variants) => ({ ...checkboxCardDefaultVariants, ...compact(variants) })

export const checkboxCard = /* @__PURE__ */ Object.assign(checkboxCardFn, {
  __recipe__: false,
  __name__: 'checkboxCard',
  raw: (props) => props,
  variantKeys: checkboxCardVariantKeys,
  variantMap: {
  "size": [
    "sm",
    "md",
    "lg"
  ],
  "variant": [
    "surface",
    "subtle",
    "outline",
    "solid"
  ],
  "justify": [
    "start",
    "end",
    "center"
  ],
  "align": [
    "start",
    "end",
    "center"
  ],
  "orientation": [
    "vertical",
    "horizontal"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, checkboxCardVariantKeys)
  },
  getVariantProps
})