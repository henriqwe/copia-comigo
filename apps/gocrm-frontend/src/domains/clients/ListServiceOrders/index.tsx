import * as blocks from '@comigo/ui-blocks'
import * as clients from '&crm/domains/clients'

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
