import { writeFiles, writeIndex, writeRecipes } from './files'
import { cleanFiles } from './shared'

async function main() {
  const clean = ['--clean', '-C'].some((arg) => process.argv.includes(arg))

  if (clean) {
    await cleanFiles()
  }

  await writeFiles()
  await writeRecipes()
  await writeIndex()

  console.log('🐼 All files written')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
