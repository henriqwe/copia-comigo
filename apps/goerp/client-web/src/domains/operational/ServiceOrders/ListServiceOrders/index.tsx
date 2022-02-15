import * as blocks from '@comigo/ui-blocks'
import * as utils from '@comigo/utils'
import * as serviceOrders from '&erp/domains/operational/ServiceOrders'

export function List() {
  const { filteredOSs, filters, setFilters } = serviceOrders.useServiceOrder()

  return filteredOSs ? (
    <blocks.Table
      colection={filteredOSs}
      columnTitles={[
        { title: 'Código Identificador', fieldName: 'CodigoIdentificador' },
        {
          title: 'Tipo',
          fieldName: 'Comentario',
          type: 'relationship',
          relationshipName: 'Tipo'
        },
        {
          title: 'Situação',
          fieldName: 'Comentario',
          type: 'relationship',
          relationshipName: 'Situacao'
        },
        {
          title: 'Data de Agendamento',
          fieldName: 'Agendamentos',
          type: 'handler',
          handler: (schedule) => {
            if (schedule.length > 0) {
              return utils.ptBRtimeStamp(schedule[0].Agendamento)
            }
            return 'Sem Agendamento'
          }
        },
        {
          title: 'Colaborador',
          fieldName: 'Agendamentos',
          type: 'handler',
          handler: (schedule) => {
            if (schedule.length > 0) {
              return schedule[0].Colaborador.Pessoa.Nome
            }
            return 'Sem Colaborador'
          }
        }
      ]}
      tableName="operacional_OrdemDeServico"
      actions={serviceOrders.RowActions}
    />
  ) : (
    <blocks.TableSkeleton />
  )
}
