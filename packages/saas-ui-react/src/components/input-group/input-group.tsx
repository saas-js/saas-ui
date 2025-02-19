import { cloneElement, forwardRef, isValidElement } from 'react'

import { Group, type GroupProps } from '@chakra-ui/react/group'

import { InputElement, type InputElementProps } from '#components/input'

export interface InputGroupProps extends GroupProps {
  startElementProps?: InputElementProps
  endElementProps?: InputElementProps
  startElement?: React.ReactNode
  endElement?: React.ReactNode
  children: React.ReactNode
}

export const InputGroup = forwardRef<HTMLDivElement, InputGroupProps>(
  function InputGroup(props, ref) {
    const {
      startElement,
      startElementProps,
      endElement,
      endElementProps,
      children,
      ...rest
    } = props

    return (
      <Group ref={ref} display="flex" {...rest}>
        {startElement && (
          <InputElement pointerEvents="none" {...startElementProps}>
            {startElement}
          </InputElement>
        )}
        {isValidElement(children) &&
          cloneElement(children, {
            ...(startElement && { ps: 'calc(var(--input-height) - 6px)' }),
            ...(endElement && { pe: 'calc(var(--input-height) - 6px)' }),
            ...children.props,
          })}
        {endElement && (
          <InputElement placement="end" {...endElementProps}>
            {endElement}
          </InputElement>
        )}
      </Group>
    )
  },
)
