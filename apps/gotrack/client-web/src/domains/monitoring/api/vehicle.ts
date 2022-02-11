import { Dispatch, SetStateAction } from 'react'
import { getStreetNameByLatLng } from '../serviceHttp'
import { renderPolyline } from './polilyne'
import ReactDOMServer from 'react-dom/server'
import {
  createContentInfoWindow,
  createContentInfoWindowPath
} from './infoWindow'
import { handleClickScrollToCardPath } from './handlerClickScrollToCard'

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

export function setVehicleColor(vehicle: vehicleType) {
  const dataHoraminus1 = new Date()
  const dataHoraminus6 = new Date()

  dataHoraminus1.setHours(dataHoraminus1.getHours() - 1)
  dataHoraminus6.setHours(dataHoraminus6.getHours() - 1)

  if (new Date(vehicle.date_rastreador) < dataHoraminus6) {
    return '#ff0000'
  }
  if (
    new Date(vehicle.date_rastreador) < dataHoraminus1 &&
    new Date(vehicle.date_rastreador) > dataHoraminus6
  ) {
    return '#fffb00'
  }

  if (vehicle.ligado) {
    if (Number(vehicle.speed).toFixed() === '0') return '#22ade4'

    return '#009933'
  }

  return '#818181'
}

export async function getVehicleAddress(lat: string, lng: string) {
  const response = await getStreetNameByLatLng(lat, lng)
  return response.results[0].formatted_address
}

export function createNewVehiclePathMarker(
  infoWindowToRemovePath: google.maps.InfoWindow[],
  selectedVehicle: vehicleType,
  map: google.maps.Map,
  google: any,
  pathCoords: vehicleType[],
  markersAndLine:
    | {
        markers: google.maps.Marker[]
        line: google.maps.Polyline
      }
    | undefined,
  setMarkersAndLine: Dispatch<
    SetStateAction<
      | {
          markers: google.maps.Marker[]
          line: google.maps.Polyline
        }
      | undefined
    >
  >,
  refsPathVehicle: React.MutableRefObject<any[]>
) {
  if (markersAndLine) {
    markersAndLine.markers.forEach((marker) => marker.setMap(null))

    markersAndLine.line.getPath().clear()
  }

  const bounds = new google.maps.LatLngBounds()
  const markers = []
  const marker = new google.maps.Marker({
    map,
    position: {
      lat: Number(pathCoords[pathCoords.length - 1].latitude),
      lng: Number(pathCoords[pathCoords.length - 1].longitude)
    },
    zIndex: 2,
    icon: {
      path: 'M17.402,0H5.643C2.526,0,0,3.467,0,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759c3.116,0,5.644-2.527,5.644-5.644 V6.584C23.044,3.467,20.518,0,17.402,0z M22.057,14.188v11.665l-2.729,0.351v-4.806L22.057,14.188z M20.625,10.773 c-1.016,3.9-2.219,8.51-2.219,8.51H4.638l-2.222-8.51C2.417,10.773,11.3,7.755,20.625,10.773z M3.748,21.713v4.492l-2.73-0.349 V14.502L3.748,21.713z M1.018,37.938V27.579l2.73,0.343v8.196L1.018,37.938z M2.575,40.882l2.218-3.336h13.771l2.219,3.336H2.575z M19.328,35.805v-7.872l2.729-0.355v10.048L19.328,35.805z',
      scale: 0.5,
      strokeWeight: 0.7,
      fillColor: '#009933',
      fillOpacity: 1,
      anchor: new google.maps.Point(10, 25),
      rotation: Number(pathCoords[pathCoords.length - 1].crs)
    }
  })
  marker.addListener('click', async () => {
    if (infoWindowToRemovePath) {
      infoWindowToRemovePath.forEach((info) => info.close())
      infoWindowToRemovePath.length = 0
    }
    handleClickScrollToCardPath('0', refsPathVehicle)
    const addres = await getVehicleAddress(
      pathCoords[pathCoords.length - 1].latitude,
      pathCoords[pathCoords.length - 1].longitude
    )
    const infowindow = new google.maps.InfoWindow({
      content: ''
    })
    infowindow.open({
      anchor: marker,
      map,
      shouldFocus: false
    })
    infowindow.setContent(
      ReactDOMServer.renderToString(
        createContentInfoWindowPath(selectedVehicle, pathCoords, addres)
      )
    )
    infoWindowToRemovePath.push(infowindow)
  })

  const markerStart = new google.maps.Marker({
    map,
    label: {
      text: 'Início',
      color: 'black',
      fontSize: '16px',
      fontWeight: 'bold',
      className: 'mb-5 ml-4'
    },
    icon: {
      path: 'M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z',
      fillColor: 'green',
      fillOpacity: 1,
      anchor: new google.maps.Point(10, 0),
      scale: 1.5
    },
    position: {
      lat: Number(pathCoords[0].latitude),
      lng: Number(pathCoords[0].longitude)
    },
    zIndex: 2
  })

  const line = new google.maps.Polyline({
    path: [],
    strokeColor: '#223D90',
    strokeOpacity: 1.0,
    strokeWeight: 4,
    geodesic: true,
    map
  })
  const lineForeground = new google.maps.Polyline({
    path: [],
    strokeColor: '#09ff00',
    strokeOpacity: 1,
    strokeWeight: 2,
    geodesic: true,
    map
  })

  renderPolyline(
    map,
    google,
    line,
    lineForeground,
    pathCoords,
    selectedVehicle,
    infoWindowToRemovePath,
    bounds,
    markers,
    refsPathVehicle
  )

  map.fitBounds(bounds)
  markers.push(marker)
  markers.push(markerStart)
  setMarkersAndLine({ markers, line })
}

