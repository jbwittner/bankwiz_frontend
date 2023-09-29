import { GroupDTO, UserDTO } from '@jbwittner/bankwiz_openapi-client-fetch'
import { Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'

interface IGroupBasePageProps {
  groupDTO: GroupDTO
  currentUser: UserDTO
}

export const GroupBasePage: React.FC<IGroupBasePageProps> = props => {
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
              <TableBody></TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
