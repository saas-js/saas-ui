'use client'

import { useEditor } from '@tiptap/react'
import { BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import { Control, RichTextEditor } from 'compositions/ui/rich-text-editor'

export const RichTextEditorWithBubbleMenu = () => {
  const editor = useEditor({
    extensions: [StarterKit.configure({ link: { openOnClick: false } })],
    content: sampleContent,
    shouldRerenderOnTransaction: true,
    immediatelyRender: false,
  })

  if (!editor) return null

  return (
    <RichTextEditor.Root editor={editor} maxW="3xl">
      <BubbleMenu editor={editor}>
        <RichTextEditor.Toolbar variant="floating">
          <RichTextEditor.ControlGroup>
            <Control.Bold />
            <Control.Italic />
            <Control.Underline />
            <Control.Strikethrough />
          </RichTextEditor.ControlGroup>

          <RichTextEditor.ControlGroup>
            <Control.Code />
            <Control.Link />
          </RichTextEditor.ControlGroup>

          <RichTextEditor.ControlGroup>
            <Control.BulletList />
            <Control.OrderedList />
          </RichTextEditor.ControlGroup>
        </RichTextEditor.Toolbar>
      </BubbleMenu>

      <RichTextEditor.Content />
    </RichTextEditor.Root>
  )
}

const sampleContent = `
  <h2>Select some text to see the bubble menu</h2>
  <p>The <strong>Bold</strong>, <em>Italic</em>, <u>Underline</u> and <s>Strikethrough</s> controls appear right above the selection.</p>
  <ul>
    <li>Try selecting text within this list item.</li>
    <li>Use the list buttons to switch between bullet and ordered lists.</li>
  </ul>
`
