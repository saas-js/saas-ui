import { Box, Kbd } from '@chakra-ui/react'
import {
  CommandBar,
  CommandBarContent,
  CommandBarDialog,
  CommandBarEmpty,
  CommandBarGroup,
  CommandBarInput,
  CommandBarItem,
  CommandBarList,
  useCommandState,
} from '@saas-ui/command-bar'

import coreSidebar from '@/data/core-sidebar'
import componentsSidebar from '@/data/components-sidebar'
import hookSidebar from '@/data/hooks-sidebar'
import proSidebar from '@/data/pro-sidebar'
import { useRouter } from 'next/router'

const items = [
  {
    title: 'Core',
    items: coreSidebar.routes,
  },
  {
    title: 'Components',
    items: componentsSidebar.routes,
  },
  {
    title: 'Hooks',
    items: hookSidebar.routes,
  },
  {
    title: 'Pro',
    items: proSidebar.routes,
  },
]

const SubItem = (props) => {
  const search = useCommandState((state) => state.search)
  if (!search) return null
  return <CommandBarItem {...props} />
}

export const GlobalSearch = (props) => {
  const { onClose } = props
  const router = useRouter()
  return (
    <CommandBar {...props}>
      <CommandBarDialog>
        <CommandBarContent>
          <CommandBarInput placeholder="Search docs..." autoFocus />

          <CommandBarList px="2">
            <CommandBarEmpty>No results found.</CommandBarEmpty>

            {items.map(({ title, items }) => {
              return (
                <CommandBarGroup key={title} heading={title}>
                  {items.map(
                    ({
                      icon,
                      title,
                      heading,
                      path,
                      action,
                      shortcut,
                      routes,
                    }: any) => {
                      return (
                        <>
                          <CommandBarItem
                            key={path || title}
                            value={path}
                            isDisabled={heading}
                            _disabled={{
                              color: 'muted',
                              fontWeight: 'semibold',
                              bg: 'transparent',
                            }}
                            borderRadius="md"
                            onSelect={(e) => {
                              if (heading) {
                                return
                              } else if (path) {
                                router.push(path)
                              } else if (action) {
                                action()
                              }
                              onClose()
                            }}
                          >
                            {icon}
                            {title}
                            {shortcut && (
                              <Box ms="auto">
                                {shortcut.map((key) => {
                                  return <Kbd key={key}>{key}</Kbd>
                                })}
                              </Box>
                            )}
                          </CommandBarItem>

                          {routes?.map(({ title, path, action }: any) => {
                            return (
                              <CommandBarItem
                                key={path}
                                value={path}
                                borderRadius="md"
                                onSelect={() => {
                                  if (path) {
                                    router.push(path)
                                  } else if (action) {
                                    action()
                                  }
                                  onClose()
                                }}
                              >
                                {title}
                              </CommandBarItem>
                            )
                          })}
                        </>
                      )
                    }
                  )}
                </CommandBarGroup>
              )
            })}
          </CommandBarList>
        </CommandBarContent>
      </CommandBarDialog>
    </CommandBar>
  )
}
