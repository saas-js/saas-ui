import React, { forwardRef } from 'react'

import {
  Avatar,
  type AvatarRootProps,
  HTMLChakraProps,
  type ImageProps,
} from '@chakra-ui/react'

import {
  type HTMLSystemProps,
  SlotRecipeProps,
  createSlotRecipeContext,
  sui,
} from '#system'

import { dataAttr } from '../utils'

const {
  useStyles: usePersonaStyles,
  withProvider,
  withContext,
} = createSlotRecipeContext({
  key: 'persona',
})

export { usePersonaStyles }

export type Presence = 'online' | 'offline' | 'busy' | 'dnd' | 'away'

interface PresenceConfig {
  label: string
  color: string
}

export type PresenceOptions<P extends string = Presence> = Record<
  P,
  PresenceConfig
>

/**
 * The presence configuration object.
 *
 * Default presence values: online, offline, busy, dnd, away
 *
 * You can overwrite colors in the theme semantic tokens.
 * theme.semanticTokens.colors['presence.online'] = 'cyan.500'
 *
 * Or add a custom presence value
 * theme.semanticTokens.colors['presence.vacay'] = 'blue.500'
 *
 * @see Docs https://saas-ui.dev/docs/components/data-display/persona
 */
export const defaultPresenceOptions: PresenceOptions = {
  online: {
    label: 'Online',
    color: 'presence.online',
  },
  offline: {
    label: 'Offline',
    color: 'presence.offline',
  },
  busy: {
    label: 'Busy',
    color: 'presence.busy',
  },
  dnd: {
    label: 'Do-not-disturb',
    color: 'presence.dnd',
  },
  away: {
    label: 'Away',
    color: 'presence.away',
  },
}

export interface PersonaRootProps
  extends HTMLChakraProps<'div'>,
    SlotRecipeProps<'persona'> {
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
export const PersonaRoot = withProvider<HTMLDivElement, PersonaRootProps>(
  forwardRef((props, ref) => {
    const { outOfOffice, presence, ...rest } = props

    return (
      <sui.div
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

export interface PersonaAvatarProps
  extends PersonaAvatarOptions,
    AvatarRootProps {
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
export const PersonaAvatar = forwardRef<HTMLDivElement, PersonaAvatarProps>(
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
      <Avatar.Root ref={ref} {...rest}>
        <Avatar.Fallback>{getInitials(name)}</Avatar.Fallback>
        <Avatar.Image
          src={src}
          srcSet={srcSet}
          loading={loading}
          onError={onError}
        />
        {children}
      </Avatar.Root>
    )
  },
)

export interface PersonaPresenceBadgeProps extends HTMLSystemProps<'span'> {}

export const PersonaPresenceBadge = withContext<
  HTMLSpanElement,
  PersonaPresenceBadgeProps
>('span', 'presence')

export interface PersonaDetailsProps extends HTMLSystemProps<'div'> {}

/**
 * Wrapper component for the labels.
 *
 * @see Docs https://saas-ui.dev/docs/components/data-display/persona
 */
export const PersonaDetails = withContext<HTMLDivElement, PersonaDetailsProps>(
  'div',
  'details',
)

export interface PersonaLabelProps extends HTMLSystemProps<'span'> {}

/**
 * The main label, usually a name.
 *
 * @see Docs https://saas-ui.dev/docs/components/data-display/persona
 */
export const PersonaLabel = withContext<HTMLSpanElement, PersonaLabelProps>(
  'span',
  'label',
)

PersonaLabel.displayName = 'PersonaLabel'

/**
 * The secondary label, usually the role of a person.
 *
 * @see Docs https://saas-ui.dev/docs/components/data-display/persona
 */
export const PersonaSecondaryLabel = withContext<
  HTMLSpanElement,
  PersonaLabelProps
>('span', 'secondaryLabel')

/**
 * The tertiary label, typically a status message.
 *
 * @see Docs https://saas-ui.dev/docs/components/data-display/persona
 */
export const PersonaTertiaryLabel = withContext<
  HTMLSpanElement,
  PersonaLabelProps
>('span', 'tertiaryLabel')
