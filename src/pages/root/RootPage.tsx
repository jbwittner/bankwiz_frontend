import React from 'react'
import { Outlet } from 'react-router-dom'

const RootPage = () => {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  )
}

export { RootPage }
