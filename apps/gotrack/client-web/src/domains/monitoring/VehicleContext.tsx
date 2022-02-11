import { MarkerClusterer } from '@googlemaps/markerclusterer'
import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useRef,
  useState
} from 'react'
import { useMap } from '.'
import { vehicleType } from './api/vehicle'

type VehicleContextProps = {
  allMarkerVehicles: google.maps.Marker[]
  setAllMarkerVehicles: React.Dispatch<
    React.SetStateAction<google.maps.Marker[]>
  >
  allMarkerVehiclesStep: google.maps.Marker[]
  setAllUserVehicle: Dispatch<React.SetStateAction<vehicleType[]>>
  allUserVehicle?: vehicleType[]
  selectedVehicle: vehicleType
  setSelectedVehicle: React.Dispatch<React.SetStateAction<vehicleType>>
  refsCardVehicle: React.MutableRefObject<any[]>
  showAllVehiclesInMap: () => void
}

type ProviderProps = {
  children: ReactNode
}
export const VehicleContext = createContext<VehicleContextProps>(
  {} as VehicleContextProps
)

export const VehicleProvider = ({ children }: ProviderProps) => {
  const { mapa, setMarkerCluster, markersAndLine } = useMap()

  const [allMarkerVehicles, setAllMarkerVehicles] = useState<
    google.maps.Marker[]
  >([])
  const [allUserVehicle, setAllUserVehicle] = useState<vehicleType[]>([])
  const [selectedVehicle, setSelectedVehicle] = useState<
    vehicleType | undefined
  >()
  const refsCardVehicle = useRef([])
  const allMarkerVehiclesStep: google.maps.Marker[] = []

  function showAllVehiclesInMap() {
    allMarkerVehicles.forEach((vehicle) => {
      vehicle.setMap(mapa)
      vehicle.infowindow.close()
    })

    if (markersAndLine) {
      setMarkerCluster(
        new MarkerClusterer({ map: mapa, markers: allMarkerVehicles })
      )

      markersAndLine.markers.forEach((marker) => marker.setMap(null))
      markersAndLine.line.getPath().clear()
    }
  }

  return (
    <VehicleContext.Provider
      value={{
        allMarkerVehicles,
        setAllMarkerVehicles,
        allMarkerVehiclesStep,
        allUserVehicle,
        setAllUserVehicle,
        selectedVehicle,
        showAllVehiclesInMap,
        setSelectedVehicle,
        refsCardVehicle
      }}
    >
      {children}
    </VehicleContext.Provider>
  )
}

export const useVehicle = () => {
  return useContext(VehicleContext)
}
