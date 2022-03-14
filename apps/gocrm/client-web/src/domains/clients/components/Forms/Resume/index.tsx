import { useEffect, useState } from 'react'

import * as blocks from '@comigo/ui-blocks'
import * as common from '@comigo/ui-common'
import * as utils from '@comigo/utils'
import * as clients from '&crm/domains/clients'
import * as types from '&crm/domains/clients/types'
import * as api from '&crm/domains/clients/api'

type CollectionType = {
  Vehicle?: string
} & types.CollectionType

export function Resume() {
  const [benefits, setBenefits] = useState<types.ListBenefitType[]>([])
  const [collection, setCollection] = useState<CollectionType[]>([])

  const { clientData, setTotalValue } = clients.useUpdate()

  useEffect(() => {
    if (clientData) {
      api.getResumeCollection({
        clientData,
        setBenefits,
        setCollection
      })
    }
  }, [clientData])

  useEffect(() => {
    api.getRecurrenceTotalValue({
      benefits,
      setTotalValue
    })
  }, [benefits])

  return (
    <common.Card>
      <blocks.BorderLessTable
        colection={collection}
        columnTitles={[
          {
            title: 'Veículo',
            fieldName: 'Vehicle',
            type: 'handler',
            handler: (value) => (value ? value : '')
          },
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
            handler: (value) => (value ? value : '')
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
            type: 'handler',
            handler: (value) =>
              value !== undefined && value !== null
                ? utils.ptBRtimeStamp(value)
                : ''
          },
          {
            title: 'Data de desativação',
            fieldName: 'DesactivationDate',
            type: 'handler',
            handler: (value) =>
              value !== undefined && value !== null
                ? utils.ptBRtimeStamp(value)
                : ''
          }
        ]}
      />
    </common.Card>
  )
}
