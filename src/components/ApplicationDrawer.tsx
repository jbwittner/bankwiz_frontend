import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import { useNavigate } from 'react-router-dom'

interface TemporaryDrawerProps {
  open: boolean
  onClose: () => void
}

interface DrawerButtonProps {
  icon: React.ReactElement
  text: string
  onClick: () => void
}

function DrawerButton(props: DrawerButtonProps) {
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={props.onClick}>
        <ListItemIcon>{props.icon}</ListItemIcon>
        <ListItemText primary={props.text} />
      </ListItemButton>
    </ListItem>
  )
}

export default function TemporaryDrawer(props: TemporaryDrawerProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const navigate = useNavigate()

  React.useEffect(() => {
    setIsOpen(props.open)
  }, [props])

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }

      setIsOpen(open)
    }

  const onClose = () => {
    toggleDrawer(false)
    props.onClose()
  }

  const goToPage = (url: string) => {
    onClose()
    navigate(url)
  }

  const drawerContent = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <DrawerButton
          icon={<InboxIcon />}
          text={'Home'}
          onClick={() => goToPage('/home')}
        />
        <DrawerButton
          icon={<InboxIcon />}
          text={'Group'}
          onClick={() => goToPage('/group')}
        />
        <DrawerButton icon={<InboxIcon />} text={'dqsd'} onClick={onClose} />
        <DrawerButton icon={<InboxIcon />} text={'dqsd'} onClick={onClose} />
      </List>
      <Divider />
      <List>
        <DrawerButton icon={<InboxIcon />} text={'dqsd'} onClick={onClose} />
        <DrawerButton icon={<InboxIcon />} text={'dqsd'} onClick={onClose} />
        <DrawerButton icon={<InboxIcon />} text={'dqsd'} onClick={onClose} />
      </List>
    </Box>
  )

  return (
    <Drawer anchor={'left'} open={isOpen} onClose={onClose}>
      {drawerContent()}
    </Drawer>
  )
}
