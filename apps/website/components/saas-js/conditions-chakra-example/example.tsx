'use client'

import { memo, useEffect } from 'react'

import {
  Badge,
  Box,
  HStack,
  Popover as ChakraPopover,
  Stack,
  Text,
} from '@chakra-ui/react'
import {
  getConditionField,
  getConditionFieldOperators,
  getConditionOperator,
  isConditionGroup,
} from '@saas-js/conditions'
import {
  type ConditionChipApi,
  createConditionsHook,
} from '@saas-js/conditions-react'
import { LuPlus, LuX } from 'react-icons/lu'

import { Button } from '#components/ui/button'
import { IconButton } from '#components/ui/icon-button'
import { Menu } from '#components/ui/menu'
import { Popover } from '#components/ui/popover'

import {
  type Contact,
  contactConditions,
  contacts,
  defaultQuery,
  fieldEntries,
  formatFieldValue,
  operatorLabel,
  valueLabel,
} from './definition'
import {
  DateEditor,
  NumberEditor,
  OptionEditor,
  StringEditor,
} from './value-editors'

const contactUI = createConditionsHook({
  definition: contactConditions,
  valueEditors: {
    string: StringEditor,
    number: NumberEditor,
    date: DateEditor,
    enum: OptionEditor,
    boolean: OptionEditor,
  },
})

type ContactChip = ConditionChipApi<typeof contactConditions>

function ChipShell({
  chip,
  conditions,
}: {
  chip: ContactChip
  conditions: ReturnType<typeof contactUI.useConditions>
}) {
  const field = chip.field
    ? getConditionField(contactConditions, chip.field)
    : undefined
  const operator = chip.operator
    ? getConditionOperator(contactConditions, chip.operator)
    : undefined
  const needsValue = operator?.valueMode !== 'none'

  return (
    <Popover.Root
      open={chip.panel !== null}
      onOpenChange={(details) => {
        if (!details.open) chip.close()
      }}
      positioning={{ placement: 'bottom-start', offset: { mainAxis: 8 } }}
    >
      <ChakraPopover.Anchor asChild>
        <HStack
          gap="0"
          borderWidth="1px"
          borderColor="border"
          rounded="md"
          overflow="hidden"
          bg="bg"
          divideX="1px"
          divideColor="border"
        >
          <Button
            size="xs"
            variant="ghost"
            rounded="none"
            fontWeight="medium"
            onClick={() => chip.openPanel('field')}
          >
            {field?.label ?? 'Field'}
          </Button>
          <Button
            size="xs"
            variant="ghost"
            rounded="none"
            color="fg.muted"
            fontWeight="normal"
            onClick={() => chip.openPanel('operator')}
          >
            {operatorLabel(chip.operator)}
          </Button>
          {needsValue ? (
            <Button
              size="xs"
              variant="ghost"
              rounded="none"
              fontWeight="medium"
              onClick={() => chip.openPanel('value')}
            >
              {valueLabel(chip.field, chip.value)}
            </Button>
          ) : null}
          <IconButton
            size="xs"
            variant="ghost"
            rounded="none"
            aria-label="Remove filter"
            onClick={() => chip.remove()}
          >
            <LuX />
          </IconButton>
        </HStack>
      </ChakraPopover.Anchor>
      <Popover.Content w="72" p="2">
        {chip.panel === 'field' ? (
          <Stack gap="1">
            {fieldEntries.map(([id, item]) => (
              <Button
                key={id}
                size="sm"
                variant={id === chip.field ? 'subtle' : 'ghost'}
                justifyContent="flex-start"
                fontWeight="normal"
                onClick={() => chip.selectField(id)}
              >
                {item.label}
              </Button>
            ))}
          </Stack>
        ) : null}
        {chip.panel === 'operator' && field ? (
          <Stack gap="1">
            {getConditionFieldOperators(contactConditions, field).map(
              (item) => (
                <Button
                  key={item.id}
                  size="sm"
                  variant={item.id === chip.operator ? 'subtle' : 'ghost'}
                  justifyContent="flex-start"
                  fontWeight="normal"
                  onClick={() => chip.selectOperator(item.id)}
                >
                  {operatorLabel(item.id)}
                </Button>
              ),
            )}
          </Stack>
        ) : null}
        {chip.panel === 'value' ? (
          <Stack gap="3" p="1">
            <conditions.ValueEditor
              field={chip.field}
              operator={chip.operator}
              value={chip.value}
              error={chip.error}
              onValueChange={(next) => {
                if (
                  operator?.valueMode === 'single' &&
                  (field?.type === 'enum' || field?.type === 'boolean')
                ) {
                  chip.apply({ value: next })
                  return
                }
                chip.setValue(next)
              }}
            />
            {chip.error ? (
              <Text textStyle="sm" color="fg.error">
                {chip.error}
              </Text>
            ) : null}
            {operator?.valueMode !== 'single' ||
            (field?.type !== 'enum' && field?.type !== 'boolean') ? (
              <HStack justify="end">
                <Button size="xs" variant="ghost" onClick={() => chip.close()}>
                  Cancel
                </Button>
                <Button size="xs" onClick={() => chip.apply()}>
                  Apply
                </Button>
              </HStack>
            ) : null}
          </Stack>
        ) : null}
      </Popover.Content>
    </Popover.Root>
  )
}

