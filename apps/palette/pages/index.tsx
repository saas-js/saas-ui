import { useMemo } from 'react'
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  HStack,
  IconButton,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'

import Layout from '@/components/layout'
import Page from '@/components/page'

import { Preview } from '@/components/preview'
import { EditorProvider, useEditor, UseEditorReturn } from '@/providers/editor'
import PaletteConfiguration from '@/components/configuration'
import { FiSliders } from 'react-icons/fi'

export default function ColorsPage() {
  const [state, setState] = useEditor()

  const ctx = useMemo<UseEditorReturn>(
    () => [state, setState],
    [state, setState]
  )

  const isMobile = useBreakpointValue({ base: true, lg: false })
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure({
    defaultIsOpen: isMobile,
  })

  return (
    <EditorProvider value={ctx}>
      <Layout>
        <HStack alignItems="flex-start">
          <Page
            title="Color palette generator"
            description="Quickly generate custom color palettes for Chakra UI."
          >
            {isMobile && (
              <Button leftIcon={<FiSliders />} onClick={onToggle} mb="8">
                Configure
              </Button>
            )}
            <Preview />
          </Page>
          {isMobile ? (
            <>
              <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
                <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerBody pt="8">
                    <PaletteConfiguration />
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            </>
          ) : (
            <Box
              width="30%"
              maxW="320px"
              borderLeftWidth="1px"
              top="0"
              position="sticky"
              height="100vh"
              overflowY="auto"
              py="4"
              px="4"
            >
              <PaletteConfiguration />
            </Box>
          )}
        </HStack>
      </Layout>
    </EditorProvider>
  )
}
