import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/profile/settings')({
  component: () => <div>Hello /profile/settings!</div>
})