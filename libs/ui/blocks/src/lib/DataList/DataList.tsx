import * as common from '@comigo/ui-common'
import { ReactNode } from 'react'

type DataListProps = {
  data: {
    title: string | ReactNode
    value: string | ReactNode
  }[]
}

export function DataList({ data }: DataListProps) {
  return (
    <div className="overflow-hidden bg-white shadow dark:bg-darkmode-400">
      <div className="border-t">
        <dl>
          {data.map((item, index) => (
            <common.DataListLine
              key={item.title?.toString()}
              title={item.title}
              value={item.value}
              position={index}
            />
          ))}
        </dl>
      </div>
    </div>
  )
}
