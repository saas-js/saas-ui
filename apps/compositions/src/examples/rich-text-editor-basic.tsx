'use client'

import TextAlign from '@tiptap/extension-text-align'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Control, RichTextEditor } from 'compositions/ui/rich-text-editor'

export const RichTextEditorBasic = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ link: { openOnClick: false } }),
      TextAlign.configure({ types: ['paragraph', 'heading'] }),
    ],
    content: `
      <h1>Welcome to Saas UI + Tiptap!</h1>
      <p>Edit this document using the toolbar above.</p>
    `,
    shouldRerenderOnTransaction: true,
    immediatelyRender: false,
  })

  if (!editor) return null

  return (
    <RichTextEditor.Root editor={editor} maxW="3xl">
      <RichTextEditor.Toolbar>
        <RichTextEditor.ControlGroup>
          <Control.TextStyle />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <Control.Bold />
          <Control.Italic />
          <Control.Underline />
          <Control.Strikethrough />
          <Control.Code />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <Control.H1 />
          <Control.H2 />
          <Control.H3 />
          <Control.H4 />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <Control.AlignLeft />
          <Control.AlignCenter />
          <Control.AlignRight />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <Control.Undo />
          <Control.Redo />
        </RichTextEditor.ControlGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor.Root>
  )
}
