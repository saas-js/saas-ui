import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
type FieldProps = any;
export { zodResolver };
export type ExtraProps = {
    min?: number;
    max?: number;
    options?: {
        label: string;
        value: string;
    }[];
};
/**
 * A helper function to render forms automatically based on a Yup schema
 *
 * @param schema The Yup schema
 * @returns {FieldProps[]}
 */
export declare const getFieldsFromSchema: (schema: z.ZodTypeAny) => FieldProps[];
export declare const getNestedSchema: (schema: z.ZodTypeAny, path: string) => any;
export declare const zodFieldResolver: <T extends z.ZodTypeAny>(schema: T) => {
    getFields(): any[];
    getNestedFields(name: string): any[];
};
export interface ZodMeta {
    /**
     * The label of the field
     */
    label: string;
    /**
     * The type of the field
     */
    type?: string;
    /**
     * The placeholder of the field
     */
    placeholder?: string;
    /**
     * The help text of the field
     */
    help?: string;
    /**
     * Object field column count
     */
    columns?: number;
    /**
     * Array field min rows
     */
    min?: number;
    /**
     * Array field max rows
     */
    max?: number;
    [key: string]: any;
}
export declare const zodMeta: (meta: ZodMeta) => string;
export declare const zodParseMeta: (meta: string) => any;
//# sourceMappingURL=zod-resolver.d.ts.map