import * as kitsTypes from '&crm/domains/production/Kits/InputKits/KitsTypes';
import * as blocks from '@comigo/ui-blocks';

export default function List() {
  const { kitsTypesData } = kitsTypes.useList();
  return kitsTypesData ? (
    <blocks.Table
      colection={kitsTypesData}
      columnTitles={[
        { title: 'Nome', fieldName: 'Nome' },
        {
          title: 'Quantidade de itens',
          fieldName: 'Itens',
          type: 'handler',
          handler: (itens) => itens.length,
        },
      ]}
      actions={kitsTypes.RowActions}
    />
  ) : (
    <blocks.TableSkeleton />
  );
}
