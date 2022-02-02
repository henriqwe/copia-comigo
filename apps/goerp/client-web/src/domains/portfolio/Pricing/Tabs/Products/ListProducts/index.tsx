import * as blocks from '@comigo/ui-blocks';
import * as products from '&erp/domains/portfolio/Pricing/Tabs/Products';

export function List() {
  const { productsData } = products.useProduct();
  return productsData ? (
    <>
      <blocks.Table
        colection={productsData}
        columnTitles={[{ title: 'Nome', fieldName: 'Nome' }]}
        actions={products.RowActions}
      />
      <products.SlidePanel />
    </>
  ) : (
    <blocks.TableSkeleton />
  );
}
