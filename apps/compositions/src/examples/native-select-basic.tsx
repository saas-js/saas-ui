import { NativeSelect } from '@saas-ui/react'

export const NativeSelectBasic = () => {
  return (
    <NativeSelect size="sm" width="240px" placeholder="Select option">
      <option value="react">React</option>
      <option value="vue">Vue</option>
      <option value="angular">Angular</option>
      <option value="svelte">Svelte</option>
    </NativeSelect>
  )
}
