import { Flex } from '@saas-ui/panda-preset/jsx'

import {
  AccordionShowcase,
  BadgeShowcase,
  ButtonShowcase,
  CardShowcase,
  Headings,
  MenuShowcase,
  TagShowcase,
} from './showcase'

export default function Home() {
  return (
    <Flex
      direction={'column'}
      gap={10}
      align={'center'}
      maxW={'2xl'}
      mx={'auto'}
      p={10}
    >
      <Headings />
      <ButtonShowcase />
      <AccordionShowcase />
      <CardShowcase />
      <BadgeShowcase />
      <TagShowcase />
      <MenuShowcase />
    </Flex>
  )
}
