import { Tabs } from './Tabs'
import { GeneralMetrics } from '&track/domains/dashboard/page/GeneralMetrics'

export function Dashboard() {
  return (
    <div className="flex flex-col bg-gray-100 min-h-screen px-8 py-4">
      <GeneralMetrics />
      <Tabs />
    </div>
  )
}
