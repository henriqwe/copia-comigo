import * as purchaseOrders from '&erp/domains/purchases/PurchaseOrders'
import * as blocks from '@comigo/ui-blocks'

export function LogsList() {
  const { purchaseOrderLogsData } = purchaseOrders.useUpdate()
  return purchaseOrderLogsData ? (
    <blocks.Table
      colection={purchaseOrderLogsData}
      columnTitles={[
        { title: 'Operação', fieldName: 'Operacao' },
        { title: 'Data', fieldName: 'created_at', type: 'date' }
      ]}
    />
  ) : (
    <blocks.TableSkeleton />
  )
}
