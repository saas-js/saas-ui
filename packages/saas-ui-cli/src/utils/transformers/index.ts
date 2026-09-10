import { randomUUID } from 'node:crypto'
import path from 'node:path'
import { Project, ScriptKind, type SourceFile } from 'ts-morph'
import { z } from 'zod'

import type { Config } from '#utils/get-config'
import { registryBaseColorSchema } from '#utils/registry/schema'
import { transformImport } from '#utils/transformers/transform-import'
import { transformJsx } from '#utils/transformers/transform-jsx'
import { transformRsc } from '#utils/transformers/transform-rsc'

export type TransformOpts = {
  filename: string
  raw: string
  config: Config
  baseColor?: z.infer<typeof registryBaseColorSchema>
  transformJsx?: boolean
}

export type Transformer<Output = SourceFile> = (
  opts: TransformOpts & {
    sourceFile: SourceFile
  },
) => Promise<Output>

const project = new Project({
  compilerOptions: {},
})

export async function transform(
  opts: TransformOpts,
  transformers: Transformer[] = [transformImport, transformRsc],
) {
  const virtualFile = path.join(
    '/__saas-ui-transform__',
    randomUUID(),
    path.basename(opts.filename),
  )
  const sourceFile = project.createSourceFile(virtualFile, opts.raw, {
    scriptKind: ScriptKind.TSX,
  })

  try {
    for (const transformer of transformers) {
      await transformer({ sourceFile, ...opts })
    }

    if (opts.transformJsx) {
      return await transformJsx({
        sourceFile,
        ...opts,
      })
    }

    return sourceFile.getText()
  } finally {
    project.removeSourceFile(sourceFile)
  }
}
