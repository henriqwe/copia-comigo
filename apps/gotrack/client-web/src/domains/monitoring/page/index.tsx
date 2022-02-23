import React, { useEffect } from 'react'

import {
  useLocalization,
  useMap,
  usePath,
  useVehicle
} from '&track/domains/monitoring'
import * as blocks from '@comigo/ui-blocks'
import * as common from '@comigo/ui-common'

import Map from './Map/Map'
import { getStreetNameByLatLng } from '&track/domains/monitoring/serviceHttp'
import { setPositionStreetView } from '&track/domains/monitoring/api/streetView'

export function Localization() {
  const {
    localizationSchema,
    openCardKey,
    setOpenCardKey,
    pageCard,
    setPageCard,
    handlerClickOnVehicleMarker
  } = useLocalization()
  const {
    mapa,
    trafficLayer,
    showBounceMarker,
    panorama,
    setShowInfoWindowsInMapData,
    setShowMarkerClusterer
  } = useMap()
  const {
    refsPathVehicle,
    consultVehicleHistoric,
    vehicleConsultData,
    setVehicleConsultData
  } = usePath()
  const { allUserVehicle, selectedVehicle, refsCardVehicle, vehiclesRefetch } =
    useVehicle()

  useEffect(() => {
    vehiclesRefetch()
    setInterval(async () => {
      if (vehicleConsultData?.length === 0) {
        vehiclesRefetch()
      }
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
        style={{ maxHeight: '95%', minHeight: '2.5rem' }}
      >
        <div className="w-[21rem]">
          <blocks.MonitoringPanel
            allUserVehicle={allUserVehicle}
            schemaYup={localizationSchema}
            consultVehicleHistoric={consultVehicleHistoric}
            vehicleConsultData={vehicleConsultData}
            getStreetNameByLatLng={getStreetNameByLatLng}
            selectedVehicle={selectedVehicle}
            handlerClickOnVehicleMarker={handlerClickOnVehicleMarker}
            showBounceMarker={showBounceMarker}
            refsCardVehicle={refsCardVehicle}
            refsPathVehicle={refsPathVehicle}
            openCardKey={openCardKey}
            setOpenCardKey={setOpenCardKey}
            pageCard={pageCard}
            setPageCard={setPageCard}
            setPositionStreetView={setPositionStreetView}
            panorama={panorama}
            setShowInfoWindowsInMapData={setShowInfoWindowsInMapData}
            setShowMarkerClusterer={setShowMarkerClusterer}
            setVehicleConsultData={setVehicleConsultData}
          />
        </div>
      </div>
      <div className="w-full h-screen">
        <Map />
      </div>
    </>
  )
}
