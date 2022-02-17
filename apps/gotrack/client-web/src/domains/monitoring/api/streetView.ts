export function toggleStreetView(
  lat: number,
  lng: number,
  rotation: number,
  panorama
) {
  panorama.setPosition({ lat, lng })
  const toggle = panorama.getVisible()

  if (toggle == false) {
    panorama.setVisible(true)
    const oldPov = panorama.getPov()

    panorama.setPov({
      heading: rotation,
      pitch: oldPov.pitch,
      zoom: oldPov.zoom
    })
  } else {
    panorama.setVisible(false)
  }
}
export function setPositionStreetView(
  lat: number,
  lng: number,
  rotation: number,
  panorama
) {
  panorama.setPosition({ lat, lng })
  const oldPov = panorama.getPov()

  panorama.setPov({
    heading: rotation,
    pitch: oldPov.pitch,
    zoom: oldPov.zoom
  })
}
