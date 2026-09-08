'use client'

import {
  Box,
  Container,
  createTreeCollection,
  Grid,
  Heading,
  Stack,
  Tabs,
  Text,
  TreeView,
} from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { ErrorBoundary } from 'next/dist/client/components/error-boundary'
import dynamic from 'next/dynamic'
import { useEffect, useState, useSyncExternalStore } from 'react'
import { TbChevronRight, TbFile, TbFolder } from 'react-icons/tb'

import type { ProofFile } from './proof-files'

const CRMDemo = dynamic(
  () => import('@/components/site/demo/crm-demo').then((mod) => mod.CRMDemo),
  { ssr: false, loading: CRMPreviewLoading },
)

type HighlightedProofFile = ProofFile & { highlighted: string }

interface FileTreeNode {
  id: string
  name: string
  children?: FileTreeNode[]
}

type ProofTab = 'crm' | 'codebase'

const TAB_ROTATION_MS = 8000

const tabProgress = keyframes({
  from: { transform: 'scaleX(0)' },
  to: { transform: 'scaleX(1)' },
})

const desktopMediaQuery = '(min-width: 768px)'

function subscribeToDesktopViewport(onChange: () => void) {
  const media = window.matchMedia(desktopMediaQuery)
  media.addEventListener('change', onChange)
  return () => media.removeEventListener('change', onChange)
}

function getDesktopViewportSnapshot() {
  return window.matchMedia(desktopMediaQuery).matches
}

function getServerDesktopViewportSnapshot() {
  return false
}

const fileTree = createTreeCollection<FileTreeNode>({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: {
    id: 'ROOT',
    name: '',
    children: [
      {
        id: 'apps/web/src/routes/_app/$workspace/_dashboard/contacts',
        name: 'apps/web/src/routes/_app/$workspace/_dashboard/contacts',
        children: [
          {
            id: 'apps/web/src/routes/_app/$workspace/_dashboard/contacts/index.tsx',
            name: 'index.tsx',
          },
        ],
      },
      {
        id: 'packages/api/modules/contacts',
        name: 'packages/api/modules/contacts',
        children: [
          {
            id: 'packages/api/modules/contacts/contacts.router.ts',
            name: 'contacts.router.ts',
          },
          {
            id: 'packages/api/modules/contacts/contacts.schema.ts',
            name: 'contacts.schema.ts',
          },
          {
            id: 'packages/api/modules/contacts/contacts.service.ts',
            name: 'contacts.service.ts',
          },
        ],
      },
      {
        id: 'packages/db/src/contacts',
        name: 'packages/db/src/contacts',
        children: [
          {
            id: 'packages/db/src/contacts/contacts.sql.ts',
            name: 'contacts.sql.ts',
          },
        ],
      },
      {
        id: 'tests',
        name: 'tests',
        children: [{ id: 'tests/auth.spec.ts', name: 'auth.spec.ts' }],
      },
    ],
  },
})

