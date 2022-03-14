import React, { useCallback, useState } from 'react'
import {
  GoogleMap,
  useJsApiLoader,
  MarkerClusterer,
  Polyline
} from '@react-google-maps/api'
import { CreateMarkerVehicle } from './Marker/vehicle'
import {
  useLocalization,
  useMap,
  usePath,
  useVehicle
} from '&track/domains/monitoring'
import { CreateInfoWindow } from './infoWindow/vehicle'
import { MarkerClusterer as markerclusterer } from '@googlemaps/markerclusterer'
import { CreateMarkerPath } from './Marker/Path'
import { CreateInfoWindowPath } from './infoWindow/path'
import { CreateBounceMarker } from './Marker/bounce'

function Map() {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    version: 'weekly'
  })

  if (loadError) {
    return <div>Ocorreu um erro.</div>
  }

  return isLoaded ? <RenderMap /> : <span>Carregando...</span>
}

function RenderMap() {
  const {
    setMapa,
    showInfoWindowsInMapData,
    setShowInfoWindowsInMapData,
    showInfoWindowsInMapPathData,
    setShowInfoWindowsInMapPathData,
    panorama,
    setPanorama,
    setTrafficLayer,
    setMarkerCluster,
    bounceMarker
  } = useMap()
  const { handlerClickOnVehicleMarker, setPageCard, handleClickScrollToCard } =
    useLocalization()
  const { allUserVehicle, selectedVehicle } = useVehicle()
  const { vehicleConsultData, refsPathVehicle } = usePath()

  const [mapInstance, setMapInstance] = useState({
    center: {
      lat: -12.100100128939063,
      lng: -49.24919742233473
    },
    zoom: 5
  })

  const onLoad = useCallback(function callback(mapa) {
    const pano = mapa.getStreetView()
    const tL = new google.maps.TrafficLayer()
    tL.setMap(null)

    setMarkerCluster(new markerclusterer({ map: mapa }))
    setPanorama(pano)
    setMapa(mapa)
    setTrafficLayer(tL)
  }, [])

  const onUnmount = useCallback(function callback() {
    setMapa(null)
    setTrafficLayer(null)
    setPanorama(null)
  }, [])

  return (
    <GoogleMap
      id="GoogleMap"
      options={{
        styles: [
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
      }}
      mapContainerStyle={{
        width: '100%',
        height: '100%'
      }}
      center={mapInstance.center}
      zoom={mapInstance.zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
      streetView={panorama}
    >
      {vehicleConsultData?.length === 0 ? (
        <>
          {/* LOCALIZAÇÃO */}
          {/* Cluster */}
          <MarkerClusterer>
            {(clusterer) => {
              return allUserVehicle.map((location) => {
                return CreateMarkerVehicle(
                  location,
                  clusterer,
                  setShowInfoWindowsInMapData,
                  panorama,
                  handleClickScrollToCard
                )
              })

              return <></>
            }}
          </MarkerClusterer>
          {/* InfoWindow */}
          {showInfoWindowsInMapData !== null && (
            <CreateInfoWindow
              showInfoWindowsInMapData={showInfoWindowsInMapData}
              handlerClickOnVehicleMarker={handlerClickOnVehicleMarker}
              setPageCard={setPageCard}
            />
          )}
        </>
      ) : (
        <>
          {/* TRAJETOS */}
          {/* Marcadores */}
          {vehicleConsultData?.map((vehicle, idx) => {
            return (
              <CreateMarkerPath
                key={idx}
                index={idx}
                arrayLength={vehicleConsultData.length}
                vehicle={vehicle}
                panorama={panorama}
                setShowInfoWindowsInMapPathData={
                  setShowInfoWindowsInMapPathData
                }
                refsPathVehicle={refsPathVehicle}
              />
            )
          })}
          {/* BounceMarker */}
          {bounceMarker !== null && (
            <CreateBounceMarker bounceMarker={bounceMarker} />
          )}
          {/* InfoWindow */}
          {showInfoWindowsInMapPathData !== null && (
            <CreateInfoWindowPath
              showInfoWindowsInMapPathData={showInfoWindowsInMapPathData}
              selectedVehicle={selectedVehicle}
            />
          )}
          {/* Polyline */}
          <Polyline
            path={vehicleConsultData?.map((vehicle) => {
              return {
                lat: Number(vehicle.latitude),
                lng: Number(vehicle.longitude)
              }
            })}
            options={{
              strokeColor: '#223D90',
              strokeOpacity: 1,
              strokeWeight: 4,
              clickable: false,
              draggable: false,
              editable: false,
              visible: true,
              zIndex: 1,
              geodesic: true
            }}
          />
        </>
      )}
    </GoogleMap>
  )
}

export default React.memo(Map)
