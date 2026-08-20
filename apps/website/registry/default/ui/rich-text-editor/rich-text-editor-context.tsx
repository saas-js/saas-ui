'use client'

import * as React from 'react'

import type { Editor } from '@tiptap/react'

export interface RichTextEditorContextValue {
  editor: Editor | null
}

export const RichTextEditorContext =
  React.createContext<RichTextEditorContextValue | null>(null)

RichTextEditorContext.displayName = 'RichTextEditorContext'

export function useRichTextEditorContext() {
  const context = React.useContext(RichTextEditorContext)
  if (!context) {
    throw new Error(
      'useRichTextEditorContext must be used within a RichTextEditor.Root',
    )
  }
  return context
}
