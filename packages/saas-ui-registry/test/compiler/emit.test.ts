import { createHash } from 'node:crypto'
import {
  access,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  symlink,
  writeFile,
} from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

import {
  type EmitRegistryInput,
  createEmitRegistryInput,
  createIconItemMetadata,
  createRegistryArtifacts,
  emitRegistryArtifacts,
} from '../../src/compiler/emit.js'
import { defineRegistryItem } from '../../src/compiler/index.js'
import type { RegistryDependencyGraph } from '../../src/compiler/model.js'

const input: EmitRegistryInput = {
  name: 'saas-ui',
  items: [
    {
      name: 'sidebar',
      type: 'registry:ui',
      dependencies: ['react', '@chakra-ui/react', 'react'],
      registryDependencies: ['menu-icon'],
      source: 'components/sidebar',
      categories: ['layout', 'navigation'],
      chunks: [
        {
          name: 'sidebar-shell',
          description: 'Application shell',
          component: 'SidebarShell',
          file: 'sidebar.tsx',
        },
      ],
      files: [
        {
          path: 'ui/sidebar/index.ts',
          type: 'registry:ui',
          content: "export * from './sidebar'\r\n",
        },
        {
          path: 'ui/sidebar/sidebar.tsx',
          type: 'registry:ui',
          content: 'export default function Sidebar() { return null }',
          hasRenderableDefaultExport: true,
        },
        {
          path: 'ui/sidebar/sidebar.stories.tsx',
          type: 'registry:ui',
          content: 'throw new Error("stories are not installable")',
        },
        {
          path: 'ui/sidebar/sidebar.test.tsx',
          type: 'registry:ui',
          content: 'throw new Error("tests are not installable")',
        },
        {
          path: 'ui/sidebar/sidebar.types.test-d.ts',
          type: 'registry:ui',
          content: 'export type TypeTest = true',
        },
        {
          path: 'ui/sidebar/sidebar.contract.spec-d.tsx',
          type: 'registry:ui',
          content: 'export type SpecTest = true',
        },
        {
          path: 'ui/sidebar/sidebar.behavior.type-test.ts',
          type: 'registry:ui',
          content: 'export type BehaviorTypeTest = true',
        },
        {
          path: 'ui/sidebar/sidebar.contract.d.ts',
          type: 'registry:ui',
          content: 'export interface SidebarContract { open: boolean }',
        },
      ],
      meta: { z: true, a: true },
    },
    {
      name: 'menu-icon',
      type: 'registry:icon',
      files: [
        {
          path: 'icons/menu-icon.tsx',
          type: 'registry:icon',
          content: 'export const MenuIcon = () => <svg />\n',
        },
      ],
      meta: {
        componentName: 'MenuIcon',
        iconName: 'Menu',
        iconSet: 'checked-in',
      },
    },
  ],
  iconMetadata: {
    Menu: { lucide: 'Menu', tabler: 'IconMenu2' },
  },
  iconLibraries: {
    lucide: { import: 'lucide-react' },
    tabler: { import: '@tabler/icons-react' },
  },
  diagnostics: [
    {
      severity: 'warning',
      code: 'example-warning',
      message: 'A deterministic warning',
      item: 'sidebar',
    },
  ],
}

async function snapshotDirectory(
  root: string,
): Promise<Record<string, string>> {
  const snapshot: Record<string, string> = {}

  async function visit(directory: string) {
    const entries = await readdir(directory, { withFileTypes: true })
    for (const entry of entries.sort((left, right) =>
      left.name.localeCompare(right.name, 'en'),
    )) {
      const filename = path.join(directory, entry.name)
      if (entry.isDirectory()) {
        await visit(filename)
      } else if (entry.isFile()) {
        snapshot[path.relative(root, filename)] = await readFile(
          filename,
          'utf8',
        )
      }
    }
  }

  await visit(root)
  return snapshot
}

function lockPath(outputDir: string, previewOutputDir: string) {
  const outputRoot = path.resolve(outputDir)
  const previewRoot = path.resolve(previewOutputDir)
  const identity = createHash('sha256')
    .update(`${outputRoot}\0${previewRoot}`)
    .digest('hex')
    .slice(0, 16)
  return path.join(
    path.dirname(outputRoot),
    `.${path.basename(outputRoot)}.registry-${identity}.lock`,
  )
}

