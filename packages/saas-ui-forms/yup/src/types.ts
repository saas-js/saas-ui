import { ObjectSchema } from 'yup'

// @see https://github.com/jquense/yup/issues/1849
export type AnyObjectSchema =
  | ObjectSchema<any, any, any, ''>
  | ObjectSchema<any, any, any, 'd'>
  | ObjectSchema<any, any, any, 's'>
