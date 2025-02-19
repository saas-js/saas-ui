import { redirect } from 'next/navigation'

export default function Page() {
  throw redirect('/docs/getting-started')
}
