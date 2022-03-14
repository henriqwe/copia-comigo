import { MarkerClusterer } from '@googlemaps/markerclusterer'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState
} from 'react'
import { handleBounceMarker } from './api/bounceMarker'
import { vehicleType } from './api/vehicle'

type coordsToCenterMapProp = {
  lat?: number
  lng?: number
  carro_id?: number
}

type MapContextProps = {
  mapa: google.maps.Map
  setMapa: Dispatch<SetStateAction<google.maps.Map>>
  markerCluster: MarkerClusterer
  setMarkerCluster: React.Dispatch<React.SetStateAction<MarkerClusterer>>
  bounceMarker: {
    lat: number
    lng: number
  }
  setBounceMarker: Dispatch<
    SetStateAction<{
      lat: number
      lng: number
    }>
  >
  panorama: google.maps.StreetViewPanorama
  setPanorama: Dispatch<SetStateAction<google.maps.StreetViewPanorama>>
  trafficLayer: google.maps.TrafficLayer
  setTrafficLayer: Dispatch<SetStateAction<google.maps.TrafficLayer>>
  markersAndLine: {
    markers: google.maps.Marker[]
    line: google.maps.Polyline
  }
  setMarkersAndLine: React.Dispatch<
    React.SetStateAction<{
      markers: google.maps.Marker[]
      line: google.maps.Polyline
    }>
  >
  showBounceMarker: (location: coordsToCenterMapProp) => void
  showInfoWindowsInMapData: {
    vehicle: vehicleType
    panorama: google.maps.StreetViewPanorama
  }
  setShowInfoWindowsInMapData: Dispatch<
    SetStateAction<{
      vehicle: vehicleType
      panorama: google.maps.StreetViewPanorama
    }>
  >
  showInfoWindowsInMapPathData: {
    vehicle: vehicleType
    panorama: google.maps.StreetViewPanorama
  }
  setShowInfoWindowsInMapPathData: Dispatch<
    SetStateAction<{
      vehicle: vehicleType
      panorama: google.maps.StreetViewPanorama
    }>
  >
  panoramaData: {
    position: {
      lat: number
      lng: number
    }
    visible: boolean
  }
  setPanoramaData: Dispatch<
    SetStateAction<{
      position: {
        lat: number
        lng: number
      }
      visible: boolean
    }>
  >
  showMarkerClusterer: boolean
  setShowMarkerClusterer: Dispatch<SetStateAction<boolean>>
}

type ProviderProps = {
  children: ReactNode
}
export const MapContext = createContext<MapContextProps>({} as MapContextProps)

export const MapProvider = ({ children }: ProviderProps) => {
  const [mapa, setMapa] = useState<google.maps.Map>()
  const [showInfoWindowsInMapData, setShowInfoWindowsInMapData] = useState<{
    vehicle: vehicleType
    panorama: google.maps.StreetViewPanorama
  } | null>(null)
  const [showInfoWindowsInMapPathData, setShowInfoWindowsInMapPathData] =
    useState<{
      vehicle: vehicleType
      panorama: google.maps.StreetViewPanorama
    } | null>(null)
  const [markerCluster, setMarkerCluster] = useState<MarkerClusterer>()
  const [showMarkerClusterer, setShowMarkerClusterer] = useState(true)
  const [bounceMarker, setBounceMarker] = useState<{
    lat: number
    lng: number
  } | null>(null)
  const [panorama, setPanorama] = useState<google.maps.StreetViewPanorama>()
  const [trafficLayer, setTrafficLayer] = useState<google.maps.TrafficLayer>()
  const [panoramaData, setPanoramaData] = useState({
    position: {
      lat: 0,
      lng: 0
    },
    visible: false
  })
  const [markersAndLine, setMarkersAndLine] = useState<{
    markers: google.maps.Marker[]
    line: google.maps.Polyline
  }>()

  function showBounceMarker(location: coordsToCenterMapProp) {
    handleBounceMarker(location, mapa, setBounceMarker)
  }

  return (
    <MapContext.Provider
      value={{
        mapa,
        setMapa,
        markerCluster,
        setMarkerCluster,
        bounceMarker,
        setBounceMarker,
        panorama,
        setPanorama,
        trafficLayer,
        setTrafficLayer,
        showBounceMarker,
        markersAndLine,
        setMarkersAndLine,
        showInfoWindowsInMapData,
        setShowInfoWindowsInMapData,
        showInfoWindowsInMapPathData,
        setShowInfoWindowsInMapPathData,
        panoramaData,
        setPanoramaData,
        showMarkerClusterer,
        setShowMarkerClusterer
      }}
    >
      {children}
    </MapContext.Provider>
  )
}

export const useMap = () => {
  return useContext(MapContext)
}
