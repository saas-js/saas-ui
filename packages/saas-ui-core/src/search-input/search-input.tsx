import * as React from 'react'

import {
  forwardRef,
  InputGroup,
  Input,
  InputLeftElement,
  InputRightElement,
  IconButton,
  InputProps,
  ThemingProps,
  useMultiStyleConfig,
  useControllableState,
  useMergeRefs,
} from '@chakra-ui/react'
import { callAllHandlers } from '@chakra-ui/utils'
import { SearchIcon, CloseIcon } from '../icons'

export interface SearchInputProps
  extends ThemingProps<'SuiSearchInput'>,
    Omit<InputProps, 'size' | 'variant'> {
  /**
   * The placeholder text for the input
   * @type string
   * @default Search
   */
  placeholder?: string
  /**
   * The icon to render before the input text
   * @type React.ReactElement
   */
  icon?: React.ReactElement
  /**
   * The icon to render in the reset button
   * @type React.ReactElement
   */
  resetIcon?: React.ReactElement
  /**
   * Right element rendered when the value is empty
   * @type React.ReactElement
   */
  rightElement?: React.ReactElement
  /**
   * Callback to trigger when the reset button is clicked or escape key is pressed
   */
  onReset?: () => void
}

export const SearchInput = forwardRef<SearchInputProps, 'input'>(
  (props, ref) => {
    const {
      placeholder = 'Search',
      value: valueProp,
      defaultValue: defaultValueProp,
      size,
      variant,
      width,
      icon,
      resetIcon,
      rightElement,
      onChange: onChangeProp,
      onReset: onResetProp,
      onKeyDown: onKeyDownProp,
      ...inputProps
    } = props
    const styles = useMultiStyleConfig('SuiSearchInput', props)

    const inputRef = React.useRef<HTMLInputElement>(null)

    const [value, setValue] = useControllableState({
      value: valueProp,
      defaultValue: defaultValueProp,
    })

    const onChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
      },
      [setValue]
    )

    const onKeyDown = React.useCallback(
      (event: React.KeyboardEvent) => {
        if (event.key === 'Escape') {
          setValue('')
          onReset()
        }
      },
      [onResetProp, setValue]
    )

    const onReset = () => {
      setValue('')
      onResetProp?.()
      inputRef.current?.focus()
    }

    const btnSize = size === 'lg' ? 'sm' : 'xs'

    return (
      <InputGroup size={size} width={width}>
        <InputLeftElement>{icon || <SearchIcon />}</InputLeftElement>
        <Input
          type="text"
          placeholder={placeholder}
          size={size}
          value={value}
          ref={useMergeRefs(ref, inputRef)}
          sx={styles.input}
          onChange={callAllHandlers(onChange, onChangeProp)}
          onKeyDown={callAllHandlers(onKeyDown, onKeyDownProp)}
          {...inputProps}
        />
        <InputRightElement>
          {value ? (
            <IconButton
              onClick={onReset}
              size={btnSize}
              variant="ghost"
              aria-label="Reset search"
              icon={resetIcon || <CloseIcon />}
              sx={styles.reset}
            />
          ) : (
            rightElement
          )}
        </InputRightElement>
      </InputGroup>
    )
  }
)

SearchInput.displayName = 'SearchInput'
