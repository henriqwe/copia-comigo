import * as common from '@comigo/ui-common'
import { Dispatch, SetStateAction } from 'react'

import { vehicleType } from '../MonitoringPanel'

type pagAllVehiclesProps = {
  inputSearchValue: string
  setInputSearchValue: Dispatch<SetStateAction<string>>
  vehiclesInTransit: vehicleType[]
  vehiclesStopped: vehicleType[]
  vehiclesOff: vehicleType[]
  setPageCard: Dispatch<SetStateAction<string>>
  handlerClickOnVehicleMarker: Dispatch<SetStateAction<vehicleType | undefined>>
  refsCardVehicle: React.MutableRefObject<any[]>
  shearchVehicle: vehicleType[]
  openCardKey: number | undefined
  setOpenCardKey: Dispatch<SetStateAction<number | undefined>>
  getStreetNameToCard(vehicle: vehicleType): Promise<{
    addressInfo: any
    addressName: any
    addressComplete: any
  }>
}

export function AllVehiclesPanel({
  inputSearchValue,
  setInputSearchValue,
  vehiclesInTransit,
  vehiclesStopped,
  vehiclesOff,
  setPageCard,
  handlerClickOnVehicleMarker,
  refsCardVehicle,
  shearchVehicle,
  openCardKey,
  setOpenCardKey,
  getStreetNameToCard
}: pagAllVehiclesProps) {
  return (
    <>
      <div className="">
        <div className="px-3 py-3 bg-gray-100">
          <div className="rounded-sm ring-1 ring-gray-300">
            <common.form.Input
              fieldName="Veículos"
              title="Pesquise o veiculo aqui"
              onChange={(e) => {
                setInputSearchValue(e.target.value)
              }}
              value={inputSearchValue}
            />
          </div>
        </div>
      </div>
      <div className="flex-1 px-3 py-2 overflow-y-scroll">
        <ul>
          {shearchVehicle.length > 0 &&
            shearchVehicle.map((vehicle) => {
              return (
                <li
                  key={vehicle.carro_id}
                  ref={(elem) => {
                    const ref_index = refsCardVehicle?.current.findIndex(
                      (ref) => {
                        if (ref?.carro_id === vehicle.carro_id) return ref
                      }
                    )
                    if (ref_index !== -1) {
                      refsCardVehicle.current[ref_index] = {
                        elem: elem,
                        carro_id: vehicle.carro_id
                      }
                      return
                    }
                    refsCardVehicle.current.push({
                      elem: elem,
                      carro_id: vehicle.carro_id
                    })
                  }}
                  onClick={() => {
                    handlerClickOnVehicleMarker(vehicle)
                    if (vehicle.carro_id !== openCardKey) {
                      setOpenCardKey(vehicle.carro_id)
                      return
                    }
                    setOpenCardKey(undefined)
                  }}
                >
                  <common.CardVehicle
                    setPageCard={setPageCard}
                    handlerClickOnVehicleMarker={handlerClickOnVehicleMarker}
                    vehicle={vehicle}
                    open={vehicle.carro_id === openCardKey}
                    getStreetNameToCard={getStreetNameToCard}
                  />
                </li>
              )
            })}
        </ul>
        {vehiclesOff.length === 0 &&
          vehiclesStopped.length === 0 &&
          vehiclesInTransit.length === 0 && (
            <div className="flex justify-center w-full mt-4">
              <common.EmptyContent />
            </div>
          )}
      </div>
    </>
  )
}
