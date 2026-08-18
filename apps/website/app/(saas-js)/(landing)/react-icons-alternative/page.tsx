import { CodeSample, KeywordPage } from '@/components/saas-js/keyword-page'
import { createSjsMetadata } from '@/lib/saas-js/metadata'
import { Heading, Text } from '@chakra-ui/react'
import { Link } from '#components/ui/link'

export const metadata = createSjsMetadata({
  title: 'A react-icons alternative that actually tree-shakes',
  description:
    'Why react-icons, icon fonts, and Iconify web components fall short — and how Iconx generates type-safe React icons from the Iconify CLI.',
  path: '/react-icons-alternative',
})

export default function Page() {
  return (
    <KeywordPage
      packageId="iconx"
      title="A react-icons alternative that actually tree-shakes"
      description="Iconx is an Iconify React CLI. It generates the icon components you use, instead of shipping a 2MB icon pack into your bundle."
    >
      <Heading as="h2" textStyle="xl" mt="8" mb="3">
        Why this exists
      </Heading>
      <Text mb="4" color="fg.subtle">
        Most React apps pick an icon library once and never revisit it. The
        costs show up later: bundle size, accessibility, and a build that pulls
        in icons you never render.
      </Text>

      <Heading as="h3" textStyle="lg" mt="8" mb="3">
        react-icons
      </Heading>
      <Text mb="4" color="fg.subtle">
        react-icons is convenient and huge. The package is roughly 2MB, tree-shaking
        is unreliable, and Next.js apps in particular pay for icons they do not
        use. A dashboard with a dozen icons should not download a font of
        thousands.
      </Text>

      <Heading as="h3" textStyle="lg" mt="8" mb="3">
        Icon fonts
      </Heading>
      <Text mb="4" color="fg.subtle">
        Icon fonts are inaccessible by default, fail as a single point of
        failure, and are hard to color and align. They are the wrong primitive
        for a component system.
      </Text>

      <Heading as="h3" textStyle="lg" mt="8" mb="3">
        Iconify web components
      </Heading>
      <Text mb="4" color="fg.subtle">
        Iconify&apos;s web components need a network request unless you self-host
        the full set. They do not work offline, and they are awkward in React
        Server Components.
      </Text>

      <Heading as="h3" textStyle="lg" mt="8" mb="3">
        Copy-pasting SVGs
      </Heading>
      <Text mb="4" color="fg.subtle">
        Manual SVG copying does not scale past a handful of icons. You lose
        naming, sizing, and a way for the rest of the team (or an agent) to add
        the next icon.
      </Text>

      <Heading as="h2" textStyle="xl" mt="10" mb="3">
        Generate the source you own
      </Heading>
      <Text mb="4" color="fg.subtle">
        Iconx follows the same idea as shadcn/ui: the output lives in your
        repo. You get 200,000+ icons from Iconify, emitted as typed React
        components, and only the files you import go to the browser.
      </Text>

      <CodeSample>{`npx iconx init
npx iconx add --set lucide home user settings

import { HomeIcon } from './components/icons/home-icon'

<HomeIcon size="24px" />`}</CodeSample>

      <Text color="fg.subtle">
        More on{' '}
        <Link href="/packages/iconx/docs">installation</Link> and the{' '}
        <Link href="/packages/iconx/docs/reference/cli">CLI</Link>.
      </Text>
    </KeywordPage>
  )
}
