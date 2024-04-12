import React from 'react'
import { defaultFieldTypes, InputField } from './default-fields'
import type { GetBaseField } from './types'

export interface FieldsContextValue {
  fields: Record<string, React.FC<any>>
  getBaseField?: GetBaseField<any>
}

const FieldsContext = React.createContext<FieldsContextValue | null>(null)

export const FieldsProvider: React.FC<{
  value: FieldsContextValue
  children: React.ReactNode
}> = (props) => {
  return (
    <FieldsContext.Provider value={props.value}>
      {props.children}
    </FieldsContext.Provider>
  )
}

export const useFieldsContext = () => {
  return React.useContext(FieldsContext)
}

export const useField = (
  type: string,
  fallback: React.FC<any>
): React.FC<any> => {
  const context = React.useContext(FieldsContext)
  return context?.fields?.[type] || fallback
}
