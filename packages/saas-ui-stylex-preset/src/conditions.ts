/**
 * Chakra condition keys (`_hover`) mapped to StyleX style keys.
 *
 * Chakra's styled-system compiles these to CSS selectors (see
 * https://github.com/chakra-ui/chakra-ui/tree/main/packages/react/src/styled-system).
 * StyleX only allows a constrained selector set, so some conditions are
 * approximated or dropped. See README for the full mapping table.
 */
export const conditions: Record<string, string | null> = {
  _hover: ':hover',
  _active: ':active',
  _focus: ':focus',
  _focusVisible: ':focus-visible',
  _focusWithin: ':focus-within',
  _disabled: ':disabled',
  _invalid: ':invalid',
  _checked: ':checked',
  _required: ':required',
  _readOnly: ':read-only',
  _placeholder: '::placeholder',
  _before: '::before',
  _after: '::after',
  _first: ':first-child',
  _last: ':last-child',
  _odd: ':nth-child(odd)',
  _even: ':nth-child(even)',
  _selection: '::selection',
  _backdrop: '::backdrop',
  _dark: '@media (prefers-color-scheme: dark)',
  _light: '@media (prefers-color-scheme: light)',
  _osDark: '@media (prefers-color-scheme: dark)',
  _osLight: '@media (prefers-color-scheme: light)',
  _motionReduce: '@media (prefers-reduced-motion: reduce)',
  _motionSafe: '@media (prefers-reduced-motion: no-preference)',
  _print: '@media print',
  _rtl: ':dir(rtl)',
  _ltr: ':dir(ltr)',
  // Saas UI / Chakra extensions that StyleX cannot express as descendants.
  _icon: null,
  _popupExpanded: null,
  _pressable: null,
  _groupHover: null,
  _groupFocus: null,
  _groupDisabled: null,
}

export function isConditionKey(key: string): boolean {
  return key.startsWith('_')
}

export function getStylexCondition(key: string): string | null | undefined {
  if (!isConditionKey(key)) {
    return undefined
  }

  if (key in conditions) {
    return conditions[key]
  }

  return null
}
