import { describe, expect, it } from 'vitest'

import { isNegotiableDocument, prefersMarkdown } from './agent-discovery'

describe('prefersMarkdown', () => {
  it('accepts an explicit markdown request', () => {
    expect(prefersMarkdown('text/markdown')).toBe(true)
    expect(prefersMarkdown('text/markdown, text/html;q=0.9')).toBe(true)
  })

  it('keeps HTML as the default', () => {
    expect(prefersMarkdown(null)).toBe(false)
    expect(prefersMarkdown('text/html')).toBe(false)
    expect(prefersMarkdown('text/html,application/xhtml+xml,*/*;q=0.8')).toBe(
      false,
    )
    expect(prefersMarkdown('text/html, text/markdown;q=0.1')).toBe(false)
    expect(prefersMarkdown('text/markdown;q=0')).toBe(false)
  })
})

describe('isNegotiableDocument', () => {
  it('covers homepages, docs, and package docs only', () => {
    expect(isNegotiableDocument('/')).toBe(true)
    expect(isNegotiableDocument('/docs')).toBe(true)
    expect(isNegotiableDocument('/docs/components/button')).toBe(true)
    expect(isNegotiableDocument('/packages/conditions/docs')).toBe(true)
    expect(isNegotiableDocument('/packages/conditions/docs/react')).toBe(true)
    expect(isNegotiableDocument('/llms.txt')).toBe(false)
    expect(isNegotiableDocument('/pricing')).toBe(false)
    expect(isNegotiableDocument('/packages/conditions')).toBe(false)
  })
})
