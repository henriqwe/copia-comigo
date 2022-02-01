import { UserIcon } from '@heroicons/react/solid'
import * as common from '@comigo/ui-common'

/* <a href="" className="flex items-center px-3 py-2 mt-2 rounded-md">
<i className="w-4 h-4 mr-2" data-feather="video"></i> Famílias
</a> */

type LinksProps = {
  active: boolean
  item: {
    url: string
    title: string
  }
}

export default function Links({ active = false, item }: LinksProps) {
  // const activeClass = !active ? 'text-theme-1' : 'bg-theme-1 text-white'
  return (
    <common.Link
      to={item.url}
      className={`flex items-center px-3 py-2 my-2 font-medium rounded-md ${
        !active
          ? 'text-gray-700 dark:text-zinc-500 dark:hover:text-black hover:text-black hover:bg-gray-200 '
          : 'bg-gray-200 text-gray-800'
      }`}
    >
      <UserIcon className="w-4 h-4 mr-2" /> {item.title}
    </common.Link>
  )
}
