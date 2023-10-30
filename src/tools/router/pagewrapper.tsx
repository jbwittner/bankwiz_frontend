import { PropsWithChildren } from 'react'

interface PageWrapperProps {
  loading: boolean
}

const PageWrapper = ({ loading, children }: PropsWithChildren<PageWrapperProps>) => {
  if (loading) {
    return <div>Loading...</div>
  }

  return <>{children}</>
}

export default PageWrapper
