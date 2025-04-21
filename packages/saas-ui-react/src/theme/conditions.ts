import { defineConditions } from '@chakra-ui/react'

export const conditions = defineConditions({
  collapsible: '&:is([data-scope=collapsible])',
  groupCollapsible:
    '.group:is([data-scope=collapsible]) &, [role=group]:is([data-scope=collapsible]) &',
  groupOpen:
    '.group:is([data-state=open]) &, [role=group]:is([data-state=open]) &',
  groupFocus:
    '.group:is(:focus, [data-focus]) &, [role=group]:is(:focus, [data-focus]) &',
  groupHover:
    '.group:is(:hover, [data-hover]):not(:disabled, [data-disabled]) &, [role=group]:is(:hover, [data-hover]):not(:disabled, [data-disabled]) &',
  groupActive:
    '.group:is(:active, [data-active]):not(:disabled, [data-disabled]) &, [role=group]:is(:active, [data-active]):not(:disabled, [data-disabled]) &',
  groupFocusWithin: '.group:focus-within &, [role=group]:focus-within &',
  groupFocusVisible:
    '.group:is(:focus-visible, [data-focus-visible]) &, [role=group]:is(:focus-visible, [data-focus-visible]) &',
  groupDisabled:
    '.group:is(:disabled, [disabled], [data-disabled]) &, [role=group]:is(:disabled, [disabled], [data-disabled]) &',
  groupChecked:
    '.group:is(:checked, [data-checked], [aria-checked=true], [data-state=checked]) &, [role=group]:is(:checked, [data-checked], [aria-checked=true], [data-state=checked]) &',
  groupExpanded:
    '.group:is([aria-expanded=true], [data-expanded], [data-state=expanded]) &, [role=group]:is([aria-expanded=true], [data-expanded], [data-state=expanded]) &',
  groupInvalid: '.group:invalid &, [role=group]:invalid &',
  parentHover: 'button:hover &, a:hover &, [role=button]:hover &',
  pressable: '&:is(a, button, [role=button])',
  popupExpanded:
    '&:is([aria-haspopup][aria-expanded=true], [aria-haspopup][data-expanded], [aria-haspopup][data-state=expanded])',
  rowHover: 'tr:hover &, [role=row]:hover &',
})
