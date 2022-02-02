import * as blocks from '@comigo/ui-blocks';

import * as clients from '&crm/domains/identities/Clients';

export default function LogsList() {
  const { clientLogsData } = clients.useUpdate();

  return clientLogsData ? (
    <blocks.Table
      colection={clientLogsData}
      columnTitles={[
        { title: 'Operação', fieldName: 'Operacao' },
        { title: 'Data', fieldName: 'created_at', type: 'date' },
      ]}
    />
  ) : (
    <blocks.TableSkeleton />
  );
}
