import * as common from '@comigo/ui-common'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { CardBody } from './CardBody'
import { CardHearder } from './CardHeader'

export type vehicleType = {
  crs: string
  data: string
  dist: string
  latitude: string
  ligado: number
  longitude: string
  speed: string
  carro_id?: number
  placa?: string
  chassis?: string
  renavan?: string
  ano_modelo?: string
  cor?: string
  veiculo?: string
  carro_fabricante?: string
  carro_categoria?: string
  carro_tipo?: string
  combustivel?: string
  ano?: string
  frota?: string
  imei?: string
  date_rastreador?: string
}
export interface CardVehicleProps {
  className?: string
  setPageCard: Dispatch<SetStateAction<string>>
  vehicle: vehicleType
  open: boolean
  handlerClickOnVehicleMarker: Dispatch<SetStateAction<vehicleType | undefined>>
  getStreetNameToCard(vehicle: vehicleType): Promise<{
    addressInfo: any
    addressName: any
    addressComplete: any
  }>
}

export function CardVehicle({
  className,
  setPageCard,
  vehicle,
  open = false,
  handlerClickOnVehicleMarker,
  getStreetNameToCard
}: CardVehicleProps) {
  const [address, setAddress] = useState({
    name: 'Carregando...',
    info: '',
    complete: ''
  })

  useEffect(() => {
    if (open) {
      getStreetNameToCard(vehicle).then(
        ({ addressInfo, addressName, addressComplete }) => {
          setAddress({
            name: addressInfo,
            info: addressName,
            complete: addressComplete
          })
        }
      )
    }
  }, [open])
  return (
    <common.Card
      compact
      className={`!bg-gray-100 my-2 text-gray-600 cursor-pointer ${className}`}
    >
      <CardHearder vehicle={vehicle} />
      {open && (
        <CardBody
          address={address}
          setPageCard={setPageCard}
          handlerClickOnVehicleMarker={handlerClickOnVehicleMarker}
          vehicle={vehicle}
        />
      )}
    </common.Card>
  )
}

export default CardVehicle
