import { ReactNode } from 'react'

type ActivityCardProps = {
  title: string
  date?: string
  description?: ReactNode
}

export function ActivityCard({
  title,
  date,
  description
}: ActivityCardProps) {
  // TODO: Refatorar estilo dos before's para não sobrepor a imagem
  return (
    <div className="relative flex items-center mb-3 intro-x">
      <div className="before:block before:absolute before:w-10 before:h-px before:bg-slate-200 before:dark:bg-darkmode-400 before:mt-5 before:ml-10 before:self-end">
        <div className="flex-none w-10 h-10 overflow-hidden rounded-full image-fit">
          <img
            src="https://www.shareicon.net/data/512x512/2017/01/06/868320_people_512x512.png"
            alt="avatar"
          />
        </div>
      </div>
      <div className="flex-1 px-5 py-3 ml-4 bg-gray-300 dark:bg-darkmode-400 box zoom-in">
        <div className="flex items-center">
          <div className="font-medium">{title}</div>
          <div className="ml-auto text-xs text-gray-500 dark:text-zinc-400">{date}</div>
        </div>
        <div className="mt-1 text-gray-600 dark:text-zinc-400">{description}</div>
      </div>
    </div>
  )
}
