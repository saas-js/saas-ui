import React from 'react'

import { IconButton, type IconButtonProps, Tooltip } from '@chakra-ui/react'
import { FiCheck, FiCopy } from 'react-icons/fi'

interface CopyButtonProps extends Omit<IconButtonProps, 'aria-label'> {
  code: string
}

function CopyButton({ code, ...props }: CopyButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false)
  const onCopy = async () => {
    await navigator.clipboard.writeText(code)
    setHasCopied(true)
    window.setTimeout(() => setHasCopied(false), 1500)
  }

  const label = hasCopied ? 'Copied' : 'Copy'

  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <IconButton
          size="sm"
          position="absolute"
          color="white"
          fontSize="sm"
          height="24px"
          top={0}
          zIndex="1"
          right="1.25em"
          variant="ghost"
          _hover={{ bg: 'none' }}
          {...props}
          aria-label="copy"
          onClick={() => void onCopy()}
        >
          {hasCopied ? <FiCheck /> : <FiCopy />}
        </IconButton>
      </Tooltip.Trigger>
      <Tooltip.Positioner>
        <Tooltip.Content>{label}</Tooltip.Content>
      </Tooltip.Positioner>
    </Tooltip.Root>
  )
}

export default CopyButton
