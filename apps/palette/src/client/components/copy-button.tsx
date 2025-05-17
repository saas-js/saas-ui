import {
  type ButtonProps,
  IconButton,
  Tooltip,
  useClipboard,
} from '@saas-ui/react'
import { FiCheck, FiCopy } from 'react-icons/fi'

interface CopyButtonProps extends ButtonProps {
  code: string
}

function CopyButton({ code, ...props }: CopyButtonProps) {
  const { copied, copy } = useClipboard({
    value: code,
  })

  const label = copied ? 'Copied' : 'Copy'

  return (
    <Tooltip content={label}>
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
        onClick={copy}
      >
        {copied ? <FiCheck /> : <FiCopy />}
      </IconButton>
    </Tooltip>
  )
}

export default CopyButton
