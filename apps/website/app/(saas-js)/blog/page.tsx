import { BlogIndex, getBlogIndexMetadata } from '@/components/blog/blog-index'

export const metadata = getBlogIndexMetadata('saas-js')

export default function BlogPage() {
  return <BlogIndex site="saas-js" />
}
