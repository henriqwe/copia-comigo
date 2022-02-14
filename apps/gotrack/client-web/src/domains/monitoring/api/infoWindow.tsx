import { vehicleType } from './vehicle'
export function createContentInfoWindow(vehicle: vehicleType) {
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
        <p>
          <b>
            Última atualização:{' '}
            {new Date(vehicle.date_rastreador).toLocaleDateString('pt-br')}{' '}
            {new Date(vehicle.date_rastreador).toLocaleTimeString('pt-br')}
          </b>{' '}
        </p>
        <p>
          <b>{vehicle.veiculo}</b>{' '}
        </p>
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

export function createContentInfoWindowPath(
  vehicle: vehicleType,
  pathCoords: vehicleType[],
  addres: string
) {
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
        <p>
          <b>
            Última atualização:{' '}
            {new Date(
              pathCoords[pathCoords.length - 1].data
            ).toLocaleDateString('pt-br')}{' '}
            {new Date(
              pathCoords[pathCoords.length - 1].data
            ).toLocaleTimeString('pt-br')}
          </b>{' '}
        </p>
        <p>
          <b>{vehicle.veiculo}</b>{' '}
        </p>
        <p>
          <b>{addres}</b>{' '}
        </p>
      </div>
    </div>
  )
}
