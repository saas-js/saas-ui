/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface StatVariant {
  /**
 * @default "md"
 */
size: "sm" | "md" | "lg"
}

type StatVariantMap = {
  [key in keyof StatVariant]: Array<StatVariant[key]>
}

export type StatVariantProps = {
  [key in keyof StatVariant]?: ConditionalValue<StatVariant[key]> | undefined
}

export interface StatRecipe {
  __type: StatVariantProps
  (props?: StatVariantProps): Pretty<Record<"root" | "label" | "helpText" | "valueText" | "valueUnit" | "indicator", string>>
  raw: (props?: StatVariantProps) => StatVariantProps
  variantMap: StatVariantMap
  variantKeys: Array<keyof StatVariant>
  splitVariantProps<Props extends StatVariantProps>(props: Props): [StatVariantProps, Pretty<DistributiveOmit<Props, keyof StatVariantProps>>]
  getVariantProps: (props?: StatVariantProps) => StatVariantProps
}


export declare const stat: StatRecipe