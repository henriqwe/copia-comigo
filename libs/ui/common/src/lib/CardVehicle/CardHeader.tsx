import { vehicleType } from './CardVehicle'
import { Icon } from '@iconify/react'

import { setStatusConnectionTitleAndColor, setStatusEngine } from './functions'

export function CardHearder({ vehicle }: { vehicle: vehicleType }) {
  const statusConnection = setStatusConnectionTitleAndColor(vehicle)
  const statusEngine = setStatusEngine(vehicle)

  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className=" flex items-center justify-center mr-1 relative">
          <span
            className={`w-3 h-3 ${statusEngine.color} rounded-full absolute -ml-11`}
            title={statusEngine.title}
          />
          <Icon icon="clarity:car-line" className="w-7 h-7 " />
        </div>
        <div className="flex justify-between w-full">
          <div className=" flex flex-col ">
            <span
              className="!leading-none text-sm font-medium text-gray-900"
              title="Placa"
            >
              {vehicle.placa}
            </span>
            <span
              className="!leading-none text-xs text-gray-600"
              title="Modelo, fabicante, ano"
            >
              {vehicle.veiculo} {vehicle.carro_fabricante} {vehicle.ano_modelo}
            </span>
            <span className="!leading-none text-xs text-gray-600" title="Imei">
              {vehicle.imei}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <div
          className="flex items-center justify-center bg-white rounded-full w-7 h-7"
          title={statusConnection.title}
        >
          <Icon
            icon="heroicons-solid:status-online"
            className={`w-5 h-5 ${statusConnection.color}`}
          />
        </div>
      </div>
    </div>
  )
}
