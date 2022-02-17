import { getVehicleAddress, vehicleType } from './vehicle'
import { BellIcon, ClockIcon, MapIcon } from '@heroicons/react/outline'

export async function createContentInfoWindow(vehicle: vehicleType) {
  const addres = await getVehicleAddress(vehicle.latitude, vehicle.longitude)
  return (
    <div className="text-dark-7 w-80 m-0">
      <img
        alt="Imagem do Google Maps Street View"
        id={`infoWindowImgStreetView${vehicle.carro_id}`}
        className="cursor-pointer"
        src={`https://maps.googleapis.com/maps/api/streetview?size=320x100&location=${vehicle.latitude},${vehicle.longitude}&fov=80&heading=70&pitch=0&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
      ></img>
      <div className="grid grid-cols-3 mt-1">
        <div className="grid-span-1 flex bg-gray-100  justify-center font-semibold rounded-l-md py-2 border-2 !border-white ">
          {vehicle.placa}
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              className="w-3 h-3"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              ></path>
            </svg>
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
          title="Última atualização"
        >
          <div>
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-1">
              <ClockIcon className="w-4 h-4 text-blue-400" />
            </div>
          </div>
          <div>
            <span className="text-gray-700 font-medium">
              {new Date(vehicle.date_rastreador).toLocaleDateString('pt-br')}{' '}
              {new Date(vehicle.date_rastreador).toLocaleTimeString('pt-br')}
            </span>
          </div>
        </div>
        <div className="flex  flex-row items-center mb-1" title="Endereço">
          <div>
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-1">
              <MapIcon className="w-4 h-4 text-blue-400" />
            </div>
          </div>
          <div>
            <span className="text-gray-700 font-medium">{addres}</span>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          id={`buttonVerTrajeto${vehicle.carro_id}`}
          className="justify-center items-center flex bg-gray-700 rounded-sm text-gray-100 px-2 py-1 hover:bg-gray-600"
        >
          {' '}
          ver trajeto{' '}
        </button>
      </div>
      <div />
    </div>
  )
}

export async function createContentInfoWindowPath(
  vehicle: vehicleType,
  pathCoords: vehicleType[]
) {
  const addres = await getVehicleAddress(vehicle.latitude, vehicle.longitude)
  return (
    <div className="text-dark-7 w-80 m-0">
      <img
        src={`https://maps.googleapis.com/maps/api/streetview?size=320x100&location=${vehicle.latitude},${vehicle.longitude}&fov=80&heading=70&pitch=0&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
      ></img>
      <div className="grid grid-cols-3 mt-1">
        <div className="grid-span-1 flex bg-gray-100  justify-center font-semibold rounded-l-md py-2 border-2 !border-white ">
          {' '}
          {vehicle.placa}
        </div>
        <div className="grid-span-1  flex bg-gray-100  justify-center items-center font-semibold border-2  py-2 !border-white">
          <div
            className={`mr-1 ${
              pathCoords[pathCoords.length - 1].ligado
                ? Number(pathCoords[pathCoords.length - 1].speed).toFixed() ===
                  '0'
                  ? 'text-blue-600'
                  : 'text-green-600'
                : 'text-gray-600'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              className="w-3 h-3"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <span>
            {pathCoords[pathCoords.length - 1].ligado
              ? Number(pathCoords[pathCoords.length - 1].speed).toFixed() ===
                '0'
                ? ' Parado'
                : ' Ligado'
              : ' Desligado'}
          </span>
        </div>
        <div className="grid-span-1 flex bg-gray-100  justify-center font-semibold border-2 !border-white rounded-r-md py-2">
          {Math.floor(Number(pathCoords[pathCoords.length - 1].speed))} km/h
        </div>
      </div>
      <div className="my-2">
        <div
          className="flex flex-row items-center mb-1"
          title="Última atualização"
        >
          <div>
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-1">
              <ClockIcon className="w-4 h-4 text-blue-400" />
            </div>
          </div>
          <div>
            <span className="text-gray-700 font-medium">
              {new Date(
                pathCoords[pathCoords.length - 1].data
              ).toLocaleDateString('pt-br')}{' '}
              {new Date(
                pathCoords[pathCoords.length - 1].data
              ).toLocaleTimeString('pt-br')}
            </span>
          </div>
        </div>
        <div className="flex flex-row items-center mb-1" title="Endereço">
          <div>
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-1">
              <MapIcon className="w-4 h-4 text-blue-400" />
            </div>
          </div>
          <div>
            <span className="text-gray-700 font-medium">{addres}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function createContentInfoWindowPathMarker(
  selectedVehicle: vehicleType,
  vehicle: vehicleType,
  addres: string,
  events: string
) {
  return (
    <div className="text-dark-7 w-80 m-0">
      <img
        alt="Imagem do Google Maps Street View"
        id={`infoWindowImgStreetView${selectedVehicle.carro_id}${vehicle.latitude}${vehicle.longitude}`}
        className="cursor-pointer"
        src={`https://maps.googleapis.com/maps/api/streetview?size=320x100&location=${vehicle.latitude},${vehicle.longitude}&fov=80&heading=70&pitch=0&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
      ></img>
      <div className="grid grid-cols-3 mt-1">
        <div className="grid-span-1 flex bg-gray-100  justify-center font-semibold rounded-l-md py-2 border-2 !border-white ">
          {' '}
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              className="w-3 h-3"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              ></path>
            </svg>
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
          className="flex flex-row items-center mb-1"
          title="Última atualização"
        >
          <div>
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-1">
              <ClockIcon className="w-4 h-4 text-blue-400" />
            </div>
          </div>
          <div>
            <span className="text-gray-700 font-medium">
              {new Date(selectedVehicle.date_rastreador).toLocaleDateString(
                'pt-br'
              )}{' '}
              {new Date(selectedVehicle.date_rastreador).toLocaleTimeString(
                'pt-br'
              )}
            </span>
          </div>
        </div>
        <div className="flex flex-row items-center mb-1" title="Endereço">
          <div>
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-1">
              <MapIcon className="w-4 h-4 text-blue-400" />
            </div>
          </div>
          <div>
            <span className="text-gray-700 font-medium">{addres}</span>
          </div>
        </div>
        <div className="flex flex-row items-center mb-1" title="Eventos">
          <div>
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-1">
              <BellIcon className="w-4 h-4 text-blue-400" />
            </div>
          </div>
          <div>
            <span className="text-gray-700 font-medium">{events}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
