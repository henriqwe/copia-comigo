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
    className={`px-3 py-2 my-2 text-white rounded-md bg-primary-3 bg-opacity-70 hover:bg-primary-3 hover:opacity-100 disabled:cursor-not-allowed disabled:bg-theme-15 transition btn btn-danger ${className}`}
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
