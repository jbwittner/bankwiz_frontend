import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

interface IValidationDialogProps {
  open: boolean
  onValid: () => void
  onCancel: () => void
  textDialog: string
  titleDialog: string
}

export default function ValidationDialog({
  open,
  onValid,
  onCancel,
  textDialog,
  titleDialog
}: IValidationDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{titleDialog}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {textDialog}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} variant="contained" color="error">
          Cancel
        </Button>
        <Button onClick={onValid} variant="contained" autoFocus color="success">
          Validate
        </Button>
      </DialogActions>
    </Dialog>
  )
}
