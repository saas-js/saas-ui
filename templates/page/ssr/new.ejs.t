---
to: pages/<%= name %>.tsx
---
<% formattedPath = h.inflection.camelize(name, true).replace(/::/g, '/') -%>
<% pageName = `${formattedPath}Page` -%>
<% base = h.path.parse(h.inflection.camelize(name, false)).base -%>
<% if (locals.prop) { -%>
<% pageProps = h.inflection.pluralize(locals.prop) -%>
<% formattedPageProps = h.path.parse(h.inflection.camelize(pageProps, false)).base -%>
<% getPageProps = `get${formattedPageProps}` -%>
<% } -%>
import type { GetServerSideProps } from 'next'
import type { CustomNextPage as NextPage } from 'types'

import { Flex, Heading, List, ListItem } from '@chakra-ui/react'

import { getLayout } from 'src/components/layouts/SiteLayout'

<% if(locals.prop) { -%>
import { <%= getPageProps %> } from 'src/lib/data/<%= pageProps %>'

interface Props {
  <%= pageProps %>: any
}

<% } -%>
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // const pageSlug = params?.slug as string

<% if(locals.prop) { -%>
  const { <%= pageProps %> } = await <%= getPageProps %>()

<% } -%>
  //   if (/* some condition */) {
  //     return {
  //       notFound: true,
  //     }
  //   }

  return {
<% if(locals.prop) { -%>
    props: {
      <%= pageProps %>,
    },
<% } else { -%>
    props: {},
<% } -%>
  }
}

<% if(locals.prop) { -%>
const <%= pageName %>: NextPage<Props> = ({ <%= pageProps %> }) => {
  return (
    <>
      <Flex flexDir="column" alignItems="center">
        <Heading as="h1"><%= formattedPath %> Page</Heading>
        <List spacing="2">
          {<%= pageProps %>.map((<%= prop %>) => (
            <ListItem key={<%= prop %>.name}>{<%= prop %>.name}</ListItem>
          ))}
        </List>
      </Flex>
    </>
  )
}

<% } else  { -%>
const <%= pageName %>: NextPage = () => {
  return (
    <>
      <Flex flexDir="column" alignItems="center">
        <Heading as="h1"><%= formattedPath %> Page</Heading>
      </Flex>
    </>
  )
}

<% } -%>
<%= pageName %>.getLayout = getLayout

export default <%= pageName %>
<% if(locals.prop) { -%>

export type { Props as <%= pageName %>Props }
<% } -%>