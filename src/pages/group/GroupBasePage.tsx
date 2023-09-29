import { GroupDTO, UserDTO } from '@jbwittner/bankwiz_openapi-client-fetch'
import { Typography } from '@mui/material'
import React from 'react'

interface IGroupBasePageProps {
  groupDTO: GroupDTO
  currentUser: UserDTO
}

export const GroupBasePage: React.FC<IGroupBasePageProps> = props => {
  return (
    <React.Fragment>
      <Typography variant="h1" sx={{ fontWeight: 'bold', textDecoration: 'underline', fontStyle: 'italic' }}>
        Group : {props.groupDTO.groupName}
      </Typography>
    </React.Fragment>
  )
}
