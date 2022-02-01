import * as products from '&test/components/domains/erp/purchases/Products'
import * as blocks from '&test/components/blocks'

export default function List() {
  const { productsData } = products.useList()
  return productsData ? (
    <blocks.Table
      colection={productsData}
      columnTitles={[
        { title: 'Nome', fieldName: 'Nome' },
        // { title: 'Descrição', fieldName: 'Descricao' },
        { title: 'Utilização', fieldName: 'Utilizacao' },
        { title: 'NCM', fieldName: 'NCM' }
      ]}
      actions={products.RowActions}
    />
  ) : (
    <blocks.TableSkeleton />
  )
}
