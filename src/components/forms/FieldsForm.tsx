import { Theme } from '@emotion/react'
import { SxProps, TextField, TextFieldVariants } from '@mui/material'
import { Controller, Control, FieldValues, Path } from 'react-hook-form'

interface ITextFieldFormProps<T extends FieldValues = FieldValues> {
  control: Control<T>
  name: Path<T>
  error?: boolean
  required?: boolean
  label: string
  type?: string
  fullWidth?: boolean
  sx?: SxProps<Theme>
  variant?: TextFieldVariants
}

const TextFieldForm = <T extends FieldValues>(props: ITextFieldFormProps<T>) => {
  return (
    <Controller
      control={props.control}
      name={props.name}
      rules={{ required: props.required }}
      render={({ field }) => (
        <TextField
          {...field}
          type={props.type}
          fullWidth={props.fullWidth}
          error={props.error}
          variant={props.variant}
          sx={props.sx}
          label={`${props.label}${props.required === true ? '\u00A0*' : ''}`}
        />
      )}
    />
  )
}

export { TextFieldForm }
