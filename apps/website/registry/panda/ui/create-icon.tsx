interface CreateIconOptions {
  /**
   * The icon `svg` viewBox
   * @default "0 0 24 24"
   */
  viewBox?: string
  /**
   * The `svg` path or group element
   * @type React.ReactElement | React.ReactElement[]
   */
  path?: React.ReactElement | React.ReactElement[]
  /**
   * Default props automatically passed to the component; overwriteable
   */
  defaultProps?: React.SVGProps<SVGSVGElement>
}

export const createIcon = (props: CreateIconOptions) => {
  const { path, defaultProps, viewBox = '0 0 24 24' } = props

  return (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...defaultProps} width={24} height={24} viewBox={viewBox} {...props}>
      {path}
    </svg>
  )
}
