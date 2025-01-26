/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface SidebarVariant {
  /**
 * @default "collapsible"
 */
mode: "collapsible" | "flyout" | "compact"
/**
 * @default "md"
 */
size: "md"
}

type SidebarVariantMap = {
  [key in keyof SidebarVariant]: Array<SidebarVariant[key]>
}

export type SidebarVariantProps = {
  [key in keyof SidebarVariant]?: ConditionalValue<SidebarVariant[key]> | undefined
}

export interface SidebarRecipe {
  __type: SidebarVariantProps
  (props?: SidebarVariantProps): Pretty<Record<"root" | "backdrop" | "header" | "body" | "footer" | "trigger" | "flyoutTrigger" | "group" | "groupHeader" | "groupTitle" | "groupEndElement" | "groupContent" | "track", string>>
  raw: (props?: SidebarVariantProps) => SidebarVariantProps
  variantMap: SidebarVariantMap
  variantKeys: Array<keyof SidebarVariant>
  splitVariantProps<Props extends SidebarVariantProps>(props: Props): [SidebarVariantProps, Pretty<DistributiveOmit<Props, keyof SidebarVariantProps>>]
  getVariantProps: (props?: SidebarVariantProps) => SidebarVariantProps
}


export declare const sidebar: SidebarRecipe