export type FieldOption = { label: string; value: string }
export type FieldOptions<TOption extends FieldOption = FieldOption> =
  | Array<string>
  | Array<TOption>

export type ValueOf<T> = T[keyof T]
export type ShallowMerge<A, B> = Omit<A, keyof B> & B
