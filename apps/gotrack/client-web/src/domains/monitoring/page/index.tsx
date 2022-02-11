import React, { useEffect } from 'react'

import * as blocks from '@comigo/ui-blocks'
import * as common from '@comigo/ui-common'
import {
  useLocalization,
  useMap,
  usePath,
  useVehicle
} from '&track/domains/monitoring'

import { getStreetNameByLatLng } from '&track/domains/monitoring/serviceHttp'

export function Localization() {
  const {
    localizationSchema,
    openCardKey,
    setOpenCardKey,
    pageCard,
    setPageCard,
    localizationsRefetch,
    handlerClickOnVehicleMarker
  } = useLocalization()
  const { mapa, trafficLayer, initMap, showBounceMarker } = useMap()
  const { refsPathVehicle, consultVehicleHistoric, vehicleConsultData } =
    usePath()
  const {
    allUserVehicle,
    selectedVehicle,
    refsCardVehicle,
    showAllVehiclesInMap
  } = useVehicle()

  useEffect(() => {
    initMap()
    localizationsRefetch()
    setInterval(async () => {
      localizationsRefetch()
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
        <div className="w-80">
          <blocks.FloatingCard
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
      <div className="w-full h-screen" id="googleMaps" />
    </>
  )
}
