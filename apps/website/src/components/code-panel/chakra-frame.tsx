import Frame from 'react-frame-component'
import { FrameProvider } from './frame-provider'
import { useEffect, useState } from 'react'
import { forwardRef } from '@chakra-ui/system'
import { Portal, useMergeRefs } from '@chakra-ui/react'
import { SaasProviderProps } from '@saas-ui/react'

export interface ChakraFrameProps extends SaasProviderProps {
  onHeightChange?(height: number): void
  frameRef?: React.Ref<HTMLIFrameElement>
}

export const ChakraFrame = (props: ChakraFrameProps) => {
  const { onHeightChange, frameRef: frameRefProp, ...rest } = props
  const [frameHeight, setFrameHeight] = useState<string | undefined>()

  const [initialized, setInitialized] = useState(false)
  const [frameRef, setFrameRef] = useState<HTMLIFrameElement | null>(null)

  const [isResizing, setResizing] = useState(false)

  useEffect(() => {
    const onMouseOut = () => {
      const closeEventName = 'chakra-ui:close-tooltip'
      if (frameRef) {
        const win = frameRef?.contentWindow?.document?.defaultView || window
        frameRef?.contentWindow?.document.dispatchEvent(
          new win.CustomEvent(closeEventName)
        )
      }
      document.dispatchEvent(new window.CustomEvent(closeEventName))
    }

    if (frameRef) {
      setTimeout(() => {
        const height = frameRef.contentWindow?.document.body.scrollHeight ?? 240
        setFrameHeight(height + 'px')

        onHeightChange?.(height)

        frameRef.contentWindow?.document.body?.addEventListener(
          'mouseout',
          onMouseOut
        )
      }, 100)
    }

    setInitialized(true)

    return () => {
      frameRef?.contentWindow?.document.body?.removeEventListener(
        'mouseout',
        onMouseOut
      )
    }
  }, [frameRef, onHeightChange])

  const mergedRefs = useMergeRefs(frameRefProp, (ref) => setFrameRef(ref))

  if (!initialized) {
    return null
  }

  return (
    <Frame ref={mergedRefs} width="100%" height="100%">
      <FrameProvider {...rest}>{props.children}</FrameProvider>
    </Frame>
  )
}