export function ProofWorkspace(props: { files: HighlightedProofFile[] }) {
  const [activeTab, setActiveTab] = useState<ProofTab>('codebase')

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActiveTab((current) => (current === 'codebase' ? 'crm' : 'codebase'))
    }, TAB_ROTATION_MS)

    return () => window.clearTimeout(timer)
  }, [activeTab])

  return (
    <Box
      as="section"
      id="proof-workspace"
      scrollMarginTop="24"
      py={{ base: '8', md: '12' }}
      position="relative"
      isolation="isolate"
    >
      <Container maxW="8xl" position="relative" zIndex="0">
        <Stack gap={{ base: '6', md: '8' }}>
          <Tabs.Root
            value={activeTab}
            onValueChange={({ value }) => setActiveTab(value as ProofTab)}
            variant="plain"
            colorPalette="accent"
            aria-label="Product proof"
            lazyMount
          >
            <Box borderBottomWidth="1px" borderColor="border">
              <Tabs.List
                width="fit-content"
                gap="0"
                borderWidth="1px"
                borderBottomWidth="0"
                borderTopRadius="md"
                overflow="hidden"
                position="relative"
                zIndex="1"
              >
              <Tabs.Trigger
                value="crm"
                width="200px"
                flexShrink="0"
                height="auto"
                minH="16"
                px="4"
                py="3"
                alignItems="flex-start"
                justifyContent="flex-start"
                textAlign="left"
                borderRightWidth="1px"
                rounded="0"
                position="relative"
                bg="bg.muted"
                color="fg.muted"
                _hover={{ bg: 'bg.muted', color: 'fg' }}
                _selected={{
                  color: 'fg',
                  bg: 'bg.muted',
                }}
              >
                <Stack gap="0.5" align="flex-start">
                  <Text fontWeight="medium">Frontend</Text>
                  <Text fontSize="xs" fontWeight="normal" color="inherit">
                    Customizable dashboard for your SaaS
                  </Text>
                </Stack>
                {activeTab === 'crm' ? <TabProgress /> : null}
              </Tabs.Trigger>
              <Tabs.Trigger
                value="codebase"
                aria-label="Codebase"
                width="200px"
                flexShrink="0"
                height="auto"
                minH="16"
                px="4"
                py="3"
                alignItems="flex-start"
                justifyContent="flex-start"
                textAlign="left"
                rounded="0"
                position="relative"
                bg="bg.muted"
                color="fg.muted"
                _hover={{ bg: 'bg.muted', color: 'fg' }}
                _selected={{
                  color: 'fg',
                  bg: 'bg.muted',
                }}
              >
                <Stack gap="0.5" align="flex-start">
                  <Text fontWeight="medium">Codebase</Text>
                  <Text fontSize="xs" fontWeight="normal" color="inherit">
                    Solid foundations for developers and agents
                  </Text>
                </Stack>
                {activeTab === 'codebase' ? <TabProgress /> : null}
              </Tabs.Trigger>
              </Tabs.List>
            </Box>

            <Tabs.ContentGroup
              height={{ base: '620px', md: '680px' }}
              position="relative"
              borderWidth="1px"
              borderTopWidth="0"
              borderColor="border"
              borderBottomRadius="lg"
              overflow="hidden"
              bg="bg"
            >
              <Tabs.Content
                value="crm"
                position="absolute"
                inset="0"
                height="full"
                p="0"
                mt="0"
              >
                <CRMPreview />
              </Tabs.Content>
              <Tabs.Content
                value="codebase"
                position="absolute"
                inset="0"
                height="full"
                p="0"
                mt="0"
              >
                <CodebaseExplorer files={props.files} />
              </Tabs.Content>
            </Tabs.ContentGroup>
          </Tabs.Root>
        </Stack>
      </Container>
      <Box
        position="absolute"
        insetInline="0"
        bottom="0"
        height={{ base: '62%', md: '58%' }}
        zIndex="1"
        pointerEvents="none"
        bgGradient="to-b"
        gradientFrom="transparent"
        gradientTo="bg.muted"
      />
    </Box>
  )
}

function TabProgress() {
  return (
    <Box
      position="absolute"
      insetInline="0"
      bottom="-1px"
      height="2px"
      bg="fg"
      transformOrigin="left"
      animation={`${tabProgress} ${TAB_ROTATION_MS}ms linear`}
    />
  )
}

function CRMPreview() {
  const isDesktop = useSyncExternalStore(
    subscribeToDesktopViewport,
    getDesktopViewportSnapshot,
    getServerDesktopViewportSnapshot,
  )

  if (!isDesktop) {
    return (
      <Stack
        minH="480px"
        justify="center"
        align="center"
        textAlign="center"
        px="6"
        py="16"
        bg="bg.muted"
      >
        <Heading as="h3" textStyle="2xl">
          The interactive CRM is designed for a larger canvas.
        </Heading>
        <Text color="fg.subtle" maxW="md">
          Open this tab on a tablet or desktop to use the full workspace. The
          architecture and build proof remain available on this screen.
        </Text>
      </Stack>
    )
  }

  return (
    <Box height="680px" overflow="clip" position="relative">
      <ErrorBoundary errorComponent={DemoErrorFallback}>
        <CRMDemo />
      </ErrorBoundary>
    </Box>
  )
}

function CRMPreviewLoading() {
  return (
    <Stack
      height="680px"
      justify="center"
      align="center"
      textAlign="center"
      px="6"
      bg="bg.muted"
    >
      <Text color="fg.subtle">Preparing the interactive CRM…</Text>
    </Stack>
  )
}

function DemoErrorFallback(props: { error: unknown }) {
  console.error(props.error)

  return (
    <Stack
      height="full"
      justify="center"
      align="center"
      textAlign="center"
      px="6"
    >
      <Heading as="h3" textStyle="2xl">
        The interactive CRM did not load.
      </Heading>
      <Text color="fg.subtle" maxW="md">
        Refresh the page to try again, or use the Codebase explorer to inspect
        the starter kit without the demo.
      </Text>
    </Stack>
  )
}

