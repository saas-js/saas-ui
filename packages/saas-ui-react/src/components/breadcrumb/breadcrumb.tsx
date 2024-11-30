import { Children, Fragment, forwardRef, isValidElement } from 'react'

import { Breadcrumb, type SystemStyleObject } from '@chakra-ui/react'

interface BreadcrumbRootProps extends Breadcrumb.RootProps {
  separator?: React.ReactNode
  separatorGap?: SystemStyleObject['gap']
}

const BreadcrumbRoot = forwardRef<HTMLDivElement, BreadcrumbRootProps>(
  function BreadcrumbRoot(props, ref) {
    const { separator = '/', separatorGap, children, ...rest } = props
    const validChildren = Children.toArray(children).filter(isValidElement)
    return (
      <Breadcrumb.Root ref={ref} {...rest}>
        <Breadcrumb.List gap={separatorGap}>
          {validChildren.map((child, index) => {
            const last = index === validChildren.length - 1
            return (
              <Fragment key={index}>
                <Breadcrumb.Item>{child}</Breadcrumb.Item>
                {!last && (
                  <Breadcrumb.Separator>{separator}</Breadcrumb.Separator>
                )}
              </Fragment>
            )
          })}
        </Breadcrumb.List>
      </Breadcrumb.Root>
    )
  },
)

const BreadcrumbLink = Breadcrumb.Link
const BreadcrumbCurrentLink = Breadcrumb.CurrentLink
const BreadcrumbEllipsis = Breadcrumb.Ellipsis

export {
  BreadcrumbRoot as Root,
  BreadcrumbLink as Link,
  BreadcrumbCurrentLink as CurrentLink,
  BreadcrumbEllipsis as Ellipsis,
}

export type { BreadcrumbRootProps as RootProps }
