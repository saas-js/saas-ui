import { type ComponentPropsWithoutRef, forwardRef } from 'react'

import Link, { LinkProps } from 'next/link'

import { Button, type ButtonProps } from '#components/ui/button'

type LinkButtonProps = ButtonProps &
  LinkProps &
  Omit<ComponentPropsWithoutRef<'a'>, keyof ButtonProps | keyof LinkProps>

export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  function LinkButton(props, ref) {
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
      target,
      rel,
      download,
      hrefLang,
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
          target={target}
          rel={rel}
          download={download}
          hrefLang={hrefLang}
        >
          {children}
        </Link>
      </Button>
    )
  },
)
