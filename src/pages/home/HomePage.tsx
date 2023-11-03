import { BaseButton } from '@/components/Buttons'
import { useUserGetCurrentUserInfo } from '@/tools/api/server/hook/userserviceapihook'
import PageWrapper from '@/tools/router/pagewrapper'
import { UserDTO } from '@jbwittner/bankwiz_openapi-client-fetch'
import { useEffect, useState } from 'react'

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

  return (
    <div>
      <h1>HomePage</h1>
      <BaseButton onClick={() => getCurrentUserInfo()}>Get current user info</BaseButton>
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
