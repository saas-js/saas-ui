export type PersonaPresence = 'online' | 'offline' | 'busy' | 'dnd' | 'away'

export interface PersonaPresenceConfig {
  label: string
  color: string
}

export type PersonaPresenceOptions<P extends string = PersonaPresence> = Record<
  P,
  PersonaPresenceConfig
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
export const defaultPersonaPresenceOptions: PersonaPresenceOptions = {
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
