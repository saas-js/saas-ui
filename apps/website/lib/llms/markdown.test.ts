import { describe, expect, it } from 'vitest'

import { mdxToMarkdown } from './index'

describe('mdxToMarkdown', () => {
  it('turns callouts and layout directives into markdown', () => {
    const markdown = mdxToMarkdown(
      [
        ':::info',
        '',
        'Use the space prop.',
        '',
        ':::',
        '',
        ':::card-group',
        '',
        '<Card title="Next.js" href="/docs/getting-started/frameworks/next-app">',
        '',
        'App directory',
        '',
        '</Card>',
        '',
        ':::',
        '',
        ':::code-group',
        '',
        '```bash [npm]',
        'npm i foo',
        '```',
        '',
        ':::',
      ].join('\n'),
      'https://saas-ui.dev',
    )

    expect(markdown).toContain('**Note:** Use the space prop.')
    expect(markdown).not.toContain(':::')
    expect(markdown).toContain(
      '- [Next.js](https://saas-ui.dev/docs/getting-started/frameworks/next-app): App directory',
    )
    expect(markdown).toContain('npm i foo')
    expect(markdown).not.toContain('<Card')
  })

  it('renders breakpoint tokens without the doubled px suffix', () => {
    const markdown = mdxToMarkdown('<BreakpointDoc />', 'https://saas-ui.dev')
    expect(markdown).toContain('| `sm` | `480px` |')
    expect(markdown).not.toContain('pxpx')
    expect(markdown).not.toContain('<BreakpointDoc')
  })

  it('lists keyframe names', () => {
    const markdown = mdxToMarkdown('<KeyframeDoc />', 'https://saas-ui.dev')
    expect(markdown).toContain('`spin`')
    expect(markdown).not.toContain('<KeyframeDoc')
  })

  it('turns a TypeTable object into a markdown table', () => {
    const markdown = mdxToMarkdown(
      `<TypeTable
  type={{
    upload: {
      description: 'Upload files.',
      type: '(files: File[]) => Promise<void>',
    },
  }}
/>`,
      'https://saas-ui.dev',
    )
    expect(markdown).toContain('| `upload` |')
    expect(markdown).toContain('Upload files.')
    expect(markdown).not.toContain('<TypeTable')
  })

  it('leaves JSX inside fenced samples alone', () => {
    const markdown = mdxToMarkdown(
      ['```tsx', '<Card title="Keep" href="/docs/x" />', '```'].join('\n'),
      'https://saas-ui.dev',
    )
    expect(markdown).toContain('<Card title="Keep" href="/docs/x" />')
  })
})