function CodebaseExplorer(props: { files: HighlightedProofFile[] }) {
  const [selectedPath, setSelectedPath] = useState(props.files[0]?.path ?? '')
  const selectedFile =
    props.files.find((file) => file.path === selectedPath) ?? props.files[0]

  if (!selectedFile) return null

  return (
    <Grid
      minH={{ base: '620px', md: '680px' }}
      templateColumns={{ base: 'minmax(0, 1fr)', md: '280px minmax(0, 1fr)' }}
    >
      <Box
        borderRightWidth={{ base: '0', md: '1px' }}
        borderBottomWidth={{ base: '1px', md: '0' }}
        borderColor="border"
        bg="bg.muted"
        p={{ base: '4', md: '5' }}
        maxH={{ base: '320px', md: '680px' }}
        overflowY="auto"
      >
        <TreeView.Root
          collection={fileTree}
          defaultExpandedValue={fileTree.getBranchValues()}
          selectedValue={[selectedPath]}
          onSelectionChange={({ selectedValue }) => {
            const [path] = selectedValue
            if (path && props.files.some((file) => file.path === path)) {
              setSelectedPath(path)
            }
          }}
          size="sm"
          variant="subtle"
          aria-label="Starter kit file tree"
        >
          <TreeView.Label
            fontSize="xs"
            color="fg.muted"
            fontWeight="medium"
            mb="3"
          >
            Starter kit files
          </TreeView.Label>
          <TreeView.Tree>
            {fileTree.rootNode.children?.map((node, index) => (
              <RepoTreeNode
                key={node.id}
                node={node}
                indexPath={[index]}
                onSelect={setSelectedPath}
              />
            ))}
          </TreeView.Tree>
        </TreeView.Root>
      </Box>

      <Stack gap="0" minW="0" overflow="hidden">
        <Stack
          gap="1"
          px={{ base: '4', md: '6' }}
          py="4"
          borderBottomWidth="1px"
          borderColor="border"
        >
          <Text fontFamily="mono" fontSize="xs" color="fg.muted" truncate>
            {selectedFile.path}
          </Text>
          <Text fontSize="sm" color="fg.subtle" maxW="3xl">
            {selectedFile.description}
          </Text>
          <Text fontSize="xs" color="fg.muted">
            Sanitized excerpt from the shipped starter kit.
          </Text>
        </Stack>

        <Box
          className="code-highlight"
          flex="1"
          minH="0"
          overflow="auto"
          css={{
            '& pre.shiki': {
              minHeight: '100%',
              margin: '0',
              padding: { base: '16px', md: '24px' },
              borderRadius: '0',
              overflow: 'visible',
            },
            '& code': {
              counterReset: 'line',
            },
            '& .line': {
              display: 'inline-block',
              width: '100%',
            },
            '& .line::before': {
              counterIncrement: 'line',
              content: 'counter(line)',
              display: 'inline-block',
              width: '3ch',
              marginRight: '16px',
              color: 'color-mix(in srgb, currentColor 35%, transparent)',
              textAlign: 'right',
              userSelect: 'none',
            },
          }}
          dangerouslySetInnerHTML={{ __html: selectedFile.highlighted }}
        />
      </Stack>
    </Grid>
  )
}

function RepoTreeNode(props: {
  node: FileTreeNode
  indexPath: number[]
  onSelect: (path: string) => void
}) {
  const { node, indexPath, onSelect } = props

  return (
    <TreeView.NodeProvider node={node} indexPath={indexPath}>
      {node.children ? (
        <TreeView.Branch aria-label={node.name}>
          <TreeView.BranchControl
            display="flex"
            alignItems="center"
            width="full"
            minH="9"
            px="2"
            gap="2"
            rounded="sm"
            fontFamily="mono"
            fontSize="xs"
          >
            <TreeView.BranchIndicator color="fg.muted" flexShrink="0">
              <TbChevronRight />
            </TreeView.BranchIndicator>
            <Box color="fg.muted" flexShrink="0">
              <TbFolder />
            </Box>
            <TreeView.BranchText minW="0" truncate>
              {node.name}
            </TreeView.BranchText>
          </TreeView.BranchControl>
          <TreeView.BranchContent>
            <TreeView.BranchIndentGuide />
            {node.children.map((child, index) => (
              <RepoTreeNode
                key={child.id}
                node={child}
                indexPath={[...indexPath, index]}
                onSelect={onSelect}
              />
            ))}
          </TreeView.BranchContent>
        </TreeView.Branch>
      ) : (
        <TreeView.Item
          display="flex"
          alignItems="center"
          minH="9"
          px="2"
          gap="2"
          rounded="sm"
          fontFamily="mono"
          fontSize="xs"
          aria-label={node.name}
          onClick={() => onSelect(node.id)}
          css={{
            '&[data-selected]': {
              background: 'var(--chakra-colors-bg-emphasized)',
              color: 'var(--chakra-colors-fg)',
            },
          }}
        >
          <TreeView.ItemText display="flex" alignItems="center" gap="2" minW="0">
            <Box color="fg.muted" flexShrink="0">
              <TbFile />
            </Box>
            <Text as="span" truncate>
              {node.name}
            </Text>
          </TreeView.ItemText>
        </TreeView.Item>
      )}
    </TreeView.NodeProvider>
  )
}
