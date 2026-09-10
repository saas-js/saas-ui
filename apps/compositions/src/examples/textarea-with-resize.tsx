import { Stack, Textarea } from '@chakra-ui/react'

export const TextareaWithResize = () => {
  return (
    <Stack gap="4" maxWidth="250px">
      <Textarea resize="none" placeholder="Search the docs…" />
      <Textarea resize="vertical" placeholder="Search the docs…" />
      <Textarea resize="horizontal" placeholder="Search the docs…" />
      <Textarea resize="both" placeholder="Search the docs…" />
    </Stack>
  )
}
