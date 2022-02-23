import { getStreetNameByLatLng } from '../serviceHttp'

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

  dataHoraminus1.setHours(dataHoraminus1.getHours() - 1)

  if (new Date(vehicle.date_rastreador) < dataHoraminus1) {
    return '#ff0000'
  }
  if (
    new Date(vehicle.date_rastreador) < dataHoraminus1 &&
    new Date(vehicle.date_rastreador) > dataHoraminus1
  ) {
    return '#ff7f00'
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

export function centerMapInVehicle(
  coords: { lat: number; lng: number; carro_id: number } | undefined,
  map: google.maps.Map | undefined
) {
  if (map && coords) {
    map.setCenter(coords)
    map.setZoom(17)
  }
}
