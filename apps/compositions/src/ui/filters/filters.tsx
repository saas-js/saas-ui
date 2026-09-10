'use client'

import * as React from 'react'

import {
  Box,
  HStack,
  type HTMLChakraProps,
  Spinner,
  Stack,
  Text,
  chakra,
  createSlotRecipeContext,
} from '@chakra-ui/react'
import {
  type ConditionFieldDefinition,
  type ConditionFields,
  type ConditionOperatorIdFromList,
  type ConditionOperators,
  type ConditionOption,
  type ConditionsDefinition,
  defaultOperators,
  defineConditions,
  getConditionField,
  getConditionFieldOperators,
  getConditionOperator,
  isConditionGroup,
} from '@saas-js/conditions'
import {
  type AnyConditionsDefinition,
  type ConditionChipApi,
  type ConditionsComponentRegistry,
  type ConditionsHookApi,
  type ConditionsInstance,
  type CreateConditionsHookOptions,
  type DefinitionFieldId,
  type ValueEditorComponent,
  type ValueEditorProps,
  type ValueEditorRegistry,
  createConditionsHook,
  createConditionsHookContexts,
  useConditionChip,
  useConditionOptions,
  useConditionScopeContext,
  useConditionsRootContext,
} from '@saas-js/conditions-react'

import { CheckIcon } from '../../icons/check-icon'
import { CloseIcon } from '../../icons/close-icon'
import { FilterIcon } from '../../icons/filter-icon'
import { Button, type ButtonProps } from '../button/index'
import { IconButton } from '../icon-button/index'
import { Menu } from '../menu/index'
import { Input } from '../input/index'
import {
  FiltersDateEditor,
  FiltersNumberEditor,
  FiltersStringEditor,
} from './filters-value-editors'
import { filtersSlotRecipe } from './filters.recipe'

const { withProvider } = createSlotRecipeContext({
  recipe: filtersSlotRecipe,
})

/**
 * Both slots are recipe providers: a chip must style itself even when it is
 * composed outside of the bar.
 */
const FilterBarSlot = withProvider<HTMLDivElement, HTMLChakraProps<'div'>>(
  'div',
  'bar',
)
const FilterChipSlot = withProvider<HTMLDivElement, HTMLChakraProps<'div'>>(
  'div',
  'chip',
)

/**
 * The secondary click target inside an option row: toggles the value into a
 * multi-select without selecting the row (which would close the menu). All
 * pointer events are stopped so the surrounding menu item never fires.
 */
function OptionCheckbox(props: { checked: boolean; onToggle(): void }) {
  return (
    <Box
      role="checkbox"
      aria-checked={props.checked}
      aria-label="Toggle value"
      display="flex"
      alignItems="center"
      justifyContent="center"
      boxSize="4"
      rounded="sm"
      borderWidth="1px"
      colorPalette="accent"
      borderColor={props.checked ? 'colorPalette.solid' : 'border.emphasized'}
      bg={props.checked ? 'colorPalette.solid' : 'transparent'}
      color="colorPalette.contrast"
      cursor="pointer"
      onPointerDown={(event) => event.stopPropagation()}
      onPointerUp={(event) => event.stopPropagation()}
      onClick={(event) => {
        event.stopPropagation()
        props.onToggle()
      }}
    >
      {props.checked ? <CheckIcon width="10" height="10" /> : null}
    </Box>
  )
}

export interface FiltersFormatValueContext<
  TDefinition extends AnyConditionsDefinition = AnyConditionsDefinition,
> {
  fieldId: DefinitionFieldId<TDefinition>
  field: ConditionFieldDefinition | undefined
  value: unknown
}

/**
 * Optional per-field chrome resolved from `field.meta`. Define fields as
 * `meta: { icon: <TagIcon /> }` to show an icon in the add-filter menu and
 * on the chip's field label.
 */
export interface FiltersFieldMeta {
  icon?: React.ReactNode
  /**
   * Plural noun for collapsed multi-value chips, e.g. `states` renders
   * "2 states" when two values are selected. Falls back to "2 selected".
   */
  pluralLabel?: string
}

