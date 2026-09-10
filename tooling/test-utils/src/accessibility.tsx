import * as React from 'react'

import '@testing-library/jest-dom'
import { type RenderOptions } from '@testing-library/react'
import { type JestAxeConfigureOptions, axe, toHaveNoViolations } from 'jest-axe'

import { render } from './render'

expect.extend(toHaveNoViolations)

export async function testA11y(
  ui: React.ReactElement | HTMLElement,
  options: RenderOptions & { axeOptions?: JestAxeConfigureOptions } = {},
) {
  const { axeOptions, ...rest } = options
  const container = React.isValidElement(ui)
    ? render(ui, rest).container
    : (ui as HTMLElement)
  const results = await axe(container, axeOptions)
  expect(results).toHaveNoViolations()
}
