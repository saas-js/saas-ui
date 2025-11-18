import Table from 'cli-table3'
import kleur from 'kleur'
import path from 'node:path'
import z from 'zod'

import type { LocalContext } from '#context'
import { getConfig } from '#utils/get-config.js'
import { handleError } from '#utils/handle-error'
import { logger } from '#utils/logger'
import { getRegistryIndex } from '#utils/registry'

const listOptionsSchema = z.object({
  category: z.string().optional(),
  search: z.string().optional(),
  cwd: z.string().optional(),
})

type ListCommandFlags = z.infer<typeof listOptionsSchema>

export async function list(
  this: LocalContext,
  flags: ListCommandFlags,
  ...namespaces: Array<string>
) {
  try {
    const options = listOptionsSchema.parse({
      ...flags,
      cwd: path.resolve(flags.cwd ?? process.cwd()),
    })

    const config = await getConfig(options.cwd!)

    if (!config) {
      logger.error('Failed to fetch config.')
      return
    }

    const namespace = namespaces?.[0]

    const normalizedNamespace = namespace
      ? namespace.startsWith('@')
        ? namespace
        : `@${namespace}`
      : undefined

    const parsedFlags = listOptionsSchema.parse(flags)
    const registryIndex = await getRegistryIndex(config, normalizedNamespace)

    if (!registryIndex) {
      const namespaceMsg = normalizedNamespace
        ? ` for namespace ${normalizedNamespace}`
        : ''
      logger.error(`Failed to fetch registry index${namespaceMsg}.`)
      return
    }

    const table = new Table({
      head: ['Name', 'Category', 'type', 'Description'],
      colWidths: [35, 15, 20, 50],
      style: {
        head: ['cyan'],
        border: ['gray'],
      },
    })

    let components = registryIndex.filter((component) =>
      ['registry:block', 'registry:ui'].includes(component.type),
    )

    if (parsedFlags.category) {
      components = components.filter((component) =>
        component.subcategory
          ?.toLowerCase()
          .includes(parsedFlags.category!.toLowerCase()),
      )
    }

    if (parsedFlags.search) {
      const searchTerm = parsedFlags.search.toLowerCase()
      components = components.filter(
        (component) =>
          component.name.toLowerCase().includes(searchTerm) ||
          component.description?.toLowerCase().includes(searchTerm) ||
          component.category?.toLowerCase().includes(searchTerm) ||
          component.subcategory?.toLowerCase().includes(searchTerm),
      )
    }

    components = components.sort((a, b) => {
      if (a.subcategory !== b.subcategory) {
        return a.subcategory?.localeCompare(b.subcategory || '') || 0
      }
      return a.name.localeCompare(b.name)
    })

    for (const component of components) {
      const name = component.private
        ? `${component.name} ${kleur.blue(kleur.bold('(PRO)'))}`
        : component.name

      table.push([
        name,
        component.subcategory || '-',
        component.type || '-',
        component.description || '-',
      ])
    }

    logger.log('')

    let title = 'Available Components'
    if (normalizedNamespace) {
      title += ` from ${kleur.cyan(normalizedNamespace)}`
    }
    title += ':'

    const filters = []
    if (parsedFlags.category) {
      filters.push(`subcategory: ${parsedFlags.category}`)
    }
    if (parsedFlags.search) {
      filters.push(`search: "${parsedFlags.search}"`)
    }

    if (filters.length > 0) {
      title = title.slice(0, -1)
      title += ` (filtered by ${filters.join(', ')}):`
    }

    logger.log(kleur.bold(title))
    logger.log('')
    logger.log(table.toString())
    logger.log('')
    logger.log(`Total: ${kleur.green(components.length)} components`)
    logger.log('')
  } catch (error) {
    handleError(error)
  }
}
