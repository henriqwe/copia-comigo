import * as common from '@comigo/ui-common'
import * as blocks from '@comigo/ui-blocks'
import * as clients from '&crm/domains/identities/Clients'

export default function ListarCliente() {
  const { clientsData } = clients.useList()
  return clientsData ? (
    <blocks.Table
      colection={clientsData}
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
      actions={clients.RowActions}
    />
  ) : (
    <blocks.TableSkeleton />
  )
}
