import React, { useEffect } from 'react'

import {
  GoogleMap,
  LoadScript,
  Marker,
  MarkerClusterer
} from '@react-google-maps/api'
import { useVehicle } from '&track/domains/monitoring'

import * as common from '@comigo/ui-common'
import { setVehicleColor } from '&track/domains/monitoring/api/vehicle'

function Map() {
  const { allUserVehicle, vehiclesRefetch } = useVehicle()

  useEffect(() => {
    vehiclesRefetch()
    setInterval(async () => {
      vehiclesRefetch()
    }, 30000)
  }, [])

  return (
    <common.Card compact className="col-span-5  flex flex-1 mt-3 h-48">
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      >
        <GoogleMap
          mapContainerStyle={{
            width: '100%',
            height: '100%'
          }}
          center={{
            lat: -12.100100128939063,
            lng: -49.24919742233473
          }}
          zoom={3}
        >
          <MarkerClusterer
            options={{
              imagePath:
                'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
            }}
          >
            {(clusterer) =>
              allUserVehicle.map((vehicle) => {
                return createMarker(vehicle, clusterer)
              })
            }
          </MarkerClusterer>
        </GoogleMap>
      </LoadScript>
    </common.Card>
  )
}

function createMarker(vehicle, clusterer) {
  return (
    <Marker
      key={vehicle.carro_id}
      position={{
        lat: Number(vehicle.latitude),
        lng: Number(vehicle.longitude)
      }}
      icon={{
        path: 'M17.402,0H5.643C2.526,0,0,3.467,0,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759c3.116,0,5.644-2.527,5.644-5.644 V6.584C23.044,3.467,20.518,0,17.402,0z M22.057,14.188v11.665l-2.729,0.351v-4.806L22.057,14.188z M20.625,10.773 c-1.016,3.9-2.219,8.51-2.219,8.51H4.638l-2.222-8.51C2.417,10.773,11.3,7.755,20.625,10.773z M3.748,21.713v4.492l-2.73-0.349 V14.502L3.748,21.713z M1.018,37.938V27.579l2.73,0.343v8.196L1.018,37.938z M2.575,40.882l2.218-3.336h13.771l2.219,3.336H2.575z M19.328,35.805v-7.872l2.729-0.355v10.048L19.328,35.805z',
        scale: 0.5,
        strokeWeight: 0.7,
        fillColor: setVehicleColor(vehicle),
        fillOpacity: 1,
        anchor: new google.maps.Point(10, 25),
        rotation: Number(vehicle.crs)
      }}
      clusterer={clusterer}
    />
  )
}

export default React.memo(Map)
