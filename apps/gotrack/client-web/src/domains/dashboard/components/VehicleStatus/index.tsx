import * as common from '@comigo/ui-common'
import { MultiColorProgressBar } from '../MultiColorProgressBar'

export function VehicleStatus() {
  return (
    <div className="col-span-5 ">
      <span className="text-xl font-medium w-full flex  text-gray-900">
        Comunicação dos veículos
      </span>
      <common.Card compact className="  flex-1 mt-3 h-48 flex">
        <div className="flex w-full justify-between px-4 flex-1">
          <MultiColorProgressBar />
        </div>
      </common.Card>
    </div>
  )
}
