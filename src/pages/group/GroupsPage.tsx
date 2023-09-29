import React, { useEffect, useState } from 'react'
import { useGroupGetGroup } from '@/tools/hooks/apihooks/groupapihook'
import { useUserGetCurrentUserInfo } from '@/tools/hooks/apihooks/userapihook'
import PageWrapper from '@/tools/pagewrapper'
import { useParams } from 'react-router-dom'
import { GroupBasePage } from './GroupPage'

export const GroupPage: React.FC = () => {
  const { groupId } = useParams()
  const { groupDTO, getGroup } = useGroupGetGroup()
  const { userDTO, getCurrentUserInfo } = useUserGetCurrentUserInfo()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (groupId) {
      Promise.all([getGroup(Number.parseInt(groupId)), getCurrentUserInfo()]).then(() => {
        setLoading(false)
      })
    }
  }, [groupId])

  return (
    <PageWrapper loading={loading} data={{ group: groupDTO, user: userDTO }}>
      {({ group, user }) => <GroupBasePage groupDTO={group!} currentUser={user!} />}
    </PageWrapper>
  )
}
