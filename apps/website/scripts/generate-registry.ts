console.warn(
  'apps/website/scripts/generate-registry.ts is deprecated; use `pnpm registry:generate`.',
)

await import('../../../tooling/registry/generate')

export {}
