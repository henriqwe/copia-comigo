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

type ZipCodeInputProps = {
  control: Control<FieldValues>
  register: UseFormRegister<FieldValues>
  error?: DeepMap<FieldValues, FieldError>
  className?: string
  disabled?: boolean
  onCompleteZipCode?: (valor: string) => void
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
} & React.InputHTMLAttributes<HTMLInputElement>

export function ZipCodeInput({
  control,
  error,
  disabled = false,
  onCompleteZipCode = () => null,
  ...rest
}: ZipCodeInputProps) {
  return (
    <Controller
      name="Cep"
      control={control}
      render={({ field: { onChange } }) => (
        <InputMask
          mask="99999-999"
          placeholder="00000-000"
          onChange={(valor) => {
            onChange(valor)
            if (
              valor.target.value.substring(8, 9) !== '_' &&
              valor.target.value
            ) {
              onCompleteZipCode(valor.target.value)
              return
            }
            onCompleteZipCode('')
          }}
          disabled={disabled}
        >
          <common.form.Input fieldName="Cep" title="Cep" error={error} {...rest} />
        </InputMask>
      )}
    />
  )
}
