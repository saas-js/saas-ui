'use client'

import * as React from 'react'

import {
  Box,
  ColorSwatch,
  HStack,
  VStack,
  createListCollection,
} from '@chakra-ui/react'
import type { Editor } from '@tiptap/react'
import '@tiptap/starter-kit'

import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  CodeIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  HighlighterIcon,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  ListOrderedIcon,
  MinusIcon,
  QuoteIcon,
  RedoIcon,
  StrikethroughIcon,
  UnderlineIcon,
  UndoIcon,
  UnlinkIcon,
} from '../../icons/index.ts'
import { CloseButton } from '../close-button/index.ts'
import { IconButton, type IconButtonProps } from '../icon-button/index.ts'
import { Popover } from '../popover/index.ts'
import { Select } from '../select/index.ts'
import { Tooltip } from '../tooltip/index.ts'
import { useRichTextEditorContext } from './rich-text-editor-context.tsx'

export interface BaseControlConfig {
  label: string
  icon?: React.ElementType
  isDisabled?: (editor: Editor) => boolean
  getProps?: (editor: Editor) => Record<string, any>
}

export interface ButtonControlProps extends Omit<
  IconButtonProps,
  'aria-label'
> {
  icon: React.ReactNode
  label: string
}

/**
 * The shared trigger for every control: a tooltipped icon button, so custom
 * controls match the built-in ones without repeating the wiring.
 */
export const ButtonControl = React.forwardRef<
  HTMLButtonElement,
  ButtonControlProps
>(function ButtonControl(props, ref) {
  const { icon, label, ...rest } = props
  return (
    <Tooltip content={label}>
      <IconButton ref={ref} size="2xs" aria-label={label} {...rest}>
        {icon}
      </IconButton>
    </Tooltip>
  )
})

/* -----------------------------------------------------------------------------
 * Boolean control
 * -------------------------------------------------------------------------- */

export interface BooleanControlConfig extends BaseControlConfig {
  icon: React.ElementType
  command: (editor: Editor) => void
  getVariant?: (editor: Editor) => IconButtonProps['variant']
}

/**
 * Creates a toggle control. The editor is read from context, so the returned
 * component can be dropped anywhere inside `RichTextEditor.Root`.
 */
export function createBooleanControl(config: BooleanControlConfig) {
  const {
    label,
    icon: Icon,
    isDisabled,
    command,
    getVariant,
    getProps,
  } = config

  const BooleanControl = React.forwardRef<HTMLButtonElement, IconButtonProps>(
    function BooleanControl(props, ref) {
      const { editor } = useRichTextEditorContext()
      if (!editor) return null
      const disabled = isDisabled ? isDisabled(editor) : false
      const dynamicProps = getProps ? getProps(editor) : {}
      const variant =
        getVariant && !getProps ? getVariant(editor) : dynamicProps.variant

      return (
        <ButtonControl
          ref={ref}
          label={label}
          icon={<Icon />}
          variant={variant}
          onClick={() => command(editor)}
          disabled={disabled}
          {...props}
        />
      )
    },
  )

  BooleanControl.displayName = `BooleanControl(${label})`
  return BooleanControl
}

/* -----------------------------------------------------------------------------
 * Select control
 * -------------------------------------------------------------------------- */

export interface SelectOption {
  value: string
  label: string
  icon?: React.ReactNode
}

export interface SelectControlConfig extends BaseControlConfig {
  options: SelectOption[]
  width?: Select.RootProps<SelectOption>['width']
  getValue: (editor: Editor) => string
  command: (editor: Editor, value: string) => void
  placeholder?: string
  renderValue?: (value: string, option?: SelectOption) => React.ReactNode
}

