import { ReactNode } from 'react'
import * as common from '@comigo/ui-common'

type GenericTitleProps = {
  icon?: ReactNode
  title: string | ReactNode
  subtitle: string | ReactNode
  showIcon?: boolean
  className?: string
}

export const GenericTitle = ({
  title,
  subtitle,
  icon,
  showIcon = true,
  className
}: GenericTitleProps) => (
  <div className={`flex items-center ${className}`}>
    {showIcon ? (
      <div className="flex items-center justify-center w-5 h-5 rounded-full">
        <p className="text-2xl">{icon ? icon : <common.icons.CheckIcon />}</p>
      </div>
    ) : (
      ''
    )}
    <div className="w-full ml-4 mr-auto">
      <div className="text-sm font-medium">{title}</div>
      <div className="text-xs text-gray-600 dark:text-zinc-400">{subtitle}</div>
    </div>
  </div>
)

export default GenericTitle
