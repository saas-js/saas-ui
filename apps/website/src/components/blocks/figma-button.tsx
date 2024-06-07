import { FaFigma } from 'react-icons/fa'
import { ButtonLink } from '../link'
import { trackEvent } from '@/utils/track-event'

export const FigmaButton = () => {
  return (
    <ButtonLink
      variant="ghost"
      size="sm"
      leftIcon={<FaFigma />}
      target="_blank"
      onClick={() => trackEvent('Figma Blocks', { location: 'Blocks page' })}
      href="https://www.figma.com/file/mbSQHYzjE0wwJP7nyE6ehZ/SaaS-UI-Blocks?type=design&node-id=0-1&mode=design&t=A3MJrCFwKBMcZkvZ-0"
    >
      View in Figma
    </ButtonLink>
  )
}
