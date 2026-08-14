import { readFile, readdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

import { prepareExampleSource } from './composition'

describe('prepareExampleSource', () => {
  it('shows composition UI imports with the documented consumer alias', () => {
    const source = "import { EmptyState } from 'compositions/ui/empty-state'\n"

    expect(prepareExampleSource(source)).toBe(
      "import { EmptyState } from '#components/ui/empty-state'\n",
    )
  })

  it('rewrites every composition alias used by installable examples', () => {
    const source = [
      "import { Provider } from 'compositions/components/setup/provider/provider'",
      'import { useExample } from "compositions/hooks/use-example"',
      "import { ExampleIcon } from 'compositions/icons/example-icon'",
      "import { helper } from 'compositions/lib/helper'",
      "import { Button } from 'compositions/ui/button'",
    ].join('\n')

    expect(prepareExampleSource(source)).toBe(
      [
        "import { Provider } from '#components/setup/provider/provider'",
        'import { useExample } from "#hooks/use-example"',
        "import { ExampleIcon } from '#components/icons/example-icon'",
        "import { helper } from '#lib/helper'",
        "import { Button } from '#components/ui/button'",
      ].join('\n'),
    )
  })

  it('does not rewrite unrelated text', () => {
    const source = "const path = 'other/compositions/ui/empty-state'\n"

    expect(prepareExampleSource(source)).toBe(source)
  })

  it('removes internal aliases from every displayed example', async () => {
    const examplesDirectory = resolve(
      import.meta.dirname,
      '../../compositions/src/examples',
    )
    const exampleFiles = (await readdir(examplesDirectory, { recursive: true }))
      .filter((file) => /\.[jt]sx?$/.test(file))
      .sort()

    const remainingInternalImports = (
      await Promise.all(
        exampleFiles.map(async (file) => {
          const source = await readFile(
            resolve(examplesDirectory, file),
            'utf8',
          )
          return /['"]compositions\//.test(prepareExampleSource(source))
            ? file
            : null
        }),
      )
    ).filter(Boolean)

    expect(remainingInternalImports).toEqual([])
  })
})
