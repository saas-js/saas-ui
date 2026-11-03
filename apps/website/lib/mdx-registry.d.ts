declare module '@/lib/generated/mdx/registry' {
  export const mdxRegistry: Record<
    string,
    () => Promise<{ default: React.ComponentType<any> }>
  >
}

declare module '@/lib/generated/mdx/registry.js' {
  export const mdxRegistry: Record<
    string,
    () => Promise<{ default: React.ComponentType<any> }>
  >
}
