import * as combos from '&test/components/domains/erp/commercial/Combos'
import * as blocks from '&test/components/blocks'

export default function List() {
  const { combosData } = combos.useList()
  return combosData ? (
    <blocks.Table
      colection={combosData}
      columnTitles={[{ title: 'Nome', fieldName: 'Nome' }]}
      actions={combos.RowActions}
    />
  ) : (
    <blocks.TableSkeleton />
  )
}
