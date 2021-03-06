import { toggleStreetView } from '&track/domains/monitoring/api/streetView'
import {
  getVehicleAddress,
  vehicleType
} from '&track/domains/monitoring/api/vehicle'
import { BellIcon, ClockIcon } from '@heroicons/react/outline'
import { MapIcon } from '@heroicons/react/solid'
import { Icon } from '@iconify/react'
import { InfoWindow } from '@react-google-maps/api'
import { useState } from 'react'

type CreateInfoWindowPathProps = {
  showInfoWindowsInMapPathData: {
    vehicle: vehicleType
    panorama: google.maps.StreetViewPanorama
  }
  selectedVehicle: vehicleType
}
export function CreateInfoWindowPath({
  showInfoWindowsInMapPathData,
  selectedVehicle
}: CreateInfoWindowPathProps) {
  const [addres, setAddres] = useState('Carregando...')
  const { vehicle, panorama } = showInfoWindowsInMapPathData

  getVehicleAddress(vehicle.latitude, vehicle.longitude).then((response) => {
    setAddres(response)
  })

  return (
    <InfoWindow
      key={vehicle.carro_id}
      position={{
        lat: Number(vehicle.latitude),
        lng: Number(vehicle.longitude)
      }}
    >
      <div className="text-dark-7 w-80 m-0">
        <img
          alt="Imagem do Google Maps Street View"
          id={`infoWindowImgStreetView${vehicle.carro_id}`}
          onClick={() => {
            toggleStreetView(
              Number(vehicle.latitude),
              Number(vehicle.longitude),
              Number(vehicle.crs),
              panorama
            )
          }}
          className="cursor-pointer"
          src={`https://maps.googleapis.com/maps/api/streetview?size=320x100&location=${vehicle.latitude},${vehicle.longitude}&fov=80&heading=70&pitch=0&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
        ></img>
        <div className="grid grid-cols-3 mt-1">
          <div className="grid-span-1 flex bg-gray-100  justify-center font-semibold rounded-l-md py-2 border-2 !border-white ">
            {selectedVehicle.placa}
          </div>
          <div className="grid-span-1  flex bg-gray-100  justify-center items-center font-semibold border-2  py-2 !border-white">
            <div
              className={`mr-1 ${
                vehicle.ligado
                  ? Number(vehicle.speed).toFixed() === '0'
                    ? 'text-blue-600'
                    : 'text-green-600'
                  : 'text-gray-600'
              }`}
            >
              <Icon icon="akar-icons:circle-fill" className="w-3 h-3" />
            </div>
            <span>
              {vehicle.ligado
                ? Number(vehicle.speed).toFixed() === '0'
                  ? ' Parado'
                  : ' Ligado'
                : ' Desligado'}
            </span>
          </div>
          <div className="grid-span-1 flex bg-gray-100  justify-center font-semibold border-2 !border-white rounded-r-md py-2">
            {Math.floor(Number(vehicle.speed))} km/h
          </div>
        </div>
        <div className="my-2">
          <div
            className="flex  flex-row items-center mb-1"
            title="??ltima atualiza????o"
          >
            <div>
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-1">
                <Icon
                  icon="akar-icons:clock"
                  className="w-4 h-4 text-blue-400"
                />
              </div>
            </div>
            <div>
              <span className="text-gray-700 font-medium">
                {new Date(vehicle.data).toLocaleDateString('pt-br')}{' '}
                {new Date(vehicle.data).toLocaleTimeString('pt-br')}
              </span>
            </div>
          </div>
          <div className="flex  flex-row items-center mb-1" title="Endere??o">
            <div>
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-1">
                <Icon
                  icon="clarity:map-marker-line"
                  className="w-4 h-4 text-blue-400"
                />
              </div>
            </div>
            <div>
              <span className="text-gray-700 font-medium">{addres}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center mb-1" title="Eventos">
          <div>
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-1">
              <Icon icon="akar-icons:bell" className="w-4 h-4 text-blue-400" />
            </div>
          </div>
          <div>
            <span className="text-gray-700 font-medium">
              {Number(vehicle.speed) > 80
                ? `Velocidade: ${Math.floor(Number(vehicle.speed))} Km/H`
                : 'N??o h?? evento registrado. '}
            </span>
          </div>
        </div>
        <div />
      </div>
    </InfoWindow>
  )
}
