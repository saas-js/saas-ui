import { parsePackageDependencyReference } from '@saas-ui/registry/schema'

export interface PackageDependencySpec {
  name: string
  specifier?: string
  raw: string
}

export interface PackageDependencyIssue {
  kind: 'dependency-classification' | 'dependency-version'
  name: string
  declarations: string[]
  message: string
}

export interface ReconciledPackageDependencies {
  dependencies: string[]
  devDependencies: string[]
  issues: PackageDependencyIssue[]
}

export function parsePackageDependency(value: string): PackageDependencySpec {
  const raw = value.trim()
  const parsed = parsePackageDependencyReference(raw)
  if (!parsed) {
    throw new TypeError(
      `Invalid package dependency "${raw}"; expected a package name with an optional SemVer, partial SemVer, ^, or ~ selector.`,
    )
  }
  return {
    name: parsed.name,
    ...(parsed.selector ? { specifier: parsed.selector } : {}),
    raw,
  }
}

function dependencyNameForDiagnostic(value: string) {
  const raw = value.trim()
  const scopeSeparator = raw.indexOf('/')
  const selectorSeparator =
    raw.startsWith('@') && scopeSeparator !== -1
      ? raw.indexOf('@', scopeSeparator + 1)
      : raw.startsWith('@')
        ? -1
        : raw.indexOf('@')
  return selectorSeparator === -1 ? raw : raw.slice(0, selectorSeparator)
}

function reconcileClassification(values: readonly string[]) {
  const declarations = new Map<string, PackageDependencySpec[]>()
  const issues: PackageDependencyIssue[] = []
  for (const value of values) {
    let parsed: PackageDependencySpec
    try {
      parsed = parsePackageDependency(value)
    } catch (error) {
      const raw = value.trim()
      issues.push({
        kind: 'dependency-version',
        name: dependencyNameForDiagnostic(raw),
        declarations: [raw],
        message: error instanceof Error ? error.message : String(error),
      })
      continue
    }
    const entries = declarations.get(parsed.name) ?? []
    entries.push(parsed)
    declarations.set(parsed.name, entries)
  }

  const resolved = new Map<string, string>()
  for (const [name, entries] of [...declarations].sort(([left], [right]) =>
    left.localeCompare(right),
  )) {
    const explicit = [
      ...new Set(
        entries.flatMap((entry) =>
          entry.specifier === undefined ? [] : [entry.specifier],
        ),
      ),
    ].sort()
    if (explicit.length > 1) {
      const declared = [...new Set(entries.map((entry) => entry.raw))].sort()
      issues.push({
        kind: 'dependency-version',
        name,
        declarations: declared,
        message: `Conflicting explicit dependency specs for "${name}": ${declared.join(', ')}.`,
      })
    }
    const specifier = explicit[0]
    resolved.set(name, specifier ? `${name}@${specifier}` : name)
  }
  return { resolved, issues }
}

export function reconcilePackageDependencies(
  dependencies: readonly string[],
  devDependencies: readonly string[],
): ReconciledPackageDependencies {
  // A single explicit spec is more precise than an unversioned declaration.
  // Multiple different explicit specs are never guessed or range-intersected.
  const runtime = reconcileClassification(dependencies)
  const development = reconcileClassification(devDependencies)
  const issues = [...runtime.issues, ...development.issues]

  for (const name of [...runtime.resolved.keys()].sort()) {
    const runtimeDeclaration = runtime.resolved.get(name)
    const developmentDeclaration = development.resolved.get(name)
    if (!runtimeDeclaration || !developmentDeclaration) continue
    issues.push({
      kind: 'dependency-classification',
      name,
      declarations: [runtimeDeclaration, developmentDeclaration].sort(),
      message: `Dependency "${name}" is declared as both a runtime and development dependency.`,
    })
    development.resolved.delete(name)
  }

  return {
    dependencies: [...runtime.resolved.values()],
    devDependencies: [...development.resolved.values()],
    issues,
  }
}
