import React, { useEffect } from 'react'

import {
  useLocalization,
  useMap,
  usePath,
  useVehicle
} from '&track/domains/monitoring'
import * as blocks from '@comigo/ui-blocks'
import * as common from '@comigo/ui-common'

import { Map } from './Map'
import { getStreetNameByLatLng } from '&track/domains/monitoring/serviceHttp'

export function Localization() {
  const {
    localizationSchema,
    openCardKey,
    setOpenCardKey,
    pageCard,
    setPageCard,
    handlerClickOnVehicleMarker
  } = useLocalization()
  const { mapa, trafficLayer, showBounceMarker } = useMap()
  const { refsPathVehicle, consultVehicleHistoric, vehicleConsultData } =
    usePath()
  const {
    allUserVehicle,
    selectedVehicle,
    refsCardVehicle,
    showAllVehiclesInMap,
    vehiclesRefetch
  } = useVehicle()

  useEffect(() => {
    vehiclesRefetch()
    setInterval(async () => {
      vehiclesRefetch()
    }, 30000)
  }, [])

  return (
    <>
      <div className="absolute z-50 right-0 bottom-0 flex mr-2.5 mb-52">
        <common.buttons.ToggleTrafficButton
          trafficLayer={trafficLayer}
          mapa={mapa}
        />
      </div>
      <div
        className="absolute z-50 right-0 flex mr-16 mt-2.5"
        style={{ height: '95%' }}
      >
        <div className="w-[21rem]">
          <blocks.MonitoringPanel
            allUserVehicle={allUserVehicle}
            schemaYup={localizationSchema}
            consultVehicleHistoric={consultVehicleHistoric}
            vehicleConsultData={vehicleConsultData}
            getStreetNameByLatLng={getStreetNameByLatLng}
            showAllVehiclesInMap={showAllVehiclesInMap}
            selectedVehicle={selectedVehicle}
            handlerClickOnVehicleMarker={handlerClickOnVehicleMarker}
            showBounceMarker={showBounceMarker}
            refsCardVehicle={refsCardVehicle}
            refsPathVehicle={refsPathVehicle}
            openCardKey={openCardKey}
            setOpenCardKey={setOpenCardKey}
            pageCard={pageCard}
            setPageCard={setPageCard}
          />
        </div>
      </div>
      <div className="w-full h-screen">
        <Map localizations={allUserVehicle} />
      </div>
    </>
  )
}
