import { isObject } from '@chakra-ui/utils'

import { InlineCode } from '@/docs/components/mdx-components/inline-code'

/**
 * Replace the code blocks wrapped in backticks
 * with inline code blocks.
 */

function toInlineCode(input: string) {
  return input
    .split(/(`\w+`)/)
    .map((chunk) =>
      chunk.startsWith('`') && chunk.endsWith('`') ? (
        <InlineCode key={chunk}>{chunk.slice(1, -1)}</InlineCode>
      ) : (
        chunk
      )
    )
}

export function convertBackticksToInlineCode(input?: string | JSX.Element) {
  if (!input) return ''
  return isObject(input) ? input : toInlineCode(input)
}
