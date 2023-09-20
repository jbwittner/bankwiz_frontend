import { Button, ButtonProps } from '@mui/material'
import { Link, To } from 'react-router-dom'

interface ButtonLinkProps extends ButtonProps {
  to: To
}

const ButtonLink = ({ children, to, ...props }: ButtonLinkProps) => {
  return (
    <Button component={Link} to={to} {...props}>
      {children}
    </Button>
  )
}

export { ButtonLink }
