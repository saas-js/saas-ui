export const GET = async () => {
  const baseUrl =
    process.env.VERCEL_URL ?? process.env.HOST ?? 'http://localhost:3000'

  const documentSets = [
    {
      title: 'Complete documentation',
      href: `${baseUrl}/llms-full.txt`,
      description:
        'The complete Saas UI v3 documentation including all components, styling, theming and cli',
    },
  ]

  const content = TEMPLATE.replace(
    '%DOCUMENT_SETS%',
    documentSets
      .map((set) => `- [${set.title}](${set.href}): ${set.description}`)
      .join('\n'),
  )

  return new Response(content)
}

const TEMPLATE = `
# Saas UI v3 Documentation for LLMs

> Saas UI is a React UI library for building B2B tools and SaaS applications. It's a modern, feature-rich, and easy-to-use library that helps you build beautiful and responsive web applications quickly.

## Documentation Sets

%DOCUMENT_SETS%

## Notes

- The complete documentation includes all content from the official documentation
- Package-specific documentation files contain only the content relevant to that package
- The content is automatically generated from the same source as the official documentation
`
