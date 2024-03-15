import React from 'react'
import { defaultFieldTypes, InputField } from './default-fields'
import { GetBaseField } from './create-field'

export interface FieldsContextValue {
  fields: Record<string, React.FC<any>>
  getBaseField?: GetBaseField<any>
}

const FieldsContext = React.createContext<FieldsContextValue | null>(null)

export const FieldsProvider: React.FC<{
  value: Partial<FieldsContextValue>
  children: React.ReactNode
}> = (props) => {
  const fields = { ...defaultFieldTypes, ...props.value.fields }
  return (
    <FieldsContext.Provider
      value={{ fields, getBaseField: props.value.getBaseField }}
    >
      {props.children}
    </FieldsContext.Provider>
  )
}

export const useFieldsContext = () => {
  return React.useContext(FieldsContext)
}

export const useField = (type: string): React.FC<any> => {
  const context = React.useContext(FieldsContext)
  return context?.fields?.[type] || InputField
}
