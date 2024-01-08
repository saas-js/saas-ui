import { FileRoute } from '@tanstack/react-router'

export const Route = new FileRoute('/_app/$workspace/').createRoute({
  component: Home,
})

function Home() {
  return (
    <div className="p-2">
      <h3>App</h3>
    </div>
  )
}
