import {
  TextField
} from '@mui/material'
import { Controller, Control } from 'react-hook-form'

interface ITextFieldFormProps {
  control: Control<any, any>
  name: string
  error?: boolean
  required?: boolean
  label: string
}

const TextFieldForm = (props: ITextFieldFormProps) => {
  return (
    <Controller
      control={props.control}
      name={props.name}
      rules={{ required: props.required }}
      render={({ field }) => (
        <TextField
          {...field}
          fullWidth
          error={props.error}
          label={`${props.label}${props.required === true ? '\u00A0*' : ''}`}
        />
      )}
    />
  )
}

export { TextFieldForm }
