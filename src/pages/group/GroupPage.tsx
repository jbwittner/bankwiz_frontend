import { useGroupGetGroup } from '@/tools/hooks/apihooks/groupapihook'
import { GroupDTO } from '@jbwittner/bankwiz_openapi-client-fetch'
import { Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useLoaderData, useParams } from 'react-router-dom'

export const GroupPage = () => {
  const { groupId } = useParams()
  const { groupDTO, getGroup } = useGroupGetGroup()

  const team = useLoaderData() as GroupDTO

  console.log(team)

  useEffect(() => {
    if (groupId) getGroup(Number.parseInt(groupId))
  }, [groupId])

  return (
    <React.Fragment>
      <Typography variant="h1" sx={{ fontWeight: 'bold', textDecoration: 'underline', fontStyle: 'italic' }}>
        Group : {groupDTO?.groupName}
      </Typography>
    </React.Fragment>
  )
}