const FilterChip = memo(function FilterChip() {
  const { conditions, id } = contactUI.useConditionContext()
  const condition = conditions.useCondition(id)
  const draft = conditions.useEditDraft(id)
  const chip = contactUI.useConditionChip(conditions, { condition, draft })
  if (!condition) return null
  return <ChipShell chip={chip} conditions={conditions} />
})

function DraftChip({ parentId }: { parentId: string }) {
  const conditions = contactUI.useConditionsContext()
  const draft = conditions.useAddDraft(parentId)
  const chip = contactUI.useConditionChip(conditions, { draft })

  useEffect(() => {
    if (!draft || chip.panel) return
    chip.openPanel(draft.field ? 'value' : 'field')
    // Open the value panel once when an add draft appears.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft?.mode, draft?.field])

  if (!draft) return null
  return <ChipShell chip={chip} conditions={conditions} />
}

function AddFilterButton({ parentId }: { parentId: string }) {
  const conditions = contactUI.useConditionsContext()

  return (
    <Menu.Root
      onSelect={({ value }) => {
        conditions.draft.beginAddCondition({
          parentId,
          field: value as (typeof fieldEntries)[number][0],
        })
      }}
    >
      <Menu.Button size="xs" variant="ghost">
        <LuPlus /> Filter
      </Menu.Button>
      <Menu.Content>
        {fieldEntries.map(([id, field]) => (
          <Menu.Item key={id} value={id}>
            {field.label}
          </Menu.Item>
        ))}
      </Menu.Content>
    </Menu.Root>
  )
}

function ClearButton() {
  const conditions = contactUI.useConditionsContext()
  const isEmpty = conditions.useIsEmpty()
  if (isEmpty) return null
  return (
    <Button
      size="xs"
      variant="ghost"
      color="fg.muted"
      onClick={() => conditions.actions.clear()}
    >
      Clear
    </Button>
  )
}

function ConditionTree() {
  const conditions = contactUI.useConditionsContext()
  const root = conditions.useRoot()
  const hasAddDraft = conditions.useHasAddDraft(root.id)

  return (
    <HStack gap="2" wrap="wrap">
      {root.items.map((item) =>
        isConditionGroup(item) ? null : (
          <conditions.ConditionScope key={item.id} id={item.id}>
            <FilterChip />
          </conditions.ConditionScope>
        ),
      )}
      {hasAddDraft ? <DraftChip parentId={root.id} /> : null}
      <AddFilterButton parentId={root.id} />
      <ClearButton />
    </HStack>
  )
}

function statusColor(status: Contact['status']) {
  if (status === 'customer') return 'green'
  if (status === 'lead') return 'blue'
  return 'gray'
}

function ContactResults() {
  const conditions = contactUI.useConditionsContext()
  const matches = conditions.useFilter(contacts)

  return (
    <Stack gap="0" borderTopWidth="1px" borderColor="border">
      <HStack
        px="4"
        py="2"
        justify="space-between"
        bg="bg.subtle"
        borderBottomWidth="1px"
        borderColor="border"
      >
        <Text textStyle="sm" color="fg.muted">
          {matches.length} of {contacts.length} contacts
        </Text>
      </HStack>
      {matches.map((contact) => (
        <HStack
          key={contact.id}
          px="4"
          py="3"
          gap="4"
          borderBottomWidth="1px"
          borderColor="border"
          _last={{ borderBottomWidth: '0' }}
        >
          <Stack gap="0" flex="1" minW="0">
            <Text textStyle="sm" fontWeight="medium" truncate>
              {contact.name}
            </Text>
            <Text textStyle="xs" color="fg.muted" truncate>
              {contact.company}
            </Text>
          </Stack>
          <Badge size="sm" colorPalette={statusColor(contact.status)}>
            {formatFieldValue('status', contact.status)}
          </Badge>
          <Text textStyle="sm" color="fg.muted" minW="20" textAlign="end">
            {formatFieldValue('arr', contact.arr)}
          </Text>
        </HStack>
      ))}
      {!matches.length ? (
        <Box px="4" py="8">
          <Text textStyle="sm" color="fg.muted" textAlign="center">
            No contacts match these filters.
          </Text>
        </Box>
      ) : null}
    </Stack>
  )
}

export function ConditionsChakraExample() {
  const conditions = contactUI.useConditions({
    defaultValue: defaultQuery,
  })

  return (
    <Box
      borderWidth="1px"
      borderColor="border"
      rounded="lg"
      overflow="hidden"
      bg="bg"
    >
      <conditions.Root>
        <Box px="4" py="3">
          <ConditionTree />
        </Box>
        <ContactResults />
      </conditions.Root>
    </Box>
  )
}
