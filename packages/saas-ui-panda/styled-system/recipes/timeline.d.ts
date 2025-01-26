/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface TimelineVariant {
  /**
 * @default "solid"
 */
variant: "subtle" | "solid" | "outline" | "plain"
/**
 * @default "md"
 */
size: "sm" | "md" | "lg" | "xl"
}

type TimelineVariantMap = {
  [key in keyof TimelineVariant]: Array<TimelineVariant[key]>
}

export type TimelineVariantProps = {
  [key in keyof TimelineVariant]?: ConditionalValue<TimelineVariant[key]> | undefined
}

export interface TimelineRecipe {
  __type: TimelineVariantProps
  (props?: TimelineVariantProps): Pretty<Record<"root" | "item" | "content" | "separator" | "indicator" | "connector" | "title" | "description", string>>
  raw: (props?: TimelineVariantProps) => TimelineVariantProps
  variantMap: TimelineVariantMap
  variantKeys: Array<keyof TimelineVariant>
  splitVariantProps<Props extends TimelineVariantProps>(props: Props): [TimelineVariantProps, Pretty<DistributiveOmit<Props, keyof TimelineVariantProps>>]
  getVariantProps: (props?: TimelineVariantProps) => TimelineVariantProps
}


export declare const timeline: TimelineRecipe