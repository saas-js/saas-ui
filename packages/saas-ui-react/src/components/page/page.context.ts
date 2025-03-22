import { createContext, createSlotRecipeContext } from '@chakra-ui/react'

export const {
  withProvider,
  withContext,
  useStyles: usePageStyles,
  useClassNames,
} = createSlotRecipeContext({
  key: 'suiPage',
})

interface PageProviderValue {
  loading?: boolean
  skeleton?: React.ReactNode
}

export const [PageProvider, usePageContext] = createContext<PageProviderValue>()
