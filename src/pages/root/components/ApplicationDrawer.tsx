import { Box, Drawer, Toolbar } from '@mui/material'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import HomeIcon from '@mui/icons-material/Home'
import GroupsIcon from '@mui/icons-material/Groups'
import { PropsWithChildren } from 'react'
import { useNavigate } from 'react-router-dom'

const drawerWidth = 200

export const ApplicationDrawer = () => {
  const navigate = useNavigate()

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' }
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <ItemDrawer text={'Home'} onClick={() => navigate('/app/home')}>
            <HomeIcon />
          </ItemDrawer>
          <ItemDrawer text={'Groups'} onClick={() => navigate('/app/groups')}>
            <GroupsIcon />
          </ItemDrawer>
        </List>
      </Box>
    </Drawer>
  )
}

interface IitemDrawerProps {
  text: string
  onClick: () => void
}

const ItemDrawer = (props: PropsWithChildren<IitemDrawerProps>) => {
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={props.onClick}>
        <ListItemIcon>{props.children}</ListItemIcon>
        <ListItemText primary={props.text} />
      </ListItemButton>
    </ListItem>
  )
}
