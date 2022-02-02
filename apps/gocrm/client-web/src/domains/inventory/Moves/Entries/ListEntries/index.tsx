import * as entries from '&crm/domains/inventory/Moves/Entries';
import * as blocks from '@comigo/ui-blocks';

export default function List() {
  const { purchaseOrdersData } = entries.useList();
  return purchaseOrdersData ? (
    <blocks.Table
      colection={purchaseOrdersData}
      columnTitles={[
        {
          title: 'Situação',
          fieldName: 'Comentario',
          type: 'relationship',
          relationshipName: 'Situacao',
        },
        { title: 'Solicitante', fieldName: 'Solicitante_Id' },
      ]}
      actions={entries.RowActions}
    />
  ) : (
    <blocks.TableSkeleton />
  );
}
