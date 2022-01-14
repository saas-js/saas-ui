import * as React from 'react'

import { useAuth } from '../provider'

import { SimpleGrid, Icon } from '@chakra-ui/react'

import { ProviderButton } from './provider-button'

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
  const { login } = useAuth()

  if (!providers) {
    return null
  }

  const signInWith = (provider: string) => {
    return async () => {
      await login(
        { provider },
        {
          redirectTo,
        },
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
