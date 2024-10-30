import * as React from 'react'

import { Persona as PersonaPrimitive } from '@saas-ui/core/persona'

interface PersonaOptions {
  /**
   * The name of the person in the avatar.
   *
   * - if `src` has loaded, the name will be used as the `alt` attribute of the `img`
   * - If `src` is not loaded, the name will be used to create the initials
   */
  name?: string
  /**
   * The presence status of the person
   *
   * If set will add an AvatarBadge with color configured in `Presence`
   * Default presence options:
   * - online
   * - offline
   * - busy
   * - dnd
   * - away
   */
  presence?: PersonaPrimitive.Presence
  /**
   * The icon shown in the AvatarBadge
   */
  presenceIcon?: React.ReactNode
  /**
   * Indicates that a person is out of office. Changes the presence badge style.
   */
  isOutOfOffice?: boolean
  /**
   * Primary label of the persona, defaults to the name
   */
  label?: React.ReactNode
  /**
   * Secondary label, usually the role of the person
   * Only visible from md size and up.
   */
  secondaryLabel?: React.ReactNode
  /**
   * Tertiary label, usually the status of the person.
   * Only visible from lg size and up.
   */
  tertiaryLabel?: React.ReactNode
  /**
   * Hide the persona details next to the avatar.
   */
  hideDetails?: boolean
}

export interface PersonaProps
  extends PersonaOptions,
    PersonaPrimitive.AvatarProps,
    PersonaPrimitive.RootProps {}

/**
 * The wrapper component that handles default composition.
 *
 * @see Docs https://saas-ui.dev/docs/components/data-display/persona
 */
export const Persona: React.FC<PersonaProps> = (props) => {
  const {
    name,
    presence,
    presenceIcon,
    isOutOfOffice,
    label,
    secondaryLabel,
    tertiaryLabel,
    size,
    hideDetails,
    children,
    /** Avatar props */
    getInitials,
    icon,
    loading,
    onError,
    src,
    srcSet,
    ...rest
  } = props

  return (
    <PersonaPrimitive.Root
      outOfOffice={isOutOfOffice}
      presence={presence}
      size={size}
      {...rest}
    >
      <PersonaPrimitive.Avatar
        name={name}
        size={size}
        getInitials={getInitials}
        icon={icon}
        loading={loading}
        onError={onError}
        src={src}
        srcSet={srcSet}
      >
        <PersonaPrimitive.PresenceBadge>
          {presenceIcon}
        </PersonaPrimitive.PresenceBadge>
      </PersonaPrimitive.Avatar>

      {!hideDetails && (
        <PersonaPrimitive.Details>
          <PersonaPrimitive.Label>{label || name}</PersonaPrimitive.Label>
          {secondaryLabel && (
            <PersonaPrimitive.SecondaryLabel>
              {secondaryLabel}
            </PersonaPrimitive.SecondaryLabel>
          )}
          {tertiaryLabel && (
            <PersonaPrimitive.TertiaryLabel>
              {tertiaryLabel}
            </PersonaPrimitive.TertiaryLabel>
          )}
          {children}
        </PersonaPrimitive.Details>
      )}
    </PersonaPrimitive.Root>
  )
}

Persona.displayName = 'Persona'
