import { ComponentProps, forwardRef } from 'react'

import { tag } from '@saas-ui/panda-preset/recipes'

import { HTMLSuiProps, createStyleContext } from '../context'
import { CloseIcon } from '../icons'

const { withProvider, withContext } = createStyleContext(tag)

const Root = withProvider<HTMLSpanElement, HTMLSuiProps<'span'>>('span', 'root')
const Label = withContext<HTMLSpanElement, HTMLSuiProps<'span'>>(
  'span',
  'label',
)
const CloseTrigger = withContext<HTMLSpanElement, HTMLSuiProps<'span'>>(
  'span',
  'closeTrigger',
  {
    defaultProps: { children: <CloseIcon /> },
  },
)
const StartElement = withContext<HTMLSpanElement, HTMLSuiProps<'span'>>(
  'span',
  'startElement',
)
const EndElement = withContext<HTMLSpanElement, HTMLSuiProps<'span'>>(
  'span',
  'endElement',
)

export interface TagProps extends ComponentProps<typeof Root> {
  startElement?: React.ReactNode
  endElement?: React.ReactNode
  onClose?: VoidFunction
  closable?: boolean
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  function Tag(props, ref) {
    const {
      startElement,
      endElement,
      onClose,
      closable = !!onClose,
      children,
      ...rest
    } = props

    return (
      <Root ref={ref} colorPalette={'gray'} {...rest}>
        {startElement && <StartElement>{startElement}</StartElement>}
        <Label>{children}</Label>
        {endElement && <EndElement>{endElement}</EndElement>}
        {closable && (
          <EndElement>
            <CloseTrigger onClick={onClose} />
          </EndElement>
        )}
      </Root>
    )
  },
)
