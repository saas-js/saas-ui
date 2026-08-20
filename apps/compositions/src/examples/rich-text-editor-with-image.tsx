'use client'

import { useState } from 'react'

import { Box, Icon, Tabs } from '@chakra-ui/react'
import Image from '@tiptap/extension-image'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Button } from 'compositions/ui/button'
import { Dialog } from 'compositions/ui/dialog'
import { FileUpload } from 'compositions/ui/file-upload'
import { Input } from 'compositions/ui/input'
import {
  Control,
  RichTextEditor,
  useRichTextEditorContext,
} from 'compositions/ui/rich-text-editor'
import { LuImage, LuLink, LuUpload } from 'react-icons/lu'

export const RichTextEditorWithImage = () => {
  const editor = useEditor({
    content: `
      <h2>Release notes</h2>
      <img src="https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&q=80" alt="Abstract gradient" />
      <p>Drop an image straight into the document, or embed one from a URL.</p>
    `,
    extensions: [StarterKit, Image],
    shouldRerenderOnTransaction: true,
    immediatelyRender: false,
  })

  if (!editor) return null

  return (
    <RichTextEditor.Root editor={editor} maxW="3xl">
      <RichTextEditor.Toolbar>
        <RichTextEditor.ControlGroup>
          <Control.Bold />
          <Control.Italic />
          <Control.Strikethrough />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <Control.BulletList />
          <Control.OrderedList />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <InsertImageControl />
        </RichTextEditor.ControlGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor.Root>
  )
}

function InsertImageControl() {
  const { editor } = useRichTextEditorContext()
  const [open, setOpen] = useState(false)
  const [url, setUrl] = useState('')
  const [files, setFiles] = useState<File[]>([])

  if (!editor) return null

  return (
    <>
      <Control.ButtonControl
        icon={<LuImage />}
        label="Insert Image"
        variant="ghost"
        onClick={() => setOpen(true)}
      />

      <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
        <Dialog.Content maxW="lg">
          <Dialog.Header>
            <Dialog.Title>Insert Image</Dialog.Title>
          </Dialog.Header>

          <Dialog.Body>
            <Tabs.Root defaultValue="url">
              <Tabs.List>
                <Tabs.Trigger value="url">
                  <LuLink /> Embed URL
                </Tabs.Trigger>
                <Tabs.Trigger value="upload">
                  <LuUpload /> Upload File
                </Tabs.Trigger>
              </Tabs.List>

              <Tabs.Content value="url">
                <Box display="flex" gap="2" mt="4">
                  <Input
                    placeholder="Enter image URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                  <Button
                    onClick={() => {
                      if (url) {
                        editor.chain().focus().setImage({ src: url }).run()
                      }
                      setUrl('')
                      setOpen(false)
                    }}
                  >
                    Insert
                  </Button>
                </Box>
              </Tabs.Content>

              <Tabs.Content value="upload">
                <FileUpload.Root
                  alignItems="stretch"
                  maxFiles={1}
                  accept="image/*"
                  onFileAccept={(accepted) => {
                    const uploaded = accepted.files ?? []
                    setFiles(uploaded)

                    if (uploaded[0]) {
                      const objectUrl = URL.createObjectURL(uploaded[0])
                      editor.chain().focus().setImage({ src: objectUrl }).run()
                      setOpen(false)
                    }
                  }}
                >
                  <FileUpload.Dropzone mt="4">
                    <Icon size="md" color="fg.muted">
                      <LuUpload />
                    </Icon>
                    <Box>Drag and drop a file here</Box>
                    <Box color="fg.muted">.png, .jpg up to 5MB</Box>
                  </FileUpload.Dropzone>

                  <FileUpload.List files={files} />
                </FileUpload.Root>
              </Tabs.Content>
            </Tabs.Root>
          </Dialog.Body>

          <Dialog.Footer>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
    </>
  )
}
