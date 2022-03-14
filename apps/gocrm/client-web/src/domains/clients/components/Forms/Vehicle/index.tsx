import { useEffect, useState } from 'react'

import * as common from '@comigo/ui-common'

import * as blocks from '@comigo/ui-blocks'

import * as clients from '&crm/domains/clients'

import * as utils from '@comigo/utils'
import * as types from '&crm/domains/clients/types'
import * as api from '&crm/domains/clients/api'

export function Vehicle() {
  const [totalValue, setTotalValue] = useState(0)
  const [collection, setCollection] = useState<types.CollectionType[]>([])
  const [benefits, setBenefits] = useState<types.ListBenefitType[]>([])
  const { clientData, selectedCategory } = clients.useUpdate()

  const selectedVehicle = clientData.VeiculosAtivos.filter(
    (activeVehicle) => activeVehicle.Id === selectedCategory?.id.toString()
  )[0]


  useEffect(() => {
    if (clientData && selectedCategory) {
      api.getVehicleCollection({
        selectedVehicle,
        setBenefits,
        setCollection
      })
    }
  }, [clientData, selectedCategory])

  useEffect(() => {
    api.getRecurrenceTotalValue({
      benefits,
      setTotalValue
    })
  }, [benefits])

  return (
    <common.Card>
      <div className="flex pt-3">
        <clients.InfoDetails
          title={`Situação do veículo`}
          subtitle={selectedVehicle?.Situacao.Comentario}
          details={[]}
          textAlignRight
        />
      </div>
      <common.Divider />
      <blocks.BorderLessTable
        colection={collection}
        columnTitles={[
          {
            // title: 'Descrição do Beneficio / Serviço / Produto',
            title: 'Descrição',
            fieldName: 'Name',
            type: 'handler',
            handler: (value) => (value ? value : '')
          },
          {
            title: 'Tipo',
            fieldName: 'Type',
            type: 'handler',
            handler: (value) => (value ? value : '')
          },
          {
            title: 'Adesão (R$)',
            fieldName: 'MembershipPrice',
            type: 'handler',
            handler: (value) =>
              value !== undefined ? utils.BRLMoneyFormat(Number(value)) : ''
          },
          {
            title: 'Recorrência (R$)',
            fieldName: 'RecurrencePrice',
            type: 'handler',
            handler: (value) =>
              value !== undefined ? utils.BRLMoneyFormat(Number(value)) : ''
          },
          {
            title: 'Identificador',
            fieldName: 'Identifier',
            type: 'handler',
            handler: (value) => (value !== undefined ? value : '')
          },
          {
            title: 'Quantidade',
            fieldName: 'Amount',
            type: 'handler',
            handler: (value) => (value ? value : '')
          },
          {
            title: 'Data de ativação',
            fieldName: 'ActivationDate',
            type: 'date'
          },
          {
            title: 'Data de desativação',
            fieldName: 'DesactivationDate',
            type: 'handler',
            handler: (value) =>
              value !== undefined && value !== null
                ? utils.ptBRtimeStamp(value)
                : 'Não definida'
          }
        ]}
      />
      <common.Divider />
      <common.LineInfoDetailsColumns>
        <clients.InfoDetails
          title={`Recorrência`}
          subtitle={utils.BRLMoneyFormat(totalValue)}
          textAlignRight
        >
          <div className="mt-1">Adesão</div>
        </clients.InfoDetails>
      </common.LineInfoDetailsColumns>
    </common.Card>
  )
}
