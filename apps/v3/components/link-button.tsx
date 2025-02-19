import { forwardRef } from 'react'

import { Button, ButtonProps } from '@saas-ui/react/button'
import Link, { LinkProps } from 'next/link'

export const LinkButton = forwardRef<
  HTMLAnchorElement,
  ButtonProps & LinkProps
>(function LinkButton(props, ref) {
  const {
    href,
    as,
    legacyBehavior,
    locale,
    prefetch,
    passHref,
    shallow,
    scroll,
    replace,
    children,
    ...rest
  } = props
  return (
    <Button asChild {...rest}>
      <Link
        ref={ref}
        href={href}
        legacyBehavior={legacyBehavior}
        locale={locale}
        prefetch={prefetch}
        passHref={passHref}
        shallow={shallow}
        scroll={scroll}
        replace={replace}
      >
        {children}
      </Link>
    </Button>
  )
})
