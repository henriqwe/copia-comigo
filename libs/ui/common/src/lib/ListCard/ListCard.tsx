import { ReactNode } from 'react'

type ListCardProps = {
  title: string | number
  icon?: ReactNode
  description?: ReactNode
}

export function ListCard({ title, icon, description }: ListCardProps) {
  // TODO: Refatorar estilo dos before's para não sobrepor a imagem
  return (
    <div className="relative flex items-center mb-3 intro-x">
      <div className="report-timeline__image">
        <div
          className={`flex flex-none justify-center items-center  w-10 h-10 overflow-hidden rounded-full image-fit bg-gray-300 dark:bg-dark-2`}
        >
          {icon}
        </div>
      </div>
      <div className="flex-1 px-3 py-2 ml-4 box bg-gray-300 dark:bg-dark-2 zoom-in rounded-sm">
        <div className="text-xs text-gray-600">{title}</div>
        <div className="text-sm">{description}</div>
      </div>
    </div>
  )
}
