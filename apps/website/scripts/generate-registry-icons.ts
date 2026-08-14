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
  sourceName: variants.lucide
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase(),
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

for (const { outputName, sourceName } of entries) {
  const icon = iconData.icons[sourceName]
  if (!icon) throw new Error(`Icon ${sourceName} was not returned by Iconify.`)

  await writeFile(
    path.join(outputDir, `${outputName}-icon.tsx`),
    generateIconComponent(
      outputName,
      icon,
      iconSet,
      iconData.width,
      iconData.height,
    ),
  )
  console.log(`Updated ${outputName}-icon.tsx from lucide:${sourceName}.`)
}
