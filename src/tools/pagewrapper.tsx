import React from 'react'

interface PageWrapperProps<T> {
  loading: boolean
  data: T | null
  children: (data: T) => React.ReactNode
}

const PageWrapper = <T,>({ loading, data, children }: PageWrapperProps<T>) => {
  if (loading || data === null) {
    return <div>Loading...</div>
  }

  return <>{children(data)}</>
}

export default PageWrapper
