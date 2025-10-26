import fg from 'fast-glob'
import fs from 'fs-extra'
import path from 'node:path'
import { loadConfig } from 'tsconfig-paths'

import { SCHEMA_URL } from '#constants'
import { FRAMEWORKS, type Framework } from '#utils/frameworks'
import {
  type Config,
  type RawConfig,
  getConfig,
  resolveConfigPaths,
} from '#utils/get-config'
import { getPackageInfo } from '#utils/get-package-info'

import { SYSTEMS, type System } from './systems'

type ProjectInfo = {
  framework: Framework
  system: System | null
  isSrcDir: boolean
  isTsx: boolean
  isRSC: boolean
  aliasPrefix: string | null
}

const PROJECT_SHARED_IGNORE = [
  '**/node_modules/**',
  '.next',
  'public',
  'dist',
  'build',
]

export async function getProjectInfo(cwd: string): Promise<ProjectInfo | null> {
  const [configFiles, isSrcDir, isTsx, aliasPrefix, packageJson] =
    await Promise.all([
      fg.glob('**/{next,vite,astro}.config.*|gatsby-config.*|composer.json', {
        cwd,
        deep: 3,
        ignore: PROJECT_SHARED_IGNORE,
      }),
      fs.pathExists(path.resolve(cwd, 'src')),
      isTypeScriptProject(cwd),
      getTsConfigAliasPrefix(cwd),
      getPackageInfo(cwd, false),
    ])

  const isUsingAppDir = await fs.pathExists(
    path.resolve(cwd, `${isSrcDir ? 'src/' : ''}app`),
  )

  const type: ProjectInfo = {
    framework: FRAMEWORKS['manual'],
    system: null,
    isSrcDir,
    isRSC: false,
    isTsx,
    aliasPrefix: aliasPrefix ?? null,
  }

  // Chakra UI
  if (
    Object.keys(packageJson?.dependencies ?? {}).find((dep) =>
      dep.startsWith('@chakra-ui/'),
    )
  ) {
    type.system = SYSTEMS['chakra']
  }

  // Panda CSS
  if (
    Object.keys(packageJson?.devDependencies ?? {}).find((dep) =>
      dep.startsWith('@pandacss/dev'),
    )
  ) {
    type.system = SYSTEMS['panda']
  }

  // Next.js.
  if (configFiles.find((file) => file.startsWith('next.config.'))?.length) {
    type.framework = isUsingAppDir
      ? FRAMEWORKS['next-app']
      : FRAMEWORKS['next-pages']
    type.isRSC = isUsingAppDir
    return type
  }

  // Tanstack Start.
  if (
    Object.keys(packageJson?.dependencies ?? {}).find((dep) =>
      dep.startsWith('@tanstack/react-start'),
    )
  ) {
    type.framework = FRAMEWORKS['tanstack-start']
    return type
  }

  // Vite.
  // Some Remix templates also have a vite.config.* file.
  // We'll assume that it got caught by the Remix check above.
  if (configFiles.find((file) => file.startsWith('vite.config.'))?.length) {
    type.framework = FRAMEWORKS['vite']
    return type
  }

  return type
}

export async function getTsConfigAliasPrefix(cwd: string) {
  const tsConfig = await loadConfig(cwd)

  if (tsConfig?.resultType === 'failed' || !tsConfig?.paths) {
    return null
  }

  // This assume that the first alias is the prefix.
  for (const [alias, paths] of Object.entries(tsConfig.paths)) {
    if (
      paths.includes('./*') ||
      paths.includes('./src/*') ||
      paths.includes('./app/*') ||
      paths.includes('./resources/js/*') // Laravel.
    ) {
      return alias.at(0) ?? null
    }
  }

  return null
}

export async function isTypeScriptProject(cwd: string) {
  const files = await fg.glob('tsconfig.*', {
    cwd,
    deep: 1,
    ignore: PROJECT_SHARED_IGNORE,
  })

  return files.length > 0
}

export async function getTsConfig(cwd: string = process.cwd()) {
  try {
    const tsconfigPath = path.resolve(cwd, 'tsconfig.json')
    const tsconfig = await fs.readJSON(tsconfigPath)

    if (!tsconfig) {
      throw new Error('tsconfig.json is missing')
    }

    return tsconfig
  } catch (error) {
    return null
  }
}

export async function getProjectConfig(
  cwd: string,
  defaultProjectInfo: ProjectInfo | null = null,
): Promise<Config | null> {
  // Check for existing component config.
  const [existingConfig, projectInfo] = await Promise.all([
    getConfig(cwd),
    !defaultProjectInfo
      ? getProjectInfo(cwd)
      : Promise.resolve(defaultProjectInfo),
  ])

  if (existingConfig) {
    return existingConfig
  }

  if (!projectInfo) {
    return null
  }

  const config: RawConfig = {
    $schema: SCHEMA_URL,
    rsc: projectInfo.isRSC,
    tsx: projectInfo.isTsx,
    system: projectInfo.system?.name ?? SYSTEMS.chakra.name,
    style: 'default',
    aliases: {
      components: `${projectInfo.aliasPrefix}components`,
      ui: `${projectInfo.aliasPrefix}components/ui`,
      hooks: `${projectInfo.aliasPrefix}hooks`,
      lib: `${projectInfo.aliasPrefix}lib`,
      utils: `${projectInfo.aliasPrefix}lib/utils`,
    },
  }

  return await resolveConfigPaths(cwd, config)
}
