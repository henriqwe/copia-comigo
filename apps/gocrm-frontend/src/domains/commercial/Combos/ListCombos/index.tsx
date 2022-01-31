import * as combos from '&crm/domains/commercial/Combos'
import * as blocks from '@comigo/ui-blocks'

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
