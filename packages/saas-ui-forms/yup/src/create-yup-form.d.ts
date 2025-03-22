import React from 'react';
import { CreateFormProps, FormProps, GetBaseField, WithFields } from '@saas-ui/forms';
import { AnyObjectSchema, InferType } from 'yup';
import { yupResolver } from './yup-resolver';
type ResolverArgs = Parameters<typeof yupResolver>;
export interface CreateYupFormProps<FieldDefs, TGetBaseField extends GetBaseField = GetBaseField> extends CreateFormProps<FieldDefs, TGetBaseField> {
    schemaOptions?: ResolverArgs[1];
    resolverOptions?: ResolverArgs[2];
}
export type YupFormType<FieldDefs, ExtraProps = object, ExtraFieldProps extends object = object, ExtraOverrides = object, Type extends 'yup' = 'yup'> = (<TSchema extends AnyObjectSchema = AnyObjectSchema, TFieldValues extends Required<InferType<TSchema>> = Required<InferType<TSchema>>, TContext extends object = object>(props: WithFields<FormProps<TSchema, TFieldValues, TContext, ExtraFieldProps>, FieldDefs, ExtraOverrides> & {
    ref?: React.ForwardedRef<HTMLFormElement>;
} & ExtraProps) => React.ReactElement) & {
    displayName?: string;
    id?: 'YupForm';
};
export declare const createYupForm: <FieldDefs, TGetBaseField extends GetBaseField = GetBaseField>(options?: CreateYupFormProps<FieldDefs, TGetBaseField>) => YupFormType<FieldDefs, object, TGetBaseField extends GetBaseField<infer ExtraFieldProps extends object> ? ExtraFieldProps : object>;
export {};
//# sourceMappingURL=create-yup-form.d.ts.map