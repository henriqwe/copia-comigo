import { vehicleType } from './CardVehicle'

export function setStatusConnectionTitleAndColor(vehicle: vehicleType) {
  const dataHoraminus1 = new Date()
  const dataHoraminus6 = new Date()
  const dataHoraminus24 = new Date()
  const dataHoraminus48 = new Date()
  const dataHoraminus72 = new Date()

  dataHoraminus1.setHours(dataHoraminus1.getHours() - 1)
  dataHoraminus6.setHours(dataHoraminus6.getHours() - 6)
  dataHoraminus24.setHours(dataHoraminus24.getHours() - 24)
  dataHoraminus48.setHours(dataHoraminus48.getHours() - 48)
  dataHoraminus72.setHours(dataHoraminus72.getHours() - 72)

  if (new Date(vehicle.date_rastreador) > dataHoraminus1) {
    return { title: 'Última atualização: 0 - 1h', color: 'text-blue-600' }
  }
  if (
    new Date(vehicle.date_rastreador) < dataHoraminus1 &&
    new Date(vehicle.date_rastreador) > dataHoraminus6
  ) {
    return { title: 'Última atualização: 1 - 6h', color: 'text-blue-500' }
  }

  if (
    new Date(vehicle.date_rastreador) < dataHoraminus6 &&
    new Date(vehicle.date_rastreador) > dataHoraminus24
  ) {
    return { title: 'Última atualização: 6 - 24h', color: 'text-yellow-500' }
  }

  if (
    new Date(vehicle.date_rastreador) < dataHoraminus24 &&
    new Date(vehicle.date_rastreador) > dataHoraminus48
  ) {
    return { title: 'Última atualização: 24 - 48h', color: 'text-orange-500' }
  }

  if (
    new Date(vehicle.date_rastreador) < dataHoraminus48 &&
    new Date(vehicle.date_rastreador) > dataHoraminus72
  ) {
    return { title: 'Última atualização: 48 - 72h', color: 'text-pink-500' }
  }
  // > dataHoraminus72
  return { title: 'Última atualização: mais de 72h', color: 'text-red-500' }
}

export function setStatusEngine(vehicle: vehicleType) {
  if (vehicle.ligado === 1 && Math.floor(Number(vehicle.speed)) >= 1) {
    return { title: 'Ligado', color: 'bg-green-500' }
  }
  if (vehicle.ligado === 1 && Math.floor(Number(vehicle.speed)) === 0) {
    return { title: 'Parado', color: 'bg-blue-500' }
  }
  return { title: 'Desligado', color: 'bg-gray-500' }
}

export function setVelocityColor(vehicle: vehicleType) {
  if (Math.floor(Number(vehicle.speed)) === 0) {
    return 'text-gray-500 border-gray-200 bg-gray-100'
  }
  if (Math.floor(Number(vehicle.speed)) >= 80) {
    return 'text-red-500 border-red-200 bg-red-100'
  }
  return 'text-blue-500 border-blue-200 bg-blue-100'
}