/**
 * Optional per-option chrome resolved from `option.meta`. Define options as
 * `{ value, label, meta: { icon: <StatusDot /> } }` to show an icon in the
 * option lists and on the chip's value.
 */
export interface FiltersOptionMeta {
  icon?: React.ReactNode
}

export interface FiltersUIOptions<
  TDefinition extends AnyConditionsDefinition = AnyConditionsDefinition,
> extends Pick<
    CreateConditionsHookOptions<TDefinition>,
    'fallbackValueEditor' | 'resolveValueEditor'
  > {
  /** Editors by field type, merged over the built-in editors. */
  valueEditors?: ValueEditorRegistry
  fieldValueEditors?: ValueEditorRegistry
  operatorValueEditors?: ValueEditorRegistry
  fieldOperatorValueEditors?: ValueEditorRegistry
  /**
   * Compact operator labels for chips, merged over the built-in overrides
   * (`gt` `>`, `gte` `≥`, `lt` `<`, `lte` `≤`). Unmapped operators use the
   * operator label from the definition.
   */
  operatorLabels?: Record<string, string>
  /**
   * Format a committed value for display in a chip. Return `undefined` to
   * fall back to the default formatting (option labels, localized dates,
   * Yes/No booleans).
   */
  formatValue?: (
    context: FiltersFormatValueContext<TDefinition>,
  ) => string | undefined
}

export interface CreateFiltersOptions<
  TDefinition extends AnyConditionsDefinition,
> extends FiltersUIOptions<TDefinition> {
  definition: TDefinition
}

export interface FilterBarProps extends HTMLChakraProps<'div'> {}

export interface AddFilterButtonProps extends ButtonProps {
  /** Group to add the condition to. Defaults to the root group. */
  parentId?: string
}

export interface ClearFiltersButtonProps extends ButtonProps {}

export interface FiltersConditionComponents
  extends ConditionsComponentRegistry {
  FilterChip: React.FC
}

export interface FiltersConditionsComponents
  extends ConditionsComponentRegistry {
  FilterBar: React.FC<FilterBarProps>
  FilterChips: React.FC
  AddFilterButton: React.FC<AddFilterButtonProps>
  ClearFiltersButton: React.FC<ClearFiltersButtonProps>
}

interface FiltersValueEditors extends ValueEditorRegistry {
  string: ValueEditorComponent<any>
  number: ValueEditorComponent<any>
  date: ValueEditorComponent<any>
  datetime: ValueEditorComponent<any>
  enum: ValueEditorComponent<any>
  boolean: ValueEditorComponent<any>
}

export type Filters<TDefinition extends AnyConditionsDefinition> =
  ConditionsHookApi<
    TDefinition,
    FiltersValueEditors,
    {},
    {},
    {},
    FiltersConditionComponents,
    {},
    FiltersConditionsComponents
  > & {
    /**
     * The bound conditions definition — created inline from `fields`, or the
     * one passed as `definition`. Pass it to adapters like
     * `conditionsGlobalFilter` and to server-side evaluation.
     */
    definition: TDefinition
  }

/**
 * Creates a conditions hook with the Saas UI filter parts pre-bound. Call at
 * module scope with your fields (or a definition from `defineConditions`);
 * every instance returned by `useConditions` carries `FilterBar`,
 * `FilterChips`, `AddFilterButton`, `ClearFiltersButton` and `FilterChip`
 * alongside the standard conditions API.
 */
export function createFilters<TDefinition extends AnyConditionsDefinition>(
  options: CreateFiltersOptions<TDefinition>,
): Filters<TDefinition>
export function createFilters<
  const TOperators extends ConditionOperators,
  const TFields extends ConditionFields<ConditionOperatorIdFromList<TOperators>>,
>(
  options: { fields: TFields; operators: TOperators } & FiltersUIOptions<
    ConditionsDefinition<TFields, TOperators>
  >,
): Filters<ConditionsDefinition<TFields, TOperators>>
export function createFilters<
  const TFields extends ConditionFields<
    ConditionOperatorIdFromList<typeof defaultOperators>
  >,
