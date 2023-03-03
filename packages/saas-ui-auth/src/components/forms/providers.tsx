import * as React from 'react'

import { SimpleGrid, Icon, ButtonProps } from '@chakra-ui/react'
import { callAllHandlers } from '@chakra-ui/utils'

import { ProviderButton } from './provider-button'

export interface Provider extends ButtonProps {
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

export interface ProviderProps<
  TProviders extends AvailableProviders = AvailableProviders
> {
  /**
   * The available providers
   */
  providers: TProviders
  /**
   * The label prefix
   * @default 'Continue with'
   */
  labelPrefix?: string
  /**
   * The on sign in callback
   * @param providerId The provider id
   */
  onSignIn: (providerId: keyof TProviders) => () => void
}

export const Providers = <
  TProviders extends AvailableProviders = AvailableProviders
>({
  providers,
  onSignIn,
  labelPrefix = 'Continue with',
  ...rest
}: ProviderProps<TProviders>) => {
  if (!providers) {
    return null
  }

  return (
    <SimpleGrid spacing={4} {...rest}>
      {Object.entries(providers).map(([id, provider]) => {
        const { name, icon, color, ...rest } = provider

        return (
          <ProviderButton
            key={id}
            color={color}
            leftIcon={icon && <Icon as={icon} />}
            {...rest}
            onClick={callAllHandlers(rest.onClick, () => onSignIn(id))}
          >
            {labelPrefix} {name}
          </ProviderButton>
        )
      })}
    </SimpleGrid>
  )
}

Providers.displayName = 'Providers'
