import ApplicationBar from '@/components/appbar/ApplicationBar'
import { Grid } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'

export function ApplicationLayout() {
  return (
    <React.Fragment>
      <ApplicationBar />
      <Grid container spacing={0} direction="column" alignItems="center">
        <Grid item style={{ maxWidth: '1920px' }} sx={{ width: '100%' }}>
          <Outlet />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
