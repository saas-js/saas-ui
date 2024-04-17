import * as React from 'react'
import { composeStories } from '@storybook/react'

import type { ReactRenderer } from '@storybook/react'

import { render } from './render'
import { testA11y } from './accessibility'
import isFunction from 'lodash/isFunction'
import type { Store_CSFExports } from '@storybook/types'

export { composeStories } from '@storybook/react'

/**
 * Validates if all stories render and against a11y mistakes.
 * Returns the composed stories, so you can run individual tests on them.
 *
 * @example
 * ```jsx
 * import * as stories from '../stories/button.stories'
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
export function testStories<
  TModule extends Store_CSFExports<ReactRenderer, any>,
>(stories: TModule, { snapshots = true, a11y = true } = {}) {
  const _stories = Object.fromEntries(
    Object.entries(stories).map<any>((story) => {
      if (isFunction(story)) {
        return {
          render: story,
        }
      }
      return story
    })
  ) as TModule

  const composedStories = composeStories<TModule>(_stories)

  const testCases = Object.values<any>(composedStories).map((Story) => [
    Story.storyName,
    Story,
  ])

  // Batch snapshot testing
  if (snapshots) {
    test.each(testCases)('Renders %s story', async (_storyName, Story) => {
      const tree = await render(<Story />)
      expect(tree.baseElement).not.toBeNull()
    })
  }

  // Batch a11y testing
  if (a11y) {
    test.each(testCases)('Story %s passes a11y', async (_storyName, Story) => {
      await testA11y(<Story />)
    })
  }

  return composedStories
}
