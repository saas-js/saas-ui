import * as React from 'react'

import { ChakraProvider } from '@chakra-ui/react'
import { defaultSystem } from '@saas-ui/chakra-preset'
import { renderToStaticMarkup } from 'react-dom/server'

import { Page } from './index.ts'

describe('Page', () => {
  it('separates header content from the footer', () => {
    const markup = renderToStaticMarkup(
      <ChakraProvider value={defaultSystem}>
        <Page.Root>
          <Page.Header
            nav={<button>Back</button>}
            title="Release control"
            actions={<button>Save</button>}
            footer={<div>Tabs</div>}
          />
        </Page.Root>
      </ChakraProvider>,
    )

    expect(markup).toContain('sui-page__headerContent')
    expect(markup).toContain('sui-page__headerFooter')
    expect(markup).toMatch(/headerContent[^>]*>.*Back.*Release control.*Save/s)
    expect(markup).toMatch(/headerFooter[^>]*>.*Tabs/s)
  })
})
