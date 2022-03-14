import * as common from '@comigo/ui-common'
import Filter from './Filter'

type FiltrosProps = {
  item: {
    title: string
    children?: {
      url?: string
      handler?: (reset?: boolean) => any
      title: string
    }[]
  }
  disabledAll: boolean
  noSeparator?: boolean
}

export default function Filters({
  item,
  disabledAll,
  noSeparator = false
}: FiltrosProps) {
  return (
    <div>
      {!noSeparator && <common.Separator className="!border-gray-200" />}
      <p className="text-gray-600">{item.title}</p>
      {item.children?.map((subItem) => (
        <Filter
          subItem={subItem}
          disabledAll={disabledAll}
          key={subItem.title}
        />
      ))}
    </div>
  )
}
