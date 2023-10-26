export { ajvFieldResolver, ajvResolver } from './ajv-resolver'
export { createAjvForm } from './create-ajv-form'
export type { CreateAjvFormProps } from './create-ajv-form'
export type { JTDDataType, JTDSchemaType } from 'ajv/dist/jtd'

import { createAjvForm } from './create-ajv-form'

export const Form = createAjvForm()
