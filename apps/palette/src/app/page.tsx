import { PaletteApp } from '#/components/palette-app'
import { Provider } from '#/components/provider'
import { stateFromSearchParams } from '#/lib/palette'

export default async function Page(props: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const initialState = stateFromSearchParams(await props.searchParams)

  return (
    <Provider initialState={initialState}>
      <PaletteApp />
    </Provider>
  )
}
