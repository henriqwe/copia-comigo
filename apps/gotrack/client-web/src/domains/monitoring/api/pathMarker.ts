import { vehicleType } from './vehicle'

export function generateIcon(
  vehicle: vehicleType,
  index: number,
  arrayLength: number
) {
  if (index === arrayLength - 1) {
    return {
      path: 'M43.2988 38.2699C46.253 34.2813 48 29.3447 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 29.3447 1.74705 34.2813 4.70122 38.2699L24 71L43.2988 38.2699ZM20 15H14V35H20V15ZM34 15H28V35H34V15Z',
      strokeColor: '#000',
      fillColor: '#ED2121',
      rotation: 0,
      indexIcon: 10,
      labelIcon: {
        text: 'Fim',
        color: 'black',
        fontSize: '16px',
        fontWeight: 'bold',
        className: 'mb-5 ml-4'
      },
      titleIcon: 'Fim',
      scale: 0.4,
      strokeWeight: 1.5,
      fillOpacity: 1,
      anchor: new google.maps.Point(20, 70)
    }
  }
  if (index === 0) {
    return {
      path: 'M43.2988 38.2699C46.253 34.2813 48 29.3447 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 29.3447 1.74705 34.2813 4.70122 38.2699L24 71L43.2988 38.2699ZM35 24L18.5 33.5263V14.4737L35 24Z',
      strokeColor: '#000',
      fillColor: '#2135ED',
      rotation: 0,
      indexIcon: 10,
      labelIcon: {
        text: 'Início',
        color: 'black',
        fontSize: '16px',
        fontWeight: 'bold',
        className: 'mb-5 ml-4'
      },
      titleIcon: 'Início',
      scale: 0.4,
      strokeWeight: 1.5,
      fillOpacity: 1,
      anchor: new google.maps.Point(20, 70)
    }
  }
  if (vehicle.ligado && Number(vehicle.speed) < 1) {
    return {
      path: 'M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48ZM35 13H13V35H35V13Z',
      strokeColor: '#2135ED',
      fillColor: '#fff',
      rotation: 0,
      indexIcon: 1,
      labelIcon: '',
      titleIcon: 'Parado',
      scale: 0.4,
      strokeWeight: 2.5,
      fillOpacity: 1,
      anchor: new google.maps.Point(20, 25)
    }
  }
  if (!vehicle.ligado) {
    return {
      path: 'M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48ZM22.5858 9.58579L9.85787 22.3137C9.07682 23.0948 9.07682 24.3611 9.85787 25.1421C10.6389 25.9232 11.9052 25.9232 12.6863 25.1421L22 15.8284L22 36H26L26 15.8284L35.3137 25.1421C36.0948 25.9232 37.3611 25.9232 38.1421 25.1421C38.9232 24.3611 38.9232 23.0948 38.1421 22.3137L25.4142 9.58579C24.6332 8.80474 23.3668 8.80474 22.5858 9.58579Z',
      strokeColor: '#636363',
      fillColor: '#fff',
      rotation: 0,
      indexIcon: 1,
      labelIcon: '',
      titleIcon: 'Desligado',
      scale: 0.4,
      strokeWeight: 2.5,
      fillOpacity: 1,
      anchor: new google.maps.Point(20, 35)
    }
  }
  if (Number(vehicle.speed) > 80) {
    return {
      path: 'M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48ZM33.5263 29.5L24 13L14.4737 29.5H33.5263Z',
      strokeColor: '#ff8800',
      fillColor: '#fff',
      rotation: 0,
      indexIcon: 2,
      labelIcon: '',
      titleIcon: 'Evento de velocidade',
      scale: 0.4,
      strokeWeight: 2.5,
      fillOpacity: 1,
      anchor: new google.maps.Point(20, 35)
    }
  }
  return {
    path: 'M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48ZM22.5858 9.58579L9.85787 22.3137C9.07682 23.0948 9.07682 24.3611 9.85787 25.1421C10.6389 25.9232 11.9052 25.9232 12.6863 25.1421L22 15.8284L22 36H26L26 15.8284L35.3137 25.1421C36.0948 25.9232 37.3611 25.9232 38.1421 25.1421C38.9232 24.3611 38.9232 23.0948 38.1421 22.3137L25.4142 9.58579C24.6332 8.80474 23.3668 8.80474 22.5858 9.58579Z',
    strokeColor: '#009F23',
    fillColor: '#fff',
    rotation: Number(vehicle.crs),
    indexIcon: 1,
    labelIcon: '',
    titleIcon: 'Em movimento',
    scale: 0.4,
    strokeWeight: 2.5,
    fillOpacity: 1,
    anchor: new google.maps.Point(20, 35)
  }
}
