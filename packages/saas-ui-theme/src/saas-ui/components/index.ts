// Chakra UI Components
import { alertTheme } from './alert'
import { buttonTheme } from './button'
import { cardTheme } from './card'
import { checkboxTheme } from './checkbox'
import { closeButtonTheme } from './close-button'
import {
  inputTheme,
  pinInputTheme,
  formLabelTheme,
  numberInputTheme,
  nativeSelectTheme,
  textareaTheme,
} from './form'
import { selectTheme } from './select'
import { headingTheme } from './heading'
import { kbdTheme } from './kbd'
import { menuTheme } from './menu'
import { modalTheme } from './modal'
import { progressTheme } from './progress'
import { radioTheme } from './radio'
import { sliderTheme } from './slider'
import { switchTheme } from './switch'
import { tooltipTheme } from './tooltip'

export { alertTheme as Alert } from './alert'
export { buttonTheme as Button } from './button'
export { cardTheme as Card } from './card'
export { checkboxTheme as Checkbox } from './checkbox'
export { closeButtonTheme as CloseButton } from './close-button'
export {
  inputTheme as Input,
  pinInputTheme as PinInput,
  formLabelTheme as FormLabel,
  numberInputTheme as NumberInput,
  nativeSelectTheme as Select,
  textareaTheme as Textarea,
} from './form'
export { selectTheme as SuiSelect } from './select'
export { headingTheme as Heading } from './heading'
export { kbdTheme as Kbd } from './kbd'
export { menuTheme as Menu } from './menu'
export { modalTheme as Modal } from './modal'
export { progressTheme as Progress } from './progress'
export { radioTheme as Radio } from './radio'
export { sliderTheme as Slider } from './slider'
export { switchTheme as Switch } from './switch'
import { stepperTheme } from './stepper'
export { tooltipTheme as Tooltip } from './tooltip'

// SaaS UI Components
import { emptyStateTheme } from './empty-state'
import { nprogressTheme } from './nprogress'
import { propertyTheme } from './property'

export { emptyStateTheme as SuiEmptyState } from './empty-state'
export { nprogressTheme as SuiNProgress } from './nprogress'
export { propertyTheme as SuiProperty } from './property'
export { stepperTheme as SuiStepper } from './stepper'

export const components = {
  Alert: alertTheme,
  Button: buttonTheme,
  Card: cardTheme,
  Checkbox: checkboxTheme,
  CloseButton: closeButtonTheme,
  Heading: headingTheme,
  Kbd: kbdTheme,
  Menu: menuTheme,
  Modal: modalTheme,
  Progress: progressTheme,
  Radio: radioTheme,
  Slider: sliderTheme,
  Switch: switchTheme,
  Stepper: stepperTheme,
  Tooltip: tooltipTheme,
  Input: inputTheme,
  PinInput: pinInputTheme,
  FormLabel: formLabelTheme,
  NumberInput: numberInputTheme,
  Select: nativeSelectTheme,
  Textarea: textareaTheme,
  SuiEmptyState: emptyStateTheme,
  SuiNProgress: nprogressTheme,
  SuiProperty: propertyTheme,
  SuiSelect: selectTheme,
}
