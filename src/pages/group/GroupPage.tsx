import { useGroupServiceApi } from '@/tools/api/server/hook/groupserviceapihook'
import PageWrapper from '@/tools/router/pagewrapper'
import { GroupDetailsDTO } from '@jbwittner/bankwiz_openapi-client-fetch'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AddUserGroupDialog } from './components/AddUserGroupDialog'

interface IGroupBasePageProps {
  groupDetailsDTO: GroupDetailsDTO
}

const GroupBasePage = (props: IGroupBasePageProps) => {
  const [groupDetailDTO, setGroupDetailDTO] = useState<GroupDetailsDTO>(props.groupDetailsDTO)

  const { getGroupDetails } = useGroupServiceApi()

  const handleAdd = () => {
    getGroupDetails(props.groupDetailsDTO.id).then(data => {
      setGroupDetailDTO(data)
      setOpen(false)
    })
  }

  const [open, setOpen] = useState(false)

  return (
    <div>
      <h1>{groupDetailDTO.groupName}</h1>
      <h3>Groupd Id : {groupDetailDTO.id}</h3>
      <Button onClick={() => setOpen(true)}>Add user</Button>
      <AddUserGroupDialog groupId={groupDetailDTO.id} handleCancel={() => setOpen(false)} handleAdd={handleAdd} open={open} />
      <TableContainer component={Paper} sx={{ mt: '15px' }}>
        <Table sx={{ minWidth: '100%' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Right ID</TableCell>
              <TableCell align="center">User email</TableCell>
              <TableCell align="center">Right</TableCell>
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
  const [groupDetailDTO, setGroupDetailDTO] = useState<GroupDetailsDTO>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (groupId) {
      getGroupDetails(groupId).then(data => {
        setGroupDetailDTO(data)
        setLoading(false)
      })
    }
  }, [])

  return (
    <PageWrapper loading={loading} xs={8}>
      <GroupBasePage groupDetailsDTO={groupDetailDTO!} />
    </PageWrapper>
  )
}

export { GroupPage }
