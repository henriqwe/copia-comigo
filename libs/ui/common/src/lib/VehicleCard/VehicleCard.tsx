import * as common from '@comigo/ui-common'
import { Dispatch, ReactNode, SetStateAction, useState } from 'react'

type coordsToCenterMap = {
  latitude?: number
  longitude?: number
  carro_id?: number
}
type vehicle = {
  crs: string
  data: string
  dist: string
  latitude: string
  ligado: number
  longitude: string
  speed: string
  carro_id?: number
  placa?: string
  chassis?: string
  renavan?: string
  ano_modelo?: string
  cor?: string
  veiculo?: string
  carro_fabricante?: string
  carro_categoria?: string
  carro_tipo?: string
  combustivel?: string
  ano?: string
  frota?: string
  imei?: string
  date_rastreador?: string
}
type VehicleCardProps = {
  description?: ReactNode
  vehicle: vehicle
  showBounceMarker: Dispatch<SetStateAction<coordsToCenterMap>>
  getStreetNameByLatLng: any
}

export function VehicleCard({
  description,
  vehicle,
  showBounceMarker,
  getStreetNameByLatLng
}: VehicleCardProps) {
  // TODO: Refatorar estilo dos before's para não sobrepor a imagem
  let borderColor = 'border-black'
  let title = 'Ligado'
  if (Number(vehicle.speed) > 80) {
    borderColor = 'border-red-500'
    title = 'Evento de velocidade'
  } else if (Number(vehicle.speed).toFixed() === '0' && vehicle.ligado === 0) {
    borderColor = 'border-gray-500'
    title = 'Desligado'
  } else if (Number(vehicle.speed).toFixed() === '0' && vehicle.ligado === 1) {
    borderColor = 'border-blue-500'
    title = 'Parado'
  }
  const [addressData, setAddressData] = useState('')

  async function getStreetName(vehicle: vehicle) {
    const response = await getStreetNameByLatLng(
      vehicle.latitude,
      vehicle.longitude
    )
    setAddressData(response.results[0].formatted_address)
  }
  return (
    <div className="relative flex items-center mb-3 intro-x">
      <div className="flex flex-col report-timeline__image align-center">
        <div
          className={` flex justify-center items-center w-10 h-10 overflow-hidden rounded-full image-fit border-4 bg-white text-dark-7 font-black ${borderColor}`}
        >
          {Math.floor(Number(vehicle.speed))}
        </div>
        <div className="flex justify-center w-full">
          <span>Km/h</span>
        </div>
      </div>
      <div
        className="flex-1 px-2 py-3 ml-4 bg-gray-300 rounded-sm box dark:bg-dark-2 zoom-in hover:cursor-pointer dark:hover:bg-dark-4 hover:bg-gray-400"
        onClick={() => {
          showBounceMarker({
            latitude: Number(vehicle.latitude),
            longitude: Number(vehicle.longitude)
          })
        }}
      >
        <div className="grid grid-cols-3">
          <div className="col-span-1">
            <common.TitleWithSubTitleAtTheTop
              title={title}
              classTitle="!text-sm mt-1"
              classSubtitle="text-xs"
              subtitle="Status"
            />
          </div>
          <div className="flex justify-end col-span-2">
            <common.TitleWithSubTitleAtTheTop
              title={`${new Date(vehicle.data).toLocaleDateString('pt-br')} 
                ${new Date(vehicle.data).toLocaleTimeString('pt-br')}`}
              classSubtitle="text-xs flex justify-end"
              classTitle="!text-sm mt-1"
              subtitle="Data e hora"
            />
          </div>
        </div>
        <div className="mt-1 text-gray-600">
          {addressData ? (
            <span className="text-sm">{addressData}</span>
          ) : (
            <button
              className="underline"
              onClick={() => {
                getStreetName(vehicle)
              }}
            >
              <span className="justify-end text-xs">
                Clique aqui para consultar o endereço
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
