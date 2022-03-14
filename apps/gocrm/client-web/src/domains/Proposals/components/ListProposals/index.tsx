import * as proposals from '&crm/domains/Proposals'
import * as blocks from '@comigo/ui-blocks'
import { useEffect, useState } from 'react'
import { getClientById } from '../../operations/queries/client'
import { getLeadById } from '../../operations/queries/getLeadById'
import { getVehicleById } from '../../operations/queries/vehicle'

export function ListProposals() {
  const { proposalsData } = proposals.useList()
  const [tableData, setTableData] = useState<unknown[]>()

  useEffect(() => {
    update()
  }, [proposalsData])

  async function update() {
    if (proposalsData) {
      const data = []
      await Promise.all(
        proposalsData?.map(async (proposal) => {
          const veiculosPlacas = []

          await Promise.all(
            proposal.Veiculos.map(async (vehicle) => {
              const { Placa, NumeroDoChassi } = await getVehicleById(
                vehicle.Veiculo_Id
              )
              if (Placa) {
                veiculosPlacas.push(Placa)
                return
              }
              veiculosPlacas.push(NumeroDoChassi)
            })
          )
          if (proposal.Cliente_Id) {
            const clientData = await getClientById(proposal.Cliente_Id)
            data.push({
              Nome: clientData.Pessoa.Nome,
              ...proposal,
              veiculosPlacas: veiculosPlacas.join(', ')
            })
            return
          }
          if (proposal.Lead_Id) {
            const leadData = await getLeadById(proposal.Lead_Id)
            data.push({
              Nome: leadData.Nome,
              ...proposal,
              veiculosPlacas: veiculosPlacas.join(', ')
            })
            return
          }
          data.push({
            ...proposal,
            veiculosPlacas: veiculosPlacas.join(', ')
          })
        })
      )
      setTableData(data)
    }
  }

  return tableData !== undefined ? (
    <blocks.Table
      colection={tableData}
      columnTitles={[
        {
          title: 'Sequencial',
          fieldName: 'CodigoReferencia'
        },
        {
          title: 'Cliente | Lead',
          fieldName: 'Nome',
          type: 'handler',
          handler: (Name) => (Name ? Name : 'Não definido')
        },
        {
          title: 'Veículos',
          fieldName: 'veiculosPlacas',
          type: 'handler',
          handler: (vehicles) => (vehicles ? vehicles : 'Sem veículos')
        },
        {
          title: 'Situação',
          fieldName: 'Comentario',
          type: 'relationship',
          relationshipName: 'Situacao'
        },
        {
          title: 'Data de criação',
          fieldName: 'created_at',
          type: 'date'
        }
      ]}
      actions={proposals.RowActions}
    />
  ) : (
    <blocks.TableSkeleton />
  )
}
