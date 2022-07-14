import * as React from 'react'

import { SimpleGrid, Icon } from '@chakra-ui/react'
import { __DEV__ } from '@chakra-ui/utils'

import { ProviderButton } from './provider-button'
import { useAuth } from '../provider'

export interface Provider {
  /**
   * The provider name
   */
  name: string
  /**
   * The provider icon
   */
  icon?: any
  /**
   * The provider color
   */
  color?: string
}

export interface AvailableProviders {
  [id: string]: Provider
}

export interface ProviderProps {
  providers: AvailableProviders
  redirectTo?: string
  label?: string
}

export const Providers: React.FC<ProviderProps> = ({
  providers,
  redirectTo,
  label = 'Continue with',
  ...rest
}) => {
  const { logIn } = useAuth()

  if (!providers) {
    return null
  }

  const signInWith = (provider: string) => {
    return async () => {
      await logIn(
        { provider },
        {
          redirectTo,
        }
      )
    }
  }

  return (
    <SimpleGrid spacing={4} {...rest}>
      {Object.entries(providers).map(([id, provider]) => {
        const { name, icon, color } = provider

        return (
          <ProviderButton
            onClick={signInWith(id)}
            color={color}
            leftIcon={icon && <Icon as={icon} />}
            key={id}
          >
            {label} {name}
          </ProviderButton>
        )
      })}
    </SimpleGrid>
  )
}

if (__DEV__) {
  Providers.displayName = 'Providers'
}
