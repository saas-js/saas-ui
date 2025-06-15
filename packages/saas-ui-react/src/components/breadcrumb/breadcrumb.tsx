'use client'

import { Children, Fragment, forwardRef, isValidElement } from 'react'

import { Breadcrumb } from '@chakra-ui/react/breadcrumb'
import type { SystemStyleObject } from '@chakra-ui/react/styled-system'

export interface RootProps extends Breadcrumb.RootProps {
  separator?: React.ReactNode
  separatorGap?: SystemStyleObject['gap']
}

export const Root = forwardRef<HTMLDivElement, RootProps>(
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

export const Link = Breadcrumb.Link
export const CurrentLink = Breadcrumb.CurrentLink
export const Ellipsis = Breadcrumb.Ellipsis
