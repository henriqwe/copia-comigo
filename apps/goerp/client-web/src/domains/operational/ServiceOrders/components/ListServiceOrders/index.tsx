import * as blocks from '@comigo/ui-blocks'
import * as utils from '@comigo/utils'
import * as serviceOrders from '&erp/domains/operational/ServiceOrders'
import { useEffect, useState } from 'react'
import * as queries from '../../operations/queries'

type TableData = {
  operacional_OrdemDeServico: unknown[]
  operacional_OrdemDeServico_aggregate: {
    aggregate?: { count: number }
    nodes: { Id: string }[]
  }
}

export function List() {
  const { filteredOSs, filters, setFilters } = serviceOrders.useServiceOrder()
  const [tableData, setTableData] = useState<TableData>()

  useEffect(() => {
    update()
  }, [filteredOSs])

  async function update() {
    if (filteredOSs) {
      const data = []
      await Promise.all(
        filteredOSs?.operacional_OrdemDeServico?.map(async (item) => {
          const clientData = item.Proposta?.Cliente_Id
            ? await queries.getClientById(item.Proposta.Cliente_Id)
            : await queries
                .getClientByVehicle(item.Veiculo_Id as string)
                .then((client) => {
                  if (client.VeiculosAtivos.length > 0) {
                    return client.VeiculosAtivos[0].Cliente
                  }
                  return { Pessoa: { Nome: '' } }
                })
          const { Placa, NumeroDoChassi } = await queries.getVehicleById(
            item.Veiculo_Id
          )

          data.push({
            ...clientData,
            ...item,
            veiculoPlaca: Placa ? Placa : NumeroDoChassi
          })
        })
      )
      setTableData({
        operacional_OrdemDeServico: data,
        operacional_OrdemDeServico_aggregate:
          filteredOSs.operacional_OrdemDeServico_aggregate
      })
    }
  }

  return tableData ? (
    <blocks.Table
      colection={tableData}
      columnTitles={[
        { title: 'Código Identificador', fieldName: 'CodigoIdentificador' },
        {
          title: 'Cliente',
          fieldName: 'Pessoa',
          type: 'handler',
          handler: (Pessoa) => {
            return Pessoa.Nome
          }
        },
        {
          title: 'Veículo',
          fieldName: 'veiculoPlaca'
        },
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
