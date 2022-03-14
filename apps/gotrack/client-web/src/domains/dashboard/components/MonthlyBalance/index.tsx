import {
  TruckIcon,
  UserAddIcon,
  UserCircleIcon,
  ChipIcon
} from '@heroicons/react/outline'
import { CardInfo } from './CardInfo'

const cardInfoData = [
  {
    icon: <TruckIcon className="w-5 h-5 text-gray-900 " />,
    title: 'Veículos',
    quantityTotal: 2707,
    monthlyBalance: '11'
  },
  {
    icon: <ChipIcon className="w-5 h-5 text-gray-900 " />,
    title: 'Equipamentos',
    quantityTotal: 2707,
    monthlyBalance: '1'
  },
  {
    icon: <UserAddIcon className="w-5 h-5 text-gray-900 " />,
    title: ' Clientes',
    quantityTotal: 1436,
    monthlyBalance: '3'
  },
  {
    icon: <UserCircleIcon className="w-5 h-5 text-gray-900 " />,
    title: 'Usuários',
    quantityTotal: 2138,
    monthlyBalance: '5'
  }
]

export function MonthlyBalance() {
  return (
    <div className="col-span-3">
      <span className="text-xl font-medium w-full flex text-gray-900">
        Balanço mensal
      </span>
      <div className=" mt-3 h-48 flex items-center">
        <div className="grid grid-cols-2 grid-rows-1  w-full gap-4">
          {cardInfoData.map((card, idx) => {
            return (
              <div key={idx} className="flex w-full items-center ">
                {CardInfo(card)}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
