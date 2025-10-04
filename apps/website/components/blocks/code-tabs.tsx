import { Tabs } from '@saas-ui/react'

import { CodeBlock } from '../mdx/code-block'

// import CodePanel from '../code-panel/code-panel'
// import CopyButton from '@/docs/components/mdx-components/codeblock/copy-button'

export const CodeTabs = (props: { code: any }) => {
  return (
    <Tabs.Root
      variant="outline"
      size="md"
      defaultValue={props.code[0].fileName}
    >
      <Tabs.List
        px="2"
        pt="2"
        // bg="code-bg"
        // borderBottomWidth="2px"
        // borderBottomColor="whiteAlpha.200"
        overflow="visible"
      >
        {props.code.map((code: any) => {
          return (
            <Tabs.Trigger
              key={code.fileName}
              value={code.fileName}
              _selected={
                {
                  // bg: 'code-bg',
                  // color: 'white',
                  // borderWidth: '1px',
                  // borderColor: 'whiteAlpha.300',
                  // borderBottomColor: 'transparent',
                }
              }
            >
              {code.fileName}
            </Tabs.Trigger>
          )
        })}
      </Tabs.List>
      <Tabs.ContentGroup>
        {props.code.map((code: any) => {
          return (
            <Tabs.Content
              value={code.fileName}
              key={code.fileName}
              px="0"
              position="relative"
              bg="code-bg"
            >
              <div
                className="code-highlight"
                dangerouslySetInnerHTML={{
                  __html: code.highlighted ?? code.code,
                }}
              />

              {/* <CopyButton code={code.code} top="4" right="4" />
              <CodePanel language={code.language}>{code.code}</CodePanel> */}
            </Tabs.Content>
          )
        })}
      </Tabs.ContentGroup>
    </Tabs.Root>
  )
}
