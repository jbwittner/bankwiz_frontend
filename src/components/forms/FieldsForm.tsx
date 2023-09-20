import { TextField } from '@mui/material'
import { Controller, Control, FieldValues, Path } from 'react-hook-form'

interface ITextFieldFormProps<T extends FieldValues = FieldValues> {
  control: Control<T>
  name: Path<T>
  error?: boolean
  required?: boolean
  label: string
}

const TextFieldForm = <T extends FieldValues>(
  props: ITextFieldFormProps<T>
) => {
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
