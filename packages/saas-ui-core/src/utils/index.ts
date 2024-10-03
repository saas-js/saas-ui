export type { SplitPropsFn } from './split-props'
export { createSplitProps, splitProps } from './split-props'

export { createProps } from './create-props'

export function isHTMLElement(el: any): el is HTMLElement {
  if (!isElement(el)) return false
  const win = el.ownerDocument.defaultView ?? window
  return el instanceof win.HTMLElement
}

export function isElement(el: any): el is Element {
  return (
    el != null &&
    typeof el == 'object' &&
    'nodeType' in el &&
    el.nodeType === Node.ELEMENT_NODE
  )
}

export {
  addDomEvent,
  addPointerEvent,
  analyzeBreakpoints,
  ariaAttr,
  arrayToObjectNotation,
  breakpoints,
  callAll,
  callAllHandlers,
  clampValue,
  contains,
  countDecimalPlaces,
  cx,
  dataAttr,
  get,
  getActiveElement,
  getAllFocusable,
  getAllTabbable,
  getEventWindow,
  getFirstFocusable,
  getFirstTabbableIn,
  getLastTabbableIn,
  getNextTabbable,
  getOwnerDocument,
  getOwnerWindow,
  getPreviousTabbable,
  hasDisplayNone,
  hasFocusWithin,
  hasNegativeTabIndex,
  hasTabIndex,
  isArray,
  isCssVar,
  isCustomBreakpoint,
  isDefined,
  isEmpty,
  isEmptyArray,
  isEmptyObject,
  isFocusable,
  isFunction,
  isInputEvent,
  isMouseEvent,
  isMultiTouchEvent,
  isNotNumber,
  isNull,
  isNumber,
  isNumeric,
  isObject,
  isRefObject,
  isResponsiveObjectLike,
  isString,
  isTabbable,
  isTouchEvent,
  isUndefined,
  mapResponsive,
  memoizedGet,
  mergeWith,
  objectToArrayNotation,
  omit,
  percentToValue,
  pick,
  px,
  roundValueToStep,
  runIfFn,
  split,
  toMediaQueryString,
  toPrecision,
  valueToPercent,
  walkObject,
  warn,
  assignAfter,
  compact,
  createContext,
  getEventPoint,
  getValidChildren,
  interopDefault,
  lazyDisclosure,
} from '@chakra-ui/utils'

export type {
  AnalyzeBreakpointsReturn,
  AnyFunction,
  Dict,
  FocusableElement,
  Merge,
} from '@chakra-ui/utils'
