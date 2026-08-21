import { Prose } from 'compositions/ui/prose'
import Markdown from 'react-markdown'

const content = `
## Heading

Based on your Saas UI plan. So [click here](https://saas-ui.dev) to confirm your plan.

- first item
- second item
- third item
`

export const ProseWithReactMarkdown = () => {
  return (
    <Prose>
      <Markdown>{content}</Markdown>
    </Prose>
  )
}
