import { CodeSample, KeywordPage } from '@/components/saas-js/keyword-page'
import { createSjsMetadata } from '@/lib/saas-js/metadata'
import { Heading, Text } from '@chakra-ui/react'
import { Link } from '#components/ui/link'

export const metadata = createSjsMetadata({
  title: 'Direct S3 uploads in React',
  description:
    'Presigned, direct-to-S3 file uploads for React — without proxying file bytes through your server.',
  path: '/s3-direct-upload-react',
})

export default function Page() {
  return (
    <KeywordPage
      packageId="slingshot"
      title="Direct S3 uploads in React"
      description="Slingshot issues a presigned upload, the browser puts the file on S3, and your server only authorizes the request. Works on any JavaScript runtime."
    >
      <Text mb="4" color="fg.subtle">
        Proxying uploads through Next.js (or any Node process) burns bandwidth
        and timeouts. The usual fix is a presigned PUT. Slingshot is that
        pattern with a React upload UI — named after the Meteor package that
        owned this search term, not compatible with it.
      </Text>

      <Heading as="h2" textStyle="xl" mt="8" mb="3">
        Server: authorize and sign
      </Heading>
      <Text mb="4" color="fg.subtle">
        Create a profile, attach an S3 adapter, and decide the object key. The
        file never passes through this handler.
      </Text>

      <CodeSample>{`import { createSlingshotServer } from '@saas-js/slingshot'
import { s3 } from '@saas-js/slingshot-adapter-s3'
import { handle } from '@saas-js/slingshot/next'

const slingshot = createSlingshotServer({
  profile: 'avatar',
  adapter: s3({
    region: process.env.AWS_REGION,
    bucket: process.env.AWS_BUCKET,
  }),
  authorize: ({ req, meta }) => checkAccess(req, meta.userId),
  key: ({ meta }) => \`users/\${meta.userId}/avatar\`,
})

export const POST = handle(slingshot)`}</CodeSample>

      <Heading as="h2" textStyle="xl" mt="8" mb="3">
        React: dropzone and progress
      </Heading>
      <Text mb="4" color="fg.subtle">
        <code>@saas-js/slingshot-react</code> is a composable FileUpload. Point
        it at the profile and the same <code>/api/slingshot</code> base URL.
      </Text>

      <CodeSample>{`<FileUpload
  profile="avatar"
  maxFiles={1}
  baseUrl="/api/slingshot"
  uploadOnAccept
  meta={{ userId: '123' }}
/>`}</CodeSample>

      <Text color="fg.subtle">
        Framework adapters and the React API live in the{' '}
        <Link href="/packages/slingshot/docs">Slingshot docs</Link>.
      </Text>
    </KeywordPage>
  )
}
