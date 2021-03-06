import axios from 'axios'
import * as utils from '@comigo/utils'

export async function getVehicleLocationRealTime(carro_id: string) {
  try {
    const { data } = await axios.post(
      'https://integration.chaser.com.br/mobile/api/veiculo/localizacao/temporeal',
      {
        carro_id
      }
    )
    return data
  } catch (err: any) {
    utils.showError(err)
  }
}

export async function getAllUserVehicles(email: string) {
  try {
    const { data } = await axios.post(
      'https://integration.chaser.com.br/mobile/api/veiculo/usuario',
      {
        email
      }
    )
    return data
  } catch (err: any) {
    utils.showError(err)
  }
}

export async function getVehicleHistoric(
  carro_id: string,
  inicio: string,
  fim: string
) {
  try {
    const { data } = await axios.post(
      'https://integration.chaser.com.br/mobile/api/veiculo/localizacao',
      {
        carro_id,
        inicio,
        fim
      }
    )
    return data
  } catch (err: any) {
    utils.showError(err)
  }
}

export async function getStreetNameByLatLng(
  lat: number | string,
  lng: number | string
) {
  try {
    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyA13XBWKpv6lktbNrPjhGD_2W7euKEZY1I`
    )

    return data
  } catch (err: any) {
    utils.showError(err)
  }
}
