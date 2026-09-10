import { Avatar, HStack, RatingGroup, Stack, Text } from '@chakra-ui/react'

export const RatingInTestimonial = () => {
  return (
    <Stack maxW="320px" gap="4">
      <RatingGroup.Root
        colorPalette="orange"
        readOnly
        count={5}
        defaultValue={5}
        size="xs"
      >
        <RatingGroup.HiddenInput />
        <RatingGroup.Control />
      </RatingGroup.Root>

      <Text>
        Saas UI saved us months of work. The components are well thought out and
        a joy to build with.
      </Text>

      <HStack gap="4">
        <Avatar.Root>
          <Avatar.Fallback name="Matthew Jones" />
          <Avatar.Image src="https://randomuser.me/api/portraits/men/70.jpg" />
        </Avatar.Root>
        <Stack textStyle="sm" gap="0">
          <Text fontWeight="medium">Matthew Jones</Text>
          <Text color="fg.muted">CTO, Company</Text>
        </Stack>
      </HStack>
    </Stack>
  )
}
