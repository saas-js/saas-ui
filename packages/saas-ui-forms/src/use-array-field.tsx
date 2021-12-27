import * as React from 'react'
import {
  useFieldArray,
  useFormContext,
  UseFieldArrayReturn,
} from 'react-hook-form'

import { createContext } from '@chakra-ui/react-utils'

export interface UseArrayFieldReturn extends UseFieldArrayReturn {
  /**
   * The array field name
   */
  name: string
  /**
   * The default value for new items
   */
  defaultValue: Record<string, any>
  /**
   * Min amount of items
   */
  min?: number
  /**
   * Max amount of items
   */
  max?: number
}

export const [ArrayFieldProvider, useArrayFieldContext] =
  createContext<UseArrayFieldReturn>({
    name: 'ArrayFieldContext',
  })

export interface UseArrayFieldRowReturn {
  /**
   * Name of the array field including the index, eg 'field.0'
   */
  name: string
  /**
   * The field index
   */
  index: number
  /**
   * Remove this array item
   */
  remove: () => void
  /**
   * True if this is the first item
   */
  isFirst: boolean
  /**
   * True if this is the last item
   */
  isLast: boolean
}

export const [ArrayFieldRowProvider, useArrayFieldRowContext] =
  createContext<UseArrayFieldRowReturn>({
    name: 'ArrayFieldRowContext',
  })

export interface ArrayFieldOptions {
  /**
   * The field name
   */
  name: string
  /**
   * Default value for new values in the array
   */
  defaultValue?: Record<string, any>
  /**
   * Default key name for rows, change this if your data uses 'id'
   * @default "id"
   */
  keyName?: string
  min?: number
  max?: number
}

export const useArrayField = ({
  name,
  defaultValue = {},
  keyName,
  min,
  max,
}: ArrayFieldOptions) => {
  const { control } = useFormContext()
  const context = useFieldArray({
    control,
    name,
    keyName,
  })

  return {
    ...context,
    name,
    defaultValue,
    min,
    max,
  }
}

export interface UseArrayFieldRowProps {
  index: number
}

export const useArrayFieldRow = ({ index }: UseArrayFieldRowProps) => {
  const { clearErrors } = useFormContext()
  const { name, remove, fields } = useArrayFieldContext()

  React.useEffect(() => {
    // reset errors, to make sure min/max errors reset correctly
    clearErrors(name)
  }, [])

  return {
    index,
    isFirst: index === 0,
    isLast: index === fields.length - 1,
    name: `${name}.${index}`,
    remove: React.useCallback(() => {
      clearErrors(name)
      remove(index)
    }, [index]),
  }
}
