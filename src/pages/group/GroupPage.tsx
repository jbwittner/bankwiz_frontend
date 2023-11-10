import { useGroupGetUserGroups } from '@/tools/api/server/hook/groupserviceapihook'
import PageWrapper from '@/tools/router/pagewrapper'
import { GroupIndexDTO } from '@jbwittner/bankwiz_openapi-client-fetch'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useEffect, useState } from 'react'

interface IGroupBasePageProps {
  groupIndexDTO: GroupIndexDTO[]
}

const GroupPagePage = (props: IGroupBasePageProps) => {
  return (
    <div>
      <h1>HomePage</h1>
      <TableContainer component={Paper} sx={{ maxWidth: 650 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                  <TableCell align="center"><Button variant="text">Text</Button>
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
