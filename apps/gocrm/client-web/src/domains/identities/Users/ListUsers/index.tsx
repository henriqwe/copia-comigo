import * as blocks from '@comigo/ui-blocks';
import * as users from '&crm/domains/identities/Users';

export default function List() {
  const { usersData } = users.useUser();
  return usersData ? (
    <blocks.Table
      colection={usersData}
      columnTitles={[
        {
          title: 'Cliente',
          fieldName: 'Cliente',
          type: 'handler',
          handler: (cliente) => (cliente ? cliente.Pessoa.Nome : ''),
        },
        {
          title: 'Colaborador',
          fieldName: 'Colaborador',
          type: 'handler',
          handler: (colaborador) =>
            colaborador ? colaborador.Pessoa.Nome : '',
        },
      ]}
      actions={users.RowActions}
    />
  ) : (
    <blocks.TableSkeleton />
  );
}