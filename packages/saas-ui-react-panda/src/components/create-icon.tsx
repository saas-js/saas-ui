import { Icon, IconProps } from './icon'

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
  defaultProps?: IconProps
}

export const createIcon = (props: CreateIconOptions) => {
  const { path, defaultProps, viewBox = '0 0 24 24' } = props

  return (props: IconProps) => (
    <Icon {...defaultProps} viewBox={viewBox} {...props}>
      {path}
    </Icon>
  )
}
