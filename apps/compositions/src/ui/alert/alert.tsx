'use client'

import { forwardRef } from 'react'

import { Alert as AlertPrimitive } from '@chakra-ui/react/alert'

import { CloseButton } from '../close-button/index'

export interface AlertProps extends Omit<AlertPrimitive.RootProps, 'title'> {
  startElement?: React.ReactNode
  endElement?: React.ReactNode
  title?: React.ReactNode
  icon?: React.ReactElement
  closable?: boolean
  onClose?: () => void
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    const {
      title,
      children,
      icon,
      closable,
      onClose,
      startElement,
      endElement,
      ...rest
    } = props
    return (
      <AlertPrimitive.Root ref={ref} {...rest}>
        {startElement || (
          <AlertPrimitive.Indicator>{icon}</AlertPrimitive.Indicator>
        )}
        {children ? (
          <AlertPrimitive.Content>
            <AlertPrimitive.Title>{title}</AlertPrimitive.Title>
            <AlertPrimitive.Description>{children}</AlertPrimitive.Description>
          </AlertPrimitive.Content>
        ) : (
          <AlertPrimitive.Title flex="1">{title}</AlertPrimitive.Title>
        )}
        {endElement}
        {closable && (
          <CloseButton
            size="sm"
            pos="relative"
            top="-2"
            insetEnd="-2"
            alignSelf="flex-start"
            onClick={onClose}
          />
        )}
      </AlertPrimitive.Root>
    )
  },
)
