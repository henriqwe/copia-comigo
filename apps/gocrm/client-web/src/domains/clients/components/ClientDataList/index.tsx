import { ReactNode } from 'react'

type ClientDataListProps = {
  itens: {
    title: string
    icon: ReactNode
    value: string
  }[]
}

export function ClientDataList({ itens }: ClientDataListProps) {
  return (
    <div>
      {itens.map((item, index) => (
        <div key={index}>
          {item.icon}
          <div>
            <p className="text-xs text-gray-600">{item.title}</p>
            <p>{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
