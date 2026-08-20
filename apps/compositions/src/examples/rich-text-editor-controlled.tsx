'use client'

import { useState } from 'react'

import { Box, Stack } from '@chakra-ui/react'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Control, RichTextEditor } from 'compositions/ui/rich-text-editor'

export const RichTextEditorControlled = () => {
  const [content, setContent] = useState<string>('<p>Edit here...</p>')

  const editor = useEditor({
    shouldRerenderOnTransaction: true,
    immediatelyRender: false,
    extensions: [StarterKit.configure({ link: { openOnClick: false } })],
    content,
    onUpdate({ editor }) {
      setContent(editor.getHTML())
    },
  })

  if (!editor) return null

  return (
    <Stack maxW="3xl">
      <RichTextEditor.Root editor={editor} maxHeight="2xl">
        <RichTextEditor.Toolbar>
          <RichTextEditor.ControlGroup>
            <Control.Bold />
            <Control.Italic />
            <Control.Underline />
            <Control.Strikethrough />
            <Control.Code />
          </RichTextEditor.ControlGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor.Root>

      <Box p="4" bg="bg.muted" flex="1" rounded="l2">
        <Box
          as="pre"
          textStyle="sm"
          wordWrap="break-word"
          whiteSpace="pre-wrap"
        >
          {content}
        </Box>
      </Box>
    </Stack>
  )
}
