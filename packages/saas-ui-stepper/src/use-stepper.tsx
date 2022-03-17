import * as React from 'react'

import { createContext } from '@chakra-ui/react-utils'

export const [StepperProvider, useStepperContext] =
  createContext<UseStepperReturn>({
    name: 'StepperContext',
    errorMessage:
      'useStepperContext: `context` is undefined. Seems you forgot to wrap stepper components in `<Stepper />`',
  })

export interface UseStepperProps {
  step?: number | string
}

export function useStepper(props: UseStepperProps) {
  const { step } = props

  const [activeIndex, setIndex] = React.useState(-1) // Set to -1 by default to prevent any initial transitions.

  const stepsRef = React.useRef<string[]>([])

  const [, onUpdate] = React.useState(Date.now())

  const registerStep = React.useCallback(
    (name: string) => {
      const newSteps = [...stepsRef.current]

      if (newSteps.indexOf(name) === -1) {
        newSteps.push(name)
      }

      stepsRef.current = newSteps
      onUpdate(Date.now())
    },
    [stepsRef, onUpdate]
  )

  const unregisterStep = (name: string) => {
    stepsRef.current = stepsRef.current.slice(stepsRef.current.indexOf(name), 1)
  }

  const setStep = (name: string) => {
    const i = stepsRef.current.indexOf(name)

    if (i !== -1) {
      setIndex(i)
    }
  }

  const nextStep = () => {
    setIndex(activeIndex + 1)
  }

  const prevStep = () => {
    setIndex(activeIndex - 1)
  }

  React.useEffect(() => {
    if (typeof step === 'string') {
      setStep(step)
    } else if (typeof step === 'number') {
      setIndex(step)
    } else if (activeIndex === -1) {
      setIndex(0) // initiate the stepper by activating the first step
    }
  }, [step])

  const context = {
    stepsRef,
    activeStep: stepsRef.current[activeIndex],
    activeIndex,
    isFirstStep: activeIndex === 0,
    isLastStep: activeIndex === stepsRef.current.length - 1,
    isCompleted: activeIndex >= stepsRef.current.length,
    setIndex,
    setStep,
    nextStep,
    prevStep,
    registerStep,
    unregisterStep,
  }

  return context
}

export type UseStepperReturn = ReturnType<typeof useStepper>

export interface UseStepProps {
  name?: string
  isActive?: boolean
  isCompleted?: boolean
}

export function useStep(props: UseStepProps) {
  const { name, isActive, isCompleted } = props
  const { registerStep, unregisterStep, activeStep } = useStepperContext()

  React.useEffect(() => {
    if (!name) {
      return
    }
    registerStep(name)

    return () => {
      unregisterStep(name)
    }
  }, [])

  return {
    isActive: name ? activeStep === name : isActive,
    isCompleted,
  }
}

/**
 * Returns props for a Prev Button
 */
export function usePrev({ label = 'Back' } = {}) {
  const { isFirstStep, prevStep } = useStepperContext()

  return {
    isDisabled: isFirstStep,
    onClick: prevStep,
    label,
  }
}

/**
 * Returns props for a Next Button
 */
export function useNext({ label = 'Next', submitLabel = 'Submit' } = {}) {
  const { isLastStep, isCompleted, nextStep } = useStepperContext()

  return {
    isDisabled: isCompleted,
    onClick: nextStep,
    label: isLastStep ? submitLabel : label,
  }
}
