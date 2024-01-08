import { FileRoute } from '@tanstack/react-router'

export const Route = new FileRoute('/_app/getting-started').createRoute({
  component: GettingStarted,
})

function GettingStarted() {
  return (
    <div className="p-2">
      <h3>Getting started</h3>
    </div>
  )
}
