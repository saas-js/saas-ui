import { supabase } from '#lib/supabase'
import { slugify } from '#utils/slugify'
import { Center, Container, Heading } from '@chakra-ui/react'
import {
  Field,
  Form,
  FormLayout,
  SubmitButton,
  SubmitHandler,
} from '@saas-ui/react'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { FormEvent } from 'react'

export const Route = createFileRoute('/_onboarding/getting-started')({
  component: GettingStarted,
})

interface OnboardingData {
  organization: string
  workspace: string
}

function GettingStarted() {
  const navigate = useNavigate()

  const submit = useMutation<unknown, Error, OnboardingData>({
    mutationFn: async (values) => {
      supabase.auth.updateUser({
        data: {
          organization: values.organization,
          workspace: values.workspace,
        },
      })
    },
  })
  const onSubmit: SubmitHandler<OnboardingData> = async (data) => {
    await submit.mutateAsync(data)

    navigate({ to: '/$workspace', params: { workspace: data.workspace } })
  }

  return (
    <Center height="$100vh">
      <Container maxW="container.sm">
        <Heading as="h2" size="lg" mb="4">
          Getting started
        </Heading>
        <Form
          onSubmit={onSubmit}
          defaultValues={{
            organization: '',
            workspace: '',
          }}
        >
          {({ setValue }) => (
            <FormLayout>
              <Field
                label="Organization name"
                name="organization"
                onChange={(e: FormEvent<HTMLInputElement>) => {
                  const value = e.currentTarget.value
                  setValue('organization', value)
                  setValue('workspace', slugify(value))
                }}
              />
              <Field label="Workspace" name="workspace" />
              <SubmitButton>Continue</SubmitButton>
            </FormLayout>
          )}
        </Form>
      </Container>
    </Center>
  )
}
