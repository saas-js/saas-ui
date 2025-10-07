import { UiComponent } from '@/blocks'
import { LinkButton } from '@/components/link-button'
import { trackEvent } from '@/utils/track-event'
import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  HStack,
  Heading,
  IconButton,
  Tabs,
  Tag,
  Text,
} from '@saas-ui/react'
import { useRouter } from 'next/navigation'
import { FaGithub } from 'react-icons/fa'
import { FiCode, FiEye, FiLock } from 'react-icons/fi'

// import { ColorControl } from './color-control'
// import { ThemeControl } from './theme-control'

export interface CanvasHeaderProps
  extends UiComponent,
    React.ComponentPropsWithoutRef<'div'> {
  state: string
  onStateChange(state: string): void
  onPrimaryColorChange(color: string): void
  onThemeChange(theme: string): void
  theme: string
  primaryColor: string
  excludeExternal?: boolean
  zIndex?: number
}

export function CanvasHeader({
  attributes,
  slug,
  component,
  state,
  onStateChange,
  primaryColor,
  onPrimaryColorChange,
  theme,
  onThemeChange,
  excludeExternal = false,
  zIndex,
  ...rest
}: CanvasHeaderProps) {
  const router = useRouter()

  // const { isAuthenticated } = useAuth()
  const isAuthenticated = true
  const isUnlocked = isAuthenticated || attributes.public

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

          {isAuthenticated && (
            <IconButton
              variant="default"
              aria-label="View source on github"
              as="a"
              href={`https://github.com/saas-js/saas-ui-pro/tree/main/packages/blocks/src/${attributes.category}/${slug}/${slug}.tsx`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size="0.9rem" />
            </IconButton>
          )}

          {attributes.responsive && <Badge variant="light">Responsive</Badge>}
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
          <LinkButton
            variant="outline"
            data-checked={state === 'code' ? 'true' : undefined}
            href="/pricing"
          >
            <FiLock size="1rem" />
            Get the code
          </LinkButton>
        )}
      </HStack>
    </HStack>
  )
}
