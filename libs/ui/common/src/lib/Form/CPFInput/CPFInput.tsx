import InputMask from 'react-input-mask'
import { Control, Controller } from 'react-hook-form'
import * as common from '@comigo/ui-common'
import {
  DeepMap,
  FieldError,
  FieldValues,
  UseFormRegister
} from 'react-hook-form'
import { ReactNode } from 'react'

type CPFInputProps = {
  control: Control<FieldValues>
  register: UseFormRegister<FieldValues>
  error?: DeepMap<FieldValues, FieldError>
  className?: string
  disabled?: boolean
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
} & React.InputHTMLAttributes<HTMLInputElement>

export function CPFInput({
  control,
  error,
  disabled = false,
  ...rest
}: CPFInputProps) {
  return (
    <Controller
      name="Identificador"
      control={control}
      render={({ field: { onChange } }) => (
        <InputMask
          mask="999.999.999-99"
          placeholder="000.000.000-00"
          onChange={onChange}
          disabled={disabled}
        >
          <common.form.Input
            fieldName="Identificador"
            title="CPF"
            error={error}
            {...rest}
          />
        </InputMask>
      )}
    />
  )
}
