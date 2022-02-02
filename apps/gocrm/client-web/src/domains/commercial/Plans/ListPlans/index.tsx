import * as blocks from '@comigo/ui-blocks';
import * as plans from '&crm/domains/commercial/Plans';

export default function List() {
  const { plansData } = plans.useList();
  return plansData ? (
    <blocks.Table
      colection={plansData}
      columnTitles={[
        {
          title: 'Nome',
          fieldName: 'Nome',
        },
        {
          title: 'Serviço',
          fieldName: 'Nome',
          type: 'relationship',
          relationshipName: 'Servico',
        },
      ]}
      actions={plans.RowActions}
    />
  ) : (
    <blocks.TableSkeleton />
  );
}