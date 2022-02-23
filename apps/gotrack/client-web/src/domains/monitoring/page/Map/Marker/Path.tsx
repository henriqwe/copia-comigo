import { handleClickScrollToCardPath } from '&track/domains/monitoring/api/handlerClickScrollToCard'
import { vehicleType } from '&track/domains/monitoring/api/vehicle'
import { Marker } from '@react-google-maps/api'
import { generateIcon } from '&track/domains/monitoring/api/pathMarker'

type CreateMarkerPathProps = {
  vehicle: vehicleType
  panorama: google.maps.StreetViewPanorama
  setShowInfoWindowsInMapPathData
  index: number
  refsPathVehicle
  arrayLength: number
}

export function CreateMarkerPath({
  vehicle,
  panorama,
  setShowInfoWindowsInMapPathData,
  index,
  refsPathVehicle,
  arrayLength
}: CreateMarkerPathProps) {
  const icon = generateIcon(vehicle, index, arrayLength)

  return (
    <Marker
      key={`${vehicle.data}${vehicle.latitude}${vehicle.longitude}`}
      position={{
        lat: Number(vehicle.latitude),
        lng: Number(vehicle.longitude)
      }}
      icon={icon}
      title={icon.titleIcon}
      label={icon.labelIcon}
      zIndex={icon.indexIcon}
      onClick={() => {
        setShowInfoWindowsInMapPathData(null)
        setShowInfoWindowsInMapPathData({ vehicle, panorama })
        handleClickScrollToCardPath(index, refsPathVehicle)
      }}
    ></Marker>
  )
}
