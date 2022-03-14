import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useRef,
  useState
} from 'react'
import { useMap } from '.'
import { vehicleType } from './api/vehicle'
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
  setVehicleConsultData: Dispatch<SetStateAction<vehicleType[] | undefined>>
  vehicleConsultData?: vehicleType[]
}

type ProviderProps = {
  children: ReactNode
}
export const PathContext = createContext<PathContextProps>(
  {} as PathContextProps
)

export const PathProvider = ({ children }: ProviderProps) => {
  const { mapa } = useMap()
  const [pathLoading, setPathLoading] = useState(false)
  const [vehicleConsultData, setVehicleConsultData] = useState<vehicleType[]>(
    []
  )

  const infoWindowToRemovePath: google.maps.InfoWindow[] = []
  const refsPathVehicle = useRef([])

  async function consultVehicleHistoric(
    carro_id: string,
    inicio: string,
    fim: string
  ) {
    setPathLoading(true)
    const response = await getVehicleHistoric(carro_id, inicio, fim)

    setVehicleConsultData(response)
    const bounds = new google.maps.LatLngBounds()
    response.forEach((vehicle) => {
      bounds.extend({
        lat: Number(vehicle.latitude),
        lng: Number(vehicle.longitude)
      })
    })
    mapa.fitBounds(bounds)
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
