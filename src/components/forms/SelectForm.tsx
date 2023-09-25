import { Theme } from '@emotion/react'
import { FormControl, InputLabel, Select, SxProps, TextFieldVariants } from '@mui/material'
import { PropsWithChildren } from 'react'
import { Controller, Control, FieldValues, Path } from 'react-hook-form'

interface ISelectFieldFormProps<T extends FieldValues = FieldValues> {
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

const SelectFieldForm = <T extends FieldValues>({ children, ...props }: PropsWithChildren<ISelectFieldFormProps<T>>) => {
  return (
    <FormControl fullWidth={props.fullWidth} sx={props.sx}>
      <InputLabel error={props.error}>{`${props.label}${props.required === true ? '\u00A0*' : ''}`}</InputLabel>
      <Controller
        control={props.control}
        name={props.name}
        rules={{ required: props.required }}
        render={({ field }) => (
          <Select {...field} type={props.type} error={props.error} variant={props.variant} label={`${props.label}${props.required === true ? '\u00A0*' : ''}`}>
            {children}
          </Select>
        )}
      />
    </FormControl>
  )
}

export { SelectFieldForm }
