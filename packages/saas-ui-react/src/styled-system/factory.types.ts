export type DataAttr = Record<
  `data-${string}`,
  string | number | undefined | null | boolean
>

export interface JsxFactoryOptions<TProps> {
  forwardProps?: string[]
  defaultProps?: Partial<TProps> & DataAttr
  forwardAsChild?: boolean
  shouldForwardProp?(prop: string, variantKeys: string[]): boolean
}
