'use client'

import { Button, Field } from '@chakra-ui/react'
import { Form, useAppForm } from 'compositions/components/forms'
import { FileUpload } from 'compositions/ui/file-upload'
import { HiUpload } from 'react-icons/hi'
import { z } from 'zod'

const formSchema = z.object({
  images: z.array(z.instanceof(File)).min(1, 'At least one image is required'),
})

export const FileUploadWithHookForm = () => {
  const form = useAppForm({
    validators: { onSubmit: formSchema },
    defaultValues: {
      images: [] as File[],
    },
    onSubmit: ({ value }) => console.log(value),
  })

  return (
    <Form form={form}>
      <form.Layout>
        <form.AppField name="images">
          {(field) => (
            <Field.Root invalid={field.state.meta.isTouched}>
              <Field.Label>Images</Field.Label>
              <FileUpload.Root
                name={field.name}
                onFileChange={(e) => field.handleChange(e.acceptedFiles)}
              >
                <FileUpload.Trigger asChild onBlur={field.handleBlur}>
                  <Button variant="outline" size="sm">
                    <HiUpload /> Upload file
                  </Button>
                </FileUpload.Trigger>

                <FileUpload.List showSize />
              </FileUpload.Root>
              {field.state.meta.errors[0] && (
                <Field.ErrorText>
                  {String(field.state.meta.errors[0])}
                </Field.ErrorText>
              )}
            </Field.Root>
          )}
        </form.AppField>

        <form.SubmitButton>Submit</form.SubmitButton>
      </form.Layout>
    </Form>
  )
}
