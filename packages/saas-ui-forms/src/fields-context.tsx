import React from 'react'

import type { GetBaseField } from './types'

export interface FieldsContextValue<
  TFields = any,
  TBaseFieldProps extends object = object,
> {
  fields: Record<string, React.FC<TFields>>
  getBaseField?: GetBaseField<TBaseFieldProps>
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
  fallback: React.FC<any>,
): React.FC<any> => {
  const context = React.useContext(FieldsContext)
  return context?.fields?.[type] || fallback
}
