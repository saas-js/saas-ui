import * as React from 'react'
import { Story, Meta } from '@storybook/react'

import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  useSteps,
} from '@chakra-ui/react'

import { Steps, StepsItem } from './steps'

export default {
  title: 'Components/Navigation/Steps',
  component: Steps,
  decorators: [
    (Story: any) => (
      <Container mt="40px">
        <Story />
      </Container>
    ),
  ],
} as Meta

const steps = [
  {
    title: 'First',
    description: 'Contact Info',
    children: 'Please enter your contact information',
  },
  {
    title: 'Second',
    description: 'Date & Time',
    children: 'When do you want to make the reservation?',
  },
  {
    title: 'Third',
    description: 'Select Rooms',
    children: 'Which rooms do you want to book?',
  },
]

const renderStep = (step: (typeof steps)[number]) => {
  return (
    <Step>
      <StepIndicator>
        <StepStatus
          complete={<StepIcon />}
          incomplete={<StepNumber />}
          active={<StepNumber />}
        />
      </StepIndicator>

      <Box flexShrink="0">
        <StepTitle>{step.title}</StepTitle>
        <StepDescription>{step.description}</StepDescription>
      </Box>

      <StepSeparator />
    </Step>
  )
}

export const Default = {
  render: () => {
    const { activeStep, goToNext, goToPrevious } = useSteps({
      index: 0,
      count: steps.length,
    })

    return (
      <>
        <Steps index={activeStep} mb="8">
          {steps.map((step, index) => (
            <StepsItem key={index} {...step} />
          ))}
        </Steps>
        <ButtonGroup>
          <Button onClick={goToPrevious}>Previous</Button>
          <Button onClick={goToNext}>Next</Button>
        </ButtonGroup>
      </>
    )
  },
}

export const Vertical = {
  render: () => {
    const { activeStep, goToNext, goToPrevious } = useSteps({
      index: 0,
      count: steps.length,
    })

    return (
      <>
        <Steps index={activeStep} orientation="vertical" mb="8">
          {steps.map((step, index) => (
            <StepsItem
              key={index}
              {...step}
              render={() => {
                return (
                  <Step>
                    <StepIndicator>
                      <StepStatus
                        complete={<StepIcon />}
                        incomplete={<StepNumber />}
                        active={<StepNumber />}
                      />
                    </StepIndicator>

                    <StepTitle>{step.title}</StepTitle>

                    <StepSeparator />
                  </Step>
                )
              }}
            />
          ))}
        </Steps>

        <ButtonGroup>
          <Button onClick={goToPrevious}>Previous</Button>
          <Button onClick={goToNext}>Next</Button>
        </ButtonGroup>
      </>
    )
  },
}

export const SolidVariant = {
  render: () => {
    const { activeStep, goToNext, goToPrevious } = useSteps({
      index: 0,
      count: steps.length,
    })

    return (
      <>
        <Steps index={activeStep} variant="solid" mb="8">
          {steps.map((step, index) => (
            <StepsItem key={index} {...step} render={renderStep} />
          ))}
        </Steps>

        <ButtonGroup>
          <Button onClick={goToPrevious}>Previous</Button>
          <Button onClick={goToNext}>Next</Button>
        </ButtonGroup>
      </>
    )
  },
}

const namedSteps = [
  {
    name: 'first',
    title: 'First',
    description: 'Contact Info',
    children: 'Please enter your contact information',
  },
  {
    name: 'second',
    title: 'Second',
    description: 'Date & Time',
    children: 'When do you want to make the reservation?',
  },
  {
    name: 'third',
    title: 'Third',
    description: 'Select Rooms',
    children: 'Which rooms do you want to book?',
  },
]

export const NamedSteps = {
  render: () => {
    return (
      <>
        <Steps step="second" mb="8">
          {namedSteps.map((step, index) => (
            <StepsItem key={index} {...step} />
          ))}
        </Steps>
      </>
    )
  },
}
