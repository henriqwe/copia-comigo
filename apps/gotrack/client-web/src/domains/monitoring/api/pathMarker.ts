import { handleClickScrollToCardPath } from './handlerClickScrollToCard'
import { getVehicleAddress, vehicleType } from './vehicle'

export function createMarkerWhitInfo(
  map: google.maps.Map,
  google: google,
  vehicle: vehicleType,
  previousPosition: vehicleType,
  stop: boolean,
  downTime: number,
  selectedVehicle: vehicleType,
  infoWindowToRemovePath: google.maps.InfoWindow[],
  index: number,
  bounds,
  markers,
  refsPathVehicle
) {
  let events = ''

  if (downTime !== 0) {
    events += `
    ${downTime} <span>tempo parado</span>`
  } else if (Number(vehicle.speed) > 80) {
    events += `
    <span>Velocidade:</span> ${Math.floor(
      Number(vehicle.speed)
    )} <span>Km/H</span>
    `
  }
  if (events === '') events = '<span>Não há evento registrado.</span> '
  // if (true /*Number(vehicle.speed) > 80 || stop*/) {

  const markerlocal = new google.maps.Marker({
    position: {
      lat: Number(vehicle.latitude),
      lng: Number(vehicle.longitude)
    },
    map,
    zIndex: 1,
    icon: {
      // path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
      path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
      scale: 2.8,
      strokeWeight: 1,
      fillColor:
        previousPosition === undefined
          ? '#000'
          : stop && Number(vehicle.speed) < 1
          ? '#00ffdd'
          : stop
          ? '#2600ff'
          : Number(vehicle.speed) > 80
          ? '#ff8800'
          : '#000',
      fillOpacity: 1,
      rotation: Number(vehicle.crs) - 180
    }
  })
  bounds.extend(markerlocal.position)
  markerlocal.addListener('click', async () => {
    if (infoWindowToRemovePath) {
      infoWindowToRemovePath.forEach((info) => info.close())
      infoWindowToRemovePath.length = 0
    }
    const addres = await getVehicleAddress(vehicle.latitude, vehicle.longitude)
    handleClickScrollToCardPath(String(index), refsPathVehicle)
    const infowindow = new google.maps.InfoWindow({
      content: `<div class='text-dark-7 w-80 m-0'>
      <img
        src="https://maps.googleapis.com/maps/api/streetview?size=320x100&location=${
          vehicle.latitude
        },${
        vehicle.longitude
      }&fov=80&heading=70&pitch=0&key=AIzaSyA13XBWKpv6lktbNrPjhGD_2W7euKEZY1I">
      </img>
      <div class='grid grid-cols-3 mt-1'>
      <div class='grid-span-1 flex bg-gray-100  justify-center font-semibold rounded-l-md py-2 border-2 !border-white '> ${
        selectedVehicle.placa
      }</div>
      <div class='grid-span-1  flex bg-gray-100  justify-center items-center font-semibold border-2  py-2 !border-white' >
      <div class='mr-1 ${
        vehicle.ligado
          ? Number(vehicle.speed).toFixed() === '0'
            ? 'text-blue-600'
            : 'text-green-600'
          : 'text-gray-600'
      }'>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="w-3 h-3"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path></svg>
      </div><span>${
        vehicle.ligado
          ? Number(vehicle.speed).toFixed() === '0'
            ? ' Parado'
            : ' Ligado'
          : ' Desligado'
      }</span>
      </div>
      <div class='grid-span-1 flex bg-gray-100  justify-center font-semibold border-2 !border-white rounded-r-md py-2'>${Math.floor(
        Number(vehicle.speed)
      )} km/h</div>
      </div>

      <div class="my-2">
      <p><b>Última atualização: ${new Date(vehicle.data).toLocaleDateString(
        'pt-br'
      )}
      ${new Date(vehicle.data).toLocaleTimeString('pt-br')}</b> </p>
      <p><b>${selectedVehicle.veiculo}</b> </p>
      <p><b>${addres}</b> </p>
      </div>

    <div> <b>Eventos:</b> </br>
    ${events}</div>
    </div>`
    })
    infowindow.open({
      anchor: markerlocal,
      map,
      shouldFocus: false
    })
    infoWindowToRemovePath.push(infowindow)
  })

  markers.push(markerlocal)
}
