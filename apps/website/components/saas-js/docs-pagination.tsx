import { findNeighbour, type Root } from 'fumadocs-core/page-tree'

import { Pagination } from '@/components/pagination'

export function DocsPagination({ tree, url }: { tree: Root; url: string }) {
  const { previous, next } = findNeighbour(tree, url, { separateRoot: true })

  return (
    <Pagination
      mt="20"
      gap="8"
      previous={
        previous
          ? { title: String(previous.name), url: previous.url }
          : null
      }
      next={next ? { title: String(next.name), url: next.url } : null}
    />
  )
}
