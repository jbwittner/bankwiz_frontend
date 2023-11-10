import { Button } from '@mui/material'
import { red } from '@mui/material/colors'
import { PropsWithChildren } from 'react'

interface IButtonProps {
  onClick: () => void
}

const BaseButton = (props: PropsWithChildren<IButtonProps>) => {
  return <Button onClick={props.onClick}>{props.children}</Button>
}

interface ILogoutButtonProps extends IButtonProps {}

const LogoutButton = (props: PropsWithChildren<ILogoutButtonProps>) => {
  return (
    <Button sx={{ color: red[200], bgcolor: red[900] }} onClick={props.onClick}>
      {props.children}
    </Button>
  )
}

export { BaseButton, LogoutButton }
