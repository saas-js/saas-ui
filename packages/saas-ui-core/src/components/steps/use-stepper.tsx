import * as React from 'react'

import { createContext } from '../../utils'

export const [StepperProvider, useStepperContext] =
  createContext<UseStepperReturn>({
    name: 'StepperContext',
    errorMessage:
      'useStepperContext: `context` is undefined. Seems you forgot to wrap stepper components in `<Stepper />`',
  })

export interface UseStepperProps {
  step?: number | string
  steps?: string[]
  completed?: boolean
  onChange?(index: number): void
}

export function useStepper(props: UseStepperProps) {
  const { step, onChange, steps } = props

  const [activeIndex, setIndex] = React.useState(0)

  const stepsRef = React.useRef<string[]>(steps || [])
  const initializedRef = React.useRef(false)

  const [, onUpdate] = React.useState(Date.now())

  const registerStep = React.useCallback(
    (name: string) => {
      const newSteps = [...stepsRef.current]

      if (newSteps.indexOf(name) !== -1) {
        return
      }

      newSteps.push(name)

      stepsRef.current = newSteps
      onUpdate(Date.now())
    },
    [stepsRef, onUpdate],
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

  React.useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true
      return
    }

    onChange?.(activeIndex)
  }, [activeIndex, onChange])

  const context = {
    stepsRef,
    activeStep: stepsRef.current[activeIndex],
    activeIndex,
    isFirstStep: activeIndex === 0,
    isLastStep: activeIndex === stepsRef.current.length - 1,
    completed: activeIndex >= stepsRef.current.length,
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
  id?: string
  active?: boolean
  completed?: boolean
}

export function useStep(props: UseStepProps) {
  const { id, active, completed } = props

  const { stepsRef, registerStep, unregisterStep, activeStep } =
    useStepperContext()

  React.useEffect(() => {
    console.log('useStep', id)
    if (!id) {
      return
    }

    registerStep(id)

    return () => {
      unregisterStep(id)
    }
  }, [stepsRef])

  return {
    active: id ? activeStep === id : active,
    completed,
  }
}

/**
 * Returns props for a Prev Button
 */
export function useStepperPrevButton({ label = 'Back' } = {}) {
  const { isFirstStep, prevStep } = useStepperContext()

  return {
    disabled: isFirstStep,
    onClick: prevStep,
    children: label,
  }
}

/**
 * Returns props for a Next Button
 */
export function useStepperNextButton({
  label = 'Next',
  submitLabel = 'Submit',
} = {}) {
  const { isLastStep, completed, nextStep } = useStepperContext()

  return {
    disabled: completed,
    onClick: nextStep,
    children: isLastStep ? submitLabel : label,
  }
}
