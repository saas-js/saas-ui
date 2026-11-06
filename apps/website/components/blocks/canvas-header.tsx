import { UiComponent } from '@/blocks'
import { trackEvent } from '@/utils/track-event'
import { Badge, Box, HStack, Heading, Tabs, Text } from '@chakra-ui/react'
import { FiCode, FiEye, FiLock } from 'react-icons/fi'

import { Tag } from '#components/ui/tag'

// import { ColorControl } from './color-control'
// import { ThemeControl } from './theme-control'

export type CanvasHeaderProps = Omit<UiComponent, 'attributes'> &
  React.ComponentPropsWithoutRef<'div'> & {
    attributes: UiComponent['attributes'] & { description?: string }
    state: string
    onStateChange(state: string): void
    excludeExternal?: boolean
    zIndex?: number
  }

export function CanvasHeader({
  attributes,
  slug,
  component,
  state,
  onStateChange,
  excludeExternal = false,
  zIndex,
  ...rest
}: CanvasHeaderProps) {
  const isUnlocked = attributes.public

  return (
    <HStack py="4" {...rest} id={slug}>
      <HStack flex="1">
        <Box
          id={slug}
          style={{ visibility: 'hidden', position: 'absolute', top: -75 }}
        />

        <Box>
          <Heading
            as="h4"
            fontSize="lg"
            minW="200px"
            fontWeight="medium"
            role="group"
          >
            <a href={`#${slug}`}>
              {attributes.title}{' '}
              <Box
                as="span"
                display="none"
                _groupHover={{ display: 'inline' }}
                color="muted"
              >
                #
              </Box>
            </a>
          </Heading>
          <Text textStyle="sm" color="fg.subtle">
            {attributes.description}
          </Text>
        </Box>

        <HStack gap="1">
          {attributes.version && (
            <Tag variant="subtle" size="sm" rounded="full" px="2">
              {attributes.version}
            </Tag>
          )}

          {attributes.responsive && <Badge variant="subtle">Responsive</Badge>}
        </HStack>
      </HStack>

      <HStack>
        {/* <ColorControl onChange={onPrimaryColorChange} value={primaryColor} /> */}

        {/* <ThemeControl onChange={onThemeChange} value={theme} /> */}

        {isUnlocked ? (
          <Tabs.Root value={state} variant="enclosed" size="sm">
            <Tabs.List>
              <Tabs.Trigger
                value="preview"
                onClick={() => onStateChange('preview')}
              >
                <FiEye size="1rem" />
                Preview
              </Tabs.Trigger>

              <Tabs.Trigger
                value="code"
                onClick={() => {
                  onStateChange('code')

                  trackEvent('View Block Code', {
                    block: slug,
                  })
                }}
              >
                <FiCode size="1rem" />
                Code
              </Tabs.Trigger>
            </Tabs.List>
          </Tabs.Root>
        ) : (
          <button
            type="button"
            onClick={() => (window.location.href = '/pricing')}
          >
            <FiLock size="1rem" />
            Get the code
          </button>
        )}
      </HStack>
    </HStack>
  )
}
