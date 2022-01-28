import * as outgoingOrders from '&erp/domains/outgoingOrders'
import * as blocks from '@comigo/ui-blocks'

export default function List() {
  const { outGoingOrdersData } = outgoingOrders.useList()
  return outGoingOrdersData ? (
    <blocks.Table
      colection={outGoingOrdersData}
      columnTitles={[
        { title: 'Id', fieldName: 'Id' },
        {
          title: 'Situação',
          fieldName: 'Comentario',
          type: 'relationship',
          relationshipName: 'Situacao'
        },
        {
          title: 'Data de abertura',
          fieldName: 'DataAbertura',
          type: 'date'
        }
      ]}
      actions={outgoingOrders.rowActions}
    />
  ) : (
    <blocks.TableSkeleton />
  )
}