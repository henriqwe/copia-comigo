import * as itens from '&crm/domains/inventory/Itens';
import * as blocks from '@comigo/ui-blocks';

export default function LogsList() {
  const { logsItensData } = itens.useUpdate();
  return logsItensData ? (
    <blocks.Table
      colection={logsItensData}
      columnTitles={[
        { title: 'Operação', fieldName: 'Operacao' },
        { title: 'Data', fieldName: 'created_at', type: 'date' },
      ]}
    />
  ) : (
    <blocks.TableSkeleton />
  );
}
