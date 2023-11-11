import { useGroupGetUserGroups } from '@/tools/api/server/hook/groupserviceapihook'
import PageWrapper from '@/tools/router/pagewrapper'
import { GroupIndexDTO } from '@jbwittner/bankwiz_openapi-client-fetch'
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useEffect, useState } from 'react'

interface IGroupBasePageProps {
  groupIndexDTO: GroupIndexDTO[]
}

const GroupsPagePage = (props: IGroupBasePageProps) => {
  return (
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
          {props.groupIndexDTO.map(groupIndexDTO => {
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
  )
}

const GroupsPage = () => {
  const { data, getUserGroups } = useGroupGetUserGroups()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUserGroups().then(() => {
      setLoading(false)
    })
  }, [])

  return (
    <PageWrapper loading={loading} xs={8}>
      <GroupsPagePage groupIndexDTO={data} />
    </PageWrapper>
  )
}

export { GroupsPage }
