import ReactDOMServer from 'react-dom/server'
import { handleClickScrollToCardPath } from './handlerClickScrollToCard'
import { createContentInfoWindowPathMarker } from './infoWindow'
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
    ${downTime} tempo parado`
  } else if (Number(vehicle.speed) > 80) {
    events += `
    Velocidade: ${Math.floor(Number(vehicle.speed))} Km/H
    `
  }
  if (events === '') events = 'Não há evento registrado. '
  const { path, strokeColor, fillColor, rotation } = generateIcon(
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
      rotation
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
      content: ''
    })
    infowindow.setContent(
      ReactDOMServer.renderToString(
        createContentInfoWindowPathMarker(selectedVehicle, addres, events)
      )
    )
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
      fillColor: '#fff',
      rotation: Number(vehicle.crs)
    }
  }
  if (stop && Number(vehicle.speed) < 1) {
    return {
      path: 'M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48ZM35 13H13V35H35V13Z',
      strokeColor: '#2135ED',
      fillColor: '#fff',
      rotation: 0
    }
  }
  if (stop) {
    return {
      path: 'M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48ZM22.5858 9.58579L9.85787 22.3137C9.07682 23.0948 9.07682 24.3611 9.85787 25.1421C10.6389 25.9232 11.9052 25.9232 12.6863 25.1421L22 15.8284L22 36H26L26 15.8284L35.3137 25.1421C36.0948 25.9232 37.3611 25.9232 38.1421 25.1421C38.9232 24.3611 38.9232 23.0948 38.1421 22.3137L25.4142 9.58579C24.6332 8.80474 23.3668 8.80474 22.5858 9.58579Z',
      strokeColor: '#2600ff',
      fillColor: '#fff',
      rotation: 0
    }
  }
  if (Number(vehicle.speed) > 80) {
    return {
      path: 'M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48ZM33.5263 29.5L24 13L14.4737 29.5H33.5263Z',
      strokeColor: '#ff8800',
      fillColor: '#fff',
      rotation: 0
    }
  }
  return {
    path: 'M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48ZM22.5858 9.58579L9.85787 22.3137C9.07682 23.0948 9.07682 24.3611 9.85787 25.1421C10.6389 25.9232 11.9052 25.9232 12.6863 25.1421L22 15.8284L22 36H26L26 15.8284L35.3137 25.1421C36.0948 25.9232 37.3611 25.9232 38.1421 25.1421C38.9232 24.3611 38.9232 23.0948 38.1421 22.3137L25.4142 9.58579C24.6332 8.80474 23.3668 8.80474 22.5858 9.58579Z',
    strokeColor: '#009F23',
    fillColor: '#fff',
    rotation: Number(vehicle.crs)
  }
}