describe('registry artifact emitter', () => {
  it('exports the config authoring helper from the compiler-only API', () => {
    const config = defineRegistryItem({
      description: 'A typed registry item',
      meta: { exclusiveGroup: 'provider' },
    })

    expect(config).toEqual({
      description: 'A typed registry item',
      meta: { exclusiveGroup: 'provider' },
    })
  })

  it('is deterministic regardless of item, file, or dependency order', () => {
    const first = createRegistryArtifacts(input)
    const second = createRegistryArtifacts({
      ...input,
      items: input.items
        .map((item) => ({
          ...item,
          dependencies: [...(item.dependencies ?? [])].reverse(),
          files: [...item.files].reverse(),
        }))
        .reverse(),
    })

    expect(second).toEqual(first)
    expect(first.files.every((file) => file.content.endsWith('\n'))).toBe(true)
  })

  it('emits authored display order and orders indexes deterministically', () => {
    const artifacts = createRegistryArtifacts({
      items: [
        {
          name: 'alpha-unordered',
          type: 'registry:ui',
          files: [
            {
              path: 'ui/alpha-unordered/alpha-unordered.tsx',
              content: 'export default function Alpha() { return null }',
              type: 'registry:ui',
              hasRenderableDefaultExport: true,
            },
          ],
        },
        {
          name: 'charlie-second',
          order: 20,
          type: 'registry:ui',
          files: [
            {
              path: 'ui/charlie-second/charlie-second.tsx',
              content: 'export default function Charlie() { return null }',
              type: 'registry:ui',
              hasRenderableDefaultExport: true,
            },
          ],
        },
        {
          name: 'bravo-first',
          order: 10,
          type: 'registry:ui',
          files: [
            {
              path: 'ui/bravo-first/bravo-first.tsx',
              content: 'export default function Bravo() { return null }',
              type: 'registry:ui',
              hasRenderableDefaultExport: true,
            },
          ],
        },
      ],
    })
    const index = JSON.parse(
      artifacts.files.find((file) => file.path === 'index.json')?.content ??
        '[]',
    )
    const preview =
      artifacts.files.find((file) => file.path === '__registry__/index.tsx')
        ?.content ?? ''

    expect(index.map((item: { name: string }) => item.name)).toEqual([
      'bravo-first',
      'charlie-second',
      'alpha-unordered',
    ])
    expect(index.map((item: { order?: number }) => item.order)).toEqual([
      10,
      20,
      undefined,
    ])
    expect(preview.indexOf('bravo-first')).toBeLessThan(
      preview.indexOf('charlie-second'),
    )
    expect(preview.indexOf('charlie-second')).toBeLessThan(
      preview.indexOf('alpha-unordered'),
    )
  })

  it('embeds checked-in source, hashes items, and selects the primary component', () => {
    const artifacts = createRegistryArtifacts(input)
    const item = artifacts.files.find(
      (file) => file.path === 'styles/default/sidebar.json',
    )
    const preview = artifacts.files.find(
      (file) => file.path === '__registry__/index.tsx',
    )
    const iconMetadata = artifacts.files.find(
      (file) => file.path === 'icons/index.json',
    )
    const iconPreview = artifacts.files.find(
      (file) => file.path === '__registry__/icons.tsx',
    )
    const payload = JSON.parse(item?.content ?? '{}')

    expect(item?.content).toContain('export default function Sidebar()')
    expect(item?.content).not.toContain('stories are not installable')
    expect(item?.content).not.toContain('tests are not installable')
    expect(item?.content).not.toContain('export type TypeTest')
    expect(item?.content).not.toContain('export type SpecTest')
    expect(item?.content).not.toContain('export type BehaviorTypeTest')
    expect(item?.content).toContain('export interface SidebarContract')
    expect(item?.content).toContain('contentHash')
    expect(payload).toMatchObject({
      source: 'components/sidebar',
      categories: ['layout', 'navigation'],
      chunks: [{ name: 'sidebar-shell' }],
    })
    expect(payload.files[0]).not.toHaveProperty('hasRenderableDefaultExport')
    expect(preview?.content).toContain(
      'React.lazy(() => import("@/registry/default/ui/sidebar/sidebar.tsx"))',
    )
    expect(preview?.content).toContain('source: "components/sidebar"')
    expect(preview?.content).toContain('categories: ["layout","navigation"]')
    expect(preview?.content).toContain('"sidebar-shell"')
    expect(preview?.content).not.toContain(
      'React.lazy(() => import("@/registry/default/ui/sidebar/index.ts"))',
    )
    expect(iconMetadata?.content).toContain('IconMenu2')
    expect(iconPreview?.content).toContain('import("@tabler/icons-react").then')
    expect(iconPreview?.content).toContain('module["IconMenu2"]')
    expect(artifacts.validationReport).toMatchObject({
      valid: true,
      errors: 0,
      warnings: 1,
      items: 2,
    })
  })

  it('rejects raw Storybook metadata as an explicit preview', () => {
    const previewInput: EmitRegistryInput = {
      items: [
        {
          name: 'sidebar',
          type: 'registry:ui',
          preview: 'ui/sidebar/sidebar.stories.tsx',
          files: [
            {
              path: 'ui/sidebar/sidebar.tsx',
              content: 'export function Sidebar() { return null }',
              type: 'registry:ui',
            },
            {
              path: 'ui/sidebar/sidebar.stories.tsx',
              content: 'export default { title: "Sidebar" }',
              type: 'registry:ui',
            },
          ],
        },
      ],
    }
    const artifacts = createRegistryArtifacts(previewInput)
    const preview = artifacts.files.find(
      (file) => file.path === '__registry__/index.tsx',
    )
    const payload = artifacts.files.find(
      (file) => file.path === 'styles/default/sidebar.json',
    )

    expect(preview?.content).toContain('export const Index')
    expect(preview?.content).toContain('"sidebar": {')
    expect(preview?.content).toContain(
      'preview: "ui/sidebar/sidebar.stories.tsx"',
    )
    expect(preview?.content).not.toContain('React.lazy')
    expect(payload?.content).not.toContain('sidebar.stories.tsx')
    expect(payload?.content).not.toContain('title:')
    expect(artifacts.validationReport.diagnostics).toContainEqual(
      expect.objectContaining({
        code: 'preview-default-export-not-renderable',
        item: 'sidebar',
        severity: 'error',
      }),
    )
  })

  it('preserves external preview ids without treating them as modules', () => {
    const artifacts = createRegistryArtifacts({
      items: [
        {
          name: 'add-contact-drawer',
          type: 'registry:block',
          preview: 'blocks-drawers-add-contact-drawer--default',
          files: [
            {
              path: 'blocks/drawers/add-contact-drawer/add-contact-drawer.tsx',
              content: 'export const AddContactDrawer = () => null',
              type: 'registry:block',
              hasRenderableDefaultExport: false,
            },
          ],
        },
      ],
    })
    const preview = artifacts.files.find(
      (file) => file.path === '__registry__/index.tsx',
    )
    const index = JSON.parse(
      artifacts.files.find((file) => file.path === 'index.json')?.content ??
        '[]',
    )
    const payload = JSON.parse(
      artifacts.files.find(
        (file) => file.path === 'styles/default/add-contact-drawer.json',
      )?.content ?? '{}',
    )

    expect(index[0].preview).toBe('blocks-drawers-add-contact-drawer--default')
    expect(payload.preview).toBe('blocks-drawers-add-contact-drawer--default')
    expect(preview?.content).toContain(
      'preview: "blocks-drawers-add-contact-drawer--default"',
    )
    expect(preview?.content).not.toContain(
      'import("blocks-drawers-add-contact-drawer--default")',
    )
    expect(artifacts.validationReport).toMatchObject({
      valid: true,
      errors: 0,
    })
    const withoutPreview = createRegistryArtifacts({
      items: [
        {
          name: 'add-contact-drawer',
          type: 'registry:block',
          files: [
            {
              path: 'blocks/drawers/add-contact-drawer/add-contact-drawer.tsx',
              content: 'export const AddContactDrawer = () => null',
              type: 'registry:block',
              hasRenderableDefaultExport: false,
            },
          ],
        },
      ],
    })
    expect(artifacts.contentHashes['add-contact-drawer']).toBe(
      withoutPreview.contentHashes['add-contact-drawer'],
    )
  })

  it('does not lazy-load a named-only component without default-export proof', () => {
    const artifacts = createRegistryArtifacts({
      items: [
        {
          name: 'named-only',
          type: 'registry:ui',
          files: [
            {
              path: 'ui/named-only/named-only.tsx',
              content: 'export function NamedOnly() { return null }',
              type: 'registry:ui',
              hasRenderableDefaultExport: false,
            },
          ],
        },
      ],
    })
    const preview = artifacts.files.find(
      (file) => file.path === '__registry__/index.tsx',
    )

    expect(preview?.content).toContain('"named-only": {')
    expect(preview?.content).toContain(
      'preview: "ui/named-only/named-only.tsx"',
    )
    expect(preview?.content).not.toContain('React.lazy')
    expect(artifacts.validationReport.diagnostics).toContainEqual(
      expect.objectContaining({
        code: 'preview-default-export-not-renderable',
        item: 'named-only',
        severity: 'info',
      }),
    )
  })

  it('never exposes an injected type-test file as a preview', () => {
    const artifacts = createRegistryArtifacts({
      items: [
        {
          name: 'type-probe',
          type: 'registry:example',
          preview: 'examples/type-probe/type-probe.test-d.ts',
          previewAnalysis: {
            path: 'examples/type-probe/type-probe.test-d.ts',
            hasRenderableDefaultExport: true,
          },
          files: [
            {
              path: 'examples/type-probe/type-probe.test-d.ts',
              content: 'export type TypeProbe = true',
              type: 'registry:example',
              hasRenderableDefaultExport: true,
            },
          ],
        },
      ],
    })
    const preview = artifacts.files.find(
      (file) => file.path === '__registry__/index.tsx',
    )

    expect(preview?.content).not.toContain('type-probe.test-d.ts')
    expect(preview?.content).not.toContain('React.lazy')
    expect(artifacts.validationReport.diagnostics).toContainEqual(
      expect.objectContaining({
        code: 'preview-type-test-source',
        item: 'type-probe',
        severity: 'error',
      }),
    )
  })

  it('keeps registry examples preview-only', () => {
    const artifacts = createRegistryArtifacts({
      items: [
        {
          name: 'sidebar-example',
          type: 'registry:example',
          files: [
            {
              path: 'examples/sidebar-example/sidebar-example.tsx',
              content: 'export default function Example() { return null }',
              type: 'registry:example',
              hasRenderableDefaultExport: true,
            },
          ],
        },
      ],
    })
    const paths = artifacts.files.map((file) => file.path)
    const index = JSON.parse(
      artifacts.files.find((file) => file.path === 'index.json')?.content ??
        '[]',
    )
    const preview = artifacts.files.find(
      (file) => file.path === '__registry__/index.tsx',
    )

    expect(index).toEqual([])
    expect(paths).not.toContain('styles/default/sidebar-example.json')
    expect(preview?.content).toContain(
      'React.lazy(() => import("@/registry/default/examples/sidebar-example/sidebar-example.tsx"))',
    )
  })

  it('writes identical files twice and safely removes stale managed artifacts', async () => {
    const root = await mkdtemp(path.join(tmpdir(), 'saas-ui-registry-emit-'))
    const outputDir = path.join(root, 'public', 'r')
    const previewOutputDir = path.join(root, '__registry__')

    const first = await emitRegistryArtifacts(input, {
      outputDir,
      previewOutputDir,
    })
    const firstIndex = await readFile(
      path.join(outputDir, 'index.json'),
      'utf8',
    )

    await emitRegistryArtifacts(input, { outputDir, previewOutputDir })
    expect(await readFile(path.join(outputDir, 'index.json'), 'utf8')).toBe(
      firstIndex,
    )

    await writeFile(path.join(outputDir, 'schema.json'), '{}\n', 'utf8')
    const outsideVictim = path.join(root, 'outside-victim.json')
    await writeFile(outsideVictim, 'keep\n', 'utf8')
    await writeFile(
      path.join(outputDir, '.registry-artifacts.json'),
      JSON.stringify({
        files: [
          'styles/default/sidebar.json',
          '../outside-victim.json',
          '..\\outside-victim.json',
        ],
        previewFiles: ['../outside-preview.tsx'],
      }),
      'utf8',
    )
    const withoutSidebar: EmitRegistryInput = {
      ...input,
      items: input.items.filter((item) => item.name !== 'sidebar'),
    }
    await emitRegistryArtifacts(withoutSidebar, {
      outputDir,
      previewOutputDir,
    })

    const updatedIndex = await readFile(
      path.join(outputDir, 'index.json'),
      'utf8',
    )
    expect(updatedIndex).not.toBe(firstIndex)
    expect(updatedIndex).not.toContain('sidebar')
    expect(await readFile(path.join(outputDir, 'schema.json'), 'utf8')).toBe(
      '{}\n',
    )
    await expect(
      access(path.join(outputDir, 'styles/default/sidebar.json')),
    ).rejects.toThrow()
    expect(await readFile(outsideVictim, 'utf8')).toBe('keep\n')
    expect(
      await readFile(path.join(previewOutputDir, 'index.tsx'), 'utf8'),
    ).not.toContain('sidebar.tsx')
    expect(
      await readFile(path.join(previewOutputDir, 'icons.tsx'), 'utf8'),
    ).toContain('lucide-react')
    expect(first.files.length).toBeGreaterThan(5)
  })

  it('stages both roots before commit and leaves them byte-identical on a pre-commit fault', async () => {
    const root = await mkdtemp(path.join(tmpdir(), 'saas-ui-registry-fault-'))
    const outputDir = path.join(root, 'public', 'r')
    const previewOutputDir = path.join(root, '__registry__')
    await emitRegistryArtifacts(input, { outputDir, previewOutputDir })
    const publicBefore = await snapshotDirectory(outputDir)
    const previewBefore = await snapshotDirectory(previewOutputDir)
    const replacement: EmitRegistryInput = {
      ...input,
      items: input.items.filter((item) => item.name !== 'sidebar'),
    }

    await expect(
      emitRegistryArtifacts(replacement, {
        outputDir,
        previewOutputDir,
        transaction: {
          onPhase(phase) {
            if (phase === 'before-commit') {
              throw new Error('injected pre-commit failure')
            }
          },
        },
      }),
    ).rejects.toThrow('injected pre-commit failure')

    expect(await snapshotDirectory(outputDir)).toEqual(publicBefore)
    expect(await snapshotDirectory(previewOutputDir)).toEqual(previewBefore)
  })

  it('rolls the public root back when the disjoint preview commit fails', async () => {
    const root = await mkdtemp(
      path.join(tmpdir(), 'saas-ui-registry-rollback-'),
    )
    const outputDir = path.join(root, 'public', 'r')
    const previewOutputDir = path.join(root, 'previews', '__registry__')
    await emitRegistryArtifacts(input, { outputDir, previewOutputDir })
    const publicBefore = await snapshotDirectory(outputDir)
    const previewBefore = await snapshotDirectory(previewOutputDir)
    const replacement: EmitRegistryInput = {
      ...input,
      items: input.items.filter((item) => item.name !== 'sidebar'),
    }

    await expect(
      emitRegistryArtifacts(replacement, {
        outputDir,
        previewOutputDir,
        transaction: {
          onPhase(phase) {
            if (phase === 'public-committed') {
              throw new Error('injected commit failure')
            }
          },
        },
      }),
    ).rejects.toThrow('injected commit failure')

    expect(await snapshotDirectory(outputDir)).toEqual(publicBefore)
    expect(await snapshotDirectory(previewOutputDir)).toEqual(previewBefore)
  })

  it('serializes concurrent writers and publishes one complete generation and manifest', async () => {
    const root = await mkdtemp(
      path.join(tmpdir(), 'saas-ui-registry-concurrent-'),
    )
    const outputDir = path.join(root, 'public', 'r')
    const previewOutputDir = path.join(root, '__registry__')
    let releaseFirst!: () => void
    let firstIsStaged!: () => void
    const gate = new Promise<void>((resolve) => {
      releaseFirst = resolve
    })
    const staged = new Promise<void>((resolve) => {
      firstIsStaged = resolve
    })
    const secondPhases: string[] = []
    const finalInput: EmitRegistryInput = {
      ...input,
      items: input.items.filter((item) => item.name !== 'sidebar'),
    }

    const first = emitRegistryArtifacts(input, {
      outputDir,
      previewOutputDir,
      transaction: {
        async onPhase(phase) {
          if (phase === 'before-commit') {
            firstIsStaged()
            await gate
          }
        },
      },
    })
    await staged
    const second = emitRegistryArtifacts(finalInput, {
      outputDir,
      previewOutputDir,
      transaction: {
        onPhase(phase) {
          secondPhases.push(phase)
        },
      },
    })
    await new Promise((resolve) => setTimeout(resolve, 75))
    expect(secondPhases).toEqual([])
    releaseFirst()
    await Promise.all([first, second])

    const finalArtifacts = createRegistryArtifacts(finalInput)
    const manifest = JSON.parse(
      await readFile(path.join(outputDir, '.registry-artifacts.json'), 'utf8'),
    ) as { files: string[]; previewFiles: string[] }
    expect(manifest.files).toEqual(
      finalArtifacts.files
        .filter((artifact) => !artifact.path.startsWith('__registry__/'))
        .map((artifact) => artifact.path)
        .sort(),
    )
    expect(manifest.previewFiles).toEqual(['icons.tsx', 'index.tsx'])
    await expect(
      access(path.join(outputDir, 'styles/default/sidebar.json')),
    ).rejects.toThrow()
    expect(await readFile(path.join(outputDir, 'index.json'), 'utf8')).toBe(
      finalArtifacts.files.find((artifact) => artifact.path === 'index.json')
        ?.content,
    )
    expect(
      await readFile(path.join(previewOutputDir, 'index.tsx'), 'utf8'),
    ).toBe(
      finalArtifacts.files.find(
        (artifact) => artifact.path === '__registry__/index.tsx',
      )?.content,
    )
    expect(secondPhases).toContain('committed')
    expect(
      (await readdir(path.dirname(outputDir))).filter((entry) =>
        entry.includes('.registry-'),
      ),
    ).toEqual([])
  })

  it('recovers a stale writer lock before publishing', async () => {
    const root = await mkdtemp(path.join(tmpdir(), 'saas-ui-registry-stale-'))
    const outputDir = path.join(root, 'public', 'r')
    const previewOutputDir = path.join(root, '__registry__')
    const staleLock = lockPath(outputDir, previewOutputDir)
    await mkdir(staleLock, { recursive: true })
    await writeFile(
      path.join(staleLock, 'owner.json'),
      JSON.stringify({
        pid: 2_147_483_647,
        token: 'abandoned',
        updatedAt: Date.now() - 60_000,
      }),
      'utf8',
    )

    await emitRegistryArtifacts(input, {
      outputDir,
      previewOutputDir,
      transaction: {
        lockPollMs: 5,
        lockTimeoutMs: 500,
        staleLockMs: 25,
      },
    })

    expect(
      await readFile(path.join(outputDir, 'index.json'), 'utf8'),
    ).toContain('sidebar')
    await expect(access(staleLock)).rejects.toThrow()
  })

  it('cleans stale legacy item JSON on the first manifested run', async () => {
    const root = await mkdtemp(path.join(tmpdir(), 'saas-ui-registry-legacy-'))
    const outputDir = path.join(root, 'public', 'r')
    const staleItem = path.join(
      outputDir,
      'styles',
      'default',
      'removed-item.json',
    )
    await mkdir(path.dirname(staleItem), { recursive: true })
    await writeFile(staleItem, '{}\n', 'utf8')

    await emitRegistryArtifacts(input, { outputDir })

    await expect(access(staleItem)).rejects.toThrow()
  })

  it('refuses to write or clean through a symlinked managed parent', async () => {
    const root = await mkdtemp(path.join(tmpdir(), 'saas-ui-registry-link-'))
    const outputDir = path.join(root, 'public', 'r')
    const outsideStyle = path.join(root, 'outside-style')
    const outsideVictim = path.join(outsideStyle, 'victim.json')
    await mkdir(path.join(outputDir, 'styles'), { recursive: true })
    await mkdir(outsideStyle, { recursive: true })
    await writeFile(outsideVictim, 'keep\n', 'utf8')
    await symlink(outsideStyle, path.join(outputDir, 'styles', 'default'))

    await expect(emitRegistryArtifacts(input, { outputDir })).rejects.toThrow(
      'symbolic link',
    )
    expect(await readFile(outsideVictim, 'utf8')).toBe('keep\n')
  })

  it('emits versioned JSON schemas from the shared contract', () => {
    const artifacts = createRegistryArtifacts(input)
    const itemSchema = JSON.parse(
      artifacts.files.find((file) => file.path === 'schema/registry-item.json')
        ?.content ?? '{}',
    )
    const registrySchema = JSON.parse(
      artifacts.files.find((file) => file.path === 'schema/registry.json')
        ?.content ?? '{}',
    )
    const componentsSchema = JSON.parse(
      artifacts.files.find((file) => file.path === 'schema/components.json')
        ?.content ?? '{}',
    )

    expect(itemSchema['x-registry-schema-version']).toBe(1)
    expect(itemSchema.properties.schemaVersion).toMatchObject({
      const: 1,
      default: 1,
    })
    expect(itemSchema.properties.type.enum).toEqual(
      expect.arrayContaining([
        'registry:setup',
        'registry:ui',
        'registry:component',
        'registry:lib',
        'registry:hook',
        'registry:icon',
        'registry:block',
        'registry:example',
      ]),
    )
    expect(registrySchema['x-registry-schema-version']).toBe(1)
    expect(registrySchema.properties.schemaVersion).toMatchObject({
      const: 1,
      default: 1,
    })
    expect(componentsSchema.$id).toBe(
      'https://saas-ui.dev/r/schema/components.json',
    )
    expect(componentsSchema.properties.registries).toBeDefined()
    expect(componentsSchema.properties.installed).toMatchObject({
      default: [],
      type: 'array',
    })
  })

  it('preserves compiler analysis and configured icon metadata', () => {
    const graph = {
      edges: [],
      diagnostics: [],
      items: [
        {
          name: 'menu-icon',
          type: 'registry:icon',
          relativeDirectory: 'icons',
          sourceBasePath: '/repo/registry/default',
          metadata: {},
          dependencies: [],
          devDependencies: [],
          registryDependencies: [],
          client: true,
          iconDependencies: [],
          presetImports: ['@saas-ui/chakra-preset'],
          recipeReferences: ['suiSidebar'],
          presetRecipeBindings: ['suiSidebar'],
          files: [
            {
              path: 'icons/menu-icon.tsx',
              content: 'export const MenuIcon = () => <svg />',
              hash: 'checked-in-source-hash',
              hasRenderableDefaultExport: false,
            },
          ],
        },
      ],
    } as unknown as RegistryDependencyGraph
    const adapted = createEmitRegistryInput(graph, {
      iconItemMetadata: {
        'menu-icon': {
          componentName: 'MenuIcon',
          iconSet: 'lucide',
          iconName: 'Menu',
        },
      },
    })
    const artifacts = createRegistryArtifacts(adapted)
    const payload = JSON.parse(
      artifacts.files.find(
        (file) => file.path === 'styles/default/menu-icon.json',
      )?.content ?? '{}',
    )

    expect(payload.meta).toMatchObject({
      componentName: 'MenuIcon',
      iconSet: 'lucide',
      iconName: 'Menu',
      compiler: {
        client: true,
        fileHashes: {
          'icons/menu-icon.tsx': 'checked-in-source-hash',
        },
        presetImports: ['@saas-ui/chakra-preset'],
        recipeReferences: ['suiSidebar'],
        presetRecipeBindings: ['suiSidebar'],
      },
    })
  })

  it('derives installable icon item metadata from the checked-in catalog shape', () => {
    expect(
      createIconItemMetadata({
        Close: { lucide: 'X', tabler: 'IconX' },
        ViewOff: { lucide: 'EyeOff', tabler: 'IconEyeOff' },
      }),
    ).toEqual({
      'close-icon': {
        componentName: 'CloseIcon',
        iconSet: 'lucide',
        iconName: 'X',
      },
      'view-off-icon': {
        componentName: 'ViewOffIcon',
        iconSet: 'lucide',
        iconName: 'EyeOff',
      },
    })
  })

  it('diagnoses and excludes discovered icons missing from the catalog', () => {
    const iconSource = (name: string): EmitRegistryInput['items'][number] => ({
      name,
      type: 'registry:icon',
      files: [
        {
          path: `icons/${name}.tsx`,
          type: 'registry:icon',
          content: 'export const Icon = () => null',
        },
      ],
    })
    const artifacts = createRegistryArtifacts({
      items: [
        iconSource('close-icon'),
        iconSource('hamburger-icon'),
        iconSource('menu-icon'),
        iconSource('x-icon'),
      ],
      iconMetadata: {
        Close: { lucide: 'X' },
        Hamburger: { lucide: 'Menu' },
      },
    })
    const paths = artifacts.files.map((file) => file.path)

    expect(paths).toContain('styles/default/close-icon.json')
    expect(paths).toContain('styles/default/hamburger-icon.json')
    expect(paths).not.toContain('styles/default/menu-icon.json')
    expect(paths).not.toContain('styles/default/x-icon.json')
    expect(artifacts.validationReport.diagnostics).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: 'icon-source-not-in-catalog',
          item: 'menu-icon',
        }),
        expect.objectContaining({
          code: 'icon-source-not-in-catalog',
          item: 'x-icon',
        }),
      ]),
    )
  })
})
