import * as common from '&test/components/common'
import * as blocks from '&test/components/blocks'
import * as clients from '&test/components/domains/erp/identities/Clients'

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
