import { yupResolver } from '@hookform/resolvers/yup';
import { FieldProps, GetFieldResolver } from '@saas-ui/forms';
import { AnyObjectSchema } from './types';
export { yupResolver };
export type Options = {
    min?: number;
    max?: number;
};
/**
 * A helper function to render forms automatically based on a Yup schema
 *
 * @param schema The Yup schema
 * @returns {FieldProps[]}
 */
export declare const getFieldsFromSchema: (schema: AnyObjectSchema) => FieldProps[];
export declare const getNestedSchema: (schema: AnyObjectSchema, path: string) => AnyObjectSchema;
export declare const yupFieldResolver: GetFieldResolver;
//# sourceMappingURL=yup-resolver.d.ts.map