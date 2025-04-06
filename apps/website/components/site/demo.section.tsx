'use client'

import { Container, Tabs } from '@chakra-ui/react'
import { ErrorBoundary } from 'next/dist/client/components/error-boundary'
import dynamic from 'next/dynamic'

const ComponentsDemo = dynamic(
  () =>
    import('@/components/site/demo/components-demo').then(
      (mod) => mod.ComponentsDemo,
    ),
  {
    ssr: false,
  },
)

const CRMDemo = dynamic(
  () => import('@/components/site/demo/crm-demo').then((mod) => mod.CRMDemo),
  {
    ssr: false,
  },
)

const EmailDemo = dynamic(
  () =>
    import('@/components/site/demo/email-demo').then((mod) => mod.EmailDemo),
  {
    ssr: false,
  },
)

export const DemoSection = () => {
  return (
    <Container maxW="8xl">
      <Tabs.Root defaultValue="components" lazyMount>
        <Tabs.List mb="4">
          <Tabs.Trigger value="components">Components</Tabs.Trigger>
          <Tabs.Trigger value="crm">CRM</Tabs.Trigger>
          <Tabs.Trigger value="email">Email</Tabs.Trigger>
          <Tabs.Trigger value="billing">Billing</Tabs.Trigger>
        </Tabs.List>

        <Tabs.ContentGroup>
          <Tabs.Content value="components" height="768px">
            <ErrorBoundary errorComponent={ErrorFallback}>
              <ComponentsDemo />
            </ErrorBoundary>
          </Tabs.Content>
          <TabContentEnclosed value="crm">
            <ErrorBoundary errorComponent={ErrorFallback}>
              <CRMDemo />
            </ErrorBoundary>
          </TabContentEnclosed>
          <TabContentEnclosed value="email">
            <ErrorBoundary errorComponent={ErrorFallback}>
              <EmailDemo />
            </ErrorBoundary>
          </TabContentEnclosed>
        </Tabs.ContentGroup>
      </Tabs.Root>
    </Container>
  )
}

function TabContentEnclosed(props: Tabs.ContentProps) {
  return (
    <Tabs.Content
      {...props}
      borderRadius="md"
      borderWidth="1px"
      height="768px"
      overflow="clip"
      position="relative"
      p="0"
    >
      <ErrorBoundary errorComponent={ErrorFallback}>
        {props.children}
      </ErrorBoundary>
    </Tabs.Content>
  )
}

function ErrorFallback(props: { error: Error }) {
  console.error(props.error)
  return <div>Error</div>
}
