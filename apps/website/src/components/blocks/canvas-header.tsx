import { FaGithub } from 'react-icons/fa'
import { FiCode, FiEye, FiLock } from 'react-icons/fi'
import {
  IconButton,
  Badge,
  Box,
  ButtonGroup,
  Button,
  CardHeader,
  HStack,
  Heading,
  Tag,
} from '@chakra-ui/react'
import { ColorControl } from './color-control'
import { UiComponent } from '../../data/blocks'
import { useAuth } from '@saas-ui/auth'
import { useRouter } from 'next/router'
import { ThemeControl } from './theme-control'

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
  const { isAuthenticated } = useAuth()

  const isUnlocked = isAuthenticated || attributes.public

  return (
    <HStack py="4" {...rest}>
      <HStack flex="1">
        <Box
          id={slug}
          style={{ visibility: 'hidden', position: 'absolute', top: -75 }}
        />
        <Heading as="h4" fontSize="lg" minW="200px" fontWeight="medium">
          {attributes.title}
        </Heading>

        <HStack spacing="1">
          {attributes.version && (
            <Tag variant="solid" rounded="full" px="2">
              {attributes.version}
            </Tag>
          )}

          {isAuthenticated && (
            <IconButton
              variant="default"
              aria-label="View source on github"
              as="a"
              href={`https://github.com/saas-js/saas-ui-pro/tree/main/saas-ui/blocks/${slug}/${slug}.tsx`}
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
        <ColorControl onChange={onPrimaryColorChange} value={primaryColor} />

        <ThemeControl onChange={onThemeChange} value={theme} />

        {isUnlocked ? (
          <ButtonGroup isAttached>
            <Button
              variant="outline"
              data-checked={state === 'preview' ? 'true' : undefined}
              leftIcon={<FiEye size="1rem" />}
              onClick={() => onStateChange('preview')}
            >
              Preview
            </Button>

            <Button
              variant="outline"
              data-checked={state === 'code' ? 'true' : undefined}
              leftIcon={<FiCode size="1rem" />}
              onClick={() => onStateChange('code')}
            >
              Code
            </Button>
          </ButtonGroup>
        ) : (
          <Button
            variant="outline"
            data-checked={state === 'code' ? 'true' : undefined}
            leftIcon={<FiLock size="1rem" />}
            onClick={() =>
              router.push(`/login?redirectUrl=/blocks/${attributes.category}`)
            }
          >
            Get the code
          </Button>
        )}
      </HStack>
    </HStack>
  )
}
