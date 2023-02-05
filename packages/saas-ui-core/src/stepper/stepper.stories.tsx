import * as React from 'react'
import { Story, Meta } from '@storybook/react'

import {
  Button,
  ButtonProps,
  Box,
  ButtonGroup,
  Container,
  Spacer,
  Stack,
  useBreakpointValue,
} from '@chakra-ui/react'

import {
  Stepper,
  StepperProps,
  StepperStep,
  StepperStepProps,
  StepperCompleted,
  usePrev,
  useNext,
} from './'

export default {
  title: 'Components/Navigation/Stepper',
  component: Stepper,
  decorators: [
    (Story: any) => (
      <Container mt="40px">
        <Story />
      </Container>
    ),
  ],
} as Meta

const Template: Story<StepperProps & { steps: StepperStepProps[] }> = ({
  steps,
  ...args
}) => (
  <>
    <Stepper {...args}>
      {steps.map((args, i) => (
        <StepperStep key={i} {...args} />
      ))}
    </Stepper>
  </>
)

export const Default = Template.bind({})
Default.args = {
  step: 1,
  steps: [
    {
      title: 'First step',
    },
    {
      title: 'Second step',
    },
    {
      title: 'Third step',
    },
  ],
}

export const Vertical = Template.bind({})
Vertical.args = {
  orientation: 'vertical',
  step: 1,
  steps: [
    {
      title: 'First step',
    },
    {
      title: 'Second step',
    },
    {
      title: 'Third step',
    },
  ],
}

export const WithContent = Template.bind({})
WithContent.args = {
  step: 1,
  steps: [
    {
      title: 'First step',
      children: <>Content step 1</>,
    },
    {
      title: 'Second step',
      children: <>Content step 2</>,
    },
    {
      title: 'Third step',
      children: <>Content step 3</>,
    },
  ],
}

export const VerticalWithContent = Template.bind({})
VerticalWithContent.args = {
  step: 1,
  orientation: 'vertical',
  steps: [
    {
      title: 'First step',
      children: <>Content step 1</>,
    },
    {
      title: 'Second step',
      children: <>Content step 2</>,
    },
    {
      title: 'Third step',
      children: <>Content step 3</>,
    },
  ],
}

const NextButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button
      colorScheme="primary"
      {...useNext({
        label: 'Next',
        submitLabel: 'Complete',
      })}
    />
  )
}

const PrevButton: React.FC<ButtonProps> = (props) => {
  return <Button variant="ghost" {...usePrev()} />
}

const ControlledStep: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Stack>
      <Box py="4">{children}</Box>

      <ButtonGroup>
        <NextButton />
        <PrevButton />
      </ButtonGroup>
    </Stack>
  )
}

export const Controlled = () => {
  const steps = [
    {
      name: 'step 1',
      title: 'First step',
      children: <ControlledStep>Content step 1</ControlledStep>,
    },
    {
      name: 'step 2',
      title: 'Second step',
      children: <ControlledStep>Content step 2</ControlledStep>,
    },
    {
      name: 'step 3',
      title: 'Third step',
      children: <ControlledStep>Content step 3</ControlledStep>,
    },
  ]

  return (
    <>
      <Stepper orientation="vertical">
        {steps.map((args, i) => (
          <StepperStep key={i} {...args} />
        ))}
        <StepperCompleted>Completed</StepperCompleted>
      </Stepper>
    </>
  )
}

export const UnControlled = () => {
  const [step, setStep] = React.useState(0)

  const back = () => {
    setStep(step - 1)
  }

  const next = () => {
    setStep(step + 1)
  }

  const steps = [
    {
      name: 'step 1',
      title: 'First step',
      children: <Box py="4">Content step 1</Box>,
    },
    {
      name: 'step 2',
      title: 'Second step',
      children: <Box py="4">Content step 2</Box>,
    },
    {
      name: 'step 3',
      title: 'Third step',
      children: <Box py="4">Content step 3</Box>,
    },
  ]

  return (
    <>
      <Stepper step={step} mb="2">
        {steps.map((args, i) => (
          <StepperStep key={i} {...args} />
        ))}
        <StepperCompleted py="4">Completed</StepperCompleted>
      </Stepper>
      <ButtonGroup width="100%">
        <Button onClick={back} isDisabled={step === 0} variant="ghost">
          Back
        </Button>
        <Spacer />
        <Button onClick={next} isDisabled={step >= 3} colorScheme="primary">
          Next
        </Button>
      </ButtonGroup>
    </>
  )
}

export const Responsive = () => {
  const steps = [
    {
      name: 'step 1',
      title: 'First step',
      children: <ControlledStep>Content step 1</ControlledStep>,
    },
    {
      name: 'step 2',
      title: 'Second step',
      children: <ControlledStep>Content step 2</ControlledStep>,
    },
    {
      name: 'step 3',
      title: 'Third step',
      children: <ControlledStep>Content step 3</ControlledStep>,
    },
  ]

  return (
    <>
      <Stepper
        orientation={useBreakpointValue({ base: 'vertical', sm: 'horizontal' })}
      >
        {steps.map((args, i) => (
          <StepperStep key={i} {...args} />
        ))}
        <StepperCompleted>Completed</StepperCompleted>
      </Stepper>
    </>
  )
}
