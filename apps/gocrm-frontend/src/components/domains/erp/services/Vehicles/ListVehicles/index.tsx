import * as blocks from '@/blocks'
import * as vehicles from '@/domains/erp/services/Vehicles'

export default function List() {
  const { vehiclesData } = vehicles.useVehicle()
  return vehiclesData ? (
    <blocks.Table
      colection={vehiclesData}
      columnTitles={[{ title: 'Apelido', fieldName: 'Apelido' }]}
      actions={vehicles.RowActions}
    />
  ) : (
    <blocks.TableSkeleton />
  )
}
