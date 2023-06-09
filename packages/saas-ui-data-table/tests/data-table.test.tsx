import * as React from 'react'

import { render, testStories } from '@saas-ui/test-utils'
import * as stories from '../stories/data-table.stories'
import { vi } from 'vitest'

const { TableInstanceRef, ...rest } = stories

const { Sortable, Selectable, InitialSelected } = testStories<typeof rest>(rest)

test('should sort', async () => {
  const { getByText, getByLabelText, user } = render(<Sortable />)

  const name = getByText('Username')

  await user.click(name)

  const ascending = getByLabelText('sorted ascending')

  expect(ascending).toBeInTheDocument()

  await user.click(name)

  const descending = getByLabelText('sorted descending')

  expect(descending).toBeInTheDocument()

  await user.click(name)

  expect(ascending).not.toBeInTheDocument()
  expect(descending).not.toBeInTheDocument()
})

test('onSort should trigger', async () => {
  const onChange = vi.fn()
  const { getByText, user } = render(<Sortable onSortChange={onChange} />)

  const name = getByText('Username')

  await user.click(name)

  expect(onChange).toBeCalled()
})

test('should select all rows', async () => {
  const { getAllByLabelText, getByLabelText, user } = render(<Selectable />)

  const select = getByLabelText('Select all rows')

  await user.click(select)

  const selected = getAllByLabelText('Deselect row')

  expect(selected).toHaveLength(20)

  for (const s of selected) {
    expect(s).toBeChecked()
  }
})

test('should select initial', async () => {
  const { getAllByLabelText } = render(<InitialSelected />)

  const selected = getAllByLabelText('Deselect row')
  expect(selected[0]).toBeChecked()
})

test('onSelectedRowsChange should trigger', async () => {
  const onChange = vi.fn()
  const { getByLabelText, user } = render(
    <Selectable onSelectedRowsChange={onChange} />
  )

  const select = getByLabelText('Select all rows')

  await user.click(select)

  expect(onChange).toBeCalled()
})
