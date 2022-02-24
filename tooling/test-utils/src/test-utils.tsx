import '@testing-library/jest-dom/extend-expect'
import {
  render as rtlRender,
  RenderOptions,
  fireEvent,
  RenderResult,
} from '@testing-library/react'

import * as React from 'react'
import { toHaveNoViolations, axe } from 'jest-axe'
import { createSerializer } from '@emotion/jest'
import { RunOptions } from 'axe-core'

import { composeStories } from '@storybook/testing-react'

import type {
  StoriesWithPartialProps,
  StoryFile,
} from '@storybook/testing-react/src/types'

import { SaasProvider } from '@saas-ui/react'

export {
  act as invokeSSR,
  renderHook as renderHookSSR,
} from '@testing-library/react-hooks/server'

export type {
  RenderHookOptions as renderHookOptionsSSR,
  RenderHookResult as renderHookResultSSR,
} from '@testing-library/react-hooks/server'

expect.addSnapshotSerializer(createSerializer())
expect.extend(toHaveNoViolations)

type UI = Parameters<typeof rtlRender>[0]

// UI-less passthrough fallback to prevent using conditional logic in render
function ChildrenPassthrough({ children }: { children: React.ReactElement }) {
  return children
}

export interface TestOptions extends Omit<RenderOptions, 'wrapper'> {
  /**
   * optional additional wrapper, e.g. Context
   *
   * @example
   * ```ts
   * // single wrapper
   * render(<MyConponent />, {
   *  wrapper: MyContext
   * });
   *
   * // multiple wrapper
   * render(<MyConponent />, {
   *  wrapper: ({ children }) => (
   *    <ContextA>
   *      <ContextB>
   *        {children}
   *      <ContextB />
   *    <ContextA />
   *  )
   * });
   *
   * ```
   */
  wrapper?: typeof ChildrenPassthrough
}

/**
 * Custom render for @testing-library/react
 *
 * @see https://testing-library.com/docs/react-testing-library/setup#custom-render
 * @param component the component under test
 * @param options customized test options
 */
export const render = (
  ui: UI,
  { wrapper: Wrapper = ChildrenPassthrough, ...options }: TestOptions = {}
): RenderResult =>
  rtlRender(
    <SaasProvider>
      <Wrapper>{ui}</Wrapper>
    </SaasProvider>,
    options
  )

export { rtlRender }
export { axe }

export * from '@testing-library/react'

export type {
  RenderHookOptions,
  RenderHookResult,
} from '@testing-library/react-hooks'
export { act as invoke, renderHook } from '@testing-library/react-hooks'

export { default as userEvent } from '@testing-library/user-event'

export const escape = (ui: HTMLElement) =>
  fireEvent.keyDown(ui, { key: 'Escape', keyCode: 27 })

type TestA11YOptions = TestOptions & { axeOptions?: RunOptions }

/**
 * Validates against common a11y mistakes.
 *
 * Wrapper for jest-axe
 *
 * @example
 * ```jsx
 * it('passes a11y test', async () => {
 *  await testA11Y(<MyComponent />, options);
 * });
 *
 * // sometimes we need to perform interactions first to render conditional UI
 * it('passes a11y test when open', async () => {
 *  const { container } = render(<MyComponent />, options);
 *
 *  fireEvent.click(screen.getByRole('button'));
 *
 *  await testA11Y(container, options);
 * });
 * ```
 *
 * @see https://github.com/nickcolley/jest-axe#testing-react-with-react-testing-library
 */
export const testA11y = async (
  ui: UI | Element,
  { axeOptions, ...options }: TestA11YOptions = {}
) => {
  const container = React.isValidElement(ui)
    ? render(ui, options).container
    : ui

  //@ts-expect-error
  const results = await axe(container, axeOptions)

  expect(results).toHaveNoViolations()
}

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
