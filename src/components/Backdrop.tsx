import { Backdrop, CircularProgress } from '@mui/material'

interface CustomBackdropProps {
  open: boolean
}

export default function CustomBackdrop(props: CustomBackdropProps) {
  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
        open={props.open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}