export function createNewVehicleMarker(
  google: google,
  map: google.maps.Map | undefined,
  vehicle: vehicleType,
  allMarkerVehiclesStep: google.maps.Marker[] | any[],
  allMarkerVehicles: google.maps.Marker[],
  handleClickScrollToCard,
  createFunctionsForInfoWindow,
  panorama
) {
  const marker = new google.maps.Marker({
    map,
    zIndex: 2,
    id: vehicle.carro_id,
    position: {
      lat: Number(vehicle.latitude),
      lng: Number(vehicle.longitude)
    },
    icon: {
      path: 'M17.402,0H5.643C2.526,0,0,3.467,0,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759c3.116,0,5.644-2.527,5.644-5.644 V6.584C23.044,3.467,20.518,0,17.402,0z M22.057,14.188v11.665l-2.729,0.351v-4.806L22.057,14.188z M20.625,10.773 c-1.016,3.9-2.219,8.51-2.219,8.51H4.638l-2.222-8.51C2.417,10.773,11.3,7.755,20.625,10.773z M3.748,21.713v4.492l-2.73-0.349 V14.502L3.748,21.713z M1.018,37.938V27.579l2.73,0.343v8.196L1.018,37.938z M2.575,40.882l2.218-3.336h13.771l2.219,3.336H2.575z M19.328,35.805v-7.872l2.729-0.355v10.048L19.328,35.805z',
      scale: 0.5,
      strokeWeight: 0.7,
      fillColor: setVehicleColor(vehicle),
      fillOpacity: 1,
      anchor: new google.maps.Point(10, 25),
      rotation: Number(vehicle.crs)
    }
  })

  marker.infowindow = new google.maps.InfoWindow({
    disableAutoPan: true
  })

  marker.infowindow.setContent(
    ReactDOMServer.renderToString(createContentInfoWindow(vehicle))
  )
  marker.addListener('click', async () => {
    if (allMarkerVehicles) {
      allMarkerVehicles.forEach((marker) => marker.infowindow.close())
    }
    // setVehicleConsultData(vehicle)
    handleClickScrollToCard(vehicle.carro_id)
    await marker.infowindow.open({
      anchor: marker,
      map,
      shouldFocus: false
    })
    const interval = setInterval(() => {
      if (
        document.getElementById(
          `infoWindowImgStreetView${vehicle.carro_id}`
        ) !== null
      ) {
        createFunctionsForInfoWindow(vehicle)
        clearInterval(interval)
      }
    }, 10)
  })
  allMarkerVehicles.push(marker)
  allMarkerVehiclesStep.push(marker)
}
export function updateVehicleMarker(
  google: google,
  marker: google.maps.Marker,
  vehicle: vehicleType,
  map: google.maps.Map,
  allMarkerVehicles: google.maps.Marker[],
  handleClickScrollToCard,
  createFunctionsForInfoWindow,
  panorama
) {
  const currentMarkerPos = new google.maps.LatLng(
    Number(vehicle.latitude),
    Number(vehicle.longitude)
  )
  marker.setPosition(currentMarkerPos)

  const icon = marker.getIcon()
  icon.fillColor = setVehicleColor(vehicle)
  icon.rotation = Number(vehicle.crs)
  marker.setIcon(icon)

  google.maps.event.clearListeners(marker, 'click')

  marker.infowindow.setContent(
    ReactDOMServer.renderToString(createContentInfoWindow(vehicle))
  )

  marker.addListener('click', async () => {
    if (allMarkerVehicles) {
      allMarkerVehicles.forEach((marker) => marker.infowindow.close())
    }
    handleClickScrollToCard(vehicle.carro_id)

    // setVehicleConsultData(vehicle)
    await marker.infowindow.open({
      anchor: marker,
      map,
      shouldFocus: false
    })
    const interval = setInterval(() => {
      if (
        document.getElementById(
          `infoWindowImgStreetView${vehicle.carro_id}`
        ) !== null
      ) {
        createFunctionsForInfoWindow(vehicle)
        clearInterval(interval)
      }
    }, 10)
  })
  allMarkerVehicles.push(marker)
}

export function centerMapInVehicle(
  google: google,
  coords: { lat: number; lng: number; carro_id: number } | undefined,
  map: google.maps.Map | undefined
) {
  if (map && coords) {
    map.setCenter(coords)
    map.setZoom(17)
  }

  const circleMarker = new google.maps.Marker({
    map,
    zIndex: 1,
    position: coords,
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 20,
      strokeWeight: 1,
      strokeColor: 'red',
      fillColor: 'yellow',
      fillOpacity: 1
    }
  })
  const intervalColor = setInterval(() => {
    const icon = circleMarker.getIcon()
    if (icon.fillOpacity <= 0.01) {
      circleMarker.setMap(null)
      clearInterval(intervalColor)
    }
    icon.fillOpacity -= 0.01
    icon.strokeOpacity -= 0.01

    circleMarker.setIcon(icon)
  }, 30)
}

export function showPathVehicle(
  response,
  setVehicleConsultData,
  markerCluster,
  panorama,
  allMarkerVehicles,
  createNewVehiclePathMarker,
  infoWindowToRemovePath,
  mapa,
  google,
  markersAndLine,
  setMarkersAndLine,
  refsPathVehicle
) {
  setVehicleConsultData(response)
  markerCluster.setMap(null)
  panorama.setVisible(false)
  allMarkerVehicles.forEach((vehicle) => vehicle.setMap(null))
  createNewVehiclePathMarker(
    infoWindowToRemovePath,
    response[0],
    mapa,
    google,
    response,
    markersAndLine,
    setMarkersAndLine,
    refsPathVehicle
  )
}
