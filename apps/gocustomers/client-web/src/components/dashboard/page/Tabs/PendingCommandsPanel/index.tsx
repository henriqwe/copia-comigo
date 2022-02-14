import * as common from '@comigo/ui-common'
import { PendingCommandsTable } from './PendingCommandsTable'
export function PendingCommandsPanel() {
  return (
    <div className="col-span-12">
      <span className="text-xl font-medium w-full flex text-gray-900">
        Comandos pendentes
      </span>
      <div className=" mt-3">
        <div className="px-4">
          <PendingCommandsTable />
        </div>
      </div>
    </div>
  )
}
