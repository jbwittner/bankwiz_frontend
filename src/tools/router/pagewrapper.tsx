import { Container } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

interface PageWrapperProps {
  loading: boolean
  maxW: string
}

const PageWrapper = ({ loading, maxW, children }: PropsWithChildren<PageWrapperProps>) => {
  if (loading) {
    return <div>Loading...</div>
  }

  return <Container maxW={maxW}>{children}</Container>
}

export default PageWrapper
