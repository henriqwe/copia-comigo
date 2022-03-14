import * as blocks from '@comigo/ui-blocks'
import * as clients from '&crm/domains/clients'

export function List() {
  const { clientsData } = clients.useClient()

  return clientsData ? (
    <blocks.Table
      colection={clientsData}
      columnTitles={[
        {
          title: 'Nome',
          fieldName: 'Nome',
          type: 'relationship',
          relationshipName: 'Pessoa'
        },
        {
          title: 'Qtd. Veículos ativos',
          fieldName: 'VeiculosAtivos_aggregate',
          type: 'handler',
          handler: (VeiculosAtivosAggregate) => {
            return VeiculosAtivosAggregate.aggregate.count
          }
        }
      ]}
      actions={clients.RowActions}
    />
  ) : (
    <blocks.TableSkeleton />
  )
}
