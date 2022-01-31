import * as blocks from '@comigo/ui-blocks'
import * as providers from '&crm/domains/commercial/Providers'

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
