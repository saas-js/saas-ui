console.warn(
  'scripts/build-registry.ts is deprecated; use `pnpm registry:generate`.',
)

await import('./generate-registry')

export {}
