import { FaGithub } from 'react-icons/fa'
import { FiExternalLink, FiCode, FiEye, FiLock } from 'react-icons/fi'
import {
  Stack,
  Text,
  IconButton,
  Badge,
  Center,
  Box,
  ButtonGroup,
  Button,
  Card,
  CardHeader,
  HStack,
  Heading,
} from '@chakra-ui/react'
import { ColorControl } from './color-control'
import { UiComponent } from '../../data/blocks'
import { useAuth } from '@saas-ui/auth'
import { useRouter } from 'next/router'

export interface CanvasHeaderProps
  extends UiComponent,
    React.ComponentPropsWithoutRef<'div'> {
  state: string
  onStateChange(state: string): void
  onPrimaryColorChange(color: string): void
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
  excludeExternal = false,
  zIndex,
  ...rest
}: CanvasHeaderProps) {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  return (
    <CardHeader
      {...rest}
      display="flex"
      flexDirection="row"
      borderBottomWidth="1px"
    >
      <HStack flex="1">
        <Box
          id={slug}
          style={{ visibility: 'hidden', position: 'absolute', top: -75 }}
        />
        <Heading as="h4" fontSize="lg" minW="200px" fontWeight="medium">
          {attributes.title}
        </Heading>

        <HStack gap="xs">
          {!excludeExternal && (
            <IconButton
              variant="default"
              aria-label="View component in isolation"
              as="a"
              href={`/component/${slug}`}
              target="_blank"
            >
              <FiExternalLink size="0.9rem" />
            </IconButton>
          )}

          <IconButton
            variant="default"
            aria-label="View source on github"
            as="a"
            href={`https://github.com/saas-js/saas-ui-pro/tree/main/saas-ui/templates/${slug}/${slug}.tsx`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size="0.9rem" />
          </IconButton>

          {attributes.responsive && <Badge variant="light">Responsive</Badge>}
        </HStack>
      </HStack>

      <HStack>
        {attributes.withColor && (
          <ColorControl onChange={onPrimaryColorChange} value={primaryColor} />
        )}

        {isAuthenticated ? (
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
    </CardHeader>
  )
}
