import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import * as yup from 'yup'
import { MarkerClusterer } from '@googlemaps/markerclusterer'
import {
  vehicleType,
  createNewVehicleMarker,
  updateVehicleMarker,
  centerMapInVehicle
} from './api/vehicle'
import { toggleStreetView } from './api/streetView'
import { useMap, useVehicle } from './'
import ReactDOMServer from 'react-dom/server'
import { createContentInfoWindow } from './api/infoWindow'

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
  const {
    google,
    mapa,
    markerCluster,
    setMarkerCluster,
    panorama,
    showInfoWindowsInMap
  } = useMap()

  const {
    allMarkerVehicles,
    setAllMarkerVehicles,
    allMarkerVehiclesStep,
    allUserVehicle,
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
    return
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
    allMarkerVehicles.map(async (marker) => {
      if (marker.id === vehicle.carro_id) {
        marker.infowindow.setContent(
          ReactDOMServer.renderToString(await createContentInfoWindow(vehicle))
        )
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
        return
      }
      marker.infowindow?.close()
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
            showInfoWindowsInMap
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
          showInfoWindowsInMap
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
      if (markerCluster) {
        markerCluster.clearMarkers()
        markerCluster.addMarkers(allMarkerVehicles)
      }
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
