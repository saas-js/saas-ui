import { FileRoute, Link } from '@tanstack/react-router'

export const Route = new FileRoute('/').createRoute({
  component: Home,
})

function Home() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>

      <Link to="/login">Login</Link>
    </div>
  )
}
