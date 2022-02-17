export function toggleStreetView(lat: number, lng: number, panorama) {
  panorama.setPosition({ lat, lng })
  const toggle = panorama.getVisible()

  if (toggle == false) {
    panorama.setVisible(true)
  } else {
    panorama.setVisible(false)
  }
}
