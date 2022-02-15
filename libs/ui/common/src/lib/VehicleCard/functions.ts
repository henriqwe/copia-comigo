import { vehicleType } from './VehicleCard'

export function setColorStatus(vehicle: vehicleType) {
  if (Number(vehicle.speed) > 80) {
    return { color: 'bg-red-500', title: 'Evento de velocidade' }
  }
  if (Number(vehicle.speed).toFixed() === '0' && vehicle.ligado === 0) {
    return { color: 'bg-gray-500', title: 'Desligado' }
  }
  if (Number(vehicle.speed).toFixed() === '0' && vehicle.ligado === 1) {
    return { color: 'bg-blue-400', title: 'Parado' }
  }
  return { color: 'bg-blue-700', title: 'Em movimento' }
}