export function createSelectControl(config: SelectControlConfig) {
  const {
    label,
    options,
    width,
    getValue,
    command,
    placeholder = 'Select',
    renderValue,
    isDisabled,
    getProps,
  } = config

  const SelectControl = React.forwardRef<
    HTMLButtonElement,
    Omit<Select.RootProps<SelectOption>, 'collection'>
  >(function SelectControl(props, ref) {
    const { editor } = useRichTextEditorContext()
    const controlId = React.useId()

    if (!editor) return null

    const currentValue = getValue(editor)
    const disabled = isDisabled ? isDisabled(editor) : false

    const currentOption = options.find((o) => o.value === currentValue)
    const displayValue =
      renderValue && currentOption
        ? renderValue(currentValue, currentOption)
        : currentOption?.label || placeholder

    const collection = createListCollection({ items: options })
    const dynamicProps = getProps ? getProps(editor) : {}

    return (
      <Select.Root
        width={width}
        {...props}
        size="xs"
        variant="subtle"
        collection={collection}
        value={[currentValue]}
        onValueChange={(details) => command(editor, details.value[0])}
        disabled={disabled}
        ids={{ trigger: controlId }}
        positioning={{ sameWidth: false }}
        {...dynamicProps}
      >
        <Tooltip content={label} ids={{ trigger: controlId }}>
          <Select.Trigger ref={ref}>
            <Select.ValueText placeholder={placeholder}>
              {() => displayValue}
            </Select.ValueText>
          </Select.Trigger>
        </Tooltip>
        <Select.Content minW="20">
          {options.map((opt) => (
            <Select.Item key={opt.value} item={opt.value}>
              {opt.icon && (
                <Box as="span" marginEnd="2">
                  {opt.icon}
                </Box>
              )}
              <Select.ItemText>{opt.label}</Select.ItemText>
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    )
  })

  SelectControl.displayName = `SelectControl(${label})`
  return SelectControl
}

/* -----------------------------------------------------------------------------
 * Swatch control
 * -------------------------------------------------------------------------- */

export interface SwatchOption {
  value: string
  color: string
  label?: string
}

export interface SwatchControlConfig extends BaseControlConfig {
  swatches: SwatchOption[]
  getValue: (editor: Editor) => string
  command: (editor: Editor, value: string) => void
  showRemove?: boolean
  onRemove?: (editor: Editor) => void
}

export function createSwatchControl(config: SwatchControlConfig) {
  const {
    label,
    swatches,
    getValue,
    command,
    showRemove = false,
    onRemove,
    isDisabled,
    icon: Icon,
    getProps,
  } = config

  const SwatchControl = React.forwardRef<HTMLButtonElement, IconButtonProps>(
    function SwatchControl(props, ref) {
      const { editor } = useRichTextEditorContext()
      const [open, setOpen] = React.useState(false)
      const triggerId = React.useId()

      if (!editor) return null
      const currentValue = getValue(editor)
      const disabled = isDisabled ? isDisabled(editor) : false
      const dynamicProps = getProps ? getProps(editor) : {}

      return (
        <Popover.Root
          open={open}
          onOpenChange={(e) => setOpen(e.open)}
          ids={{ trigger: triggerId }}
          size="sm"
        >
          <Tooltip content={label} ids={{ trigger: triggerId }}>
            <Popover.Trigger asChild>
              <IconButton
                ref={ref}
                size="2xs"
                aria-label={label}
                disabled={disabled}
                {...dynamicProps}
                {...props}
              >
                <VStack gap="1px">
                  {Icon && <Icon />}
                  <ColorSwatch
                    value={currentValue || 'transparent'}
                    h="4px"
                    w="100%"
                  />
                </VStack>
              </IconButton>
            </Popover.Trigger>
          </Tooltip>

          <Popover.Content width="auto">
            <Popover.Body>
              <HStack wrap="wrap">
                {swatches.map((swatch) => (
                  <ColorSwatch
                    key={swatch.value}
                    cursor="button"
                    value={swatch.color}
                    onClick={() => {
                      command(editor, swatch.value)
                      setOpen(false)
                    }}
                  />
                ))}
                {showRemove && onRemove && (
                  <Popover.CloseTrigger asChild>
                    <CloseButton
                      size="2xs"
                      onClick={() => {
                        onRemove(editor)
                        setOpen(false)
                      }}
                    />
                  </Popover.CloseTrigger>
                )}
              </HStack>
            </Popover.Body>
          </Popover.Content>
        </Popover.Root>
      )
    },
  )

  SwatchControl.displayName = `SwatchControl(${label || 'Unnamed'})`
  return SwatchControl
}

/**
 * Controls for opt-in extensions (text align, highlight) call commands that are
 * not part of Tiptap's base command map, so they would not compile unless every
 * consumer installed every extension. They are resolved at call time instead —
 * register the matching extension on the editor before rendering the control.
 */
function optionalChain(editor: Editor) {
  return editor.chain().focus() as unknown as Record<
    string,
    (...args: any[]) => { run: () => boolean }
  >
}

/* -----------------------------------------------------------------------------
 * Marks
 * -------------------------------------------------------------------------- */

export const Bold = createBooleanControl({
  label: 'Bold',
  icon: BoldIcon,
  command: (editor) => editor.chain().focus().toggleBold().run(),
  getVariant: (editor) => (editor.isActive('bold') ? 'subtle' : 'ghost'),
})

export const Italic = createBooleanControl({
  label: 'Italic',
  icon: ItalicIcon,
  command: (editor) => editor.chain().focus().toggleItalic().run(),
  getVariant: (editor) => (editor.isActive('italic') ? 'subtle' : 'ghost'),
})

export const Underline = createBooleanControl({
  label: 'Underline',
  icon: UnderlineIcon,
  command: (editor) => editor.chain().focus().toggleUnderline().run(),
  getVariant: (editor) => (editor.isActive('underline') ? 'subtle' : 'ghost'),
})

export const Strikethrough = createBooleanControl({
  label: 'Strikethrough',
  icon: StrikethroughIcon,
  command: (editor) => editor.chain().focus().toggleStrike().run(),
  getVariant: (editor) => (editor.isActive('strike') ? 'subtle' : 'ghost'),
})

export const Code = createBooleanControl({
  label: 'Code',
  icon: CodeIcon,
  command: (editor) => editor.chain().focus().toggleCode().run(),
  getVariant: (editor) => (editor.isActive('code') ? 'subtle' : 'ghost'),
})

/* -----------------------------------------------------------------------------
 * Blocks
 * -------------------------------------------------------------------------- */

export const H1 = createBooleanControl({
  label: 'Heading 1',
  icon: Heading1Icon,
  command: (editor) => editor.chain().focus().toggleHeading({ level: 1 }).run(),
  getVariant: (editor) =>
    editor.isActive('heading', { level: 1 }) ? 'subtle' : 'ghost',
})

export const H2 = createBooleanControl({
  label: 'Heading 2',
  icon: Heading2Icon,
  command: (editor) => editor.chain().focus().toggleHeading({ level: 2 }).run(),
  getVariant: (editor) =>
    editor.isActive('heading', { level: 2 }) ? 'subtle' : 'ghost',
})

export const H3 = createBooleanControl({
  label: 'Heading 3',
  icon: Heading3Icon,
  command: (editor) => editor.chain().focus().toggleHeading({ level: 3 }).run(),
  getVariant: (editor) =>
    editor.isActive('heading', { level: 3 }) ? 'subtle' : 'ghost',
})

export const H4 = createBooleanControl({
  label: 'Heading 4',
  icon: Heading4Icon,
  command: (editor) => editor.chain().focus().toggleHeading({ level: 4 }).run(),
  getVariant: (editor) =>
    editor.isActive('heading', { level: 4 }) ? 'subtle' : 'ghost',
})

export const BulletList = createBooleanControl({
  label: 'Bullet List',
  icon: ListIcon,
  command: (editor) => editor.chain().focus().toggleBulletList().run(),
  getVariant: (editor) => (editor.isActive('bulletList') ? 'subtle' : 'ghost'),
})

export const OrderedList = createBooleanControl({
  label: 'Ordered List',
  icon: ListOrderedIcon,
  command: (editor) => editor.chain().focus().toggleOrderedList().run(),
  getVariant: (editor) => (editor.isActive('orderedList') ? 'subtle' : 'ghost'),
})

export const Blockquote = createBooleanControl({
  label: 'Blockquote',
  icon: QuoteIcon,
  command: (editor) => editor.chain().focus().toggleBlockquote().run(),
  getVariant: (editor) => (editor.isActive('blockquote') ? 'subtle' : 'ghost'),
})

export const Hr = createBooleanControl({
  label: 'Horizontal Rule',
  icon: MinusIcon,
  command: (editor) => editor.chain().focus().setHorizontalRule().run(),
  getVariant: () => 'ghost',
})

/* -----------------------------------------------------------------------------
 * Links
 * -------------------------------------------------------------------------- */

export const Link = createBooleanControl({
  label: 'Link',
  icon: LinkIcon,
  command: (editor) => {
    const url = window.prompt('Enter URL')
    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run()
    }
  },
  getVariant: (editor) => (editor.isActive('link') ? 'subtle' : 'ghost'),
})

export const Unlink = createBooleanControl({
  label: 'Unlink',
  icon: UnlinkIcon,
  command: (editor) => editor.chain().focus().unsetLink().run(),
  isDisabled: (editor) => !editor.isActive('link'),
  getVariant: () => 'ghost',
})

/* -----------------------------------------------------------------------------
 * Alignment — requires the `@tiptap/extension-text-align` extension
 * -------------------------------------------------------------------------- */

export const AlignLeft = createBooleanControl({
  label: 'Align Left',
  icon: AlignLeftIcon,
  command: (editor) => optionalChain(editor).setTextAlign('left').run(),
  getVariant: (editor) =>
    editor.isActive({ textAlign: 'left' }) ? 'subtle' : 'ghost',
})

export const AlignCenter = createBooleanControl({
  label: 'Align Center',
  icon: AlignCenterIcon,
  command: (editor) => optionalChain(editor).setTextAlign('center').run(),
  getVariant: (editor) =>
    editor.isActive({ textAlign: 'center' }) ? 'subtle' : 'ghost',
})

export const AlignRight = createBooleanControl({
  label: 'Align Right',
  icon: AlignRightIcon,
  command: (editor) => optionalChain(editor).setTextAlign('right').run(),
  getVariant: (editor) =>
    editor.isActive({ textAlign: 'right' }) ? 'subtle' : 'ghost',
})

export const AlignJustify = createBooleanControl({
  label: 'Align Justify',
  icon: AlignJustifyIcon,
  command: (editor) => optionalChain(editor).setTextAlign('justify').run(),
  getVariant: (editor) =>
    editor.isActive({ textAlign: 'justify' }) ? 'subtle' : 'ghost',
})

/* -----------------------------------------------------------------------------
 * History
 * -------------------------------------------------------------------------- */

export const Undo = createBooleanControl({
  label: 'Undo',
  icon: UndoIcon,
  command: (editor) => editor.chain().focus().undo().run(),
  isDisabled: (editor) => !editor.can().undo(),
  getVariant: () => 'ghost',
})

export const Redo = createBooleanControl({
  label: 'Redo',
  icon: RedoIcon,
  command: (editor) => editor.chain().focus().redo().run(),
  isDisabled: (editor) => !editor.can().redo(),
  getVariant: () => 'ghost',
})

/* -----------------------------------------------------------------------------
 * Highlight — requires the `@tiptap/extension-highlight` extension
 * -------------------------------------------------------------------------- */

const HIGHLIGHT_SWATCH_OPTIONS: SwatchOption[] = [
  { label: 'Yellow', value: '#FFFF00', color: '#FFFF00' },
  { label: 'Green', value: '#00FF00', color: '#00FF00' },
  { label: 'Cyan', value: '#00FFFF', color: '#00FFFF' },
  { label: 'Pink', value: '#FF69B4', color: '#FF69B4' },
  { label: 'Orange', value: '#FFA500', color: '#FFA500' },
  { label: 'Purple', value: '#DDA0DD', color: '#DDA0DD' },
]

export const Highlight = createSwatchControl({
  label: 'Highlight',
  swatches: HIGHLIGHT_SWATCH_OPTIONS,
  getValue: (editor) => editor.getAttributes('highlight')?.color || '',
  getProps: (editor) => ({
    variant: editor.getAttributes('highlight')?.color ? 'subtle' : 'ghost',
  }),
  command: (editor, color) =>
    optionalChain(editor).toggleHighlight({ color }).run(),
  icon: HighlighterIcon,
  showRemove: true,
  onRemove: (editor) => optionalChain(editor).unsetHighlight().run(),
})

/* -----------------------------------------------------------------------------
 * Text style
 * -------------------------------------------------------------------------- */

const TEXT_STYLE_OPTIONS: SelectOption[] = [
  { value: 'paragraph', label: 'Paragraph' },
  { value: 'heading1', label: 'Heading 1' },
  { value: 'heading2', label: 'Heading 2' },
  { value: 'heading3', label: 'Heading 3' },
  { value: 'blockquote', label: 'Quote' },
  { value: 'horizontalRule', label: 'Divider', icon: <MinusIcon /> },
]

export const TextStyle = createSelectControl({
  label: 'Text Style',
  width: '120px',
  placeholder: 'Paragraph',
  options: TEXT_STYLE_OPTIONS,
  getValue: (editor) => {
    if (editor.isActive('heading', { level: 1 })) return 'heading1'
    if (editor.isActive('heading', { level: 2 })) return 'heading2'
    if (editor.isActive('heading', { level: 3 })) return 'heading3'
    if (editor.isActive('blockquote')) return 'blockquote'
    return 'paragraph'
  },
  command: (editor, value) => {
    if (value === 'paragraph') {
      editor.chain().focus().setParagraph().run()
    } else if (value === 'heading1') {
      editor.chain().focus().toggleHeading({ level: 1 }).run()
    } else if (value === 'heading2') {
      editor.chain().focus().toggleHeading({ level: 2 }).run()
    } else if (value === 'heading3') {
      editor.chain().focus().toggleHeading({ level: 3 }).run()
    } else if (value === 'blockquote') {
      editor.chain().focus().toggleBlockquote().run()
    } else if (value === 'horizontalRule') {
      editor.chain().focus().setHorizontalRule().run()
    }
  },
  renderValue: (value, option) => {
    const textStyle: Record<string, Record<string, string>> = {
      paragraph: { fontWeight: 'normal', fontSize: 'sm' },
      heading1: { fontWeight: 'bold', fontSize: 'lg' },
      heading2: { fontWeight: 'semibold', fontSize: 'md' },
      heading3: { fontWeight: 'medium', fontSize: 'sm' },
      blockquote: { fontStyle: 'italic', fontSize: 'sm' },
      horizontalRule: { fontWeight: 'medium', fontSize: 'sm' },
    }
    return <Box {...textStyle[value]}>{option?.label || 'Paragraph'}</Box>
  },
})
