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
  const { path, strokeColor, fillColor } = generateIcon(
    previousPosition,
    vehicle,
    stop
  )
  const markerlocal = new google.maps.Marker({
    position: {
      lat: Number(vehicle.latitude),
      lng: Number(vehicle.longitude)
    },
    map,
    zIndex: 1,
    icon: {
      path,
      scale: 0.4,
      strokeWeight: 2.5,
      strokeColor,
      fillColor,
      fillOpacity: 1,
      anchor: new google.maps.Point(20, 35),
      rotation: Number(vehicle.crs)
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

function generateIcon(previousPosition, vehicle, stop) {
  if (previousPosition === undefined) {
    return {
      path: 'M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48ZM22.5858 9.58579L9.85787 22.3137C9.07682 23.0948 9.07682 24.3611 9.85787 25.1421C10.6389 25.9232 11.9052 25.9232 12.6863 25.1421L22 15.8284L22 36H26L26 15.8284L35.3137 25.1421C36.0948 25.9232 37.3611 25.9232 38.1421 25.1421C38.9232 24.3611 38.9232 23.0948 38.1421 22.3137L25.4142 9.58579C24.6332 8.80474 23.3668 8.80474 22.5858 9.58579Z',
      strokeColor: '#009F23',
      fillColor: '#fff'
    }
  }
  if (stop && Number(vehicle.speed) < 1) {
    return {
      path: 'M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48ZM35 13H13V35H35V13Z',
      strokeColor: '#2135ED',
      fillColor: '#fff'
    }
  }
  if (stop) {
    return {
      path: 'M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48ZM22.5858 9.58579L9.85787 22.3137C9.07682 23.0948 9.07682 24.3611 9.85787 25.1421C10.6389 25.9232 11.9052 25.9232 12.6863 25.1421L22 15.8284L22 36H26L26 15.8284L35.3137 25.1421C36.0948 25.9232 37.3611 25.9232 38.1421 25.1421C38.9232 24.3611 38.9232 23.0948 38.1421 22.3137L25.4142 9.58579C24.6332 8.80474 23.3668 8.80474 22.5858 9.58579Z',
      strokeColor: '#2600ff',
      fillColor: '#fff'
    }
  }
  if (Number(vehicle.speed) > 80) {
    return {
      path: 'M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48ZM33.5263 29.5L24 13L14.4737 29.5H33.5263Z',
      strokeColor: '#ff8800',
      fillColor: '#fff'
    }
  }
  return {
    path: 'M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48ZM22.5858 9.58579L9.85787 22.3137C9.07682 23.0948 9.07682 24.3611 9.85787 25.1421C10.6389 25.9232 11.9052 25.9232 12.6863 25.1421L22 15.8284L22 36H26L26 15.8284L35.3137 25.1421C36.0948 25.9232 37.3611 25.9232 38.1421 25.1421C38.9232 24.3611 38.9232 23.0948 38.1421 22.3137L25.4142 9.58579C24.6332 8.80474 23.3668 8.80474 22.5858 9.58579Z',
    strokeColor: '#009F23',
    fillColor: '#fff'
  }
}
