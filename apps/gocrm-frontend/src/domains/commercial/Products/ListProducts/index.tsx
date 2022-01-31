import * as blocks from '@comigo/ui-blocks'
import * as products from '&crm/domains/commercial/Products'

export default function List() {
  const { filteredProducts, filters, setFilters } = products.useProduct()
  return filteredProducts ? (
    <blocks.Table
      colection={filteredProducts}
      tableName="comercial_Produtos"
      columnTitles={[
        { title: 'Nome', fieldName: 'Nome' },
        {
          title: 'Tipo',
          fieldName: 'Comentario',
          type: 'relationship',
          relationshipName: 'Tipo'
        }
      ]}
      actions={products.RowActions}
      pagination={{ filters, setFilters }}
    />
  ) : (
    <blocks.TableSkeleton />
  )
}
