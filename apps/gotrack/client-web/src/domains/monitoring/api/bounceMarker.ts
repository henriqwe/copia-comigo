export function handleBounceMarker(coords, map, setBounceMarker) {
  map.setCenter({
    lat: Number(coords.latitude),
    lng: Number(coords.longitude)
  })
  setBounceMarker(null)

  setBounceMarker({
    lat: Number(coords.latitude),
    lng: Number(coords.longitude)
  })
  setTimeout(() => {
    setBounceMarker(null)
  }, 5000)
}