>(
  options: { fields: TFields; operators?: undefined } & FiltersUIOptions<
    ConditionsDefinition<TFields, typeof defaultOperators>
  >,
): Filters<ConditionsDefinition<TFields, typeof defaultOperators>>
export function createFilters(options: any): any {
  const { definition, fields, operators, ...ui } = options
  return createFiltersImpl(
    definition ?? defineConditions({ fields, operators }),
    ui,
  )
}

function createFiltersImpl<TDefinition extends AnyConditionsDefinition>(
  definition: TDefinition,
  options: FiltersUIOptions<TDefinition>,
) {
  const { formatValue } = options

  type FieldId = DefinitionFieldId<TDefinition>
  type Instance = ConditionsInstance<TDefinition>

  /**
   * Explicit contexts break the type-inference cycle between the closure
   * components below and the hook they are registered on: the components
   * resolve the instance through these contexts instead of through `hook`.
   */
  const contexts = createConditionsHookContexts()

  function useFiltersInstance(): Instance {
    return useConditionsRootContext<TDefinition>(contexts) as Instance
  }

  const fieldEntries = Object.entries(definition.fields) as [
    FieldId,
    ConditionFieldDefinition,
  ][]

  const operatorLabels: Record<string, string> = {
    gt: '>',
    gte: '≥',
    lt: '<',
    lte: '≤',
    ...options.operatorLabels,
  }

  function operatorLabel(operatorId: string | undefined) {
    if (!operatorId) return 'is'
    return (
      operatorLabels[operatorId] ??
      getConditionOperator(definition, operatorId)?.label ??
      operatorId
    )
  }

  function fieldIcon(field: ConditionFieldDefinition) {
    return (field.meta as FiltersFieldMeta | undefined)?.icon ?? null
  }

  function optionIcon(option: ConditionOption) {
    return (option.meta as FiltersOptionMeta | undefined)?.icon ?? null
  }

  function syncFieldOptions(fieldId: FieldId) {
    const field = getConditionField(definition, fieldId)
    return (
      typeof field?.options === 'function' ? undefined : field?.options
    ) as readonly ConditionOption[] | undefined
  }

  function valueIcon(fieldId: FieldId, value: unknown) {
    const option = syncFieldOptions(fieldId)?.find(
      (item) => item.value === value,
    )
    return option ? optionIcon(option) : null
  }

  /** Fields whose values are picked from a list (options or boolean). */
  function hasSelectableOptions(field: ConditionFieldDefinition) {
    return field.options != null || field.type === 'boolean'
  }

  /** The field's multi-select operator (`in`, …), when it supports one. */
  function multipleOperatorFor(field: ConditionFieldDefinition) {
    return getConditionFieldOperators(definition, field).find(
      (operator) => operator.valueMode === 'multiple',
    )
  }

  function singleOperatorFor(field: ConditionFieldDefinition) {
    const operators = getConditionFieldOperators(definition, field)
    const preferred = field.defaultOperator
      ? operators.find(
          (operator) =>
            operator.id === field.defaultOperator &&
            operator.valueMode === 'single',
        )
      : undefined
    return (
      preferred ?? operators.find((operator) => operator.valueMode === 'single')
    )?.id
  }

  /**
   * Inputs rendered inside menu content must not feed the menu's typeahead
   * and arrow-key navigation. Escape still bubbles so the menu closes.
   */
  function stopMenuKeys(event: React.KeyboardEvent) {
    if (event.key !== 'Escape') event.stopPropagation()
  }

  function resolveFieldId(field: ConditionFieldDefinition) {
    return fieldEntries.find(([, candidate]) => candidate === field)?.[0]
  }

  function formatOneValue(fieldId: FieldId, value: unknown): string {
    const field = getConditionField(definition, fieldId)
    const custom = formatValue?.({ fieldId, field, value })
    if (custom !== undefined) return custom
    if (value instanceof Date) return value.toLocaleDateString()
    const fieldOptions = syncFieldOptions(fieldId)
    if (fieldOptions) {
      const option = fieldOptions.find((item) => item.value === value)
      if (option) return option.label
    }
    if (field?.type === 'boolean') return value ? 'Yes' : 'No'
    return value == null ? '' : String(value)
  }

  function valueLabel(
    fieldId: FieldId | undefined,
    operatorId: string | undefined,
    value: unknown,
  ) {
    if (!fieldId) return 'Select…'
    if (Array.isArray(value)) {
      if (!value.length) return 'Select…'
      const operator = operatorId
        ? getConditionOperator(definition, operatorId)
        : undefined
      const separator = operator?.valueMode === 'range' ? ' – ' : ', '
      return value
        .map((item) => formatOneValue(fieldId, item))
        .join(separator)
    }
    const label = formatOneValue(fieldId, value)
    return label || 'Select…'
  }

  /**
   * Chip value content: the formatted labels, with option icons inlined
   * where the field's (synchronous) options define them.
   */
  function chipValueContent(
    fieldId: FieldId | undefined,
    operatorId: string | undefined,
    value: unknown,
  ): React.ReactNode {
    const label = valueLabel(fieldId, operatorId, value)
    if (!fieldId) return label
    const values = Array.isArray(value) ? value : [value]
    if (!values.length) return label
    const icons = values.map((item) => valueIcon(fieldId, item))
    const operator = operatorId
      ? getConditionOperator(definition, operatorId)
      : undefined
    // Two or more values collapse to the value icons plus a count, e.g.
    // "● ● 2 states" — the noun comes from the field's `meta.pluralLabel`.
    if (operator?.valueMode === 'multiple' && values.length > 1) {
      const field = getConditionField(definition, fieldId)
      const plural =
        (field?.meta as FiltersFieldMeta | undefined)?.pluralLabel ??
        'selected'
      const visibleIcons = icons.filter(Boolean)
      return (
        <>
          {visibleIcons.length ? (
            <HStack gap="0.5">
              {visibleIcons.map((icon, index) => (
                <React.Fragment key={index}>{icon}</React.Fragment>
              ))}
            </HStack>
          ) : null}
          <span>
            {values.length} {plural}
          </span>
        </>
      )
    }
    if (!icons.some(Boolean)) return label
    const separator = operator?.valueMode === 'range' ? ' – ' : ', '
    return values.map((item, index) => (
      <React.Fragment key={index}>
        {index > 0 ? <span>{separator.trim()}</span> : null}
        {icons[index]}
        <span>{formatOneValue(fieldId, item) || 'Select…'}</span>
      </React.Fragment>
    ))
  }

  /**
   * Default editor for `enum` and `boolean` fields. Options resolve through
   * `useConditionOptions`, so async option sources (and their search query)
   * work without extra wiring.
   */
  function FiltersOptionEditor(props: ValueEditorProps) {
    const conditions = useFiltersInstance()
    // The resolved editor always receives a field object out of the bound
    // definition, so the reverse lookup cannot miss.
    const fieldId = resolveFieldId(props.field) as FieldId
    const isAsync = typeof props.field.options === 'function'
    const { options: items, query, setQuery, loading } = useConditionOptions(
      conditions,
      { field: fieldId, value: props.value },
    )
    const multiple = props.operator.valueMode === 'multiple'
    const selected = Array.isArray(props.value) ? props.value : []
    const selectedSet = new Set(selected)

    return (
      <Stack gap="1">
        {isAsync ? (
          <Input
            size="sm"
            autoFocus
            placeholder="Search…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        ) : null}
        {loading ? <Spinner size="xs" alignSelf="center" my="2" /> : null}
        {items.map((option) => {
          const checked = multiple
            ? selectedSet.has(option.value)
            : props.value === option.value

          return (
            <Button
              key={String(option.value)}
              size="sm"
              variant={checked ? 'subtle' : 'ghost'}
              justifyContent="flex-start"
              fontWeight="normal"
              disabled={option.disabled}
              onClick={() => {
                if (multiple) {
                  props.onValueChange(
                    checked
                      ? selected.filter((item) => item !== option.value)
                      : [...selected, option.value],
                  )
                  return
                }
                props.onValueChange(option.value)
              }}
            >
              {optionIcon(option)}
              {option.label}
            </Button>
          )
        })}
      </Stack>
    )
  }

  /**
   * Searchable option list rendered inside a menu: a filter input, a loading
   * state for async sources, and Linear-style two-target rows. Clicking a
   * row picks exactly that value and closes the menu; clicking the checkbox
   * (shown when the picker allows multiple values) toggles the value while
   * the menu stays open. Shared between the add-filter submenus and chip
   * value menus.
   */
  function FilterOptionMenuList(props: {
    fieldId: FieldId
    field: ConditionFieldDefinition
    /** Render toggle checkboxes next to the options. */
    checkboxes: boolean
    selected: readonly unknown[]
    /** Checkbox click: toggle this value; the menu stays open. */
    onToggle(value: unknown): void
    /** Row click: use exactly this value; the menu closes. */
    onPick(value: unknown): void
  }) {
    const conditions = useFiltersInstance()
    const { options, query, setQuery, loading } = useConditionOptions(
      conditions,
      { field: props.fieldId, value: props.selected },
    )
    const search = query.trim().toLowerCase()
    const visible = search
      ? options.filter((option) =>
          option.label.toLowerCase().includes(search),
        )
      : options
    const selectedSet = new Set(props.selected)

    return (
      <>
        <chakra.input
          autoFocus
          placeholder="Filter…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={stopMenuKeys}
          width="100%"
          px="2.5"
          py="1.5"
          textStyle="sm"
          bg="transparent"
          border="none"
          outline="none"
          _placeholder={{ color: 'fg.muted' }}
        />
        <Menu.Separator />
        {loading ? (
          <Spinner size="xs" display="block" mx="auto" my="2" />
        ) : null}
        {visible.map((option) => (
          <Menu.Item
            key={String(option.value)}
            value={String(option.value)}
            disabled={option.disabled}
            aria-selected={selectedSet.has(option.value) || undefined}
            onClick={() => props.onPick(option.value)}
          >
            {props.checkboxes ? (
              <OptionCheckbox
                checked={selectedSet.has(option.value)}
                onToggle={() => props.onToggle(option.value)}
              />
            ) : null}
            {optionIcon(option)}
            {option.label}
          </Menu.Item>
        ))}
        {!loading && !visible.length ? (
          <Text px="2" py="1.5" textStyle="sm" color="fg.muted">
            No options
          </Text>
        ) : null}
      </>
    )
  }

  function ChipShell({
    chip,
    conditions,
    conditionId,
  }: {
    chip: ConditionChipApi<TDefinition>
    conditions: Instance
    /** The committed condition's id; absent for an add-draft chip. */
    conditionId?: string
  }) {
    const field = chip.field
      ? getConditionField(definition, chip.field)
      : undefined
    const operator = chip.operator
      ? getConditionOperator(definition, chip.operator)
      : undefined
    const needsValue = operator?.valueMode !== 'none'
    const selectable = field ? hasSelectableOptions(field) : false
    const multiple = operator?.valueMode === 'multiple'

    // The default operator pair for this field. While the chip uses one of
    // the two, the operator adapts to the selection count (one value "is",
    // several "is any of"). Explicit choices like "is not" are kept as-is.
    const pairSingle = field ? singleOperatorFor(field) : undefined
    const pairMultiple = field ? multipleOperatorFor(field)?.id : undefined
    const adaptive =
      !chip.isDraft &&
      Boolean(chip.operator) &&
      (chip.operator === pairSingle || chip.operator === pairMultiple)
    const showCheckboxes =
      selectable && (multiple || (adaptive && Boolean(pairMultiple)))

    const selectedValues = Array.isArray(chip.value)
      ? chip.value
      : chip.value != null
        ? [chip.value]
        : []

    // The value menu opens in two ways: the user clicks the value button on a
    // committed chip (local state, edits apply to the store directly), or a
    // draft advances to its value step (chip.panel, edits stage on the draft
    // and commit when the menu closes).
    const [valueMenuOpen, setValueMenuOpen] = React.useState(false)
    const draftValueOpen = chip.panel === 'value'

    const onToggleValue = (value: unknown) => {
      const next = selectedValues.includes(value)
        ? selectedValues.filter((item) => item !== value)
        : [...selectedValues, value]
      if (chip.isDraft) {
        chip.setValue(next)
        return
      }
      if (!conditionId) return
      if (!next.length) {
        // Unchecking the last value removes the filter (the menu goes with
        // the chip).
        conditions.actions.remove(conditionId)
        return
      }
      if (adaptive && next.length === 1 && pairSingle) {
        conditions.actions.updateCondition(conditionId, {
          operator: pairSingle,
          value: next[0],
        } as never)
        return
      }
      if (adaptive && pairMultiple) {
        conditions.actions.updateCondition(conditionId, {
          operator: pairMultiple,
          value: next,
        } as never)
        return
      }
      conditions.actions.updateCondition(conditionId, {
        value: multiple ? next : next[next.length - 1],
      })
    }

    const onPickValue = (value: unknown) => {
      if (chip.isDraft) {
        chip.apply({ value: (multiple ? [value] : value) as never })
        return
      }
      if (!conditionId) return
      if (adaptive && pairSingle) {
        conditions.actions.updateCondition(conditionId, {
          operator: pairSingle,
          value,
        } as never)
        return
      }
      conditions.actions.updateCondition(conditionId, {
        value: multiple ? [value] : value,
      })
    }

    const onValueMenuOpenChange = (open: boolean) => {
      if (open) {
        // Free-form editors stage through a draft (`chip.setValue`), so
        // editing a committed value begins an edit draft. Option pickers
        // update the committed condition directly.
        if (!selectable && !chip.isDraft) chip.openPanel('value')
        else setValueMenuOpen(true)
        return
      }
      setValueMenuOpen(false)
      if (!draftValueOpen) return
      // Closing a draft's value menu commits a usable selection and cancels
      // otherwise (an untouched operator/value change reverts).
      if (multiple) {
        const current = Array.isArray(chip.value) ? chip.value : []
        if (current.length) {
          chip.apply()
          return
        }
        chip.close()
        return
      }
      chip.close()
    }

    return (
      <FilterChipSlot>
        <HStack
          gap="1"
          px="2"
          textStyle="xs"
          fontWeight="medium"
          userSelect="none"
        >
          {field ? fieldIcon(field) : null}
          {field?.label ?? String(chip.field ?? 'Field')}
        </HStack>
        <Menu.Root
          lazyMount
          open={chip.panel === 'operator'}
          onOpenChange={({ open }) => {
            if (open) chip.openPanel('operator')
            else if (chip.panel === 'operator') chip.close()
          }}
          positioning={{ placement: 'bottom-start' }}
        >
          <Menu.Trigger asChild>
            <Button
              size="xs"
              variant="ghost"
              color="fg.muted"
              fontWeight="normal"
            >
              {operatorLabel(chip.operator)}
            </Button>
          </Menu.Trigger>
          <Menu.Content>
            {field
              ? getConditionFieldOperators(definition, field).map((item) => (
                  <Menu.Item
                    key={item.id}
                    value={item.id}
                    onClick={() => chip.selectOperator(item.id)}
                  >
                    {operatorLabel(item.id)}
                  </Menu.Item>
                ))
              : null}
          </Menu.Content>
        </Menu.Root>
        {needsValue ? (
          <Menu.Root
            lazyMount
            open={valueMenuOpen || draftValueOpen}
            onOpenChange={({ open }) => onValueMenuOpenChange(open)}
            positioning={{ placement: 'bottom-start' }}
          >
            <Menu.Trigger asChild>
              <Button
                size="xs"
                variant="ghost"
                fontWeight="medium"
              >
                {chipValueContent(chip.field, chip.operator, chip.value)}
              </Button>
            </Menu.Trigger>
            <Menu.Content minW="48">
              {selectable && chip.field ? (
                <FilterOptionMenuList
                  fieldId={chip.field}
                  field={field!}
                  checkboxes={showCheckboxes}
                  selected={selectedValues}
                  onToggle={onToggleValue}
                  onPick={onPickValue}
                />
              ) : (
                <Box px="2" py="2" minW="56" onKeyDown={stopMenuKeys}>
                  <Stack gap="3">
                    <conditions.ValueEditor
                      field={chip.field}
                      operator={chip.operator}
                      value={chip.value}
                      error={chip.error}
                      onValueChange={(next) => chip.setValue(next)}
                    />
                    {chip.error ? (
                      <Text textStyle="sm" color="fg.error">
                        {chip.error}
                      </Text>
                    ) : null}
                    <Stack direction="row" justify="end">
                      <Button
                        size="xs"
                        variant="ghost"
                        onClick={() => chip.close()}
                      >
                        Cancel
                      </Button>
                      <Button size="xs" onClick={() => chip.apply()}>
                        Apply
                      </Button>
                    </Stack>
                  </Stack>
                </Box>
              )}
            </Menu.Content>
          </Menu.Root>
        ) : null}
        <IconButton
          size="xs"
          variant="ghost"
          aria-label="Remove filter"
          onClick={() => chip.remove()}
        >
          <CloseIcon />
        </IconButton>
      </FilterChipSlot>
    )
  }

  /** One committed condition, rendered inside a `ConditionScope`. */
  const FilterChip = React.memo(function FilterChip() {
    const scope = useConditionScopeContext(contexts)
    const conditions = scope.conditions as Instance
    const condition = conditions.useCondition(scope.id)
    const draft = conditions.useEditDraft(scope.id)
    const chip = useConditionChip<TDefinition>(conditions, { condition, draft })
    if (!condition) return null
    return (
      <ChipShell chip={chip} conditions={conditions} conditionId={scope.id} />
    )
  })

  function FilterDraftChip({ parentId }: { parentId: string }) {
    const conditions = useFiltersInstance()
    const draft = conditions.useAddDraft(parentId)
    const chip = useConditionChip<TDefinition>(conditions, { draft })

    React.useEffect(() => {
      if (!draft || chip.panel) return
      // Add drafts always carry a field (they start from the add menu); a
      // chip has no field picker, so a field-less draft is simply cancelled.
      if (!draft.field) {
        chip.remove()
        return
      }
      chip.openPanel('value')
      // Open the value menu once when an add draft appears.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [draft?.mode, draft?.field])

    if (!draft) return null
    return <ChipShell chip={chip} conditions={conditions} />
  }

  /** Committed chips plus the active add-draft chip for the root group. */
  function FilterChips() {
    const conditions = useFiltersInstance()
    const root = conditions.useRoot()
    const hasAddDraft = conditions.useHasAddDraft(root.id)

    return (
      <>
        {root.items.map((item) =>
          isConditionGroup(item) ? null : (
            <conditions.ConditionScope key={item.id} id={item.id}>
              <FilterChip />
            </conditions.ConditionScope>
          ),
        )}
        {hasAddDraft ? <FilterDraftChip parentId={root.id} /> : null}
      </>
    )
  }

  /**
   * A field's submenu in the add-filter menu: picking a value commits the
   * condition immediately, and checkbox toggles keep updating it while the
   * submenu stays open. Closing with nothing selected leaves no filter
   * behind.
   */
  function AddFilterFieldSubmenu(props: {
    fieldId: FieldId
    field: ConditionFieldDefinition
    parentId: string
  }) {
    const { fieldId, field, parentId } = props
    const conditions = useFiltersInstance()
    const committedIdRef = React.useRef<string | null>(null)
    const committed = conditions.useCondition(committedIdRef.current ?? '')
    const selected = committed
      ? Array.isArray(committed.value)
        ? committed.value
        : committed.value != null
          ? [committed.value]
          : []
      : []
    const singleOperator = singleOperatorFor(field)
    const multipleOperator = multipleOperatorFor(field)?.id

    // Create or update this submenu session's condition. The operator
    // adapts to the selection: one value commits with the single-value
    // operator ("is"), several with the multi-value one ("is any of").
    const commit = (operator: string | undefined, value: unknown) => {
      if (committedIdRef.current && committed) {
        conditions.actions.updateCondition(committedIdRef.current, {
          operator,
          value,
        } as never)
        return
      }
      committedIdRef.current = conditions.actions.addCondition(
        { field: fieldId, operator, value } as never,
        { parentId },
      )
    }

    const onToggle = (value: unknown) => {
      const next = selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value]
      if (!next.length) {
        if (committedIdRef.current) {
          conditions.actions.remove(committedIdRef.current)
          committedIdRef.current = null
        }
        return
      }
      if (next.length === 1 && singleOperator) commit(singleOperator, next[0])
      else if (multipleOperator) commit(multipleOperator, next)
      else if (singleOperator) commit(singleOperator, next[next.length - 1])
    }

    const onPick = (value: unknown) => {
      if (singleOperator) commit(singleOperator, value)
      else if (multipleOperator) commit(multipleOperator, [value])
    }

    return (
      <Menu.Root
        lazyMount
        unmountOnExit
        positioning={{ placement: 'right-start', gutter: 2 }}
        onOpenChange={({ open }) => {
          if (!open) committedIdRef.current = null
        }}
      >
        <Menu.TriggerItem value={fieldId} startIcon={fieldIcon(field)}>
          {field.label ?? fieldId}
        </Menu.TriggerItem>
        <Menu.Content minW="48">
          <FilterOptionMenuList
            fieldId={fieldId}
            field={field}
            checkboxes={Boolean(multipleOperator)}
            selected={selected}
            onToggle={onToggle}
            onPick={onPick}
          />
        </Menu.Content>
      </Menu.Root>
    )
  }

  function AddFilterButton(props: AddFilterButtonProps) {
    const { parentId, children, ...rest } = props
    const conditions = useFiltersInstance()
    const root = conditions.useRoot()
    const parent = parentId ?? root.id

    return (
      <Menu.Root lazyMount>
        <Menu.Button size="xs" variant="ghost" {...rest}>
          {children ?? (
            <>
              <FilterIcon /> Filter
            </>
          )}
        </Menu.Button>
        <Menu.Content>
          {fieldEntries.map(([id, field]) =>
            hasSelectableOptions(field) ? (
              <AddFilterFieldSubmenu
                key={id}
                fieldId={id}
                field={field}
                parentId={parent}
              />
            ) : (
              <Menu.Item
                key={id}
                value={id}
                onClick={() =>
                  conditions.draft.beginAddCondition({
                    parentId: parent,
                    field: id,
                  })
                }
              >
                {fieldIcon(field)}
                {field.label ?? id}
              </Menu.Item>
            ),
          )}
        </Menu.Content>
      </Menu.Root>
    )
  }

  function ClearFiltersButton(props: ClearFiltersButtonProps) {
    const { children, ...rest } = props
    const conditions = useFiltersInstance()
    const isEmpty = conditions.useIsEmpty()
    if (isEmpty) return null
    return (
      <Button
        size="xs"
        variant="ghost"
        color="fg.muted"
        onClick={() => conditions.actions.clear()}
        {...rest}
      >
        {children ?? 'Clear'}
      </Button>
    )
  }

  /**
   * Batteries-included filter bar: chips, add button and clear button. Pass
   * children to compose the bar yourself from `conditions.FilterChips`,
   * `conditions.AddFilterButton` and `conditions.ClearFiltersButton`.
   */
  function FilterBar(props: FilterBarProps) {
    const { children, ...rest } = props
    return (
      <FilterBarSlot {...rest}>
        {children ?? (
          <>
            <FilterChips />
            <AddFilterButton />
            <ClearFiltersButton />
          </>
        )}
      </FilterBarSlot>
    )
  }

  const hook = createConditionsHook({
    definition,
    contexts,
    valueEditors: {
      string: FiltersStringEditor,
      number: FiltersNumberEditor,
      date: FiltersDateEditor,
      datetime: FiltersDateEditor,
      enum: FiltersOptionEditor,
      boolean: FiltersOptionEditor,
      ...options.valueEditors,
    },
    fieldValueEditors: options.fieldValueEditors,
    operatorValueEditors: options.operatorValueEditors,
    fieldOperatorValueEditors: options.fieldOperatorValueEditors,
    fallbackValueEditor: options.fallbackValueEditor,
    resolveValueEditor: options.resolveValueEditor,
    conditionComponents: {
      FilterChip,
    },
    conditionsComponents: {
      FilterBar,
      FilterChips,
      AddFilterButton,
      ClearFiltersButton,
    },
  })

  return Object.assign(hook, { definition })
}
