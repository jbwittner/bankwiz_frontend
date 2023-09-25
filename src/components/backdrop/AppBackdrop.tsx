import { Backdrop, CircularProgress } from '@mui/material'

interface IAppBackdropProps {
  open: boolean
}

export default function AppBackdrop(props: IAppBackdropProps) {
  return (
    <div>
      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={props.open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}
