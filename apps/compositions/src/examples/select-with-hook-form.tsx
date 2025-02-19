'use client'

import { Button, Stack, createListCollection } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Field, Select } from '@saas-ui/react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  framework: z.string({ message: 'Framework is required' }).array(),
})

type FormValues = z.infer<typeof formSchema>

export const SelectWithHookForm = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = handleSubmit((data) => console.log(data))

  return (
    <form onSubmit={onSubmit}>
      <Stack gap="4" align="flex-start">
        <Controller
          control={control}
          name="framework"
          render={({ field }) => (
            <Field.Root invalid={!!errors.framework} width="320px">
              <Field.Label>Framework</Field.Label>
              <Select.Root
                name={field.name}
                value={field.value}
                onValueChange={({ value }) => field.onChange(value)}
                onInteractOutside={() => field.onBlur()}
                collection={frameworks}
              >
                <Select.Trigger>
                  <Select.ValueText placeholder="Select movie" />
                </Select.Trigger>
                <Select.Content>
                  {frameworks.items.map((movie) => (
                    <Select.Item item={movie} key={movie.value}>
                      {movie.label}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
              <Field.ErrorText>{errors.framework?.message}</Field.ErrorText>
            </Field.Root>
          )}
        />

        <Button size="sm" type="submit">
          Submit
        </Button>
      </Stack>
    </form>
  )
}

const frameworks = createListCollection({
  items: [
    { label: 'React.js', value: 'react' },
    { label: 'Vue.js', value: 'vue' },
    { label: 'Angular', value: 'angular' },
    { label: 'Svelte', value: 'svelte' },
  ],
})
