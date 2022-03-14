import axios from 'axios'

export async function getItemIdentifier(IdentifierType: string, Identifier: string) {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname
    let value = ''
    switch (IdentifierType) {
      case 'chips':
        await axios
          .get(
            `http://${hostname}:3002/api/identificaveis/chips?Id=${Identifier}`
          )
          .then(({ data }) => {
            value = data.data.NumeroDaLinha
          })
        break
      case 'equipamentos':
        await axios
          .get(
            `http://${hostname}:3002/api/identificaveis/equipment?Id=${Identifier}`
          )
          .then(({ data }) => {
            value = data.data.Imei
          })
        break
      case 'identificadores':
        await axios
          .get(
            `http://${hostname}:3002/api/identificaveis/identifier?Id=${Identifier}`
          )
          .then(({ data }) => {
            value = data.data.CodigoIdentificador
          })
        break
      case 'rastreadores':
        await axios
          .get(
            `http://${hostname}:3002/api/identificaveis/tracker?Id=${Identifier}`
          )
          .then(({ data }) => {
            value =
              'RTDR - ' +
              data.data.CodigoReferencia +
              ' - ' +
              data.data.Chip.NumeroDaLinha +
              ' - ' +
              data.data.Equipamento.Imei
          })
        break
      case 'kitsDeInsumo':
        await axios
          .get(
            `http://${hostname}:3002/api/identificaveis/inputKits?Id=${Identifier}`
          )
          .then(({ data }) => {
            value = 'KTISM - ' + data.data.CodigoReferencia
          })
        break
      case 'kitsDeInstalacao':
        await axios
          .get(
            `http://${hostname}:3002/api/identificaveis/installationKits?Id=${Identifier}`
          )
          .then(({ data }) => {
            value =
              'KTIST - ' +
              data.data.CodigoReferencia +
              ' - ' +
              data.data.Rastreador.Chip.NumeroDaLinha +
              ' - ' +
              data.data.Rastreador.Equipamento.Imei
          })
        break
    }
    return value
  }
}
