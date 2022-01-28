import * as blocks from '@comigo/ui-blocks'
import * as addressingTypes from '&erp/domains/inventory/Registration/Addresses/AddressingTypes'

export function List() {
  const { addressingTypesData } = addressingTypes.useAddressingType()
  return addressingTypesData ? (
    <blocks.Table
      colection={addressingTypesData}
      columnTitles={[
        { title: 'Nome', fieldName: 'Nome' },
        { title: 'Descrição', fieldName: 'Descricao' },
        { title: 'Slug', fieldName: 'Slug' }
      ]}
      actions={addressingTypes.RowActions}
    />
  ) : (
    <blocks.TableSkeleton />
  )
}
