import React from 'react'

import * as blocks from '@comigo/ui-blocks'

import MainMenuItems from '&track/domains/MainMenuItens'
import { Dashboard } from '&track/domains/dashboard'
import {
  LocalizationProvider,
  MapProvider,
  PathProvider,
  VehicleProvider
} from '&track/domains/monitoring'

export default function Index() {
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
    <div className="flex max-h-screen overflow-y-auto">
      <div className="h-screen sticky top-0 z-50">
        <blocks.SideBarGoCustomers MainMenuItems={MainMenuItems} />
      </div>
      <div className="w-full">
        <Dashboard />
      </div>
    </div>
  )
}
