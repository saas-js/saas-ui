import Frame from 'react-frame-component'
import { FrameProvider } from './frame-provider'
import { useEffect, useState } from 'react'

export const ChakraFrame = (props) => {
  const [frameHeight, setFrameHeight] = useState<string | undefined>()

  const [frameRef, setFrameRef] = useState<HTMLIFrameElement | null>(null)

  const [isResizing, setResizing] = useState(false)

  useEffect(() => {
    if (frameRef) {
      setInterval(() => {
        const height = frameRef.contentWindow?.document.body.scrollHeight ?? 240
        setFrameHeight(height + 'px')
      }, 500)
    }
  }, [frameRef])

  return (
    <Frame ref={(ref) => setFrameRef(ref)} width="100%" height="100%">
      <FrameProvider>{props.children}</FrameProvider>
    </Frame>
  )
}
