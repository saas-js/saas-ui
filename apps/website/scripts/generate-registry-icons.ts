import {
  fetchIconData,
  fetchIconSet,
  generateIconComponent,
} from '@saas-js/iconify'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { icons } from '../registry/registry-icons'

const websiteRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
)
const entries = Object.entries(icons).map(([componentName, variants]) => ({
  // Iconify separates a trailing digit ("Heading1" is published as "heading-1").
  sourceName: variants.lucide
    .replace(/([a-z])([A-Z0-9])/g, '$1-$2')
    .toLowerCase(),
  // Registry item names come from the compiler's kebab-case, which does not.
  outputName: componentName
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase(),
}))
const sourceNames = [...new Set(entries.map((entry) => entry.sourceName))]
const outputDir = path.join(websiteRoot, 'registry', 'default', 'icons')

console.warn(
  'registry:icons uses the Iconify network API and updates checked-in icon templates.',
)
const [iconSet, iconData] = await Promise.all([
  fetchIconSet('lucide'),
  fetchIconData('lucide', sourceNames),
])
await mkdir(outputDir, { recursive: true })

// generateIconComponent embeds the raw Iconify SVG body, whose kebab-case
// presentation attributes are invalid in JSX and make React log errors.
const toJsxAttributes = (source: string) =>
  source.replace(
    /\b(?!data-|aria-)([a-z]+(?:-[a-z]+)+)=/g,
    (_, attr: string) =>
      `${attr.replace(/-([a-z])/g, (_: string, c: string) => c.toUpperCase())}=`,
  )

for (const { outputName, sourceName } of entries) {
  const icon = iconData.icons[sourceName]
  if (!icon) throw new Error(`Icon ${sourceName} was not returned by Iconify.`)

  await writeFile(
    path.join(outputDir, `${outputName}-icon.tsx`),
    toJsxAttributes(
      generateIconComponent(
        outputName,
        icon,
        iconSet,
        iconData.width,
        iconData.height,
      ),
    ),
  )
  console.log(`Updated ${outputName}-icon.tsx from lucide:${sourceName}.`)
}
