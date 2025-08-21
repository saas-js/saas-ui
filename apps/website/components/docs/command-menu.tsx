'use client'

import { ReactNode, useState } from 'react'

import { Combobox, createListCollection } from '@ark-ui/react'
import { Center, HStack, Icon, Input, Text, chakra } from '@saas-ui/react'
import { Dialog } from '@saas-ui/react'
import { useHotkeys } from '@saas-ui/use-hotkeys'
import { useDocsSearch } from 'fumadocs-core/search/client'
import { useRouter } from 'next/navigation'
import { TbFile, TbHash } from 'react-icons/tb'

const ComboboxRoot = chakra(Combobox.Root, {
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1',
  },
})
const ComboboxControl = chakra(Combobox.Control)
const ComboboxInput = chakra(Combobox.Input, {}, { forwardAsChild: true })
const ComboboxContent = chakra(Combobox.Content, {
  base: {
    borderRadius: 'md',
  },
})
const ComboboxList = chakra(Combobox.List)
const ComboboxItemGroup = chakra(Combobox.ItemGroup)
const ComboboxItemGroupLabel = chakra(Combobox.ItemGroupLabel, {
  base: {
    px: '4',
    py: '3',
  },
})
const ComboboxItem = chakra(Combobox.Item, {
  base: {
    borderRadius: 'md',
    _hover: {
      bg: 'gray.subtle',
      cursor: 'pointer',
    },
    _selected: {
      bg: 'gray.subtle',
    },
  },
})

interface Item {
  label: string
  value: string
  category: string
  description: string
}

interface Props {
  trigger: ReactNode
  disableHotkey?: boolean
}

export const CommandMenu = (props: Props) => {
  const [open, setOpen] = useState(false)

  const { search, setSearch, query } = useDocsSearch({
    type: 'static',
    delayMs: 400,
  })

  const router = useRouter()

  useHotkeys(['cmd+k', 'ctrl+k'], () => !props.disableHotkey && setOpen(true), [
    props.disableHotkey,
  ])

  const collection = createListCollection({
    items: Array.isArray(query.data) ? query.data.slice(0, 20) : [],
    itemToValue: (item) => item.id,
  })

  return (
    <Dialog.Root
      motionPreset="slide-in-bottom"
      open={open}
      onOpenChange={(event) => setOpen(event.open)}
    >
      <Dialog.Trigger asChild>{props.trigger}</Dialog.Trigger>
      <Dialog.Content p="2" width={{ base: '100%', sm: '2xl' }} maxWidth="100%">
        <ComboboxRoot
          open
          disableLayer
          inputBehavior="autohighlight"
          placeholder="Search the docs"
          selectionBehavior="clear"
          loopFocus={false}
          collection={collection as any}
          onValueChange={(e) => {
            setOpen(false)

            const item = collection.items?.find(
              (item) => item.id === e.value[0],
            )

            if (item) {
              router.push(item.url)
            }
          }}
          onInputValueChange={({ inputValue }) => setSearch(inputValue)}
        >
          <ComboboxControl>
            <ComboboxInput asChild>
              <Input size="lg" borderWidth="0" />
            </ComboboxInput>
          </ComboboxControl>
          <ComboboxContent
            boxShadow="none"
            px="0"
            py="0"
            overflow="auto"
            maxH="68vh"
            overscrollBehavior="contain"
          >
            <ComboboxList>
              {query.data?.length === 0 ||
                (query.data === 'empty' && (
                  <Center p="3" minH="40">
                    <Text color="fg.subtle" textStyle="sm">
                      No results found for <Text as="strong">{search}</Text>
                    </Text>
                  </Center>
                ))}

              <ComboboxItemGroup>
                {collection.items?.map((item) => {
                  return (
                    <ComboboxItem
                      key={item.id}
                      data-type={item.type}
                      item={item}
                      persistFocus
                      height="auto"
                      px="4"
                      py="2"
                      mb="2px"
                      css={{
                        '&[data-type="page"]': {
                          bg: 'bg.subtle/70',
                          _hover: {
                            bg: 'bg.subtle',
                          },
                        },
                        '&[data-type="heading"], &[data-type="text"]': {
                          ps: 10,
                          position: 'relative',
                          _before: {
                            content: '""',
                            display: 'block',
                            w: '1px',
                            h: 'full',
                            bg: 'border',
                            position: 'absolute',
                            left: 6,
                            top: 0,
                            flexShrink: 0,
                          },
                        },
                      }}
                    >
                      <HStack>
                        {item.type === 'page' ? (
                          <Icon
                            as={TbFile}
                            color="fg.subtle"
                            boxSize="5"
                            alignSelf="start"
                          />
                        ) : (
                          <Icon as={TbHash} color="fg.subtle" />
                        )}

                        {item.type === 'page' ? (
                          <>
                            <Text
                              fontSize="sm"
                              fontWeight="medium"
                              lineClamp={1}
                              flex="1"
                            >
                              {item.content}
                            </Text>
                            <Text fontSize="xs" color="fg.subtle" lineClamp={1}>
                              {item.url}
                            </Text>
                          </>
                        ) : (
                          <Text fontSize="sm" lineClamp={1}>
                            {item.content}
                          </Text>
                        )}
                      </HStack>
                    </ComboboxItem>
                  )
                })}
              </ComboboxItemGroup>
            </ComboboxList>
          </ComboboxContent>
        </ComboboxRoot>
      </Dialog.Content>
    </Dialog.Root>
  )
}
