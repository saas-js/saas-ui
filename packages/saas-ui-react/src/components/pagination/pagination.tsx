'use client'

import { forwardRef, useMemo } from 'react'

import {
  Pagination as ChakraPagination,
  usePaginationContext,
} from '@chakra-ui/react/pagination'
import { Text, type TextProps } from '@chakra-ui/react/typography'
import { createContext } from '@saas-ui/core/utils'

import { Button, type ButtonProps } from '#components/button/index.ts'
import { IconButton } from '#components/icon-button/index.ts'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisIcon,
} from '#components/icons/icons.tsx'

interface ButtonVariantMap {
  current: ButtonProps['variant']
  default: ButtonProps['variant']
  ellipsis: ButtonProps['variant']
}

type PaginationVariant = 'outline' | 'solid' | 'subtle'

interface ButtonVariantContext {
  size: ButtonProps['size']
  variantMap: ButtonVariantMap
}

const [RootPropsProvider, useRootProps] = createContext<ButtonVariantContext>({
  name: 'RootPropsProvider',
})

export interface RootProps extends Omit<ChakraPagination.RootProps, 'type'> {
  size?: ButtonProps['size']
  variant?: PaginationVariant
}

const variantMap: Record<PaginationVariant, ButtonVariantMap> = {
  outline: { default: 'ghost', ellipsis: 'plain', current: 'outline' },
  solid: { default: 'outline', ellipsis: 'outline', current: 'solid' },
  subtle: { default: 'ghost', ellipsis: 'plain', current: 'subtle' },
}

export const Root = forwardRef<HTMLDivElement, RootProps>(
  function PaginationRoot(props, ref) {
    const { size = 'sm', variant = 'outline', ...rest } = props
    return (
      <RootPropsProvider value={{ size, variantMap: variantMap[variant] }}>
        <ChakraPagination.Root ref={ref} type="button" {...rest} />
      </RootPropsProvider>
    )
  },
)

export const Ellipsis = forwardRef<
  HTMLDivElement,
  ChakraPagination.EllipsisProps
>(function PaginationEllipsis(props, ref) {
  const { size, variantMap } = useRootProps()
  return (
    <ChakraPagination.Ellipsis ref={ref} {...props} asChild>
      <Button as="span" variant={variantMap.ellipsis} size={size}>
        {props.children ?? <EllipsisIcon />}
      </Button>
    </ChakraPagination.Ellipsis>
  )
})

export const Item = forwardRef<HTMLButtonElement, ChakraPagination.ItemProps>(
  function PaginationItem(props, ref) {
    const { page } = usePaginationContext()
    const { size, variantMap } = useRootProps()

    const current = page === props.value
    const variant = current ? variantMap.current : variantMap.default

    return (
      <ChakraPagination.Item ref={ref} {...props} asChild>
        <Button variant={variant} size={size}>
          {props.value}
        </Button>
      </ChakraPagination.Item>
    )
  },
)

export const PrevButton = forwardRef<
  HTMLButtonElement,
  ChakraPagination.PrevTriggerProps
>(function PaginationPrevTrigger(props, ref) {
  const { size, variantMap } = useRootProps()

  return (
    <ChakraPagination.PrevTrigger ref={ref} asChild {...props}>
      <IconButton variant={variantMap.default} size={size}>
        {props.children ?? <ChevronLeftIcon />}
      </IconButton>
    </ChakraPagination.PrevTrigger>
  )
})

export const NextButton = forwardRef<
  HTMLButtonElement,
  ChakraPagination.NextTriggerProps
>(function PaginationNextTrigger(props, ref) {
  const { size, variantMap } = useRootProps()

  return (
    <ChakraPagination.NextTrigger ref={ref} asChild {...props}>
      <IconButton variant={variantMap.default} size={size}>
        {props.children ?? <ChevronRightIcon />}
      </IconButton>
    </ChakraPagination.NextTrigger>
  )
})

export const Items = (props: React.HTMLAttributes<HTMLElement>) => {
  return (
    <ChakraPagination.Context>
      {({ pages }) =>
        pages.map((page, index) => {
          return page.type === 'ellipsis' ? (
            <Ellipsis key={index} index={index} {...props} />
          ) : (
            <Item key={index} type="page" value={page.value} {...props} />
          )
        })
      }
    </ChakraPagination.Context>
  )
}

export interface PageTextProps extends TextProps {
  format?: 'short' | 'compact' | 'long'
}

export const PageText = forwardRef<HTMLParagraphElement, PageTextProps>(
  function PaginationPageText(props, ref) {
    const { format = 'compact', ...rest } = props
    const { page, pages, pageRange, count } = usePaginationContext()
    const content = useMemo(() => {
      if (format === 'short') return `${page} / ${pages.length}`
      if (format === 'compact') return `${page} of ${pages.length}`
      return `${pageRange.start + 1} - ${pageRange.end} of ${count}`
    }, [format, page, pages.length, pageRange, count])

    return (
      <Text fontWeight="medium" ref={ref} {...rest}>
        {content}
      </Text>
    )
  },
)

export const PrevTrigger = ChakraPagination.PrevTrigger
export const NextTrigger = ChakraPagination.NextTrigger
export const Context = ChakraPagination.Context
