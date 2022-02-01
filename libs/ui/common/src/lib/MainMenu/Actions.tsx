import router from 'next/router'
import * as common from '@comigo/ui-common'

export type AcoesProps = {
  active: boolean

  item: any
}

export default function Acoes({ active = false, item }: AcoesProps) {
  return (
    <button
      onClick={() => {
        if (item.url) {
          router.push(item.url)
          return
        }
        item.handler()
      }}
      className={`flex px-3 py-2 justify-start dark:text-white transition rounded-md bg-opacity-70 hover:opacity-100 w-full btn btn-success ${!active ? '' : ''
        }`}
    >
      <common.icons.AddIcon className="w-5 h-5 mr-2" />
      {item.title}
    </button>
  )
}
