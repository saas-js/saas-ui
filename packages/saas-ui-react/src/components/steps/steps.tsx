import { Box } from '@chakra-ui/react/box'
import { Steps as ChakraSteps, useStepsContext } from '@chakra-ui/react/steps'

import { CheckIcon } from '#components/icons'

interface StepInfoProps {
  title?: React.ReactNode
  description?: React.ReactNode
}

interface StepsItemProps
  extends Omit<ChakraSteps.ItemProps, 'title'>,
    StepInfoProps {
  completedIcon?: React.ReactNode
  icon?: React.ReactNode
}

const StepsItem = (props: StepsItemProps) => {
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

interface StepsIndicatorProps {
  completedIcon: React.ReactNode
  icon?: React.ReactNode
}

const StepsIndicator = (props: StepsIndicatorProps) => {
  const { icon = <ChakraSteps.Number />, completedIcon } = props
  return (
    <ChakraSteps.Indicator>
      <ChakraSteps.Status complete={completedIcon} incomplete={icon} />
    </ChakraSteps.Indicator>
  )
}

const StepsList = ChakraSteps.List

type StepsRootProps = ChakraSteps.RootProps
const StepsRoot = ChakraSteps.Root
const StepsContent = ChakraSteps.Content
const StepsCompletedContent = ChakraSteps.CompletedContent

const StepsNextTrigger = (props: ChakraSteps.NextTriggerProps) => {
  return <ChakraSteps.NextTrigger {...props} />
}

const StepsPrevTrigger = (props: ChakraSteps.PrevTriggerProps) => {
  return <ChakraSteps.PrevTrigger {...props} />
}

export {
  StepsRoot as Root,
  StepsContent as Content,
  StepsCompletedContent as CompletedContent,
  StepsList as List,
  StepsIndicator as Indicator,
  StepsItem as Item,
  StepsNextTrigger as NextTrigger,
  StepsPrevTrigger as PrevTrigger,
  useStepsContext as useContext,
}

export type {
  StepsRootProps as RootProps,
  StepsItemProps as ItemProps,
  StepsIndicatorProps as IndicatorProps,
}
