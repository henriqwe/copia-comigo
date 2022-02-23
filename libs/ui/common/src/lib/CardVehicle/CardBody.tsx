import { Icon } from '@iconify/react'
import * as common from '@comigo/ui-common'
import { vehicleType } from './CardVehicle'
import { Dispatch, SetStateAction } from 'react'
import { convertMToKm } from './functions'

export function CardBody({
  vehicle,
  address,
  setPageCard,
  handlerClickOnVehicleMarker
}: {
  vehicle: vehicleType
  address: {
    name: string
    info: string
    complete: string
  }
  setPageCard: Dispatch<SetStateAction<string>>
  handlerClickOnVehicleMarker: Dispatch<SetStateAction<vehicleType | undefined>>
}) {
  return (
    <div>
      <common.Separator className="mb-4" />
      <AdicionalInformations vehicle={vehicle} address={address} />
      <Actions
        setPageCard={setPageCard}
        handlerClickOnVehicleMarker={handlerClickOnVehicleMarker}
        vehicle={vehicle}
      />
    </div>
  )
}

function AdicionalInformations({
  vehicle,
  address
}: {
  vehicle: vehicleType
  address: {
    name: string
    info: string
    complete: string
  }
}) {
  const labels = [
    {
      title: 'Endereço',
      icon: (
        <Icon
          icon="clarity:map-marker-line"
          className="w-5 h-5 text-blue-400"
        />
      ),
      subTitle: <span>{address.complete}</span>
    },
    {
      title: 'Motorista',
      icon: (
        <Icon icon="fa:drivers-license-o" className="w-5 h-5 text-blue-400" />
      ),
      subTitle: 'Claudio Henrique Araújo Aleluia'
    },
    {
      title: 'Data GPS',
      icon: <Icon icon="akar-icons:clock" className="w-5 h-5 text-blue-400" />,
      subTitle: (
        <div>
          <span>
            {new Date(vehicle.date_rastreador).toLocaleDateString('pt-br')}
          </span>{' '}
          <span>
            {new Date(vehicle.date_rastreador).toLocaleTimeString('pt-br')}
          </span>
        </div>
      )
    },
    {
      title: 'Data Servidor',
      icon: <Icon icon="akar-icons:clock" className="w-5 h-5 text-blue-400" />,
      subTitle: (
        <div>
          <span>
            {new Date(vehicle.date_rastreador).toLocaleDateString('pt-br')}
          </span>{' '}
          <span>
            {new Date(vehicle.date_rastreador).toLocaleTimeString('pt-br')}
          </span>
        </div>
      )
    },
    {
      title: 'Velocidade',
      icon: (
        <Icon
          icon="fluent:top-speed-20-filled"
          className="w-5 h-5 text-blue-400"
        />
      ),
      subTitle: Math.floor(Number(vehicle.speed)) + ' km/h'
    },
    {
      title: 'Horímetro',
      icon: <Icon icon="bi:clock-history" className="w-5 h-5 text-blue-400" />,
      subTitle: '12:32:52'
    },
    {
      title: 'Hodômetro',
      icon: <Icon icon="ep:odometer" className="w-5 h-5 text-blue-400" />,
      subTitle: convertMToKm(vehicle.dist) + ' Km'
    },
    {
      title: 'Bateria',
      icon: (
        <Icon
          icon="iconoir:web-window-energy-consumption"
          className="w-5 h-5 text-blue-400"
        />
      ),
      subTitle: '3.8v'
    },
    {
      title: 'Voltagem',
      icon: (
        <Icon
          icon="simple-line-icons:energy"
          className="w-5 h-5 text-blue-400"
        />
      ),
      subTitle: '13.3v'
    },
    {
      title: 'Satélite',
      icon: (
        <Icon
          icon="ic:outline-satellite-alt"
          className="w-5 h-5 text-blue-400"
        />
      ),
      subTitle: '20'
    }
  ]

  return (
    <>
      <div className="text-xs h-4 bg-gray-300 px-2 text-gray-700 rounded-md py-3 flex  items-center  mb-3 font-medium">
        Informações adicionais
      </div>
      <div className="grid grid-cols-6 ">
        {labels.map((label, idx) => {
          return (
            <div
              key={idx}
              className={` mb-2 flex flex-row  items-center ${
                label.title === 'Motorista' || label.title === 'Endereço'
                  ? 'col-span-full'
                  : label.title === 'Data GPS' ||
                    label.title === 'Data Servidor'
                  ? 'col-span-3'
                  : 'col-span-2'
              }`}
            >
              <div>
                <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center mr-1">
                  {label.icon}
                </div>
              </div>
              <div>
                <div className="flex flex-col">
                  <span className="text-super-tiny text-gray-500">
                    {label.title}
                  </span>
                  <span className="text-super-tiny font-medium">
                    {label.subTitle}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

function Actions({
  setPageCard,
  handlerClickOnVehicleMarker,
  vehicle
}: {
  setPageCard: Dispatch<SetStateAction<string>>
  handlerClickOnVehicleMarker: Dispatch<SetStateAction<vehicleType | undefined>>
  vehicle: vehicleType
}) {
  return (
    <>
      <button
        className=" text-xs h-4 bg-gray-300 px-2 text-gray-700 rounded-md py-3 flex  items-center  my-2 font-medium w-full justify-between items-center flex bg-gray-700 rounded-md px-2 py-1 hover:bg-gray-400 hover:text-gray-800"
        onClick={() => {
          setPageCard('pagVehiclesDetails')
          handlerClickOnVehicleMarker(vehicle)
        }}
        title="ver trajeto"
      >
        <span>Ver trajeto</span>
        <Icon
          icon="akar-icons:chevron-right"
          className="w-4 h-4 text-black hover:text-gray-900"
        />
      </button>
      <button
        className=" text-xs h-4 bg-gray-300 px-2 text-gray-700 rounded-md py-3 flex  items-center  my-2 font-medium w-full justify-between items-center flex bg-gray-700 rounded-md px-2 py-1 hover:bg-gray-400 hover:text-gray-800"
        onClick={() => {
          // setPageCard('pagVehiclesDetails')
          // handlerClickOnVehicleMarker(vehicle)
        }}
        title="ver trajeto"
      >
        <span>Comandos</span>
        <Icon
          icon="akar-icons:chevron-right"
          className="w-4 h-4 text-black hover:text-gray-900"
        />
      </button>
    </>
  )
}
