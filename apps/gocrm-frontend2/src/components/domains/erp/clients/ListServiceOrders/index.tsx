import * as blocks from '&test/components/blocks'
import * as clients from '&test/components/domains/erp/clients'

export default function List() {
  const { clientsData } = clients.useClient()
  return clientsData ? (
    <blocks.Table
      colection={clientsData}
      columnTitles={[
        {
          title: 'Tipo',
          fieldName: 'Nome',
          type: 'relationship',
          relationshipName: 'Pessoa'
        }
      ]}
      actions={clients.RowActions}
    />
  ) : (
    <blocks.TableSkeleton />
  )
}
