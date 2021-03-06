import * as proposals from '&crm/domains/commercial/Proposals';
import * as blocks from '@comigo/ui-blocks';

export default function List() {
  const { proposalsData } = proposals.useList();
  return proposalsData ? (
    <blocks.Table
      colection={proposalsData}
      columnTitles={[
        {
          title: 'Situação',
          fieldName: 'Comentario',
          type: 'relationship',
          relationshipName: 'Situacao',
        },
        {
          title: 'Data de criação',
          fieldName: 'created_at',
          type: 'date',
        },
      ]}
      actions={proposals.RowActions}
    />
  ) : (
    <blocks.TableSkeleton />
  );
}
