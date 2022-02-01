import * as purchaseOrders from '&test/components/domains/erp/purchases/PurchaseOrders'
import * as blocks from '&test/components/blocks'

export default function List() {
  const { purchaseOrderData } = purchaseOrders.useList()
  return purchaseOrderData ? (
    <blocks.Table
      colection={purchaseOrderData}
      columnTitles={[
        {
          title: 'Situação',
          fieldName: 'Comentario',
          type: 'relationship',
          relationshipName: 'Situacao'
        },
        { title: 'Solicitante', fieldName: 'Solicitante_Id' },
        {
          title: 'Data de abertura',
          fieldName: 'DataAbertura',
          type: 'date'
        }
      ]}
      actions={purchaseOrders.RowActions}
    />
  ) : (
    <blocks.TableSkeleton />
  )
}
