import { ReactNode } from 'react'

type OpenModalLinkProps = {
  onClick: () => void
  children: ReactNode
}

export function OpenModalLink({ children, onClick }: OpenModalLinkProps) {
  return (
    <span
      className="pt-0 cursor-pointer text-tiny form-help text-sky-400 dark:text-indigo-300"
      onClick={onClick}
    >
      {children}
    </span>
  )
}
