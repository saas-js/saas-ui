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
  SystemStyleObject,
} from '@chakra-ui/react'
import { __DEV__ } from '@chakra-ui/utils'
import { SearchIcon, CloseIcon } from '@chakra-ui/icons'

export interface SearchInputProps
  extends ThemingProps<'SearchInput'>,
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
      value,
      size,
      variant,
      icon,
      resetIcon,
      rightElement,
      onReset,
      ...inputProps
    } = props
    const styles = useMultiStyleConfig('SearchInput', props)

    const onKeyDown = React.useCallback(
      (event: React.KeyboardEvent) => {
        if (event.key === 'Escape' && onReset) {
          onReset()
        }
      },
      [onReset]
    )

    const btnSize = size === 'lg' ? 'sm' : 'xs'

    return (
      <InputGroup size={size}>
        <InputLeftElement>{icon || <SearchIcon />}</InputLeftElement>
        <Input
          type="text"
          size={size}
          value={value}
          ref={ref}
          sx={styles.input}
          onKeyDown={onKeyDown}
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

SearchInput.defaultProps = {
  placeholder: 'Search',
}

if (__DEV__) {
  SearchInput.displayName = 'SearchInput'
}
