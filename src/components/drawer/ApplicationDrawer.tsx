import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { useNavigate } from 'react-router-dom'
import { SxProps, Theme, useTheme } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import GroupIcon from '@mui/icons-material/Group'

interface ITemporaryDrawerProps {
  open: boolean
  onClose: () => void
}

interface IDrawerButtonProps {
  icon: React.ReactElement
  text: string
  onClick: () => void
}

function DrawerButton(props: IDrawerButtonProps) {
  const theme = useTheme()

  const listItemButton: SxProps<Theme> = {
    '&:hover': { color: theme.palette.primary.main }
  }

  return (
    <ListItem disablePadding>
      <ListItemButton sx={listItemButton} onClick={props.onClick}>
        <ListItemIcon sx={{ color: 'inherit' }}>{props.icon}</ListItemIcon>
        <ListItemText primary={props.text} />
      </ListItemButton>
    </ListItem>
  )
}

export default function TemporaryDrawer({
  open,
  onClose
}: ITemporaryDrawerProps) {
  const navigate = useNavigate()

  const goToPage = (url: string) => {
    onClose()
    navigate(url)
  }

  const drawerContent = () => (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        <DrawerButton
          icon={<HomeIcon />}
          text={'Home'}
          onClick={() => goToPage('/home')}
        />
        <DrawerButton
          icon={<GroupIcon />}
          text={'Group'}
          onClick={() => goToPage('/group')}
        />
      </List>
      <Divider />
      <List></List>
    </Box>
  )

  return (
    <Drawer anchor={'left'} open={open} onClose={onClose}>
      {drawerContent()}
    </Drawer>
  )
}
