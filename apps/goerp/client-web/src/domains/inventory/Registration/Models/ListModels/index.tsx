import * as blocks from '@comigo/ui-blocks';
import * as models from '&erp/domains/inventory/Registration/Models';

export function List() {
  const { modelsData } = models.useModel();
  return modelsData ? (
    <blocks.Table
      colection={modelsData}
      columnTitles={[
        { title: 'Nome', fieldName: 'Nome' },
        { title: 'Descrição', fieldName: 'Descricao' },
        {
          title: 'Produto',
          fieldName: 'Nome',
          type: 'relationship',
          relationshipName: 'Produto',
        },
        {
          title: 'Fabricante',
          fieldName: 'Nome',
          type: 'relationship',
          relationshipName: 'Fabricante',
        },
      ]}
      actions={models.RowActions}
    />
  ) : (
    <blocks.TableSkeleton />
  );
}
