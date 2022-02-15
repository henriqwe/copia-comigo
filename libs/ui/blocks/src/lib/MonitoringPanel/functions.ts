import { vehicleType } from './MonitoringPanel'

export function currentDateAndTime(type = '') {
  const date = new Date()
  let day: string | number = date.getDate()
  let month: string | number = date.getMonth() + 1
  const year = date.getFullYear()
  if (day < 10) day = '0' + day
  if (month < 10) month = '0' + month

  if (type === 'onlyDate') return year + '-' + month + '-' + day + 'T00:00:00'

  let hour: string | number = date.getHours()
  let minute: string | number = date.getMinutes()
  if (hour < 10) hour = '0' + hour
  if (minute < 10) minute = '0' + minute

  return year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':00'
}

export function sortByPlaca(allUserVehicle: vehicleType[]) {
  return allUserVehicle.sort((a, b) => {
    if ((a.placa || 0) > (b.placa || 0)) {
      return 1
    }
    if ((a.placa || 0) < (b.placa || 0)) {
      return -1
    }
    return 0
  })
}
