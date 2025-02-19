import { forwardRef } from 'react'

import { NumberInput as ChakraNumberInput } from '@chakra-ui/react/number-input'

import { InputGroup } from '#components/input-group/index.ts'

export interface NumberInputProps
  extends Omit<ChakraNumberInput.RootProps, 'children'> {
  rootRef?: React.Ref<HTMLDivElement>
  hideControls?: boolean
  startElement?: React.ReactNode
  endElement?: React.ReactNode
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  function NumberInput(props, ref) {
    const {
      hideControls,
      startElement,
      endElement,
      inputProps,
      rootRef,
      ...rest
    } = props
    return (
      <ChakraNumberInput.Root ref={rootRef} {...rest}>
        <InputGroup
          startElement={startElement}
          endElement={endElement}
          width="full"
        >
          <ChakraNumberInput.Input ref={ref} {...inputProps} />
        </InputGroup>

        {!hideControls && !endElement ? (
          <ChakraNumberInput.Control>
            <ChakraNumberInput.IncrementTrigger />
            <ChakraNumberInput.DecrementTrigger />
          </ChakraNumberInput.Control>
        ) : null}
      </ChakraNumberInput.Root>
    )
  },
)
