import { GroupAuthorizationEnum, GroupDTO, UserDTO } from '@jbwittner/bankwiz_openapi-client-fetch'
import { Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { UserGroupLine } from './components/UserGroupLine'
import { useGroupGetGroup, useGroupRemoveUserFromGroup, useGroupUpdateUserInGroup } from '@/tools/hooks/apihooks/groupapihook'

interface IGroupBasePageProps {
  groupDTO: GroupDTO
  currentUser: UserDTO
}

export const GroupBasePage: React.FC<IGroupBasePageProps> = props => {
  const [group, setGroup] = useState<GroupDTO>(props.groupDTO)
  const { groupDTO, getGroup } = useGroupGetGroup()
  const { removeUserFromGroup } = useGroupRemoveUserFromGroup()
  const { updateUserInGroup } = useGroupUpdateUserInGroup()

  useEffect(() => {
    if (groupDTO) {
      setGroup(groupDTO)
    }
  }, [groupDTO])

  const onClickDelete = async (userId: number) => {
    await removeUserFromGroup(group.groupId, userId)
    await getGroup(group.groupId)
  }

  const onUpdateAuthorization = async (userId: number, authorization: GroupAuthorizationEnum) => {
    console.log(userId, authorization)
    await updateUserInGroup(group.groupId, userId, { authorization: authorization })
    await getGroup(group.groupId)
  }

  const currentUserGroupDto = props.groupDTO.users.find(userGroupDto => userGroupDto.user.userId === props.currentUser.userId)

  return (
    <React.Fragment>
      <Grid container direction="column">
        <Grid item>
          <Typography display="inline" variant="h2" sx={{ fontWeight: 'bold', textDecoration: 'underline', fontStyle: 'italic' }}>
            Group :
          </Typography>
          <Typography display="inline" variant="h2" sx={{ fontWeight: 'bold' }}>
            {' ' + props.groupDTO.groupName}
          </Typography>
        </Grid>
        <Grid item>
          <Typography display="inline" variant="subtitle1" sx={{ fontWeight: 'bold', textDecoration: 'underline', fontStyle: 'italic' }}>
            Group ID :
          </Typography>
          <Typography display="inline" variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            {' ' + props.groupDTO.groupId}
          </Typography>
        </Grid>
        <Grid item>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">First name</TableCell>
                  <TableCell align="center">Last name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Authorization</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentUserGroupDto &&
                  group.users.map(userGroutDto => (
                    <UserGroupLine
                      key={userGroutDto.user.userId}
                      userGroupDTO={userGroutDto}
                      currentUser={currentUserGroupDto}
                      onDelete={onClickDelete}
                      updateAuthorization={onUpdateAuthorization}
                    />
                  ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
