import { ReactNode } from 'react'
import * as common from '@comigo/ui-common'

type CancelButtonProps = {
  disabled?: boolean
  className?: string
  title?: string
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  loading?: boolean
  onClick: () => void
}

export const CancelButton = ({
  className,
  disabled = false,
  title = 'Cancelar',
  iconPosition = 'right',
  onClick,
  loading = false,
  icon
}: CancelButtonProps) => (
  <button
    disabled={disabled}
    className={`px-3 py-2 my-2 text-white rounded-md bg-opacity-70 hover:opacity-100 disabled:cursor-not-allowed disabled:bg-gray-400 transition btn btn-danger disabled:btn-secondary ${className}`}
    type="button"
    onClick={onClick}
  >
    <span className="flex">
      {icon && iconPosition === 'left' ? icon : null}
      {loading && <common.AnimatedSpin className="w-5 h-5 mr-2" />} {title}{' '}
      {icon && iconPosition === 'right' ? icon : null}
    </span>
  </button>
)
