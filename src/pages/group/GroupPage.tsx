import { useGroupServiceApi } from '@/tools/api/server/hook/groupserviceapihook'
import PageWrapper from '@/tools/router/pagewrapper'
import { GroupDetailsDTO, UserDTO, UserGroupRightDTO, UserGroupRightEnum } from '@jbwittner/bankwiz_openapi-client-fetch'
import { Button, Grid, IconButton, Paper, SxProps, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AddUserGroupDialog } from './components/AddUserGroupDialog'
import { useUserServiceApi } from '@/tools/api/server/hook/userserviceapihook'
import GroupRemoveIcon from '@mui/icons-material/GroupRemove'
import { Theme } from '@emotion/react'
import { red } from '@mui/material/colors'
import { DeleteGroupDialog } from './components/DeleteGroupDialog'

interface IGroupBasePageProps {
  groupDetailsDTO: GroupDetailsDTO
  userDTO: UserDTO
}

const deleteIconSx: SxProps<Theme> = {
  color: red[700],
  ':disabled': { color: red[200] }
}

const GroupBasePage = (props: IGroupBasePageProps) => {
  const [groupDetailDTO, setGroupDetailDTO] = useState<GroupDetailsDTO>(props.groupDetailsDTO)
  const [isOpenAddUserModal, setIsOpenAddUserModal] = useState(false)
  const [isOpenDeleteGroupModal, setIsOpenDeleteGroupModal] = useState(false)
  const navigate = useNavigate()

  const isAdmin = props.groupDetailsDTO.usersRights.find(userGroupRight => userGroupRight.user.id === props.userDTO.id)?.right === UserGroupRightEnum.Admin

  const { getGroupDetails, deleteUserFromGroup } = useGroupServiceApi()

  const handleAdd = async () => {
    const details = await getGroupDetails(props.groupDetailsDTO.id)
    setGroupDetailDTO(details)
    setIsOpenAddUserModal(false)
  }

  const handleDelete = async () => {
    setIsOpenDeleteGroupModal(false)
    navigate('/app/groups')
  }

  const onClickDeleteUser = async (userGroupRightDTO: UserGroupRightDTO) => {
    await deleteUserFromGroup(props.groupDetailsDTO.id, userGroupRightDTO.user.id)
    const details = await getGroupDetails(props.groupDetailsDTO.id)
    setGroupDetailDTO(details)
  }

  const buttonEnabled = (userGroupRightDTO: UserGroupRightDTO) => {
    return props.userDTO.id !== userGroupRightDTO.user.id && isAdmin
  }

  return (
    <div>
      <h1>{groupDetailDTO.groupName}</h1>
      <h3>Groupd Id : {groupDetailDTO.id}</h3>
      <Grid container direction={'row'} justifyContent={'space-between'}>
        <Grid item>
          <Button onClick={() => setIsOpenAddUserModal(true)}>Add user</Button>
        </Grid>
        <Grid item>
          <Button onClick={() => setIsOpenDeleteGroupModal(true)} color="error">
            Delete group
          </Button>
        </Grid>
      </Grid>

      <AddUserGroupDialog groupId={groupDetailDTO.id} handleCancel={() => setIsOpenAddUserModal(false)} handleAdd={handleAdd} open={isOpenAddUserModal} />
      <DeleteGroupDialog
        groupId={groupDetailDTO.id}
        handleCancel={() => setIsOpenDeleteGroupModal(false)}
        handleDelete={handleDelete}
        open={isOpenDeleteGroupModal}
      />
      <TableContainer component={Paper} sx={{ mt: '15px' }}>
        <Table sx={{ minWidth: '100%' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Right ID</TableCell>
              <TableCell align="center">User email</TableCell>
              <TableCell align="center">Right</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groupDetailDTO.usersRights.map(userRight => {
              return (
                <TableRow key={userRight.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {userRight.id}
                  </TableCell>
                  <TableCell align="center">{userRight.user.email}</TableCell>
                  <TableCell align="center">{userRight.right}</TableCell>
                  <TableCell align="center">
                    {/*Only administrator users can remove rights (for other users)*/}
                    <IconButton size="small" sx={deleteIconSx} disabled={!buttonEnabled(userRight)} onClick={() => onClickDeleteUser(userRight)}>
                      <GroupRemoveIcon fontSize="inherit" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

const GroupPage = () => {
  const { groupId } = useParams()
  const { getGroupDetails } = useGroupServiceApi()
  const { getCurrentUserInfo } = useUserServiceApi()
  const [groupDetailDTO, setGroupDetailDTO] = useState<GroupDetailsDTO>()
  const [currentUserDTO, setCurrentUserDTO] = useState<UserDTO>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (groupId) {
      const promiseCurrentUser = getCurrentUserInfo()
      const promiseGroupDetails = getGroupDetails(groupId)
      Promise.all([promiseCurrentUser, promiseGroupDetails]).then(data => {
        setCurrentUserDTO(data[0])
        setGroupDetailDTO(data[1])
        setLoading(false)
      })
    }
  }, [])

  return (
    <PageWrapper loading={loading} xs={8}>
      <GroupBasePage groupDetailsDTO={groupDetailDTO!} userDTO={currentUserDTO!} />
    </PageWrapper>
  )
}

export { GroupPage }
