import * as React from 'react'
import { composeStories } from '@storybook/testing-react'

import type {
  StoriesWithPartialProps,
  StoryFile,
} from '@storybook/testing-react/src/types'

import { render } from './render'
import { testA11y } from './accessibility'

/**
 * Validates if all stories render and against a11y mistakes.
 * Returns the composed stories, so you can run individual tests on them.
 *
 * @example
 * ```jsx
 * import * as stories from '../stories/button.stories)
 *
 * const { Basic } = testStories(stories)
 *
 * it('passes a11y test when open', async () => {
 *  const { container } = render(<Basic />, options);
 *
 *  fireEvent.click(screen.getByRole('button'));
 *
 *  await testA11Y(container, options);
 * });
 */
export const testStories = <T extends StoryFile = StoryFile>(stories: T) => {
  const composedStories = composeStories<T>(stories)

  const testCases = Object.values<any>(composedStories).map((Story) => [
    Story.storyName,
    Story,
  ])
  // Batch snapshot testing
  test.each(testCases)('Renders %s story', async (_storyName, Story) => {
    const tree = await render(<Story />)
    expect(tree.baseElement).not.toBeNull()
  })

  // Batch a11y testing
  test.each(testCases)('Story %s passes a11y', async (_storyName, Story) => {
    await testA11y(<Story />)
  })

  return composedStories
}
