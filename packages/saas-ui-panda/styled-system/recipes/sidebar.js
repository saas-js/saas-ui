import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.js';
import { createRecipe } from './create-recipe.js';

const sidebarDefaultVariants = {
  "mode": "collapsible",
  "size": "md"
}
const sidebarCompoundVariants = []

const sidebarSlotNames = [
  [
    "root",
    "sui-sidebar__root"
  ],
  [
    "backdrop",
    "sui-sidebar__backdrop"
  ],
  [
    "header",
    "sui-sidebar__header"
  ],
  [
    "body",
    "sui-sidebar__body"
  ],
  [
    "footer",
    "sui-sidebar__footer"
  ],
  [
    "trigger",
    "sui-sidebar__trigger"
  ],
  [
    "flyoutTrigger",
    "sui-sidebar__flyoutTrigger"
  ],
  [
    "group",
    "sui-sidebar__group"
  ],
  [
    "groupHeader",
    "sui-sidebar__groupHeader"
  ],
  [
    "groupTitle",
    "sui-sidebar__groupTitle"
  ],
  [
    "groupEndElement",
    "sui-sidebar__groupEndElement"
  ],
  [
    "groupContent",
    "sui-sidebar__groupContent"
  ],
  [
    "track",
    "sui-sidebar__track"
  ]
]
const sidebarSlotFns = /* @__PURE__ */ sidebarSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, sidebarDefaultVariants, getSlotCompoundVariant(sidebarCompoundVariants, slotName))])

const sidebarFn = memo((props = {}) => {
  return Object.fromEntries(sidebarSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const sidebarVariantKeys = [
  "mode",
  "size"
]
const getVariantProps = (variants) => ({ ...sidebarDefaultVariants, ...compact(variants) })

export const sidebar = /* @__PURE__ */ Object.assign(sidebarFn, {
  __recipe__: false,
  __name__: 'sidebar',
  raw: (props) => props,
  variantKeys: sidebarVariantKeys,
  variantMap: {
  "mode": [
    "collapsible",
    "flyout",
    "compact"
  ],
  "size": [
    "md"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, sidebarVariantKeys)
  },
  getVariantProps
})