import * as common from '@comigo/ui-common'

type DeleteButtonProps = {
  onClick: () => void
  size?: 'big' | 'small' | 'medium'
  loading?: boolean
  disabled?: boolean
  className?: string
}

export function DeleteButton({
  onClick,
  size = 'medium',
  loading = false,
  disabled = false,
  className
}: DeleteButtonProps) {
  let height = ''
  let width = ''
  switch (size) {
    case 'big':
      height = 'h-12'
      width = 'w-12'
      break
    case 'medium':
      height = 'h-10'
      width = 'w-10'
      break
    case 'small':
      height = 'h-8'
      width = 'w-8'
      break
  }
  return (
    <div>
      <button
        onClick={onClick}
        className={`mb-1 rounded-md px-1 bg-primary-3 transition text-white flex items-center justify-center disabled:cursor-not-allowed disabled:bg-gray-400 btn btn-danger ${height} ${width} ${className}`}
        type="button"
        disabled={disabled}
      >
        {loading ? (
          <common.AnimatedSpin />
        ) : (
          <common.icons.DeleteIcon className={`dark:text-white ${height} ${width}`} />
        )}
      </button>
    </div>
  )
}
