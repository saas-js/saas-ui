'use client'

import React, { forwardRef } from 'react'

import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  chakra,
} from '@chakra-ui/react'

import { LoadingOverlay } from '../loading-overlay/index.ts'
import {
  PageProvider,
  useClassNames,
  usePageContext,
  usePageStyles,
  withContext,
  withProvider,
} from './page.context.ts'

interface PageOptions {
  children?: React.ReactNode
  loading?: boolean
  skeleton?: React.ReactNode
}

interface PageRootProps
  extends PageOptions,
    HTMLChakraProps<'main'>,
    SlotRecipeProps<'suiPage'> {}

const PageRoot = withProvider<HTMLDivElement, PageRootProps>(
  forwardRef<HTMLDivElement, PageRootProps>(function PageRoot(props, ref) {
    const { loading, skeleton, children, ...containerProps } = props

    const context = {
      loading,
      skeleton,
    }

    return (
      <PageProvider value={context}>
        <chakra.main ref={ref} {...containerProps}>
          {children}
        </chakra.main>
      </PageProvider>
    )
  }),
  'root',
)

interface PageHeaderProps
  extends Omit<HTMLChakraProps<'header'>, 'title' | 'children'> {
  /**
   * Page header navigation
   * Typically breadcrumbs or backbutton.
   */
  nav?: React.ReactNode
  /**
   * Page header title
   */
  title?: React.ReactNode
  /**
   * Page header description
   */
  description?: React.ReactNode
  /**
   * Page header actions, typically a toolbar
   */
  actions?: React.ReactNode
  /**
   * Page header footer
   */
  footer?: React.ReactNode
}

const PageHeader = withContext<HTMLDivElement, PageHeaderProps>(
  forwardRef<HTMLDivElement, PageHeaderProps>(function PageHeader(props, ref) {
    const { nav, title, description, actions, footer, css, ...rest } = props

    const styles = usePageStyles()
    const classNames = useClassNames()

    let heading
    if (title || description) {
      heading = (
        <chakra.div
          gridArea="heading"
          className={classNames.heading}
          css={styles.heading}
        >
          {typeof title === 'string' ? <PageTitle>{title}</PageTitle> : title}
          {typeof description === 'string' ? (
            <PageDescription>{description}</PageDescription>
          ) : (
            description
          )}
        </chakra.div>
      )
    }

    return (
      <chakra.header ref={ref} css={css} {...rest} className={props.className}>
        {React.isValidElement(nav)
          ? React.cloneElement(nav, {
              gridArea: 'nav',
            } as any)
          : null}
        {heading}
        {React.isValidElement(actions)
          ? React.cloneElement(actions, {
              gridArea: 'actions',
            } as any)
          : null}

        {React.isValidElement(footer)
          ? React.cloneElement(footer, {
              gridArea: 'footer',
            } as any)
          : null}
      </chakra.header>
    )
  }),
  'header',
)

const PageHeaderSection = withContext<HTMLDivElement, HTMLChakraProps<'div'>>(
  'div',
  'section',
)

const PageTitle = withContext<HTMLDivElement, HTMLChakraProps<'h2'>>(
  'h2',
  'title',
)

const PageDescription = withContext<HTMLDivElement, HTMLChakraProps<'div'>>(
  'div',
  'description',
)

interface PageBodyProps extends HTMLChakraProps<'div'> {}

const PageBody = withContext<HTMLDivElement, PageBodyProps>(
  forwardRef<HTMLDivElement, PageBodyProps>((props, ref) => {
    const { children, ...rest } = props

    const { loading, skeleton } = usePageContext()

    let content = children
    if (loading) {
      content = skeleton || (
        <LoadingOverlay.Root>
          <LoadingOverlay.Spinner />
        </LoadingOverlay.Root>
      )
    }

    return (
      <chakra.div ref={ref} {...rest}>
        {content}
      </chakra.div>
    )
  }),
  'body',
)

PageBody.displayName = 'PageBody'

export {
  PageRoot as Root,
  PageBody as Body,
  PageHeader as Header,
  PageHeaderSection as HeaderSection,
  PageTitle as Title,
  PageDescription as Description,
}
export type {
  PageRootProps as RootProps,
  PageBodyProps as BodyProps,
  PageHeaderProps as HeaderProps,
}
