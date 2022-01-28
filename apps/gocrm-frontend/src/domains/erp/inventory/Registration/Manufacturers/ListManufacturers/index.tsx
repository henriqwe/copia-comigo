import * as blocks from '@/blocks'
import * as manufacturers from '&crm/domains/erp/inventory/Registration/Manufacturers'

export default function List() {
  const { filteredManufacturers, filters, setFilters } =
    manufacturers.useManufacturer()
  return filteredManufacturers ? (
    <blocks.Table
      tableName="estoque_Fabricantes"
      colection={filteredManufacturers}
      columnTitles={[
        { title: 'Nome', fieldName: 'Nome' },
        { title: 'Descrição', fieldName: 'Descricao' }
      ]}
      actions={manufacturers.RowActions}
      pagination={{ filters, setFilters }}
    />
  ) : (
    <blocks.TableSkeleton />
  )
}
