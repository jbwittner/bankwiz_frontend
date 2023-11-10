import { useGroupGetUserGroups } from '@/tools/api/server/hook/groupserviceapihook'
import PageWrapper from '@/tools/router/pagewrapper'
import { GroupIndexDTO } from '@jbwittner/bankwiz_openapi-client-fetch'
import { useEffect, useState } from 'react'

interface IGroupBasePageProps {
  groupIndexDTO: GroupIndexDTO[]
}

const GroupPagePage = (props: IGroupBasePageProps) => {
  return (
    <div>
      <h1>HomePage</h1>
      {props.groupIndexDTO.map(groupIndexDTO => {
        return <div key={groupIndexDTO.groupId}>{groupIndexDTO.groupId + ' - ' + groupIndexDTO.groupName}</div>
      })}
    </div>
  )
}

const GroupPage = () => {
  const { data, getUserGroups } = useGroupGetUserGroups()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUserGroups().then(() => {
      setLoading(false)
    })
  }, [])

  return (
    <PageWrapper loading={loading}>
      <GroupPagePage groupIndexDTO={data!} />
    </PageWrapper>
  )
}

export { GroupPage }
