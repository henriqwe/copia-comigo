import * as blocks from '&test/components/blocks'
import * as providers from '&test/components/domains/erp/commercial/Providers'

export default function List() {
  const { providersData } = providers.useProvider()
  return providersData ? (
    <blocks.Table
      colection={providersData}
      columnTitles={[{ title: 'Nome', fieldName: 'Nome' }]}
      actions={providers.RowActions}
    />
  ) : (
    <blocks.TableSkeleton />
  )
}
