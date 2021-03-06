import * as products from '&erp/domains/purchases/Products';
import * as blocks from '@comigo/ui-blocks';

export function List() {
  const { productsData } = products.useList();
  return productsData ? (
    <blocks.Table
      colection={productsData}
      columnTitles={[
        { title: 'Nome', fieldName: 'Nome' },
        // { title: 'Descrição', fieldName: 'Descricao' },
        { title: 'Utilização', fieldName: 'Utilizacao' },
        { title: 'NCM', fieldName: 'NCM' },
      ]}
      actions={products.RowActions}
    />
  ) : (
    <blocks.TableSkeleton />
  );
}
