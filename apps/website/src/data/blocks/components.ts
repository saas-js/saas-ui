import fs from 'node:fs'
import path from 'node:path'
import { pascalCase } from 'change-case'

interface ComponentInfo {
  component: string
  slug: string
  code: { fileName: string; language: string; code: string }[]
  attributes: any
}

function removeReact(input: string) {
  const lines = input.split('\n')

  if (lines[0].includes("import React from 'react';")) {
    lines.shift()
  } else if (lines[0].includes('import React')) {
    const remainingImports = lines[0].replace(/import React[^;]+;/, '')
    lines[0] = remainingImports
  }

  return lines.join('\n')
}

function getComponentCode(componentFolder: string, componentName: string) {
  const componentContents = fs
    .readdirSync(componentFolder)
    .filter(
      (item) =>
        (item.endsWith('.tsx') && !item.endsWith('.stories.tsx')) ||
        item.endsWith('.ts')
    )

  const mainFileContent = removeReact(
    fs.readFileSync(path.join(componentFolder, `${componentName}.tsx`), 'utf-8')
  )
  const otherFilesContent = componentContents
    .filter((file) => file !== `${componentName}.tsx`)
    .map((file) => ({
      name: file,
      content: removeReact(
        fs.readFileSync(path.join(componentFolder, file), 'utf-8')
      ),
    }))

  return [
    {
      fileName: `${componentName}.tsx`,
      language: 'tsx',
      code: mainFileContent,
    },
    ...otherFilesContent.map(({ name, content }) => ({
      fileName: name,
      language: name.endsWith('.css') ? 'css' : 'tsx',
      code: content,
    })),
  ]
}

const getRootFolder = () => {
  return path.join(
    process.env.PROJECT_CWD ?? process.cwd(),
    '/packages/pro/saas-ui/blocks/src'
  )
}

export function getAllComponents(): ComponentInfo[] {
  const rootFolder = getRootFolder()
  const categories = fs.readdirSync(rootFolder)

  const components: ComponentInfo[] = []
  for (const category of categories) {
    const categoryDirectory = path.join(rootFolder, category)
    if (!fs.lstatSync(categoryDirectory).isDirectory()) {
      continue
    }
    const componentsInCategory = fs.readdirSync(categoryDirectory)
    for (const componentName of componentsInCategory) {
      const componentDirectory = path.join(rootFolder, category, componentName)
      const componentAttributes = path.join(
        componentDirectory,
        'attributes.json'
      )

      if (fs.lstatSync(componentDirectory).isDirectory()) {
        let attributes = {}
        try {
          attributes = JSON.parse(fs.readFileSync(componentAttributes, 'utf8'))
        } catch {}

        components.push({
          component: pascalCase(componentName),
          slug: componentName,
          code: [],
          attributes: {
            title: pascalCase(componentName),
            category,
            ...attributes,
          },
        })
      }
    }
  }

  return components.sort(({ attributes }) => (attributes.public ? -1 : 1))
}

export function getComponent(
  categoryName: string,
  componentName: string
): ComponentInfo | null {
  const componentDirectory = path.join(
    getRootFolder(),
    categoryName,
    componentName
  )
  const componentAttributes = path.join(componentDirectory, 'attributes.json')

  if (fs.lstatSync(componentDirectory).isDirectory()) {
    const code = getComponentCode(componentDirectory, componentName)
    const attributes = JSON.parse(fs.readFileSync(componentAttributes, 'utf8'))
    return {
      component: pascalCase(componentName),
      slug: componentName,
      code,
      attributes,
    }
  }

  return null
}

export function getComponentsByCategory() {
  return getAllComponents().reduce<Record<string, ComponentInfo[]>>(
    (acc, component) => {
      if (!(component.attributes.category in acc)) {
        acc[component.attributes.category] = []
      }
      if (component) {
        acc[component.attributes.category].push(component)
      }
      return acc
    },
    {}
  )
}

export function countComponentsByCategory() {
  return getAllComponents().reduce<Record<string, number>>((acc, component) => {
    if (!(component.attributes.category in acc)) {
      acc[component.attributes.category] = 0
    }
    acc[component.attributes.category] += 1
    return acc
  }, {})
}

export function getComponentsByChangelog(changelogId: string) {
  return getAllComponents().filter(
    (component) => component.attributes.changelog === changelogId
  )
}

export function getAllChangelogs() {
  return Array.from(
    new Set(
      getAllComponents().map((component) => component.attributes.changelog)
    )
  ).filter((c) => c)
}
