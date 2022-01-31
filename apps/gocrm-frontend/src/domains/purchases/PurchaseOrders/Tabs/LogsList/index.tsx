import * as purchaseOrders from '&crm/domains/purchases/PurchaseOrders'
import * as blocks from '@comigo/ui-blocks'

export default function LogsList() {
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
