import * as blocks from '@comigo/ui-blocks'
import * as vehicles from '&crm/domains/services/Vehicles'

export default function List() {
  const { vehiclesData } = vehicles.useVehicle()
  return vehiclesData ? (
    <blocks.Table
      colection={vehiclesData}
      columnTitles={[
        { title: 'Placa', fieldName: 'Placa' },
        { title: 'Chassi', fieldName: 'NumeroDoChassi' },
        { title: 'Apelido', fieldName: 'Apelido' }
      ]}
      actions={vehicles.RowActions}
    />
  ) : (
    <blocks.TableSkeleton />
  )
}
