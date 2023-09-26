import { useGroupGetGroup } from '@/tools/hooks/apihooks/groupapihook'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export const GroupPage = () => {
  const { groupId } = useParams()
  const { groupDTO, getGroup } = useGroupGetGroup()

  useEffect(() => {
    if (groupId) getGroup(Number.parseInt(groupId))
  }, [groupId])

  return <div>groupPage : {groupDTO?.groupName}</div>
}
