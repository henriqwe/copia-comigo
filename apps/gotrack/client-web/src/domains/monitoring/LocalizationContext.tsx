import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import * as yup from 'yup'
import { getAllUserVehicles } from './serviceHttp/index'
import { MarkerClusterer } from '@googlemaps/markerclusterer'
import {
  vehicleType,
  createNewVehicleMarker,
  updateVehicleMarker,
  centerMapInVehicle
} from './api/vehicle'
import { toggleStreetView } from './api/streetView'
import { useMap, useVehicle } from './'

type LocalizationContextProps = {
  localizationsLoading: boolean
  localizationsRefetch: () => void
  localizationSchema: any
  openCardKey: number
  setOpenCardKey: React.Dispatch<React.SetStateAction<number>>
  pageCard: string
  setPageCard: React.Dispatch<React.SetStateAction<string>>
  createFunctionsForInfoWindow: (vehicle: vehicleType) => void
  handlerClickOnVehicleMarker: (vehicle: vehicleType) => void
}

type ProviderProps = {
  children: ReactNode
}

export const LocalizationContext = createContext<LocalizationContextProps>(
  {} as LocalizationContextProps
)

export const LocalizationProvider = ({ children }: ProviderProps) => {
  const { google, mapa, markerCluster, setMarkerCluster, panorama } = useMap()

  const {
    allMarkerVehicles,
    setAllMarkerVehicles,
    allMarkerVehiclesStep,
    allUserVehicle,
    setAllUserVehicle,
    setSelectedVehicle,
    refsCardVehicle
  } = useVehicle()

  const [localizationsLoading, setLocalizationsLoading] = useState(false)
  const localizationSchema = yup.object().shape({
    carro_id: yup.string()
  })
  const [openCardKey, setOpenCardKey] = useState<number>()
  const [pageCard, setPageCard] = useState('pagAllVehicles')

  async function localizationsRefetch() {
    setLocalizationsLoading(true)
    const response = await getAllUserVehicles('operacional@radarescolta.com')
    const responseGetUserVehicles = response?.filter((vehicle) => {
      if (vehicle.latitude && vehicle.longitude) return vehicle
    })
    if (responseGetUserVehicles) setAllUserVehicle(responseGetUserVehicles)
    setLocalizationsLoading(false)
  }

  function createFunctionsForInfoWindow(vehicle: vehicleType) {
    document
      .getElementById(`infoWindowImgStreetView${vehicle.carro_id}`)
      ?.addEventListener('click', () => {
        toggleStreetView(
          Number(vehicle.latitude),
          Number(vehicle.longitude),
          panorama
        )
      })
    document
      .getElementById(`buttonVerTrajeto${vehicle.carro_id}`)
      ?.addEventListener('click', () => {
        handlerClickOnVehicleMarker(vehicle)
        setPageCard('pagVehiclesDetails')
      })
  }

  function handlerClickOnVehicleMarker(vehicle: vehicleType) {
    setSelectedVehicle(vehicle)
    panorama.setVisible(false)
    allMarkerVehicles.map((marker) => {
      if (marker.id === vehicle.carro_id) {
        marker.infowindow?.open({
          anchor: marker,
          mapa,
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
      } else {
        marker.infowindow?.close()
      }
    })

    centerMapInVehicle(
      google,
      {
        lat: Number(vehicle.latitude),
        lng: Number(vehicle.longitude),
        carro_id: vehicle.carro_id
      },
      mapa
    )
  }

  function handleClickScrollToCard(carro_id: string) {
    setOpenCardKey(Number(carro_id))
    const index = refsCardVehicle.current.findIndex((elem) => {
      if (elem.carro_id === carro_id) {
        return elem
      }
    })
    if (index !== -1) {
      refsCardVehicle?.current[index]['elem']?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
      refsCardVehicle?.current[index]['elem']?.firstChild.classList.add(
        'border-2',
        'border-yellow-500'
      )
      setTimeout(() => {
        refsCardVehicle?.current[index]['elem']?.firstChild.classList.remove(
          'border-2',
          'border-yellow-500'
        )
      }, 3000)
    }
  }

  useEffect(() => {
    if (allUserVehicle && google && mapa) {
      allUserVehicle.forEach((vehicle) => {
        const marker = allMarkerVehicles.find((elem) => {
          if (elem.id === vehicle.carro_id) return elem
        })
        if (marker) {
          updateVehicleMarker(
            google,
            marker,
            vehicle,
            mapa,
            allMarkerVehicles,
            handleClickScrollToCard,
            createFunctionsForInfoWindow,
            panorama
          )
          return
        }

        createNewVehicleMarker(
          google,
          mapa,
          vehicle,
          allMarkerVehiclesStep,
          allMarkerVehicles,
          handleClickScrollToCard,
          createFunctionsForInfoWindow,
          panorama
        )
      })
      const markersToAdd = allMarkerVehiclesStep.filter((markerStep) => {
        const validationMarker = allMarkerVehicles.find((elem) => {
          if (elem.id === markerStep.id) {
            return elem
          }
        })
        if (validationMarker) return
        return markerStep
      })

      setAllMarkerVehicles([...allMarkerVehicles, ...markersToAdd])
      if (!markerCluster) {
        setMarkerCluster(
          new MarkerClusterer({ map: mapa, markers: allMarkerVehiclesStep })
        )
      }
    }
  }, [allUserVehicle])

  return (
    <LocalizationContext.Provider
      value={{
        localizationsRefetch,
        localizationSchema,
        localizationsLoading,
        openCardKey,
        setOpenCardKey,
        pageCard,
        setPageCard,
        createFunctionsForInfoWindow,
        handlerClickOnVehicleMarker
      }}
    >
      {children}
    </LocalizationContext.Provider>
  )
}

export const useLocalization = () => {
  return useContext(LocalizationContext)
}
