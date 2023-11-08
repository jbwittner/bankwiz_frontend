import { BaseButton } from '@/components/Buttons'
import { useUserGetCurrentUserInfo } from '@/tools/api/server/hook/userserviceapihook'
import PageWrapper from '@/tools/router/pagewrapper'
import { UserDTO } from '@jbwittner/bankwiz_openapi-client-fetch'
import { useEffect, useState } from 'react'

interface IHomeBasePageProps {
  currentUser: UserDTO
}

const GroupPagePage = (props: IHomeBasePageProps) => {
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

const GroupPage = () => {
  const { userDTO, getCurrentUserInfo } = useUserGetCurrentUserInfo()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCurrentUserInfo().then(() => {
      setLoading(false)
    })
  }, [])

  return (
    <PageWrapper loading={loading}>
      <GroupPagePage currentUser={userDTO!} />
    </PageWrapper>
  )
}

export { GroupPage }
