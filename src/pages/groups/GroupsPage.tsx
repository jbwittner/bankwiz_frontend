import { useGroupServiceApi } from '@/tools/api/server/hook/groupserviceapihook'
import PageWrapper from '@/tools/router/pagewrapper'
import { GroupIndexDTO } from '@jbwittner/bankwiz_openapi-client-fetch'
import { Button, Fab, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import { CreationGroupDialog } from './components/CreationGroupDialog'

interface IGroupBasePageProps {
  groupIndexDTO: GroupIndexDTO[]
}

const GroupsPagePage = (props: IGroupBasePageProps) => {
  const [groups, setGroups] = React.useState(props.groupIndexDTO)
  const [open, setOpen] = React.useState(false)
  const { getUserGroups } = useGroupServiceApi()

  const onCreate = async () => {
    const data = await getUserGroups()
    setGroups(data)
    setOpen(false)
  }

  const close = () => {
    setOpen(false)
  }

  return (
    <>
      <CreationGroupDialog open={open} handleCancel={close} handleCreate={onCreate} />
      <TableContainer component={Paper} sx={{ mt: '15px' }}>
        <Table sx={{ minWidth: '100%' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Group ID</TableCell>
              <TableCell align="center">Group Name</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groups.map(groupIndexDTO => {
              return (
                <TableRow key={groupIndexDTO.groupId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {groupIndexDTO.groupId}
                  </TableCell>
                  <TableCell align="center">{groupIndexDTO.groupName}</TableCell>
                  <TableCell align="center">
                    <Button variant="text">Group Page</Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Fab color="primary" aria-label="add" sx={{ position: 'absolute', bottom: 16, right: 16 }} onClick={() => setOpen(true)}>
        <AddIcon />
      </Fab>
    </>
  )
}

const GroupsPage = () => {
  const { getUserGroups } = useGroupServiceApi()
  const [groupDTOs, setGroupDTOs] = useState<GroupIndexDTO[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUserGroups().then(data => {
      setGroupDTOs(data)
      setLoading(false)
    })
  }, [])

  return (
    <PageWrapper loading={loading} xs={8}>
      <GroupsPagePage groupIndexDTO={groupDTOs} />
    </PageWrapper>
  )
}

export { GroupsPage }
