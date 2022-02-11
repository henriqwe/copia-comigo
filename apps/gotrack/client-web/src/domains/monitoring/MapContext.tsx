import { Loader } from '@googlemaps/js-api-loader'
import { MarkerClusterer } from '@googlemaps/markerclusterer'
import { createContext, ReactNode, useContext, useState } from 'react'
import { createBounceMarker } from './api/bounceMarker'

type coordsToCenterMapProp = {
  lat?: number
  lng?: number
  carro_id?: number
}

type MapContextProps = {
  google: google
  setGoogle: React.Dispatch<any>
  mapa: google.maps.Map
  setMapa: React.Dispatch<any>
  markerCluster: MarkerClusterer
  setMarkerCluster: React.Dispatch<React.SetStateAction<MarkerClusterer>>
  pointMarker: any
  setPointMarker: React.Dispatch<any>
  panorama: google.maps.StreetViewPanorama
  setPanorama: React.Dispatch<any>
  trafficLayer: google.maps.TrafficLayer
  setTrafficLayer: React.Dispatch<any>
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
  initMap: ({
    center,
    zoom
  }?: {
    center?: {
      lat: number
      lng: number
    }
    zoom?: number
  }) => void
}

type ProviderProps = {
  children: ReactNode
}
export const MapContext = createContext<MapContextProps>({} as MapContextProps)

export const MapProvider = ({ children }: ProviderProps) => {
  const [google, setGoogle] = useState<google>()
  const [mapa, setMapa] = useState<google.maps.Map>()
  const [markerCluster, setMarkerCluster] = useState<MarkerClusterer>()
  const [pointMarker, setPointMarker] = useState<
    google.maps.Marker | undefined
  >()
  const [panorama, setPanorama] = useState<google.maps.StreetViewPanorama>()
  const [trafficLayer, setTrafficLayer] = useState<google.maps.TrafficLayer>()
  const [markersAndLine, setMarkersAndLine] = useState<{
    markers: google.maps.Marker[]
    line: google.maps.Polyline
  }>()

  function showBounceMarker(location: coordsToCenterMapProp) {
    createBounceMarker(location, mapa, google, pointMarker, setPointMarker)
  }

  function initMap(props) {
    const center = props?.center ?? {
      lat: -12.100100128939063,
      lng: -49.24919742233473
    }
    const zoom = props?.zoom ?? 5

    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      version: 'weekly',
      libraries: ['geometry']
    })
    const styles = [
      {
        featureType: 'poi',
        stylers: [{ visibility: 'off' }]
      },
      {
        featureType: 'transit',
        elementType: 'labels.icon',
        stylers: [{ visibility: 'off' }]
      }
    ]
    loader
      .load()
      .then((response) => {
        setGoogle(response)
        const map = new response.maps.Map(
          document.getElementById('googleMaps') as HTMLElement,
          {
            center,
            zoom,
            mapTypeId: response.maps.MapTypeId.ROADMAP
          }
        )

        map.setOptions({ styles })
        const pano = map.getStreetView()
        pano.setPov({
          heading: 90,
          pitch: 0
        })
        setPanorama(pano)
        setMapa(map)

        const tL = new response.maps.TrafficLayer()
        tL.setMap(null)
        setTrafficLayer(tL)
      })
      .catch((e) => {
        console.log('error: ', e)
      })
  }

  return (
    <MapContext.Provider
      value={{
        google,
        setGoogle,
        mapa,
        setMapa,
        markerCluster,
        setMarkerCluster,
        pointMarker,
        setPointMarker,
        panorama,
        setPanorama,
        trafficLayer,
        setTrafficLayer,
        showBounceMarker,
        markersAndLine,
        initMap,
        setMarkersAndLine
      }}
    >
      {children}
    </MapContext.Provider>
  )
}

export const useMap = () => {
  return useContext(MapContext)
}
