import { useUserServiceApi } from '@/tools/api/server/hook/userserviceapihook'
import PageWrapper from '@/tools/router/pagewrapper'
import { UserDTO } from '@jbwittner/bankwiz_openapi-client-fetch'
import { Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

interface IHomeBasePageProps {
  currentUser: UserDTO
}

const HomeBasePage = (props: IHomeBasePageProps) => {
  const { getCurrentUserInfo } = useUserServiceApi()
  const [userDTO, setUserDTO] = useState<UserDTO>()

  const handleClick = async () => {
    const data = await getCurrentUserInfo()
    setUserDTO(data)
  }

  return (
    <div>
      <h1>HomePage</h1>
      <Button onClick={() => toast.success('Wow so easy!')}>dqsd</Button>
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
