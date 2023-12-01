import Frame from 'react-frame-component'
import { FrameProvider } from './frame-provider'
import { useEffect, useState } from 'react'

export const ChakraFrame = (props) => {
  const [frameHeight, setFrameHeight] = useState<string | undefined>()

  const [initialized, setInitialized] = useState(false)
  const [frameRef, setFrameRef] = useState<HTMLIFrameElement | null>(null)

  const [isResizing, setResizing] = useState(false)

  useEffect(() => {
    if (frameRef) {
      setTimeout(() => {
        const height = frameRef.contentWindow?.document.body.scrollHeight ?? 240
        setFrameHeight(height + 'px')

        props.onHeightChange?.(height)
      }, 100)
    }
    setInitialized(true)
  }, [frameRef])

  if (!initialized) {
    return null
  }

  return (
    <Frame ref={(ref) => setFrameRef(ref)} width="100%" height="100%">
      <FrameProvider>{props.children}</FrameProvider>
    </Frame>
  )
}
