import { Clipboard } from '@ark-ui/react/clipboard'
import { Button, type ButtonProps } from '@saas-ui/react'
import { LuCheck, LuClipboard } from 'react-icons/lu'

interface CopyButtonProps extends ButtonProps {
  value: string
  children?: React.ReactNode
  hideIndicator?: boolean
}

export const CopyButton = (props: CopyButtonProps) => {
  const { value, children, hideIndicator, ...rest } = props
  return (
    <Clipboard.Root value={value}>
      <Clipboard.Trigger asChild>
        <Button colorPalette="gray" variant="ghost" size="sm" {...rest}>
          {children}
          {!hideIndicator && (
            <Clipboard.Indicator copied={<LuCheck />}>
              <LuClipboard />
            </Clipboard.Indicator>
          )}
        </Button>
      </Clipboard.Trigger>
    </Clipboard.Root>
  )
}
