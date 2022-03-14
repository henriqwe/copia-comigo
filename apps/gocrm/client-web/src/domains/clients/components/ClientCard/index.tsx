import * as common from '@comigo/ui-common'
import { ReactNode } from 'react'

type ClientCardProps = {
  situation: string
  color: 'green' | 'red' | 'yellow' | 'light red' | 'blue' | 'light blue'
  children: ReactNode
}

export function ClientCard({
  situation,
  color,
  children
}: ClientCardProps) {
  let beforeColor = ''
  let textBGColor = ''
  switch (color) {
    case 'green':
      beforeColor = 'before:bg-success'
      textBGColor = 'bg-success'
      break
    case 'red':
      beforeColor = 'before:bg-danger'
      textBGColor = 'bg-danger'
      break
    case 'light red':
      beforeColor = 'before:bg-red-300'
      textBGColor = 'bg-red-300'
      break
    case 'blue':
      beforeColor = 'before:bg-primary'
      textBGColor = 'bg-primary'
      break
    case 'light blue':
      beforeColor = 'before:bg-blue-300'
      textBGColor = 'bg-blue-300'
      break
    case 'yellow':
      beforeColor = 'before:bg-yellow-400'
      textBGColor = 'bg-yellow-400'
      break
  }
  return (
    <common.Card compact className="relative flex flex-col px-0 py-0 h-60">
      <div
        className={`flex justify-end w-full px-2 before:block before:absolute before:h-2 ${beforeColor} before:w-full absolute sm:px-0`}
      >
        <p className={`px-4 py-2 ${textBGColor}`}>{situation}</p>
      </div>
      <div className="flex items-center h-full p-2">
        {children}
      </div>
    </common.Card>
  )
}
