import * as common from '@comigo/ui-common'
import { VehicleCommunicationPanel } from './VehicleCommunicationPanel'
import { NewEntriesPanel } from './NewEntriesPanel'
import { Tabs } from './Tabs'

export function DashboardPage() {
  return <Page />
}

function Page() {
  return (
    <div className="flex flex-col bg-gray-100 min-h-screen px-8 py-4">
      <div className="grid grid-cols-12 gap-4">
        <VehicleCommunicationPanel />
        <NewEntriesPanel />
        <div className="col-span-4">
          <span className="text-xl font-medium w-full flex text-gray-900 ">
            Gráfico
          </span>
          <common.Card compact className="col-span-5  flex flex-1 mt-3 h-48">
            <span>Conteúdo</span>
          </common.Card>
        </div>
      </div>
      <Tabs />
    </div>
  )
}
