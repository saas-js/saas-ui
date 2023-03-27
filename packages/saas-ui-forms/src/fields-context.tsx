import React from 'react'
import { defaultFieldTypes, InputField } from './default-fields'

const FieldsContext = React.createContext<Record<string, React.FC<any>> | null>(
  null
)

export const FieldsProvider: React.FC<{
  value: Record<string, React.FC<any>>
  children: React.ReactNode
}> = (props) => {
  const fields = { ...defaultFieldTypes, ...props.value }
  return (
    <FieldsContext.Provider value={fields}>
      {props.children}
    </FieldsContext.Provider>
  )
}

export const useField = (type: string): React.FC<any> => {
  const context = React.useContext(FieldsContext)
  return context?.[type] || InputField
}
