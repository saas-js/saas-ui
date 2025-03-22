import { Octokit } from '@octokit/rest'
import fs from 'fs'
import path from 'path'

const localComponentsPath = path.join(
  process.cwd(),
  'packages/saas-ui-react/src/components',
)

// Components to ignore from Chakra UI comparison
const ignoredChakraComponents = ['segment-group', 'toast']

// Get command line args
const args = process.argv.slice(2)
const shouldImport = args.includes('--import')

async function getChakraComponents(): Promise<string[]> {
  const octokit = new Octokit({
    auth: process.env.GITHUB_PERSONAL_TOKEN, // Make sure to set this env variable
  })

  try {
    const response = await octokit.repos.getContent({
      owner: 'chakra-ui',
      repo: 'chakra-ui',
      path: 'packages/react/src/components',
    })

    if (!Array.isArray(response.data)) {
      throw new Error('Expected directory listing')
    }

    // Filter out non-directories, special files and ignored components
    return response.data
      .filter((item) => {
        const name = item.name.replace(/\.[^/.]+$/, '') // Remove extension for comparison
        return (
          !ignoredChakraComponents.includes(name) &&
          (item.type === 'dir' ||
            (item.type === 'file' &&
              item.name !== 'index.ts' &&
              item.name !== 'theme.tsx' &&
              item.name !== 'icons.tsx'))
        )
      })
      .map((item) => item.name.replace(/\.[^/.]+$/, '')) // Remove file extensions
  } catch (error) {
    console.error('Error fetching Chakra components:', error)
    process.exit(1)
  }
}

function getLocalComponents(): string[] {
  return fs.readdirSync(localComponentsPath).filter((item) => {
    const itemPath = path.join(localComponentsPath, item)
    return fs.statSync(itemPath).isDirectory()
  })
}

function importComponent(component: string) {
  const componentDir = path.join(localComponentsPath, component)
  const indexPath = path.join(componentDir, 'index.ts')

  // Create component directory if it doesn't exist
  if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir)
  }

  // Convert component name to PascalCase for both folder and type names
  const componentName = component
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')

  // Create index.ts with re-export
  const indexContent = `export {
  ${componentName},
  type ${componentName}Props,
} from '@chakra-ui/react/${component}'
`

  fs.writeFileSync(indexPath, indexContent)
  console.log(`Imported ${component} component`)
}

async function compareComponents() {
  const [chakraComponents, localComponents] = await Promise.all([
    getChakraComponents(),
    getLocalComponents(),
  ])

  console.log('\nComponent Comparison Report\n')

  // Find components in Chakra but not in local
  const missingComponents = chakraComponents.filter(
    (component) => !localComponents.includes(component),
  )

  // Find components in local but not in Chakra
  const extraComponents = localComponents.filter(
    (component) => !chakraComponents.includes(component),
  )

  // Log results
  console.log('Components in Chakra UI but not in local:')
  if (missingComponents.length) {
    missingComponents.forEach((component) => {
      console.log(`- ${component}`)
      if (shouldImport) {
        importComponent(component)
      }
    })
  } else {
    console.log('None')
  }

  console.log('\nComponents in local but not in Chakra UI:')
  if (extraComponents.length) {
    extraComponents.forEach((component) => {
      console.log(`- ${component}`)
    })
  } else {
    console.log('None')
  }

  // Print summary
  console.log('\nSummary:')
  console.log(`Total Chakra UI components: ${chakraComponents.length}`)
  console.log(`Total local components: ${localComponents.length}`)
  console.log(`Missing components: ${missingComponents.length}`)
  console.log(`Extra components: ${extraComponents.length}`)
  if (shouldImport && missingComponents.length) {
    console.log(`\nImported ${missingComponents.length} new components`)
  }
}

// Need to use async IIFE since top-level await isn't available in all TS configs
;(async () => {
  try {
    await compareComponents()
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
})()
