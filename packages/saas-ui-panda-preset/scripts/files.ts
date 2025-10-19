import { readFile, writeFile } from 'fs/promises'
import { globby } from 'globby'
import { basename, dirname, join, relative } from 'path'

import { capitalizeFirstLetter, format, kebabCaseToCamelCase } from './shared'

export async function writeFiles() {
  console.log('🔄 Writing files...')

  const files = await globby('../saas-ui-react/src/theme/**/*.{ts,tsx}', {
    ignore: [
      '../saas-ui-react/src/theme/index.ts',
      '../saas-ui-react/src/theme/recipes.ts',
      '../saas-ui-react/src/theme/slot-recipes.ts',
      '../saas-ui-react/src/theme/recipes/**/*.ts',
      '../saas-ui-react/src/theme/stories/**/*',
    ],
  })

  const defFile = join('src', 'def.ts')

  const promises = files.map(async (file) => {
    const content = await readFile(file, 'utf8')

    const relativePath = relative(
      dirname(file).replace('../saas-ui-react/src/', ''),
      defFile,
    )

    let updatedContent = content
      .replaceAll(
        '@chakra-ui/react',
        relativePath.replace('.ts', '').replaceAll('\\', '/'),
      )
      .replaceAll('saas-ui-', '')
      .replaceAll('switch:', 'swittch:')

    updatedContent = await format(updatedContent)

    const fewFileLocation = file.replace('./saas-ui-react/src/theme', '/src')

    return writeFile(fewFileLocation, updatedContent)
  })
  await Promise.all(promises)

  await writeTokensIndexes()

  console.log('🔄 Files written')
}

export async function writeRecipes() {
  console.log('🎨 Writing recipes...')

  const recipeFiles = await globby(
    '../saas-ui-react/src/components/**/*{recipe.ts,recipe.tsx}',
  )

  let recipes: Recipe[] = []
  let slotRecipes: Recipe[] = []
  const recipePromises = recipeFiles.map(async (file) => {
    const filename = join('../', file)
    const module = await import(filename)

    const [recipeName, recipe] = Object.entries(module)[0]
    const isSlotRecipe = recipeName.toLowerCase().includes('slot')
    {
      ;(isSlotRecipe ? slotRecipes : recipes).push({
        name: recipeName,
        filename: basename(file),
      })
    }

    const recipeImportName = isSlotRecipe ? 'defineSlotRecipe' : 'defineRecipe'
    const fewFileLocation = `./src/${isSlotRecipe ? 'slot-recipes' : 'recipes'}/${basename(file).replace('.recipe', '')}`

    let recipeContent = `import { ${recipeImportName} } from '../def'
    
    export const ${recipeName} = ${recipeImportName}(${JSON.stringify(recipe, null, 2)})`

    recipeContent = await format(recipeContent)
    return writeFile(fewFileLocation, recipeContent)
  })
  await Promise.all(recipePromises)

  await writeRecipeIndex(recipes, slotRecipes)

  console.log('🎨 Recipes written')
}

export async function writeIndex() {
  console.log('1️⃣  Writing index file...')

  let indexContent = `import { animationStyles } from './animation-styles'
import { breakpoints } from './breakpoints'
import { definePreset } from './def'
import { globalCss } from './global-css'
import { keyframes } from './tokens/keyframes'
import { layerStyles } from './layer-styles'
import { recipes } from './recipes'
import { semanticTokens } from './semantic-tokens'
import { slotRecipes } from './slot-recipes'
import { textStyles } from './text-styles'
import { tokens } from './tokens'
import { utilities } from './utilities'

export default definePreset({
  name: '@saas-ui/panda-preset',
  globalCss,
  theme: {
    extend: {
      breakpoints,
      keyframes,
      tokens,
      semanticTokens,
      recipes,
      slotRecipes,
      textStyles,
      layerStyles,
      animationStyles,
    },
  },
  utilities: {
    extend: utilities,
  },
  staticCss: {
    css: [
      {
        properties: {
          colorPalette: ['gray'],
          ps: ['8'],
        },
      },
    ],
  },
  conditions: {
    extend: {
      icon: "& :where(svg)",
    },
  },
})`

  indexContent = await format(indexContent)

  await writeFile('src/index.ts', indexContent)

  console.log('1️⃣  Index file written')
}

interface Recipe {
  name: string
  filename: string
}

async function writeTokensIndexes() {
  async function writeTokenIndex() {
    const allFilenamesInTokens = await globby(
      '../saas-ui-react/src/theme/tokens/**/*.ts',
    )
    let tokensIndexContent = `
${allFilenamesInTokens
  .map((file) => {
    return `import { ${kebabCaseToCamelCase(basename(file).replace('.ts', ''))} } from './${basename(file).replace('.ts', '')}'`
  })
  .join('\n')}

  export const tokens = {
    ${allFilenamesInTokens
      .map((file) => {
        return `${kebabCaseToCamelCase(basename(file).replace('.ts', ''))}`
      })
      .join(',\n')}
  }
`
    tokensIndexContent = await format(tokensIndexContent)

    await writeFile('src/tokens/index.ts', tokensIndexContent)
  }

  async function writeSemanticTokenIndex() {
    const allFilenamesInSemanticTokens = await globby(
      '../saas-ui-react/src/theme/semantic-tokens/**/*.ts',
    )
    let semanticTokensIndexContent = `
${allFilenamesInSemanticTokens
  .map((file) => {
    const base = basename(file).replace('.ts', '')
    return `import { semantic${capitalizeFirstLetter(base)} } from './${base}'`
  })
  .join('\n')}

  export const semanticTokens = {
    ${allFilenamesInSemanticTokens
      .map((file) => {
        return `${basename(file).replace('.ts', '')}: semantic${capitalizeFirstLetter(basename(file).replace('.ts', ''))}`
      })
      .join(',\n')}
  }
`
    semanticTokensIndexContent = await format(semanticTokensIndexContent)

    await writeFile('src/semantic-tokens/index.ts', semanticTokensIndexContent)
  }

  await Promise.all([writeTokenIndex(), writeSemanticTokenIndex()])
}

async function writeRecipeIndex(recipes: Recipe[], slotRecipes: Recipe[]) {
  /**
   * Recipes
   */
  let recipesIndexContent = `${recipes
    .map((recipe) => {
      return `import { ${recipe.name} } from './${recipe.filename.replace('.recipe.ts', '')}'`
    })
    .join('\n')}
  
  export const recipes = {
    ${recipes
      .map((recipe) => {
        return `${recipe.name.replace('Recipe', '')}: ${recipe.name}`
      })
      .join(',\n')}
  }
  `
  recipesIndexContent = await format(recipesIndexContent)
  await writeFile('src/recipes/index.ts', recipesIndexContent)

  /**
   * Slot Recipes
   */

  let slotRecipesIndexContent = `${slotRecipes
    .map((recipe) => {
      return `import { ${recipe.name} } from './${recipe.filename.replace('.recipe.ts', '')}'`
    })
    .join('\n')}

  export const slotRecipes = {
    ${slotRecipes
      .map((recipe) => {
        return `${recipe.name.replace('SlotRecipe', '')}: ${recipe.name}`
      })
      .join(',\n')}
  }
  `

  slotRecipesIndexContent = await format(slotRecipesIndexContent)
  await writeFile('src/slot-recipes/index.ts', slotRecipesIndexContent)
}
