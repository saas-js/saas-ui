'use client'

import {
  Controller,
  FormLayout,
  SubmitButton,
  useZodForm,
} from '@saas-ui/forms'
import { Button, Field, FileUpload } from '@saas-ui/react'
import { HiUpload } from 'react-icons/hi'
import { z } from 'zod'

const formSchema = z.object({
  images: z.array(z.instanceof(File)).min(1, 'At least one image is required'),
})

export const FileUploadWithHookForm = () => {
  const form = useZodForm({
    schema: formSchema,
    defaultValues: {
      images: [],
    },
  })

  return (
    <form.Form onSubmit={(data) => console.log(data)}>
      <FormLayout>
        <Controller
          control={form.control}
          name="images"
          render={({ field, fieldState }) => (
            <Field.Root invalid={!!fieldState.error}>
              <Field.Label>Images</Field.Label>
              <FileUpload.Root
                name={field.name}
                onFileChange={(e) => {
                  field.onChange(e.acceptedFiles)
                }}
              >
                <FileUpload.Trigger asChild onBlur={() => field.onBlur()}>
                  <Button variant="outline" size="sm">
                    <HiUpload /> Upload file
                  </Button>
                </FileUpload.Trigger>

                <FileUpload.List showSize />
              </FileUpload.Root>
              <Field.ErrorText>{fieldState.error?.message}</Field.ErrorText>
            </Field.Root>
          )}
        />

        <SubmitButton>Submit</SubmitButton>
      </FormLayout>
    </form.Form>
  )
}
