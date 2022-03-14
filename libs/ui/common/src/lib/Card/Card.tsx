import { MutableRefObject, ReactNode } from 'react'

export const Card = ({
  children,
  className,
  compact = false,
  ref
}: {
  children: ReactNode
  // TODO remover opção para repassar classes do tailwind
  className?: string
  compact?: boolean
  ref?: MutableRefObject<HTMLElement | null>
}) => {
  return (
    <main
      className={`col-span-12 ${
        compact ? 'py-2 px-2' : 'py-6 px-6'
      } bg-white rounded-md dark:bg-darkmode-400 ${className}`}
      ref={ref}
    >
      {children}
    </main>
  )
}
