import { NativeSelect } from '@saas-ui/react'

export const NativeSelectWithItems = () => {
  return (
    <NativeSelect size="sm" placeholder="Select option" width="240px">
      <option value="react">React</option>
      <option value="vue">Vue</option>
      <option value="angular">Angular</option>
      <option value="svelte">Svelte</option>
    </NativeSelect>
  )
}
