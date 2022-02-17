import {
  ChipIcon,
  LightningBoltIcon,
  LocationMarkerIcon,
  StatusOnlineIcon,
  UserIcon
} from '@heroicons/react/outline'
import { Dispatch, ReactNode, SetStateAction, useState } from 'react'
import { convertMToKm } from '../CardVehicle/functions'
import { setColorStatus } from './functions'

type coordsToCenterMap = {
  latitude?: number
  longitude?: number
  carro_id?: number
}
export type vehicleType = {
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
  vehicle: vehicleType
  showBounceMarker: Dispatch<SetStateAction<coordsToCenterMap>>
  getStreetNameByLatLng: any
  setPositionStreetView: (
    lat: number,
    lng: number,
    rotation: number,
    panorama: any
  ) => void
  panorama: google.maps.StreetViewPanorama
}

export function VehicleCard({
  description,
  vehicle,
  showBounceMarker,
  getStreetNameByLatLng,
  setPositionStreetView,
  panorama
}: VehicleCardProps) {
  const [addressData, setAddressData] = useState('')

  async function getStreetName(vehicle: vehicleType) {
    const response = await getStreetNameByLatLng(
      vehicle.latitude,
      vehicle.longitude
    )
    setAddressData(response.results[0].formatted_address)
  }
  const colorStatus = setColorStatus(vehicle)
  return (
    <div className="relative flex items-center intro-x  mb-4 rounded justify-between">
      <div className="flex flex-col report-timeline__image align-center mr-1">
        <div className={`flex justify-center items-center `}>
          <span className="text-super-tiny !leading-none font-medium">
            {new Date(vehicle.data).toLocaleTimeString('pt-br')}
          </span>
          <div
            className={`w-4 h-4 rounded-full border-2 ml-1 border-gray-200 ${colorStatus.color}`}
            title={colorStatus.title}
          ></div>
        </div>
      </div>
      <div
        className="bg-gray-100 py-2 px-1 hover:cursor-pointer rounded-md"
        onClick={() => {
          if (panorama.getVisible()) {
            setPositionStreetView(
              Number(vehicle.latitude),
              Number(vehicle.longitude),
              Number(vehicle.crs),
              panorama
            )
            return
          }
          showBounceMarker({
            latitude: Number(vehicle.latitude),
            longitude: Number(vehicle.longitude)
          })
        }}
      >
        <AdicionalInformations
          vehicle={vehicle}
          address={addressData}
          getStreetName={getStreetName}
        />
      </div>
    </div>
  )
}

function AdicionalInformations({
  vehicle,
  address,
  getStreetName
}: {
  vehicle: vehicleType
  address: string
  getStreetName: (vehicle: vehicleType) => Promise<void>
}) {
  const labels = [
    {
      title: 'Endereço',
      icon: <LocationMarkerIcon className="w-5 h-5 text-blue-400" />,
      subTitle: address ? (
        <span className="text-super-tiny">{address}</span>
      ) : (
        <button
          className="underline"
          onClick={() => {
            getStreetName(vehicle)
          }}
        >
          <span className="text-super-tiny">Clique aqui para consultar</span>
        </button>
      )
    },
    {
      title: 'Motorista',
      icon: <UserIcon className="w-5 h-5 text-blue-400" />,
      subTitle: 'Claudio Henrique Araújo Aleluia'
    },
    {
      title: 'Velocidade',
      icon: <LocationMarkerIcon className="w-5 h-5 text-blue-400" />,
      subTitle: Math.floor(Number(vehicle.speed)) + ' km/h'
    },
    {
      title: 'Horímetro',
      icon: <ChipIcon className="w-5 h-5 text-blue-400" />,
      subTitle: '12:32:52'
    },
    {
      title: 'Hodômetro',
      icon: <LightningBoltIcon className="w-5 h-5 text-blue-400" />,
      subTitle: convertMToKm(vehicle.dist) + ' Km'
    },
    {
      title: 'Bateria',
      icon: <LightningBoltIcon className="w-5 h-5 text-blue-400" />,
      subTitle: '3.8v'
    },
    {
      title: 'Voltagem',
      icon: <LightningBoltIcon className="w-5 h-5 text-blue-400" />,
      subTitle: '13.3v'
    },
    {
      title: 'Satélite',
      icon: <StatusOnlineIcon className="w-5 h-5 text-blue-400" />,
      subTitle: '20'
    }
  ]

  return (
    <div className="grid grid-cols-6 ">
      {labels.map((label, idx) => {
        return (
          <div
            key={idx}
            className={` my-1 flex flex-row  items-center ${
              label.title === 'Motorista' || label.title === 'Endereço'
                ? 'col-span-full'
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
  )
}
