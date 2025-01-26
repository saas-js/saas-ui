import { styled } from '@saas-ui/panda/jsx'
import { tag } from '@saas-ui/panda/recipes'
import { ComponentProps, forwardRef } from 'react'
import { createStyleContext } from '../context'
import { CloseIcon } from '../icons'

const { withProvider, withContext } = createStyleContext(tag)

const Root = withProvider(styled.span, 'root')
const Label = withContext(styled.span, 'label')
const CloseTrigger = withContext(
  styled(
    'span',
    {},
    {
      defaultProps: { children: <CloseIcon /> },
    }
  ),
  'closeTrigger'
)
const StartElement = withContext(styled.span, 'startElement')
const EndElement = withContext(styled.span, 'endElement')

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
  }
)
