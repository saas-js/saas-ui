import * as React from 'react'

import { render, testStories } from '@saas-ui/test-utils'
import * as stories from '../stories/data-table.stories'

const { TableInstanceRef, ...rest } = stories

const { Sortable, Selectable, InitialSelected } = testStories<typeof rest>(rest)

test('should sort', async () => {
  const { getByText, getByLabelText, user } = render(<Sortable />)

  const name = getByText('Name')

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
  const onChange = jest.fn()
  const { getByText, user } = render(<Sortable onSortChange={onChange} />)

  const name = getByText('Name')

  await user.click(name)

  expect(onChange).toBeCalled()
})

test('should select all rows', async () => {
  const { getByText, getByTitle, getAllByTitle, user } = render(<Selectable />)

  const select = getByTitle('Toggle All Rows Selected')

  await user.click(select)

  const selected = getAllByTitle('Toggle Row Selected')

  expect(selected).toHaveLength(5)

  for (const s of selected) {
    expect(s).toHaveAttribute('data-checked')
  }
})

test('should select all rows', async () => {
  const { getAllByTitle } = render(<InitialSelected />)

  const selected = getAllByTitle('Toggle Row Selected')

  expect(selected[1]).toHaveAttribute('data-checked')
})

test('onSelectedRowsChange should trigger', async () => {
  const onChange = jest.fn()
  const { getByTitle, user } = render(
    <Selectable onSelectedRowsChange={onChange} />
  )

  const select = getByTitle('Toggle All Rows Selected')

  await user.click(select)

  expect(onChange).toBeCalled()
})
