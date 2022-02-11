import * as React from 'react'
import { Story, Meta } from '@storybook/react'

import { Container, Stack, Button } from '@chakra-ui/react'

import { DataTable, Column } from '../src'
import { TableInstance } from 'react-table'

export default {
  title: 'Components/Data Display/DataTable',
  component: DataTable,
  decorators: [
    (Story: any) => (
      <Container mt="40px" maxW="container.xl">
        <Story />
      </Container>
    ),
  ],
} as Meta

const Template: Story = ({ data, columns, initialState, ...args }) => (
  <DataTable<ExampleData>
    data={data}
    columns={columns}
    initialState={initialState}
    {...args}
  />
)

interface ExampleData {
  name: string
  phone: string
  email: string
  company: string
  country: string
  employees: number
}

const columns: Column<ExampleData>[] = [
  {
    accessor: 'name',
    Header: 'Name',
  },
  {
    accessor: 'phone',
    Header: 'Phone',
  },
  {
    accessor: 'email',
    Header: 'Email',
  },
  {
    accessor: 'company',
    Header: 'Company',
  },
  {
    accessor: 'country',
    Header: 'Country',
  },
  {
    accessor: 'employees',
    Header: 'Employees',
    isNumeric: true,
  },
]

const data = [
  {
    id: 1,
    name: 'TaShya Charles',
    phone: '(651) 467-2240',
    email: 'urna.nec.luctus@icloud.couk',
    company: 'Luctus Et Industries',
    country: 'China',
    employees: 139,
  },
  {
    id: 2,
    name: 'Donovan Mosley',
    phone: '(154) 698-4775',
    email: 'lacinia.mattis.integer@icloud.couk',
    company: 'Nunc Ullamcorper Industries',
    country: 'Sweden',
    employees: 234,
  },
  {
    id: 3,
    name: 'Quynn Moore',
    phone: '1-362-643-1030',
    email: 'ipsum.primis@aol.couk',
    company: 'Venenatis Lacus LLC',
    country: 'Italy',
    employees: 32,
  },
  {
    id: 4,
    name: 'Hashim Huff',
    phone: '(202) 481-9204',
    email: 'pede.ultrices.a@icloud.couk',
    company: 'Maecenas Ornare Incorporated',
    country: 'China',
    employees: 1322,
  },
  {
    id: 5,
    name: 'Fuller Mcleod',
    phone: '1-186-271-2202',
    email: 'auctor.velit@hotmail.com',
    company: 'Hendrerit Consectetuer Associates',
    country: 'Peru',
    employees: 4,
  },
]

const initialState = {
  hiddenColumns: ['phone', 'employees'],
}

export const Default = Template.bind({})
Default.args = {
  columns,
  data,
  initialState,
}

export const Sortable = Template.bind({})
Sortable.args = {
  columns,
  data,
  initialState,
  isSortable: true,
}

export const Selectable = Template.bind({})
Selectable.args = {
  columns,
  data,
  initialState,
  isSelectable: true,
}

export const InitialSelected = Template.bind({})
InitialSelected.args = {
  columns,
  data,
  initialState: {
    ...initialState,
    selectedRowIds: { 1: true },
  },
  isSelectable: true,
}

export const SelectedChange = Template.bind({})
SelectedChange.args = {
  columns,
  data,
  initialState,
  isSelectable: true,
  onSelectedRowsChange: (rows) => console.log(rows),
}

export const SelectableAndSortable = Template.bind({})
SelectableAndSortable.args = {
  columns,
  data,
  initialState,
  isSortable: true,
  isSelectable: true,
}

export const Numeric = Template.bind({})
Numeric.args = {
  columns,
  data,
  initialState: {
    hiddenColumns: ['phone'],
  },
}

export const WithLink = Template.bind({})
WithLink.args = {
  columns: Object.assign(columns).map((column) => {
    if (column.accessor === 'name') {
      return Object.assign({}, column, {
        href: (row) => `/customers/${row.id}`,
      })
    }
    return column
  }),
  data,
  initialState: {
    hiddenColumns: ['phone'],
  },
}

export const TableInstanceRef = () => {
  const ref = React.useRef<TableInstance<ExampleData>>(null)

  return (
    <>
      <Stack direction="row" mb="8">
        <Button onClick={() => ref.current?.toggleAllRowsSelected()}>
          Toggle select all
        </Button>
      </Stack>
      <DataTable<ExampleData>
        ref={ref}
        columns={columns}
        data={data}
        isSelectable
        isSortable
      />
    </>
  )
}
