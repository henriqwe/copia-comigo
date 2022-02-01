import { ReactNode } from 'react'
import * as common from '@comigo/ui-common'

type PrimaryButtonProps = {
  disabled?: boolean
  className?: string
  title: string | ReactNode
  onClick?: () => void
  loading?: boolean
  type?: 'submit' | 'button' | 'reset' | undefined
}

export const PrimaryButton = ({
  className,
  disabled = false,
  title,
  onClick,
  loading,
  type = 'submit'
}: PrimaryButtonProps) => (
  <button
    disabled={disabled}
    className={`px-3 py-2 my-2 text-white rounded-md bg-opacity-70 hover:opacity-100 disabled:cursor-not-allowed disabled:bg-gray-400 transition flex items-center btn btn-primary ${className}`}
    type={type}
    onClick={onClick}
  >
    {loading && <common.AnimatedSpin className="w-5 h-5 mr-2" />} {title}
  </button>
)

export default PrimaryButton
