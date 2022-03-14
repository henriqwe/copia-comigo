import { useEffect, useState } from 'react'

type FiltrosProps = {
  subItem: {
    url?: string
    handler?: (reset?: boolean) => any
    title: string
  }
  disabledAll: boolean
}

export default function Filter({ subItem, disabledAll }: FiltrosProps) {
  const [active, setActive] = useState(false)

  useEffect(() => {
    setActive(false)
  }, [disabledAll])

  return (
    <div
      className="flex items-center px-3 py-2 rounded-md cursor-pointer"
      onClick={() => {
        if (active) {
          subItem.handler && subItem.handler(true)
          setActive(false)
          return
        }
        subItem.handler && subItem.handler()
        setActive(true)
      }}
    >
      <div
        className={`w-2 h-2 mr-3 rounded-full ${
          active ? 'bg-green-500' : 'bg-orange-400'
        }`}
      />
      {subItem.title}
    </div>
  )
}
