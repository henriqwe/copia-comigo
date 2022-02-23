import { Marker } from '@react-google-maps/api'

type CreateBounceMarkerProps = {
  bounceMarker: {
    lat: number
    lng: number
  } | null
}

export function CreateBounceMarker({ bounceMarker }: CreateBounceMarkerProps) {
  return (
    <Marker
      position={bounceMarker}
      animation={google.maps.Animation.BOUNCE}
      icon={{
        path: 'M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z',
        fillColor: '#FF0000',
        fillOpacity: 1,
        anchor: new google.maps.Point(0, 0),
        scale: 0.5
      }}
      zIndex={99}
    ></Marker>
  )
}
