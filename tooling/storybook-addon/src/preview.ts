import type { ProjectAnnotations, Renderer } from 'storybook/internal/types'

import { ChakraProviderDecorator } from './ChakraProviderDecorator'

const preview: ProjectAnnotations<Renderer> = {
  decorators: [ChakraProviderDecorator],
}

export default preview
