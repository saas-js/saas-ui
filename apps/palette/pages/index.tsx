import { useMemo } from 'react'
import { HStack } from '@chakra-ui/react'

import Layout from '@/components/layout'
import Page from '@/components/page'

import { Preview } from '@/components/preview'
import { EditorProvider, useEditor, UseEditorReturn } from '@/providers/editor'
import PaletteConfiguration from '@/components/configuration'
import { Button } from '@saas-ui/react'
import { FaTwitter } from 'react-icons/fa'

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
            description="Quickly generate custom color palettes for Chakra UI."
          >
            <Preview />
          </Page>
          <PaletteConfiguration />
        </HStack>
      </Layout>
    </EditorProvider>
  )
}
