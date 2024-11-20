import { Box, Steps as ChakraSteps } from '@chakra-ui/react'

import { CheckIcon } from '../icons'

interface StepInfoProps {
  title?: React.ReactNode
  description?: React.ReactNode
}

export interface StepsItemProps
  extends Omit<ChakraSteps.ItemProps, 'title'>,
    StepInfoProps {
  completedIcon?: React.ReactNode
  icon?: React.ReactNode
}

export const StepsItem = (props: StepsItemProps) => {
  const { title, description, completedIcon, icon, ...rest } = props
  return (
    <ChakraSteps.Item {...rest}>
      <ChakraSteps.Trigger>
        <ChakraSteps.Indicator>
          <ChakraSteps.Status
            complete={completedIcon || <CheckIcon />}
            incomplete={icon || <ChakraSteps.Number />}
          />
        </ChakraSteps.Indicator>
        <StepInfo title={title} description={description} />
      </ChakraSteps.Trigger>
      <ChakraSteps.Separator />
    </ChakraSteps.Item>
  )
}

const StepInfo = (props: StepInfoProps) => {
  const { title, description } = props
  if (title && description) {
    return (
      <Box>
        <ChakraSteps.Title>{title}</ChakraSteps.Title>
        <ChakraSteps.Description>{description}</ChakraSteps.Description>
      </Box>
    )
  }
  return (
    <>
      {title && <ChakraSteps.Title>{title}</ChakraSteps.Title>}
      {description && (
        <ChakraSteps.Description>{description}</ChakraSteps.Description>
      )}
    </>
  )
}

export interface StepsIndicatorProps {
  completedIcon: React.ReactNode
  icon?: React.ReactNode
}

export const StepsIndicator = (props: StepsIndicatorProps) => {
  const { icon = <ChakraSteps.Number />, completedIcon } = props
  return (
    <ChakraSteps.Indicator>
      <ChakraSteps.Status complete={completedIcon} incomplete={icon} />
    </ChakraSteps.Indicator>
  )
}

export const StepsList = ChakraSteps.List

export type StepsRootProps = ChakraSteps.RootProps
export const StepsRoot = ChakraSteps.Root
export const StepsContent = ChakraSteps.Content
export const StepsCompletedContent = ChakraSteps.CompletedContent

export const StepsNextTrigger = (props: ChakraSteps.NextTriggerProps) => {
  return <ChakraSteps.NextTrigger {...props} />
}

export const StepsPrevTrigger = (props: ChakraSteps.PrevTriggerProps) => {
  return <ChakraSteps.PrevTrigger {...props} />
}
