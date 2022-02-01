import * as blocks from '&test/components/blocks'
import * as attributes from '&test/components/domains/erp/commercial/Registration/Attributes'

export default function List() {
  const { attributeData } = attributes.useAttribute()
  return attributeData ? (
    <blocks.Table
      colection={attributeData}
      columnTitles={[{ title: 'Nome', fieldName: 'Nome' }]}
      actions={attributes.RowActions}
    />
  ) : (
    <blocks.TableSkeleton />
  )
}
