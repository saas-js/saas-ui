import { ChevronDownIcon } from 'lucide-react'
import { Accordion } from 'src/components'

export default {
  title: 'Components/Accordion',
  component: Accordion,
}

const items = [
  {
    title: 'What is Saas UI?',
    content: 'Saas UI is a library of components for building SaaS products.',
  },
  {
    title: 'What is Panda CSS?',
    content: 'Panda CSS is a build time CSS-in-JS styling system.',
  },
  {
    title: 'What is the Saas UI + Panda CSS integration?',
    content: 'This is a test of the Saas UI + Panda CSS integration.',
  },
]

export const Default = () => {
  return (
    <Accordion.Root>
      {items.map((item, index) => (
        <Accordion.Item value={`item-${index}`} key={`item-${index}`}>
          <Accordion.ItemTrigger>
            {item.title}
            <Accordion.ItemIndicator>
              <ChevronDownIcon />
            </Accordion.ItemIndicator>
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody>{item.content}</Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}

export const Sizes = () => {
  const sizes = ['sm', 'md', 'lg'] as const

  return (
    <>
      {sizes.map((size) => (
        <Accordion.Root size={size} key={size}>
          {items.map((item, index) => (
            <Accordion.Item value={`item-${index}`} key={`item-${index}`}>
              <Accordion.ItemTrigger>
                {item.title}
                <Accordion.ItemIndicator>
                  <ChevronDownIcon />
                </Accordion.ItemIndicator>
              </Accordion.ItemTrigger>
              <Accordion.ItemContent>
                <Accordion.ItemBody>{item.content}</Accordion.ItemBody>
              </Accordion.ItemContent>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      ))}
    </>
  )
}

export const Variants = () => {
  return (
    <>
      <Accordion.Root variant={'outline'}>
        {items.map((item, index) => (
          <Accordion.Item value={`item-${index}`} key={`item-${index}`}>
            <Accordion.ItemTrigger>
              {item.title}
              <Accordion.ItemIndicator>
                <ChevronDownIcon />
              </Accordion.ItemIndicator>
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              <Accordion.ItemBody>{item.content}</Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>
        ))}
      </Accordion.Root>

      <Accordion.Root variant={'subtle'} colorPalette={'gray'}>
        {items.map((item, index) => (
          <Accordion.Item value={`item-${index}`} key={`item-${index}`}>
            <Accordion.ItemTrigger>
              {item.title}
              <Accordion.ItemIndicator>
                <ChevronDownIcon />
              </Accordion.ItemIndicator>
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              <Accordion.ItemBody>{item.content}</Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>
        ))}
      </Accordion.Root>

      <Accordion.Root variant={'enclosed'}>
        {items.map((item, index) => (
          <Accordion.Item value={`item-${index}`} key={`item-${index}`}>
            <Accordion.ItemTrigger>
              {item.title}
              <Accordion.ItemIndicator>
                <ChevronDownIcon />
              </Accordion.ItemIndicator>
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              <Accordion.ItemBody>{item.content}</Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>
        ))}
      </Accordion.Root>

      <Accordion.Root variant={'plain'}>
        {items.map((item, index) => (
          <Accordion.Item value={`item-${index}`} key={`item-${index}`}>
            <Accordion.ItemTrigger>
              {item.title}
              <Accordion.ItemIndicator>
                <ChevronDownIcon />
              </Accordion.ItemIndicator>
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              <Accordion.ItemBody>{item.content}</Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </>
  )
}
