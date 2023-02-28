export type FieldOption = { label: string; value: string }
export type FieldOptions<TOption extends FieldOption = FieldOption> =
  | Array<string>
  | Array<TOption>
