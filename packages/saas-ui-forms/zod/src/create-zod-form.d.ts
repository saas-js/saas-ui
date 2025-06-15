import { CreateFormProps, WithFields, FormProps, GetBaseField } from '@saas-ui/forms';
import { zodResolver } from './zod-resolver';
import { z } from 'zod';
type ResolverArgs = Parameters<typeof zodResolver>;
export interface CreateZodFormProps<FieldDefs, TGetBaseField extends GetBaseField = GetBaseField> extends CreateFormProps<FieldDefs, TGetBaseField> {
    schemaOptions?: ResolverArgs[1];
    resolverOptions?: ResolverArgs[2];
}
type InferObjectSchema<T extends z.ZodTypeAny | z.ZodEffects<z.ZodTypeAny>> = T extends z.ZodEffects<infer TSchema> ? z.infer<TSchema> : z.infer<T>;
export type ZodFormType<FieldDefs, ExtraProps = object, ExtraFieldProps extends object = object, ExtraOverrides = object, Type extends 'zod' = 'zod'> = (<TSchema extends z.AnyZodObject | z.ZodEffects<z.AnyZodObject> = z.AnyZodObject, TFieldValues extends InferObjectSchema<TSchema> = InferObjectSchema<TSchema>, TContext extends object = object>(props: WithFields<FormProps<TSchema, TFieldValues, TContext, ExtraFieldProps>, FieldDefs, ExtraOverrides> & {
    ref?: React.ForwardedRef<HTMLFormElement>;
} & ExtraProps) => React.ReactElement) & {
    displayName?: string;
    id?: string;
};
export declare const createZodForm: <FieldDefs, TGetBaseField extends GetBaseField<any> = GetBaseField<any>>(options?: CreateZodFormProps<FieldDefs, TGetBaseField>) => ZodFormType<FieldDefs, object, TGetBaseField extends GetBaseField<infer ExtraFieldProps extends object> ? ExtraFieldProps : object>;
export {};
//# sourceMappingURL=create-zod-form.d.ts.map