import * as React from 'react'

import {
  Avatar,
  AvatarBadge,
  AvatarProps,
  AvatarBadgeProps,
} from '@chakra-ui/avatar'

import {
  chakra,
  forwardRef,
  useStyles,
  StylesProvider,
  HTMLChakraProps,
  ThemingProps,
  SystemStyleObject,
  SystemProps,
  useColorModeValue,
  useTheme,
  useMultiStyleConfig,
  omitThemingProps,
} from '@chakra-ui/system'

import { cx } from '@chakra-ui/utils'

export interface PresenceOptions {
  [presence: string]: string
}

/**
 * Default presence values: online, offline, busy, dnd, away
 *
 * You can overwrite colors in the theme semantic tokens.
 * theme.semanticTokens.colors['presence.online'] = 'cyan.500'
 *
 * Or add a custom presence value
 * theme.semanticTokens.colors['presence.vacay'] = 'blue.500'
 */
export const Presence: PresenceOptions = {
  online: 'presence.online',
  offline: 'presence.offline',
  busy: 'presence.busy',
  dnd: 'presence.dnd',
  away: 'presence.away',
}

/**
 * Fallback when theme tokens aren't configured
 */
export const defaultPresenceTokens = {
  online: 'green.500',
  offline: 'gray.400',
  busy: 'orange.500',
  dnd: 'red.500',
  away: 'gray.400',
}

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
  presence?: string
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
  /**
   * The size of the persona, from 2xs to 2xl.
   */
  size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

export interface PersonaProps
  extends PersonaOptions,
    Omit<PresenceAvatarProps, 'size' | 'variant'> {}

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
    iconLabel,
    ignoreFallback,
    loading,
    onError,
    src,
    srcSet,
    ...rest
  } = props

  return (
    <PersonaContainer size={size} {...rest}>
      <PersonaAvatar
        name={name}
        presence={presence}
        presenceIcon={presenceIcon}
        isOutOfOffice={isOutOfOffice}
        size={size}
        getInitials={getInitials}
        icon={icon}
        iconLabel={iconLabel}
        ignoreFallback={ignoreFallback}
        loading={loading}
        onError={onError}
        src={src}
        srcSet={srcSet}
      />
      {!hideDetails && (
        <PersonaDetails>
          <PersonaLabel>{label || name}</PersonaLabel>
          {secondaryLabel && (
            <PersonaSecondaryLabel>{secondaryLabel}</PersonaSecondaryLabel>
          )}
          {tertiaryLabel && (
            <PersonaTertiaryLabel>{tertiaryLabel}</PersonaTertiaryLabel>
          )}
          {children}
        </PersonaDetails>
      )}
    </PersonaContainer>
  )
}

export interface PersonaContainerProps
  extends HTMLChakraProps<'div'>,
    Omit<ThemingProps<'Persona'>, 'size'>,
    Pick<PersonaOptions, 'size'> {}

export const PersonaContainer = forwardRef<PersonaContainerProps, 'div'>(
  (props, ref) => {
    const { children, ...rest } = props
    const styles = useMultiStyleConfig('Persona', props)

    const containerProps = omitThemingProps(rest)

    const baseStyle: SystemStyleObject = {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    }

    const containerStyles = {
      ...baseStyle,
      ...styles.container,
    }

    return (
      <StylesProvider value={styles}>
        <chakra.div
          ref={ref}
          __css={containerStyles}
          {...containerProps}
          className={cx('saas-persona', props.className)}
        >
          {children}
        </chakra.div>
      </StylesProvider>
    )
  }
)

interface PresenceAvatarOptions {
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
  presence?: string
  /**
   * The icon shown in the AvatarBadge
   */
  presenceIcon?: React.ReactNode
  /**
   * The badge size. Defaults to 1em. Use em value to keep the size relative to the avatar.
   */
  badgeSize?: SystemProps['boxSize']
  /**
   * Indicates that a person is out of office. Changes the presence badge style.
   */
  isOutOfOffice?: boolean
}

interface PresenceAvatarProps extends PresenceAvatarOptions, AvatarProps {}

export const PersonaAvatar = forwardRef<PresenceAvatarProps, 'span'>(
  (props, ref) => {
    const {
      name,
      presence,
      presenceIcon,
      isOutOfOffice,
      badgeSize = '1em',
      size,
      getInitials,
      icon,
      iconLabel,
      ignoreFallback,
      loading,
      onError,
      src,
      srcSet,
      ...rest
    } = props
    const badgeProps: AvatarBadgeProps = {}
    let badge

    const theme = useTheme()

    const colors = theme.colors?.presence || defaultPresenceTokens
    const semantic = theme.semanticTokens?.colors?.['presence.online']

    if (presence) {
      const color = semantic ? `presence.${presence}` : colors[presence]
      if (isOutOfOffice) {
        badgeProps.sx = {
          _before: {
            content: '""',
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            border: '0.2em solid',
            borderColor: color,
            borderRadius: '50%',
          },
        }
        badgeProps.borderWidth = '0.15em'
        badgeProps.bg = useColorModeValue('white', 'gray.800')
      } else {
        badgeProps.bg = color
      }

      badge = (
        <AvatarBadge boxSize={badgeSize} {...badgeProps}>
          {presenceIcon}
        </AvatarBadge>
      )
    }

    return (
      <Avatar
        ref={ref}
        name={name}
        size={size}
        getInitials={getInitials}
        icon={icon}
        iconLabel={iconLabel}
        ignoreFallback={ignoreFallback}
        loading={loading}
        onError={onError}
        src={src}
        srcSet={srcSet}
        {...rest}
      >
        {badge}
      </Avatar>
    )
  }
)

export const PersonaDetails = forwardRef<PersonaProps, 'div'>((props, ref) => {
  const { children, className, ...rest } = props
  const styles = useStyles()

  const baseStyle: SystemStyleObject = {
    display: 'flex',
    flexDirection: 'column',
  }

  const detailsStyles = {
    ...baseStyle,
    ...styles.details,
  }

  return (
    <chakra.div
      ref={ref}
      {...rest}
      __css={detailsStyles}
      className={cx('saas-persona__details', className)}
    >
      {children}
    </chakra.div>
  )
})

export const PersonaLabel = forwardRef<HTMLChakraProps<'span'>, 'span'>(
  (props, ref) => {
    const styles = useStyles()
    return (
      <chakra.span
        ref={ref}
        isTruncated
        {...props}
        __css={styles.label}
        className={cx('saas-persona__label', props.className)}
      />
    )
  }
)

export const PersonaSecondaryLabel = forwardRef<
  HTMLChakraProps<'span'>,
  'span'
>((props, ref) => {
  const styles = useStyles()
  return (
    <chakra.span
      ref={ref}
      isTruncated
      {...props}
      __css={styles.secondaryLabel}
      className={cx('saas-persona__secondary-label', props.className)}
    />
  )
})

export const PersonaTertiaryLabel = forwardRef<HTMLChakraProps<'span'>, 'span'>(
  (props, ref) => {
    const styles = useStyles()
    return (
      <chakra.span
        ref={ref}
        isTruncated
        {...props}
        __css={styles.tertiaryLabel}
        className={cx('saas-persona__tertiary-label', props.className)}
      />
    )
  }
)
