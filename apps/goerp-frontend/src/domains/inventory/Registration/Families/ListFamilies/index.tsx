import * as blocks from '@comigo/ui-blocks'
import * as families from '&erp/domains/inventory/Registration/Families'

export function List() {
  const { familiesData } = families.useFamily()
  return familiesData ? (
    <blocks.Table
      colection={familiesData.estoque_Familias}
      columnTitles={[
        { title: 'Nome', fieldName: 'Nome' },
        { title: 'Descrição', fieldName: 'Descricao' }
      ]}
      actions={families.RowActions}
    />
  ) : (
    <blocks.TableSkeleton />
  )
}
