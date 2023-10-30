import { useUserGetCurrentUserInfo } from '@/tools/api/server/hook/userapihook'
import PageWrapper from '@/tools/router/pagewrapper'
import { UserDTO } from '@jbwittner/bankwiz_openapi-client-fetch'
import { Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const HomePageLoader = async () => {
  const { userDTO, getCurrentUserInfo } = useUserGetCurrentUserInfo()
  await getCurrentUserInfo()
  return userDTO
}

interface IHomeBasePageProps {
  currentUser: UserDTO
}

const HomeBasePage = (props: IHomeBasePageProps) => {
  const { userDTO, getCurrentUserInfo } = useUserGetCurrentUserInfo()
  const navigate = useNavigate()

  return (
    <div>
      <h1>HomePage</h1>
      <Button onClick={() => getCurrentUserInfo()}>Get current user info</Button>
      <Button onClick={() => navigate('/app/test/6')}>gototest</Button>
      {userDTO && <div>{'userDTO : ' + userDTO.id + ' - ' + userDTO.email}</div>}
      <div>{'props.currentUser : ' + props.currentUser.id + ' - ' + props.currentUser.email}</div>
    </div>
  )
}

const HomePage = () => {
  const { userDTO, getCurrentUserInfo } = useUserGetCurrentUserInfo()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCurrentUserInfo().then(() => {
      setLoading(false)
    })
  }, [])

  return (
    <PageWrapper loading={loading}>
      <HomeBasePage currentUser={userDTO!} />
    </PageWrapper>
  )
}

export { HomePage, HomePageLoader }
