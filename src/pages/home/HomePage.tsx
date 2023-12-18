import { useUserServiceApi } from '@/tools/api/server/hook/userserviceapihook'
import PageWrapper from '@/tools/router/pagewrapper'
import { Button, useToast } from '@chakra-ui/react'
import { UserDTO } from '@jbwittner/bankwiz_openapi-client-fetch'
import { useEffect, useState } from 'react'

interface IHomeBasePageProps {
  currentUser: UserDTO
}

const HomeBasePage = (props: IHomeBasePageProps) => {
  const { getCurrentUserInfo } = useUserServiceApi()
  const [userDTO, setUserDTO] = useState<UserDTO>()

  const toast = useToast()

  const handleClick = async () => {
    const data = await getCurrentUserInfo()
    setUserDTO(data)
  }

  return (
    <div>
      <h1>HomePage</h1>
      <Button
        onClick={() =>
          toast({ title: 'Account created.', description: "We've created your account for you.", status: 'success', duration: 9000, isClosable: true })
        }
      >
        dqsd
      </Button>
      <Button onClick={handleClick}>Get current user info</Button>
      {userDTO && <div>{'userDTO : ' + userDTO.id + ' - ' + userDTO.email}</div>}
      <div>{'props.currentUser : ' + props.currentUser.id + ' - ' + props.currentUser.email}</div>
    </div>
  )
}

const HomePage = () => {
  const { getCurrentUserInfo } = useUserServiceApi()
  const [loading, setLoading] = useState(true)
  const [userDTO, setUserDTO] = useState<UserDTO>()

  useEffect(() => {
    getCurrentUserInfo().then(data => {
      setUserDTO(data)
      setLoading(false)
    })
  }, [])

  return (
    <PageWrapper loading={loading} xs={10}>
      <HomeBasePage currentUser={userDTO!} />
    </PageWrapper>
  )
}

export { HomePage }
