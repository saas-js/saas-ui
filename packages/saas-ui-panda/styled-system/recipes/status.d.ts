/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface StatusVariant {
  /**
 * @default "md"
 */
size: "sm" | "md" | "lg"
}

type StatusVariantMap = {
  [key in keyof StatusVariant]: Array<StatusVariant[key]>
}

export type StatusVariantProps = {
  [key in keyof StatusVariant]?: ConditionalValue<StatusVariant[key]> | undefined
}

export interface StatusRecipe {
  __type: StatusVariantProps
  (props?: StatusVariantProps): Pretty<Record<"root" | "indicator", string>>
  raw: (props?: StatusVariantProps) => StatusVariantProps
  variantMap: StatusVariantMap
  variantKeys: Array<keyof StatusVariant>
  splitVariantProps<Props extends StatusVariantProps>(props: Props): [StatusVariantProps, Pretty<DistributiveOmit<Props, keyof StatusVariantProps>>]
  getVariantProps: (props?: StatusVariantProps) => StatusVariantProps
}


export declare const status: StatusRecipe