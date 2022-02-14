import React from 'react'
import MainMenuItems from '&customers/components/MainMenuItens'
import { DashboardPage } from '&customers/components/dashboard'
import * as blocks from '@comigo/ui-blocks'

export default function Index() {
  return <Page />
}

export function Page() {
  return (
    <div className="flex max-h-screen overflow-y-auto">
      <div className="h-screen sticky top-0 z-50">
        <blocks.SideBarGoCustomers MainMenuItems={MainMenuItems} />
      </div>
      <div className="w-full">
        <DashboardPage />
      </div>
    </div>
  )
}
