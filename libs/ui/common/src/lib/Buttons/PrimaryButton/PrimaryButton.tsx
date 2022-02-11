import { ReactNode } from 'react'
import * as common from '@comigo/ui-common'

type PrimaryButtonProps = {
  disabled?: boolean
  // TODO remover opção para repassar classes do tailwind
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
    // TODO refatorar cor do botão
    className={`bg-primary border-primary text-white dark:border-primary transition duration-200 border shadow-sm inline-flex items-center justify-center py-2 px-3 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:transition-none hover:bg-opacity-90 hover:border-opacity-90 disabled:opacity-70 disabled:cursor-not-allowed ${className}`}
    type={type}
    onClick={onClick}
  >
    {loading && <common.AnimatedSpin className="w-5 h-5 mr-2" />} {title}
  </button>
)

export default PrimaryButton
