import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import CodePanel from '../code-panel/code-panel'
import CopyButton from '@/docs/components/mdx-components/codeblock/copy-button'

export const CodeTabs = (props: { code: any }) => {
  return (
    <Tabs variant="enclosed" size="md" defaultIndex={0}>
      <TabList
        px="2"
        pt="2"
        bg="code-bg"
        borderBottomWidth="2px"
        borderBottomColor="whiteAlpha.200"
        overflow="visible"
      >
        {props.code.map((code: any) => {
          return (
            <Tab
              key={code.fileName}
              _selected={{
                bg: 'code-bg',
                color: 'white',
                borderWidth: '1px',
                borderColor: 'whiteAlpha.300',
                borderBottomColor: 'transparent',
              }}
            >
              {code.fileName}
            </Tab>
          )
        })}
      </TabList>
      <TabPanels>
        {props.code.map((code: any) => {
          return (
            <TabPanel
              key={code.fileName}
              px="0"
              position="relative"
              bg="code-bg"
            >
              <CopyButton code={code.code} top="4" right="4" />
              <CodePanel language={code.language}>{code.code}</CodePanel>
            </TabPanel>
          )
        })}
      </TabPanels>
    </Tabs>
  )
}
