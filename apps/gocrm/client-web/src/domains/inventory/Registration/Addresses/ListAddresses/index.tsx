import * as blocks from '@comigo/ui-blocks';
import * as addresses from '&crm/domains/inventory/Registration/Addresses';

export default function List() {
  const { adresssesData } = addresses.useAddressing();
  return adresssesData ? (
    <blocks.Table
      colection={adresssesData}
      columnTitles={[
        { title: 'Nome', fieldName: 'Nome' },
        { title: 'Descrição', fieldName: 'Descricao' },
        {
          title: 'Tipo',
          fieldName: 'Nome',
          type: 'relationship',
          relationshipName: 'Tipo',
        },
      ]}
      actions={addresses.RowActions}
    />
  ) : (
    <blocks.TableSkeleton />
  );
}
