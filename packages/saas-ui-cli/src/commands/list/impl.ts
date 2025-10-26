import Table from 'cli-table3'
import kleur from 'kleur'
import z from 'zod'

import type { LocalContext } from '#context'
import { handleError } from '#utils/handle-error'
import { logger } from '#utils/logger'
import { getRegistryIndex } from '#utils/registry'

const listOptionsSchema = z.object({
  category: z.string().optional(),
  search: z.string().optional(),
})

type ListCommandFlags = z.infer<typeof listOptionsSchema>

export async function list(this: LocalContext, flags: ListCommandFlags) {
  try {
    const parsedFlags = listOptionsSchema.parse(flags)
    const registryIndex = await getRegistryIndex()

    if (!registryIndex) {
      logger.error('Failed to fetch registry index.')
      return
    }

    const table = new Table({
      head: ['Name', 'Category', 'Description'],
      colWidths: [35, 15, 60],
      style: {
        head: ['cyan'],
        border: ['gray'],
      },
    })

    let components = registryIndex.filter((component) =>
      ['registry:ui', 'registry:block'].includes(component.type),
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
        component.description || '-',
      ])
    }

    logger.log('')

    let title = 'Available Components:'
    const filters = []
    if (parsedFlags.category) {
      filters.push(`subcategory: ${parsedFlags.category}`)
    }
    if (parsedFlags.search) {
      filters.push(`search: "${parsedFlags.search}"`)
    }

    if (filters.length > 0) {
      title += ` (filtered by ${filters.join(', ')})`
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
