import ApplicationBar from '@/components/ApplicationBar'
import { Outlet } from 'react-router-dom'

export function ApplicationLayout() {
  return (
    <div>
      <ApplicationBar />
      <Outlet />
    </div>
  )
}
