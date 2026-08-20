'use client'

import * as React from 'react'

import {
  Box,
  type BoxProps,
  HStack,
  type StackProps,
  StackSeparator,
  type SystemStyleObject,
  defineStyle,
} from '@chakra-ui/react'
import { EditorContent } from '@tiptap/react'
import type { Editor } from '@tiptap/react'

import {
  RichTextEditorContext,
  useRichTextEditorContext,
} from './rich-text-editor-context.tsx'

/**
 * ProseMirror renders plain HTML into the content area, so the editor styles
 * the document from the root instead of from a recipe on every node.
 */
const proseMirrorBaseCss = defineStyle({
  display: 'flex',
  flexDirection: 'column',
  borderWidth: '1px',
  rounded: 'l2',
  lineHeight: '1.5',

  '--content-padding-x': 'spacing.5',
  '--content-padding-y': 'spacing.5',

  '& img.ProseMirror-selectednode': {
    outlineWidth: '2px',
    outlineStyle: 'solid',
    outlineColor: 'colorPalette.focusRing',
  },

  '& .ProseMirror': {
    outline: 'none',
    minHeight: 'var(--content-min-height)',
    px: 'var(--content-padding-x)',
    py: 'var(--content-padding-y)',
    '& > * + *': { marginTop: '0.75em' },
    '& h1': {
      fontSize: '2.15em',
      letterSpacing: '-0.02em',
      lineHeight: '1.2em',
    },
    '& h2': {
      fontSize: '1.65em',
      letterSpacing: '-0.02em',
      lineHeight: '1.3em',
    },
    '& h3': {
      fontSize: '1.35em',
      letterSpacing: '-0.01em',
      lineHeight: '1.4em',
    },
    '& h4': {
      fontSize: '1.15em',
      letterSpacing: '-0.01em',
      lineHeight: '1.5em',
    },
    '& h5': {
      fontSize: '1em',
      letterSpacing: '-0.01em',
      lineHeight: '1.5em',
    },
    '& h6': {
      fontSize: '0.875em',
      letterSpacing: '-0.01em',
      lineHeight: '1.5em',
    },
    '& h1, h2, h3, h4, h5, h6': {
      color: 'fg',
      fontWeight: '600',
    },
    '& code': {
      bg: 'bg.muted',
      paddingInline: '0.25em',
      rounded: 'l1',
      fontFamily: 'mono',
      fontSize: '0.9em',
      borderWidth: '1px',
    },
    '& pre': {
      bg: 'bg.inverted',
      color: 'fg.inverted',
      padding: '4',
      rounded: 'l2',
      overflowX: 'auto',
      fontSize: 'sm',
      lineHeight: '1.6',
    },
    '& pre code': {
      bg: 'transparent',
      padding: '0',
      fontFamily: 'mono',
      color: 'inherit',
      borderWidth: '0',
    },
    '& blockquote': {
      borderStartWidth: '4px',
      borderStartColor: 'border',
      paddingStart: '4',
    },
    '& ul:not([data-type="taskList"])': {
      paddingInlineStart: '1.25rem',
      listStyleType: 'disc',
    },
    '& ol:not([data-type="taskList"])': {
      paddingInlineStart: '1.25rem',
      listStyleType: 'decimal',
    },
    '& ul ul': {
      listStyleType: 'circle',
    },
    '& ul ul ul': {
      listStyleType: 'square',
    },
    '& ul[data-type="taskList"] li': {
      listStyle: 'none',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '2',
      '& input[type="checkbox"]': {
        accentColor: 'colorPalette.solid',
        marginTop: '1',
      },
    },
    '& hr': { my: '4' },
    '& a': { color: 'colorPalette.fg', textDecoration: 'underline' },
    '& em': { fontStyle: 'italic' },
    '& strong': { fontWeight: 'bold' },
    '& p.is-editor-empty:first-of-type::before': {
      content: 'attr(data-placeholder)',
      color: 'fg.muted',
      pointerEvents: 'none',
      float: 'left',
      height: '0',
    },
  },

  '&[data-disabled] .ProseMirror': {
    pointerEvents: 'none',
    opacity: 0.5,
    cursor: 'not-allowed',
  },
})

export interface RichTextEditorRootProps extends BoxProps {
  /** The Tiptap editor instance, usually created with `useEditor`. */
  editor: Editor | null
  disabled?: boolean
}

export const RichTextEditorRoot = React.forwardRef<
  HTMLDivElement,
  RichTextEditorRootProps
>(function RichTextEditorRoot(props, ref) {
  const { editor, children, css, disabled, ...rest } = props
  const contextValue = React.useMemo(() => ({ editor }), [editor])
  return (
    <RichTextEditorContext.Provider value={contextValue}>
      <Box
        ref={ref}
        data-disabled={disabled || undefined}
        css={[proseMirrorBaseCss, css]}
        {...rest}
      >
        {children}
      </Box>
    </RichTextEditorContext.Provider>
  )
})

export type RichTextEditorToolbarVariant = 'sticky' | 'floating' | 'fixed'

export interface RichTextEditorToolbarProps extends StackProps {
  variant?: RichTextEditorToolbarVariant
  stickyOffset?: string
}

const toolbarStylesMap: Record<
  RichTextEditorToolbarVariant,
  SystemStyleObject
> = {
  sticky: {
    bg: 'bg',
    position: 'sticky',
    top: 'var(--sticky-offset, 0px)',
    zIndex: '1',
    py: '1.5',
    px: '3',
  },
  fixed: {
    bg: 'bg',
    roundedTop: 'l2',
    borderBottomWidth: '1px',
    py: '1.5',
    px: '3',
  },
  floating: {
    shadow: 'md',
    rounded: 'l2',
    bg: 'bg.panel',
    px: '1.5',
    py: '1.5',
  },
}

export const RichTextEditorToolbar = React.forwardRef<
  HTMLDivElement,
  RichTextEditorToolbarProps
>(function RichTextEditorToolbar(props, ref) {
  const { variant = 'fixed', stickyOffset = '0px', ...rest } = props
  const variantStyles = toolbarStylesMap[variant]

  return (
    <HStack
      ref={ref}
      flexWrap="wrap"
      separator={<StackSeparator h="5" alignSelf="center" />}
      {...rest}
      style={{
        ['--sticky-offset' as string]: stickyOffset,
        ...rest.style,
      }}
      css={[variantStyles, rest.css]}
    />
  )
})

export interface RichTextEditorFooterProps extends StackProps {}

export const RichTextEditorFooter = React.forwardRef<
  HTMLDivElement,
  RichTextEditorFooterProps
>(function RichTextEditorFooter(props, ref) {
  return <HStack ref={ref} gap="1" borderTopWidth="1px" p="3" {...props} />
})

export interface RichTextEditorContentProps extends Omit<
  React.ComponentProps<typeof EditorContent>,
  'editor'
> {}

export const RichTextEditorContent = React.forwardRef<
  HTMLDivElement,
  RichTextEditorContentProps
>(function RichTextEditorContent(props, ref) {
  const { editor } = useRichTextEditorContext()
  if (!editor) return null
  return <EditorContent editor={editor} {...props} innerRef={ref} />
})

export interface RichTextEditorControlGroupProps extends StackProps {}

export const RichTextEditorControlGroup = React.forwardRef<
  HTMLDivElement,
  RichTextEditorControlGroupProps
>(function RichTextEditorControlGroup(props, ref) {
  return <HStack ref={ref} gap="1" {...props} />
})
