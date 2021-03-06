import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useRef,
  useState
} from 'react'
import { vehicleType } from './api/vehicle'
import { getAllUserVehicles } from './serviceHttp'

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
  vehiclesLoading: boolean
  vehiclesRefetch: () => void
}

type ProviderProps = {
  children: ReactNode
}
export const VehicleContext = createContext<VehicleContextProps>(
  {} as VehicleContextProps
)

export const VehicleProvider = ({ children }: ProviderProps) => {
  const [allMarkerVehicles, setAllMarkerVehicles] = useState<
    google.maps.Marker[]
  >([])
  const [allUserVehicle, setAllUserVehicle] = useState<vehicleType[]>([])
  const [selectedVehicle, setSelectedVehicle] = useState<
    vehicleType | undefined
  >()
  const [vehiclesLoading, setVehiclesLoading] = useState(false)

  const refsCardVehicle = useRef([])
  const allMarkerVehiclesStep: google.maps.Marker[] = []

  async function vehiclesRefetch() {
    setVehiclesLoading(true)
    const response = await getAllUserVehicles('operacional@radarescolta.com')
    const responseGetUserVehicles = response?.filter((vehicle) => {
      if (vehicle.latitude && vehicle.longitude) return vehicle
    })
    if (responseGetUserVehicles) setAllUserVehicle(responseGetUserVehicles)
    setVehiclesLoading(false)
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
        setSelectedVehicle,
        refsCardVehicle,
        vehiclesLoading,
        vehiclesRefetch
      }}
    >
      {children}
    </VehicleContext.Provider>
  )
}

export const useVehicle = () => {
  return useContext(VehicleContext)
}
