/**
 * Snapshot `defaultSystem` tokens for the llms.txt renderer.
 *
 * The route cannot import `@saas-ui/chakra-preset` under `next dev --turbopack`:
 * bundling the source entry resolves `@chakra-ui/react/anatomy` to Ark's anatomy
 * and throws (`extendWith is not a function`). Node loads the built package fine.
 */
import { mkdirSync, writeFileSync } from 'node:fs'

const out = new URL('../lib/generated/llms-tokens.json', import.meta.url)
mkdirSync(new URL('.', out), { recursive: true })

let defaultSystem
try {
  ;({ defaultSystem } = await import('@saas-ui/chakra-preset'))
} catch (error) {
  // The preset is not built yet (fresh checkout). Token tables are left out
  // of the llms files rather than failing `next dev` / `next build`.
  console.warn(
    `llms tokens: skipped, could not load @saas-ui/chakra-preset (${error.message}). Run \`pnpm build:packages\` to include token tables.`,
  )
  writeFileSync(out, `${JSON.stringify({ categories: {}, keyframes: [] })}\n`)
  process.exit(0)
}

const { tokens, _config } = defaultSystem

const categories = {}
for (const [category, map] of tokens.categoryMap) {
  categories[category] = Array.from(map.values()).map((token) => ({
    name: token.name,
    value: token.value,
    extensions: {
      prop: token.extensions?.prop,
      category: token.extensions?.category,
      negative: token.extensions?.negative,
      conditions: token.extensions?.conditions,
    },
  }))
}

const keyframes = Object.keys(_config.theme?.keyframes ?? {})

writeFileSync(out, `${JSON.stringify({ categories, keyframes })}\n`)

console.log(
  `llms tokens: ${Object.keys(categories).length} categories, ${keyframes.length} keyframes`,
)
