export interface Category {
  slug: string
  name: string
  images: {
    dark: { src: string; alt: string }
    light: { src: string; alt: string }
  }
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
    maxWidth?: string | number
    className?: string
    height?: string | number
    overflow?: string
  }
  category: string
  title: string
  props?: Record<string, any>
  version?: string
  public?: boolean
  private?: boolean
  preview?: string
  previewUrl?: string
  description?: string
  [key: string]: any
}

export interface UiComponent {
  component: string
  slug: string
  code: { fileName: string; language: string; code: string }[]
  attributes: CanvasAttributes
}
