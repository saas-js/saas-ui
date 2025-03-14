import React, { forwardRef } from 'react'

import {
  HTMLChakraProps,
  type ImageProps,
  type SlotRecipeProps,
  chakra,
} from '@chakra-ui/react'
import { dataAttr } from '@saas-ui/core/utils'

import { Avatar, type AvatarProps } from '../avatar/avatar.tsx'
import { withContext, withProvider } from './persona.context.ts'
import type { PersonaVariantProps } from './persona.recipe.ts'
import type { Presence } from './presence.ts'

interface PersonaRootProps
  extends HTMLChakraProps<'div'>,
    SlotRecipeProps<'suiPersona'>,
    PersonaVariantProps {
  /**
   * Indicates that a person is out of office. Changes the presence badge style.
   */
  outOfOffice?: boolean
  /**
   * The presence status of the person
   */
  presence?: Presence
}

/**
 * The root component that provides context and styles.
 *
 * @see Docs https://saas-ui.dev/docs/components/data-display/persona
 */
const PersonaRoot = withProvider<HTMLDivElement, PersonaRootProps>(
  forwardRef<HTMLDivElement, PersonaRootProps>((props, ref) => {
    const { outOfOffice, presence, ...rest } = props

    return (
      <chakra.div
        ref={ref}
        {...rest}
        data-out-of-office={dataAttr(outOfOffice)}
        data-presence={presence}
        css={[
          presence
            ? {
                '--persona-presence': `colors.presence.${presence}`,
              }
            : undefined,
          rest.css,
        ]}
      />
    )
  }),
  'root',
)

interface PersonaAvatarOptions {
  /**
   * The name of the person in the avatar.
   *
   * - if `src` has loaded, the name will be used as the `alt` attribute of the `img`
   * - If `src` is not loaded, the name will be used to create the initials
   */
  name?: string
}

interface PersonaAvatarProps extends PersonaAvatarOptions, AvatarProps {
  src?: string
  srcSet?: string
  loading?: ImageProps['loading']
  icon?: React.ReactElement
  fallback?: React.ReactNode
  getInitials?: (name?: string | null) => string | null
}

/**
 * An avatar with optional status badge.
 *
 * @see Docs https://saas-ui.dev/docs/components/data-display/persona
 */
const PersonaAvatar = forwardRef<HTMLDivElement, PersonaAvatarProps>(
  (props, ref) => {
    const {
      name,
      getInitials = (name?: string | null) => name?.[0],
      icon,
      loading,
      onError,
      src,
      srcSet,
      children,
      ...rest
    } = props

    return (
      <Avatar ref={ref} {...rest}>
        {children}
      </Avatar>
    )
  },
)

interface PersonaPresenceBadgeProps extends HTMLChakraProps<'span'> {}

const PersonaPresenceBadge = withContext<
  HTMLSpanElement,
  PersonaPresenceBadgeProps
>('span', 'presence')

interface PersonaDetailsProps extends HTMLChakraProps<'div'> {}

/**
 * Wrapper component for the labels.
 *
 * @see Docs https://saas-ui.dev/docs/components/data-display/persona
 */
const PersonaDetails = withContext<HTMLDivElement, PersonaDetailsProps>(
  'div',
  'details',
)

interface PersonaLabelProps extends HTMLChakraProps<'span'> {}

/**
 * The main label, usually a name.
 *
 * @see Docs https://saas-ui.dev/docs/components/data-display/persona
 */
const PersonaLabel = withContext<HTMLSpanElement, PersonaLabelProps>(
  'span',
  'label',
)

PersonaLabel.displayName = 'PersonaLabel'

/**
 * The secondary label, usually the role of a person.
 *
 * @see Docs https://saas-ui.dev/docs/components/data-display/persona
 */
const PersonaSecondaryLabel = withContext<HTMLSpanElement, PersonaLabelProps>(
  'span',
  'secondaryLabel',
)

/**
 * The tertiary label, typically a status message.
 *
 * @see Docs https://saas-ui.dev/docs/components/data-display/persona
 */
const PersonaTertiaryLabel = withContext<HTMLSpanElement, PersonaLabelProps>(
  'span',
  'tertiaryLabel',
)

export {
  PersonaRoot as Root,
  PersonaAvatar as Avatar,
  PersonaPresenceBadge as PresenceBadge,
  PersonaDetails as Details,
  PersonaLabel as Label,
  PersonaSecondaryLabel as SecondaryLabel,
  PersonaTertiaryLabel as TertiaryLabel,
}

export type {
  PersonaRootProps as RootProps,
  PersonaAvatarProps as AvatarProps,
  PersonaPresenceBadgeProps as PresenceBadgeProps,
  PersonaDetailsProps as DetailsProps,
  PersonaLabelProps as LabelProps,
}
