import { createMarkerWhitInfo } from './pathMarker'

export function renderPolyline(
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
) {
  line.getPath().clear()
  lineForeground.getPath().clear()
  let statusVehicle = pathCoords[0].ligado
  let timeLastStop = new Date(pathCoords[0].data)

  pathCoords.forEach((vehicle, index) => {
    let stop = false
    let durationMs: string | number = 0
    if (statusVehicle !== vehicle.ligado) {
      statusVehicle = vehicle.ligado
      if (statusVehicle === 0) {
        durationMs += Math.abs(new Date(vehicle.data) - timeLastStop)
        stop = true
      }
      timeLastStop = new Date(vehicle.data)
    }
    if (durationMs > 0) {
      let seconds: string | number = Math.floor((durationMs / 1000) % 60)
      let minutes: string | number = Math.floor((durationMs / (1000 * 60)) % 60)
      let hours: string | number = Math.floor(
        (durationMs / (1000 * 60 * 60)) % 24
      )

      if (hours < 10) hours = '0' + hours
      if (minutes < 10) minutes = '0' + minutes
      if (seconds < 10) seconds = '0' + seconds

      durationMs = hours + ':' + minutes + ':' + seconds
    }
    createMarkerWhitInfo(
      map,
      google,
      vehicle,
      pathCoords[index - 1],
      stop,
      Number(durationMs),
      selectedVehicle,
      infoWindowToRemovePath,
      index,
      bounds,
      markers,
      refsPathVehicle
    )

    const arrival = new google.maps.LatLng(
      Number(vehicle.latitude),
      Number(vehicle.longitude)
    )
    line.getPath().push(arrival)
  })
}
