import * as blocks from '&test/components/blocks'
import * as providers from '&test/components/domains/erp/identities/Providers'

export default function ListProviders() {
  const { providersData } = providers.useList()
  return providersData ? (
    <blocks.Table
      colection={providersData}
      columnTitles={[
        {
          title: 'Identificador',
          fieldName: 'Identificador',
          type: 'relationship',
          relationshipName: 'Pessoa'
        },
        {
          title: 'Nome',
          fieldName: 'Nome',
          type: 'relationship',
          relationshipName: 'Pessoa'
        }
      ]}
      actions={providers.RowActions}
    />
  ) : (
    <blocks.TableSkeleton />
  )
}
