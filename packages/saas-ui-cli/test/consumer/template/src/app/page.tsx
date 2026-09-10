import { Sidebar } from '@/design-system/sidebar'

export default function Page() {
  return (
    <Sidebar.Provider defaultOpen>
      <Sidebar.Root>
        <Sidebar.Header>Registry consumer</Sidebar.Header>
        <Sidebar.Body>Provider and Sidebar build together.</Sidebar.Body>
      </Sidebar.Root>
    </Sidebar.Provider>
  )
}
