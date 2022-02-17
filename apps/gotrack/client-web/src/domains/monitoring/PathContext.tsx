import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useRef,
  useState
} from 'react'
import { useMap, useVehicle } from './'
import {
  createNewVehiclePathMarker,
  showPathVehicle,
  vehicleType
} from './api/vehicle'
import { getVehicleHistoric } from './serviceHttp'

type PathContextProps = {
  infoWindowToRemovePath: google.maps.InfoWindow[]
  refsPathVehicle: React.MutableRefObject<any[]>
  pathLoading: boolean
  setPathLoading: Dispatch<SetStateAction<boolean>>
  consultVehicleHistoric?: (
    carro_id: string,
    inicio: string,
    fim: string
  ) => void
  setVehicleConsultData?: Dispatch<SetStateAction<vehicleType[] | undefined>>
  vehicleConsultData?: vehicleType[]
}

type ProviderProps = {
  children: ReactNode
}
export const PathContext = createContext<PathContextProps>(
  {} as PathContextProps
)

export const PathProvider = ({ children }: ProviderProps) => {
  const {
    markerCluster,
    panorama,
    mapa,
    google,
    markersAndLine,
    setMarkersAndLine
  } = useMap()

  const { allMarkerVehicles, selectedVehicle } = useVehicle()

  const [pathLoading, setPathLoading] = useState(false)
  const [vehicleConsultData, setVehicleConsultData] = useState<vehicleType[]>()

  const infoWindowToRemovePath: google.maps.InfoWindow[] = []
  const refsPathVehicle = useRef([])

  async function consultVehicleHistoric(
    carro_id: string,
    inicio: string,
    fim: string
  ) {
    setPathLoading(true)
    const response = await getVehicleHistoric(carro_id, inicio, fim)
    showPathVehicle(
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
      refsPathVehicle,
      selectedVehicle
    )
    setPathLoading(false)
  }

  return (
    <PathContext.Provider
      value={{
        infoWindowToRemovePath,
        refsPathVehicle,
        pathLoading,
        setPathLoading,
        consultVehicleHistoric,
        vehicleConsultData,
        setVehicleConsultData
      }}
    >
      {children}
    </PathContext.Provider>
  )
}

export const usePath = () => {
  return useContext(PathContext)
}
