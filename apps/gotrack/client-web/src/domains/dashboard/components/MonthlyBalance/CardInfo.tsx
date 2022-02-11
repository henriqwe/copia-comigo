import { ChevronUpIcon } from '@heroicons/react/outline'
export function CardInfo({
  icon,
  title,
  quantityTotal,
  monthlyBalance
}: {
  icon: JSX.Element
  title: string
  quantityTotal: string | number
  monthlyBalance: string
}) {
  return (
    <div className="p-2  rounded-lg h-34 w-full bg-white ">
      <div className="flex justify-between">
        <div className="bg-gray-200 rounded-full w-7 h-7 flex justify-center items-center">
          {icon}
        </div>
        <div className="text-white flex justify-evenly px-2 items-center bg-green-500 rounded-full w-12">
          <span className="text-sm font-medium ">{monthlyBalance}</span>
          <ChevronUpIcon className="w-3 h-3 " />
        </div>
      </div>
      <div className="flex flex-col ">
        <span className="text-xl font-medium flex justify-center text-gray-900">
          {quantityTotal}
        </span>
        <span className="text-xs text-gray-500 flex justify-center ">
          {title}
        </span>
      </div>
    </div>
  )
}
