import * as blocks from '@/blocks'
import * as products from '@/domains/erp/portfolio/Pricing/Tabs/Products'

export default function List() {
  const { productsData } = products.useProduct()
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
  )
}
