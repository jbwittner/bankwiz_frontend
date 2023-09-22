import ApplicationBar from '@/components/appbar/ApplicationBar'
import React from 'react'
import { Outlet } from 'react-router-dom'

export function ApplicationLayout() {
  return (
    <React.Fragment>
      <ApplicationBar />
      <Outlet />
    </React.Fragment>
  )
}
