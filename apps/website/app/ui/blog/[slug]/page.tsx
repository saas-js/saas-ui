import {
  BlogPost,
  getBlogPostMetadata,
  getBlogStaticParams,
} from '@/components/blog/blog-post'

interface Props {
  params: Promise<{ slug: string }>
}

export const generateStaticParams = async () => getBlogStaticParams('saas-ui')

export const generateMetadata = (props: Props) =>
  getBlogPostMetadata('saas-ui', props)

export default function BlogPostPage(props: Props) {
  return <BlogPost site="saas-ui" {...props} />
}
