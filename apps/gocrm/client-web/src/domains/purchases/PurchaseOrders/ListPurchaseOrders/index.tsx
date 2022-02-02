import * as purchaseOrders from '&crm/domains/purchases/PurchaseOrders';
import * as blocks from '@comigo/ui-blocks';

export default function List() {
  const { purchaseOrderData } = purchaseOrders.useList();
  return purchaseOrderData ? (
    <blocks.Table
      colection={purchaseOrderData}
      columnTitles={[
        {
          title: 'Situação',
          fieldName: 'Comentario',
          type: 'relationship',
          relationshipName: 'Situacao',
        },
        { title: 'Solicitante', fieldName: 'Solicitante_Id' },
        {
          title: 'Data de abertura',
          fieldName: 'DataAbertura',
          type: 'date',
        },
      ]}
      actions={purchaseOrders.RowActions}
    />
  ) : (
    <blocks.TableSkeleton />
  );
}