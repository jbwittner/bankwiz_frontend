import React, { PropsWithChildren } from 'react'

interface PageWrapperProps {
  loading: boolean
  xs: number
}

const PageWrapper = ({ loading, children }: PropsWithChildren<PageWrapperProps>) => {
  if (loading) {
    return <div>Loading...</div>
  }

  return <React.Fragment>{children}</React.Fragment>
}

export default PageWrapper
