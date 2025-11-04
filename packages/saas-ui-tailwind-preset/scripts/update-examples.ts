/**
 * Script to update all examples to use shorthand Tailwind classes
 * instead of var(--colors-*) syntax
 */

import { readFile, writeFile } from 'fs/promises'
import fg from 'fast-glob'

async function updateExamples() {
  console.log('🔄 Updating examples to use shorthand classes...')

  const files = await fg('examples/**/*.{tsx,ts,md}', {
    absolute: false,
  })

  for (const file of files) {
    let content = await readFile(file, 'utf-8')
    let updated = false

    // Replace color variables
    const colorReplacements = [
      // Semantic colors
      [/\[var\(--colors-bg-panel\)\]/g, 'bg-panel'],
      [/\[var\(--colors-bg-muted\)\]/g, 'bg-muted'],
      [/\[var\(--colors-bg-subtle\)\]/g, 'bg-subtle'],
      [/\[var\(--colors-bg-emphasized\)\]/g, 'bg-emphasized'],
      [/\[var\(--colors-bg\)\]/g, 'bg'],

      [/\[var\(--colors-fg-emphasized\)\]/g, 'fg-emphasized'],
      [/\[var\(--colors-fg-muted\)\]/g, 'fg-muted'],
      [/\[var\(--colors-fg-subtle\)\]/g, 'fg-subtle'],
      [/\[var\(--colors-fg\)\]/g, 'fg'],

      [/\[var\(--colors-border-emphasized\)\]/g, 'border-emphasized'],
      [/\[var\(--colors-border\)\]/g, 'border'],

      // Accent colors
      [/\[var\(--colors-accent-contrast\)\]/g, 'accent-contrast'],
      [/\[var\(--colors-accent-fg\)\]/g, 'accent-fg'],
      [/\[var\(--colors-accent-muted\)\]/g, 'accent-muted'],
      [/\[var\(--colors-accent-subtle\)\]/g, 'accent-subtle'],
      [/\[var\(--colors-accent-solid\)\]/g, 'accent-solid'],
      [/\[var\(--colors-accent-focus-ring\)\]/g, 'accent-focus-ring'],

      // Neutral colors
      [/\[var\(--colors-neutral-contrast\)\]/g, 'neutral-contrast'],
      [/\[var\(--colors-neutral-fg\)\]/g, 'neutral-fg'],
      [/\[var\(--colors-neutral-muted\)\]/g, 'neutral-muted'],
      [/\[var\(--colors-neutral-subtle\)\]/g, 'neutral-subtle'],
      [/\[var\(--colors-neutral-solid\)\]/g, 'neutral-solid'],

      // Color scales
      [/\[var\(--colors-red-contrast\)\]/g, 'red-contrast'],
      [/\[var\(--colors-red-fg\)\]/g, 'red-fg'],
      [/\[var\(--colors-red-muted\)\]/g, 'red-muted'],
      [/\[var\(--colors-red-subtle\)\]/g, 'red-subtle'],
      [/\[var\(--colors-red-solid\)\]/g, 'red-solid'],
      [/\[var\(--colors-red-(\d+)\)\]/g, 'red-$1'],

      [/\[var\(--colors-green-contrast\)\]/g, 'green-contrast'],
      [/\[var\(--colors-green-fg\)\]/g, 'green-fg'],
      [/\[var\(--colors-green-muted\)\]/g, 'green-muted'],
      [/\[var\(--colors-green-subtle\)\]/g, 'green-subtle'],
      [/\[var\(--colors-green-solid\)\]/g, 'green-solid'],
      [/\[var\(--colors-green-(\d+)\)\]/g, 'green-$1'],

      [/\[var\(--colors-blue-contrast\)\]/g, 'blue-contrast'],
      [/\[var\(--colors-blue-fg\)\]/g, 'blue-fg'],
      [/\[var\(--colors-blue-muted\)\]/g, 'blue-muted'],
      [/\[var\(--colors-blue-subtle\)\]/g, 'blue-subtle'],
      [/\[var\(--colors-blue-solid\)\]/g, 'blue-solid'],
      [/\[var\(--colors-blue-(\d+)\)\]/g, 'blue-$1'],

      [/\[var\(--colors-orange-contrast\)\]/g, 'orange-contrast'],
      [/\[var\(--colors-orange-fg\)\]/g, 'orange-fg'],
      [/\[var\(--colors-orange-muted\)\]/g, 'orange-muted'],
      [/\[var\(--colors-orange-subtle\)\]/g, 'orange-subtle'],
      [/\[var\(--colors-orange-solid\)\]/g, 'orange-solid'],
      [/\[var\(--colors-orange-(\d+)\)\]/g, 'orange-$1'],

      [/\[var\(--colors-gray-(\d+)\)\]/g, 'gray-$1'],
    ]

    // Replace spacing variables
    const spacingReplacements = [
      [/px-\[var\(--spacing-(\d+)(?:_(\d+))?\)\]/g, (_, p1, p2) => `px-${p2 ? `${p1}.${p2}` : p1}`],
      [/py-\[var\(--spacing-(\d+)(?:_(\d+))?\)\]/g, (_, p1, p2) => `py-${p2 ? `${p1}.${p2}` : p1}`],
      [/p-\[var\(--spacing-(\d+)(?:_(\d+))?\)\]/g, (_, p1, p2) => `p-${p2 ? `${p1}.${p2}` : p1}`],
      [/gap-\[var\(--spacing-(\d+)(?:_(\d+))?\)\]/g, (_, p1, p2) => `gap-${p2 ? `${p1}.${p2}` : p1}`],
      [/mb-\[var\(--spacing-(\d+)(?:_(\d+))?\)\]/g, (_, p1, p2) => `mb-${p2 ? `${p1}.${p2}` : p1}`],
      [/mt-\[var\(--spacing-(\d+)(?:_(\d+))?\)\]/g, (_, p1, p2) => `mt-${p2 ? `${p1}.${p2}` : p1}`],
      [/ml-\[var\(--spacing-(\d+)(?:_(\d+))?\)\]/g, (_, p1, p2) => `ml-${p2 ? `${p1}.${p2}` : p1}`],
      [/mr-\[var\(--spacing-(\d+)(?:_(\d+))?\)\]/g, (_, p1, p2) => `mr-${p2 ? `${p1}.${p2}` : p1}`],
    ]

    // Replace radii variables
    const radiiReplacements = [
      [/rounded-\[var\(--radii-2xs\)\]/g, 'rounded-2xs'],
      [/rounded-\[var\(--radii-xs\)\]/g, 'rounded-xs'],
      [/rounded-\[var\(--radii-sm\)\]/g, 'rounded-sm'],
      [/rounded-\[var\(--radii-md\)\]/g, 'rounded-md'],
      [/rounded-\[var\(--radii-lg\)\]/g, 'rounded-lg'],
      [/rounded-\[var\(--radii-xl\)\]/g, 'rounded-xl'],
      [/rounded-\[var\(--radii-2xl\)\]/g, 'rounded-2xl'],
      [/rounded-\[var\(--radii-full\)\]/g, 'rounded-full'],
    ]

    // Apply all replacements
    for (const [pattern, replacement] of [...colorReplacements, ...spacingReplacements, ...radiiReplacements]) {
      const before = content
      content = content.replace(pattern as RegExp, replacement as string)
      if (content !== before) updated = true
    }

    if (updated) {
      await writeFile(file, content, 'utf-8')
      console.log(`✅ Updated ${file}`)
    }
  }

  console.log('✨ All examples updated!')
}

updateExamples().catch(console.error)
