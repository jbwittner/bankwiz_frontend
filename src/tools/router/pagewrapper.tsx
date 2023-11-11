import { Grid } from '@mui/material'
import { PropsWithChildren } from 'react'

interface PageWrapperProps {
  loading: boolean
  xs: number
}

const PageWrapper = ({ loading, xs, children }: PropsWithChildren<PageWrapperProps>) => {
  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Grid container direction="row" justifyContent="center" spacing={0}>
      <Grid item xs={xs}>
        {children}
      </Grid>
    </Grid>
  )
}

export default PageWrapper
