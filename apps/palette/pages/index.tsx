import { useMemo } from 'react'
import { HStack } from '@chakra-ui/react'

import Layout from '@/components/layout'
import Page from '@/components/page'

import { Preview } from '@/components/preview'
import { EditorProvider, useEditor, UseEditorReturn } from '@/providers/editor'
import PaletteConfiguration from '@/components/configuration'

export default function ColorsPage() {
  const [state, setState] = useEditor()

  const ctx = useMemo<UseEditorReturn>(
    () => [state, setState],
    [state, setState]
  )

  return (
    <EditorProvider value={ctx}>
      <Layout>
        <HStack alignItems="flex-start">
          <Page
            title="Color palette generator"
            description="Quickly generate custom Chakra UI color palettes."
          >
            <Preview />
          </Page>
          <PaletteConfiguration />
        </HStack>
      </Layout>
    </EditorProvider>
  )
}
