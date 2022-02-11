import React from 'react'

import * as blocks from '@comigo/ui-blocks'
import {
  LocalizationProvider,
  MapProvider,
  PathProvider,
  VehicleProvider
} from '&track/domains/monitoring'

import MainMenuItems from '&track/domains/MainMenuItens'
import { Localization } from '&track/domains/monitoring/page'

export default function Monitoring() {
  return (
    <MapProvider>
      <VehicleProvider>
        <PathProvider>
          <LocalizationProvider>
            <Page />
          </LocalizationProvider>
        </PathProvider>
      </VehicleProvider>
    </MapProvider>
  )
}

export function Page() {
  return (
    <div className="flex max-h-screen">
      <div className="sticky top-0 z-50 h-screen">
        <blocks.SideBarGoCustomers MainMenuItems={MainMenuItems} />
      </div>
      <Localization />
    </div>
  )
}
