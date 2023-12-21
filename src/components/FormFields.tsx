import { Theme } from '@emotion/react'
import { FormControl, InputLabel, Select, SxProps, TextField, TextFieldVariants } from '@mui/material'
import { PropsWithChildren } from 'react'
import { Controller, Control, FieldValues, Path, ValidationRule } from 'react-hook-form'

interface ITextFieldFormProps<T extends FieldValues = FieldValues> {
  control: Control<T>
  name: Path<T>
  error?: boolean
  required?: ValidationRule<boolean>
  pattern?: ValidationRule<RegExp>
  label: string
  type?: string
  fullWidth?: boolean
  sx?: SxProps<Theme>
  variant?: TextFieldVariants
  autoFocus?: boolean
  helperText?: string
  margin: 'dense' | 'normal' | 'none' | undefined
}

const TextFieldForm = <T extends FieldValues>(props: ITextFieldFormProps<T>) => {
  return (
    <Controller
      control={props.control}
      name={props.name}
      rules={{ required: props.required, pattern: props.pattern }}
      render={({ field }) => (
        <TextField
          {...field}
          type={props.type}
          fullWidth={props.fullWidth}
          error={props.error}
          variant={props.variant}
          sx={props.sx}
          autoFocus={props.autoFocus}
          margin={props.margin}
          helperText={props.helperText}
          label={`${props.label}${props.required === true ? '\u00A0*' : ''}`}
        />
      )}
    />
  )
}

interface ISelectFieldFormProps<T extends FieldValues = FieldValues> {
  control: Control<T>
  name: Path<T>
  error?: boolean
  required?: ValidationRule<boolean>
  label: string
  type?: string
  fullWidth?: boolean
  sx?: SxProps<Theme>
  variant?: TextFieldVariants
  defaultValue?: unknown
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
          <Select
            {...field}
            type={props.type}
            error={props.error}
            variant={props.variant}
            defaultValue={props.defaultValue}
            label={`${props.label}${props.required === true ? '\u00A0*' : ''}`}
          >
            {children}
          </Select>
        )}
      />
    </FormControl>
  )
}

export { TextFieldForm, SelectFieldForm }
