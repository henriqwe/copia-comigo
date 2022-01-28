import * as entries from '&erp/domains/inventory/Moves/Entries'
import * as blocks from '@comigo/ui-blocks'

export function List() {
  const { purchaseOrdersData } = entries.useList()
  return purchaseOrdersData ? (
    <blocks.Table
      colection={purchaseOrdersData}
      columnTitles={[
        {
          title: 'Situação',
          fieldName: 'Comentario',
          type: 'relationship',
          relationshipName: 'Situacao'
        },
        { title: 'Solicitante', fieldName: 'Solicitante_Id' }
      ]}
      actions={entries.RowActions}
    />
  ) : (
    <blocks.TableSkeleton />
  )
}
