import { BlogIndex, getBlogIndexMetadata } from '@/components/blog/blog-index'

export const metadata = getBlogIndexMetadata('saas-ui')

export default function BlogPage() {
  return <BlogIndex site="saas-ui" />
}
