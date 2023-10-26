import { Button } from '@chakra-ui/button'
import { useColorMode } from '@chakra-ui/color-mode'
import { Box, Heading, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Page404 = () => {
  const { colorMode } = useColorMode()

  const router = useRouter()

  return (
    <>
      <Box marginY={40}>
        <Heading textAlign="center">This is awkward...😅</Heading>

        <Box textAlign="center" marginTop={4}>
          <Text mb="12">{`We can't find the page you're looking for.`}</Text>

          <Button
            backgroundColor={colorMode === 'light' ? 'gray.300' : 'primart.500'}
            onClick={() => router.back()}
            me={2}
          >
            Go back
          </Button>

          <Link href="/" passHref legacyBehavior>
            <Button
              variant="ghost"
              backgroundColor={
                colorMode === 'light' ? 'gray.300' : 'primart.500'
              }
            >
              Home
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  )
}

export default Page404
