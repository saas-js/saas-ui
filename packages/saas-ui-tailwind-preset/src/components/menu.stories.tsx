import type { Meta, StoryObj } from '@storybook/react'
import { Menu } from '@ark-ui/react/menu'
import { tv, type VariantProps } from 'tailwind-variants'

const menu = tv({
  slots: {
    content: [
      // Overlay layer style
      'layer-overlay',
      // Base styles
      'outline-none',
      'text-fg-default',
      'max-h-[var(--available-height)]',
      'z-[calc(100+var(--layer-index,0))]',
      'overflow-y-auto',
      '[scrollbar-width:thin]',
    ],
    item: [
      'no-underline',
      'text-fg-default',
      'select-none',
      'rounded-control-md',
      'w-full',
      'flex',
      'cursor-pointer',
      'items-center',
      'text-start',
      'relative',
      'flex-[0_0_auto]',
      'outline-none',
      'disabled:opacity-40',
      'disabled:cursor-not-allowed',
    ],
    itemText: 'flex-1',
    itemGroupLabel: [
      'flex',
      'items-center',
      'text-fg-subtle',
    ],
    indicator: [
      'inline-flex',
      'items-center',
      'justify-center',
      'flex-shrink-0',
    ],
    itemCommand: [
      'opacity-60',
      'text-xs',
      'ms-auto',
      'ps-4',
      'tracking-widest',
    ],
    separator: [
      'h-px',
      'bg-muted',
      'my-1',
      '-mx-1',
    ],
  },
  variants: {
    variant: {
      subtle: {
        item: 'data-[highlighted]:bg-emphasized',
      },
      solid: {
        item: 'data-[highlighted]:bg-accent-solid data-[highlighted]:text-accent-contrast',
      },
    },
    size: {
      sm: {
        content: 'min-w-32 p-1 rounded-panel-md',
        item: 'gap-1 text-xs min-h-6 px-1.5 ps-1.5',
        itemGroupLabel: 'text-xs min-h-6 px-1.5',
      },
      md: {
        content: 'min-w-32 p-1 rounded-panel-md',
        item: 'gap-2 text-sm min-h-7 px-2 ps-2',
        itemGroupLabel: 'text-sm min-h-7 px-2',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'solid',
  },
})

type MenuVariantProps = VariantProps<typeof menu>

interface MenuComponentProps extends MenuVariantProps {
  trigger: React.ReactNode
}

function MenuComponent({ variant, size, trigger }: MenuComponentProps) {
  const styles = menu({ variant, size })

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <button className="inline-flex items-center justify-center gap-2 h-10 px-4 text-sm font-medium rounded-control-md bg-accent-solid text-accent-contrast hover:bg-accent-solid/90 transition-colors">
          {trigger}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content className={styles.content()}>
          <Menu.ItemGroup>
            <Menu.ItemGroupLabel className={styles.itemGroupLabel()}>
              Actions
            </Menu.ItemGroupLabel>
            <Menu.Item className={styles.item()} value="new-tab">
              <span className={styles.itemText()}>New Tab</span>
              <span className={styles.itemCommand()}>⌘T</span>
            </Menu.Item>
            <Menu.Item className={styles.item()} value="new-window">
              <span className={styles.itemText()}>New Window</span>
              <span className={styles.itemCommand()}>⌘N</span>
            </Menu.Item>
            <Menu.Item className={styles.item()} value="new-private" disabled>
              <span className={styles.itemText()}>New Private Window</span>
              <span className={styles.itemCommand()}>⇧⌘N</span>
            </Menu.Item>
          </Menu.ItemGroup>

          <Menu.Separator className={styles.separator()} />

          <Menu.ItemGroup>
            <Menu.ItemGroupLabel className={styles.itemGroupLabel()}>
              History
            </Menu.ItemGroupLabel>
            <Menu.Item className={styles.item()} value="back">
              <span className={styles.itemText()}>Back</span>
              <span className={styles.itemCommand()}>⌘[</span>
            </Menu.Item>
            <Menu.Item className={styles.item()} value="forward">
              <span className={styles.itemText()}>Forward</span>
              <span className={styles.itemCommand()}>⌘]</span>
            </Menu.Item>
            <Menu.Item className={styles.item()} value="reload">
              <span className={styles.itemText()}>Reload</span>
              <span className={styles.itemCommand()}>⌘R</span>
            </Menu.Item>
          </Menu.ItemGroup>

          <Menu.Separator className={styles.separator()} />

          <Menu.Item className={styles.item()} value="settings">
            <span className={styles.itemText()}>Settings</span>
          </Menu.Item>
          <Menu.Item className={styles.item()} value="help">
            <span className={styles.itemText()}>Help</span>
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  )
}

const meta = {
  title: 'Components/Menu',
  component: MenuComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['subtle', 'solid'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
  },
} satisfies Meta<typeof MenuComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Solid: Story = {
  args: {
    variant: 'solid',
    size: 'md',
    trigger: 'Open Menu',
  },
}

export const Subtle: Story = {
  args: {
    variant: 'subtle',
    size: 'md',
    trigger: 'Open Menu',
  },
}

export const Small: Story = {
  args: {
    variant: 'solid',
    size: 'sm',
    trigger: 'Small Menu',
  },
}

export const Medium: Story = {
  args: {
    variant: 'solid',
    size: 'md',
    trigger: 'Medium Menu',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4">
      <MenuComponent variant="solid" size="md" trigger="Solid" />
      <MenuComponent variant="subtle" size="md" trigger="Subtle" />
      <MenuComponent variant="solid" size="sm" trigger="Small" />
    </div>
  ),
}
