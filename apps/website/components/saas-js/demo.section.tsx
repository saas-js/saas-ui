'use client'

import { Box, Container, Tabs } from '@saas-ui/react'
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
    <Box position="relative">
      <Tabs.Root defaultValue="crm" colorPalette="accent" lazyMount>
        <Tabs.List mb="4" maxW="8xl" mx="auto">
          <Tabs.Trigger value="crm">CRM</Tabs.Trigger>
          <Tabs.Trigger value="email">Email</Tabs.Trigger>
          <Tabs.Trigger value="components">Components</Tabs.Trigger>
        </Tabs.List>

        <Tabs.ContentGroup>
          <TabContentEnclosed value="crm" maxW="8xl" mx="auto">
            <ErrorBoundary errorComponent={ErrorFallback}>
              <CRMDemo />
            </ErrorBoundary>
          </TabContentEnclosed>
          <TabContentEnclosed value="email" maxW="8xl" mx="auto">
            <ErrorBoundary errorComponent={ErrorFallback}>
              <EmailDemo />
            </ErrorBoundary>
          </TabContentEnclosed>
          <Tabs.Content value="components" height="768px" maxW="8xl" mx="auto">
            <ErrorBoundary errorComponent={ErrorFallback}>
              <ComponentsDemo />
            </ErrorBoundary>
          </Tabs.Content>
        </Tabs.ContentGroup>
      </Tabs.Root>

      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        pointerEvents="none"
        bgGradient="to-b"
        gradientFrom="transparent"
        gradientVia="transparent"
        gradientTo="bg.muted"
      />
    </Box>
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
