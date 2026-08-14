import { Node, Project, ScriptKind, SyntaxKind, ts } from 'ts-morph'
import { z } from 'zod'

import {
  blockChunkSchema,
  npmPackageNameSchema,
  npmPackageSelectorSchema,
  registryItemVersionSchema,
} from '../schema.js'
import type { RegistryCompilerDiagnostic, RegistryItemConfig } from './model.js'
import { isSafeRelativePath } from './path-utils.js'

interface StaticConfigResult {
  config: RegistryItemConfig
  diagnostics: RegistryCompilerDiagnostic[]
}

const safeRelativePathSchema = z
  .string()
  .refine(isSafeRelativePath, 'Path must be safe and relative')

const registryItemConfigSchema = z
  .object({
    version: registryItemVersionSchema.optional(),
    description: z.string().optional(),
    private: z.boolean().optional(),
    category: z.string().optional(),
    subcategory: z.string().optional(),
    categories: z.array(z.string()).optional(),
    docs: z.string().optional(),
    source: z.string().optional(),
    order: z.number().optional(),
    preview: z.string().optional(),
    primaryFile: z.string().optional(),
    include: z.array(safeRelativePathSchema).optional(),
    exclude: z.array(safeRelativePathSchema).optional(),
    targets: z.record(z.string(), safeRelativePathSchema).optional(),
    dependencyVersions: z
      .record(npmPackageNameSchema, npmPackageSelectorSchema)
      .optional(),
    chunks: z.array(blockChunkSchema.strict()).optional(),
    canvas: z.record(z.string(), z.unknown()).optional(),
    meta: z
      .object({
        exclusiveGroup: z.unknown().optional(),
        exclusiveDefault: z.unknown().optional(),
        conflicts: z.unknown().optional(),
      })
      .strict()
      .optional(),
  })
  .strict()

function syntaxDiagnostics(filePath: string, content: string) {
  const sourceFile = ts.createSourceFile(
    filePath,
    content,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  ) as ts.SourceFile & { parseDiagnostics?: readonly ts.Diagnostic[] }

  return (sourceFile.parseDiagnostics ?? []).map(
    (diagnostic): RegistryCompilerDiagnostic => ({
      code: 'config-syntax-error',
      message: ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'),
      severity: 'error',
      stage: 'discovery',
      filePath,
    }),
  )
}

function schemaDiagnostics(filePath: string, error: z.ZodError) {
  return error.issues.map((issue): RegistryCompilerDiagnostic => {
    const unknownKeys =
      issue.code === 'unrecognized_keys' ? issue.keys : undefined
    return {
      code: unknownKeys ? 'config-unknown-key' : 'config-invalid',
      message: unknownKeys
        ? `Unknown config ${unknownKeys.length === 1 ? 'key' : 'keys'}: ${unknownKeys
            .map((key) =>
              key === 'isPrivate'
                ? '"isPrivate" (use "private" instead)'
                : `"${key}"`,
            )
            .join(', ')}`
        : `${issue.path.join('.') || 'config'}: ${issue.message}`,
      severity: 'error',
      stage: 'discovery',
      filePath,
    }
  })
}

function unwrapExpression(node: Node): Node {
  if (
    Node.isAsExpression(node) ||
    Node.isSatisfiesExpression(node) ||
    Node.isParenthesizedExpression(node)
  ) {
    return unwrapExpression(node.getExpression())
  }

  if (Node.isCallExpression(node)) {
    const expression = node.getExpression().getText()
    const args = node.getArguments()
    if (expression === 'defineRegistryItem' && args.length === 1) {
      return unwrapExpression(args[0])
    }
  }

  return node
}

function readStaticValue(node: Node): unknown {
  const value = unwrapExpression(node)

  if (
    Node.isStringLiteral(value) ||
    Node.isNoSubstitutionTemplateLiteral(value)
  ) {
    return value.getLiteralValue()
  }
  if (Node.isNumericLiteral(value)) {
    return Number(value.getText())
  }
  if (value.getKind() === SyntaxKind.TrueKeyword) {
    return true
  }
  if (value.getKind() === SyntaxKind.FalseKeyword) {
    return false
  }
  if (value.getKind() === SyntaxKind.NullKeyword) {
    return null
  }
  if (Node.isPrefixUnaryExpression(value)) {
    const operand = readStaticValue(value.getOperand())
    if (typeof operand !== 'number') {
      throw new TypeError('Unary expressions must contain a numeric literal')
    }
    return value.getOperatorToken() === SyntaxKind.MinusToken
      ? -operand
      : operand
  }
  if (Node.isArrayLiteralExpression(value)) {
    return value.getElements().map((element) => readStaticValue(element))
  }
  if (Node.isObjectLiteralExpression(value)) {
    const result: Record<string, unknown> = {}
    for (const property of value.getProperties()) {
      if (!Node.isPropertyAssignment(property)) {
        throw new TypeError(
          `Unsupported object member ${property.getKindName()}; use explicit literal properties`,
        )
      }
      const nameNode = property.getNameNode()
      const name =
        Node.isStringLiteral(nameNode) || Node.isNumericLiteral(nameNode)
          ? nameNode.getLiteralValue().toString()
          : property.getName()
      result[name] = readStaticValue(property.getInitializerOrThrow())
    }
    return result
  }

  throw new TypeError(
    `Unsupported ${value.getKindName()}; registry config values must be static literals`,
  )
}

export function parseStaticRegistryItemConfig(
  filePath: string,
  content: string,
): StaticConfigResult {
  const parseDiagnostics = syntaxDiagnostics(filePath, content)
  if (parseDiagnostics.length > 0) {
    return { config: {}, diagnostics: parseDiagnostics }
  }
  const project = new Project({ useInMemoryFileSystem: true })
  const sourceFile = project.createSourceFile(filePath, content, {
    scriptKind: ScriptKind.TS,
  })
  const exportAssignment = sourceFile.getExportAssignment(
    (assignment) => !assignment.isExportEquals(),
  )

  if (!exportAssignment) {
    return {
      config: {},
      diagnostics: [
        {
          code: 'config-missing-default-export',
          message: 'component.config.ts must have a default export',
          severity: 'error',
          stage: 'discovery',
          filePath,
        },
      ],
    }
  }

  try {
    const value = readStaticValue(exportAssignment.getExpression())
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      throw new TypeError('The default export must be an object literal')
    }
    const parsed = registryItemConfigSchema.safeParse(value)
    if (!parsed.success) {
      return {
        config: {},
        diagnostics: schemaDiagnostics(filePath, parsed.error),
      }
    }
    // The static schema deliberately retains unknown exclusivity values so the
    // validation stage can emit stable, field-specific diagnostics. The
    // authored helper type remains strict for TypeScript consumers.
    return { config: parsed.data as RegistryItemConfig, diagnostics: [] }
  } catch (error) {
    return {
      config: {},
      diagnostics: [
        {
          code: 'config-not-static',
          message:
            error instanceof Error
              ? error.message
              : 'Registry config could not be read statically',
          severity: 'error',
          stage: 'discovery',
          filePath,
        },
      ],
    }
  }
}
