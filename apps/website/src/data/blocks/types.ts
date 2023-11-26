export interface Category {
  slug: string
  name: string
  images: { dark: string; light: string }
}

export interface CategoriesGroup {
  name: string
  categories: Category[]
}

export interface CanvasAttributes {
  responsive?: boolean
  withColor?: boolean
  dimmed?: boolean
  canvas: {
    center: boolean
    maxWidth?: number
    height?: number
    overflow?: string
  }
  category: string
  title: string
  props?: Record<string, any>
  version?: string
  public?: boolean
}

export interface UiComponent {
  component: string
  slug: string
  code: { fileName: string; language: string; code: string }[]
  attributes: CanvasAttributes
}
