import { VehicleStatus } from '../../components/VehicleStatus'
import { MonthlyBalance } from '../../components/MonthlyBalance'
import { RealTime } from '../../components/RealTime'

export function GeneralMetrics() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <VehicleStatus />
      <MonthlyBalance />
      <RealTime />
    </div>
  )
}
