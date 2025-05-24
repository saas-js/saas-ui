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
  type CommandBarProps,
} from '@saas-ui/command-bar'

import coreSidebar from '@/data/core-sidebar'
import componentsSidebar from '@/data/components-sidebar'
import hookSidebar from '@/data/hooks-sidebar'
import proSidebar from '@/data/pro-sidebar'
import { useRouter } from 'next/router'
import { Fragment } from 'react'

const items = [
  {
    title: 'Getting started',
    items: coreSidebar.routes.filter((item) => !item.heading),
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

export const GlobalSearch = (props: Omit<CommandBarProps, 'children'>) => {
  const { onClose, ...rest } = props
  const router = useRouter()
  return (
    <CommandBar onClose={onClose} {...rest}>
      <CommandBarDialog returnFocusOnClose={false}>
        <CommandBarContent borderWidth="1px">
          <CommandBarInput placeholder="Search docs..." autoFocus />

          <CommandBarList px="2">
            <CommandBarEmpty>No results found.</CommandBarEmpty>

            {items.map(({ title, items }) => {
              return (
                <CommandBarGroup key={title} heading={title}>
                  {items.map((item: any) => {
                    const {
                      icon,
                      title,
                      heading,
                      path,
                      action,
                      shortcut,
                      routes,
                    } = item

                    return (
                      <Fragment key={path + title}>
                        <CommandBarItem
                          value={path}
                          isDisabled={heading && !routes?.length}
                          borderRadius="md"
                          py="1"
                          height="10"
                          onSelect={(e) => {
                            if (heading) {
                              return
                            } else if (path) {
                              router.push(path)
                            } else if (action) {
                              action()
                            }
                            onClose?.()
                          }}
                          sx={{
                            '&[data-disabled=true]': {
                              color: 'muted',
                              fontWeight: 'semibold',
                              bg: 'transparent',
                            },
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

                        {routes?.map(({ title, path, action }: any, i) => {
                          if (path === item.path) {
                            return null
                          }

                          return (
                            <CommandBarItem
                              key={i}
                              value={path}
                              borderRadius="md"
                              onSelect={() => {
                                if (path) {
                                  router.push(path)
                                } else if (action) {
                                  action()
                                }
                                onClose?.()
                              }}
                            >
                              {title}
                            </CommandBarItem>
                          )
                        })}
                      </Fragment>
                    )
                  })}
                </CommandBarGroup>
              )
            })}
          </CommandBarList>
        </CommandBarContent>
      </CommandBarDialog>
    </CommandBar>
  )
}
