/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface BreadcrumbVariant {
  /**
 * @default "plain"
 */
variant: "underline" | "plain"
/**
 * @default "md"
 */
size: "sm" | "md" | "lg"
}

type BreadcrumbVariantMap = {
  [key in keyof BreadcrumbVariant]: Array<BreadcrumbVariant[key]>
}

export type BreadcrumbVariantProps = {
  [key in keyof BreadcrumbVariant]?: ConditionalValue<BreadcrumbVariant[key]> | undefined
}

export interface BreadcrumbRecipe {
  __type: BreadcrumbVariantProps
  (props?: BreadcrumbVariantProps): Pretty<Record<"link" | "currentLink" | "item" | "list" | "root" | "ellipsis" | "separator", string>>
  raw: (props?: BreadcrumbVariantProps) => BreadcrumbVariantProps
  variantMap: BreadcrumbVariantMap
  variantKeys: Array<keyof BreadcrumbVariant>
  splitVariantProps<Props extends BreadcrumbVariantProps>(props: Props): [BreadcrumbVariantProps, Pretty<DistributiveOmit<Props, keyof BreadcrumbVariantProps>>]
  getVariantProps: (props?: BreadcrumbVariantProps) => BreadcrumbVariantProps
}


export declare const breadcrumb: BreadcrumbRecipe