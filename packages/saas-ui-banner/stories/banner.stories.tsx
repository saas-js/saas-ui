import * as React from 'react'
import { Story, Meta } from '@storybook/react'

import { Button, Link } from '@saas-ui/react'

import { VStack, useDisclosure } from '@chakra-ui/react'

import {
  Banner,
  BannerContent,
  BannerTitle,
  BannerDescription,
  BannerIcon,
  BannerActions,
  BannerCloseButton,
} from '../src'

import { FiTruck } from 'react-icons/fi'

export default {
  title: 'Components/Feedback/Banner',
  component: Banner,
} as Meta

const Template: Story = (args) => <Banner {...args} />

const getChildren = ({
  icon = null,
  title = 'Pre-order Saas UI Pro now.',
  description = 'Get 50% discount and life-time access.',
  actions = <Button>Order now</Button>,
} = {}) => (
  <>
    <BannerIcon icon={icon} />
    <BannerContent>
      <BannerTitle>{title}</BannerTitle>
      <BannerDescription>{description}</BannerDescription>
    </BannerContent>
    <BannerActions>{actions}</BannerActions>
    <BannerCloseButton />
  </>
)

export const Basic = Template.bind({})
Basic.args = {
  children: getChildren(),
}

export const Status = () => {
  return (
    <VStack alignContent="stretch" justifyContent="stretch">
      <Banner children={getChildren()} status="info" />

      <Banner children={getChildren()} status="error" />

      <Banner children={getChildren()} status="success" />

      <Banner children={getChildren()} status="warning" />
    </VStack>
  )
}

export const Custom = () => {
  return (
    <VStack>
      <Banner
        children={getChildren({
          icon: FiTruck,
          title: 'Your order has been shipped.',
          description: null,
          actions: <Button colorScheme="white">Track your order</Button>,
        })}
        colorScheme="green"
      />
    </VStack>
  )
}

export const Variants = () => {
  return (
    <VStack spacing="8">
      <Banner children={getChildren()} status="info" />

      <Banner status="error" variant="solid">
        <BannerContent flexDirection="column">
          <BannerTitle>Your payment could not be processed.</BannerTitle>
          <BannerDescription>
            <Link href="#">Track your order</Link>
          </BannerDescription>
        </BannerContent>
        <BannerActions>
          <Button colorScheme="white">Retry payment</Button>
        </BannerActions>
        <BannerCloseButton />
      </Banner>

      <Banner status="success" borderRadius="full" width="auto">
        <BannerContent>
          <BannerTitle>Your order has been shipped.</BannerTitle>
        </BannerContent>
        <BannerActions>
          <Link href="#">Track your order</Link>
        </BannerActions>
        <BannerCloseButton />
      </Banner>

      <Banner colorScheme="black">
        <BannerContent justifyContent="center">
          <BannerTitle>This website uses cookies.</BannerTitle>
          <BannerDescription>
            <Link href="#">Read our Privacy Policy</Link>
          </BannerDescription>
        </BannerContent>
        <BannerCloseButton />
      </Banner>
    </VStack>
  )
}

const useBanner = () => {
  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: true })

  const handleClose = () => {
    onClose()
    setTimeout(onOpen, 2000)
  }

  return {
    isOpen,
    onClose: handleClose,
  }
}

export const Transitions = () => {
  return (
    <VStack>
      <Banner
        {...useBanner()}
        children={getChildren({
          title: 'slideOutTop',
          description: null,
          actions: null,
        })}
        motionPreset="slideOutTop"
      />
      <Banner
        {...useBanner()}
        children={getChildren({
          title: 'fade',
          description: null,
          actions: null,
        })}
        motionPreset="fade"
      />
      <Banner
        {...useBanner()}
        children={getChildren({
          title: 'scale',
          description: null,
          actions: null,
        })}
        motionPreset="scale"
      />
      <Banner
        {...useBanner()}
        children={getChildren({
          title: 'none',
          description: null,
          actions: null,
        })}
        motionPreset="none"
      />
      <Banner
        {...useBanner()}
        children={getChildren({
          title: 'slideOutBottom',
          description: null,
          actions: null,
        })}
        motionPreset="slideOutBottom"
      />
    </VStack>
  )
}
