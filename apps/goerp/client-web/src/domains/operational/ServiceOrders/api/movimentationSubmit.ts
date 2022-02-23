import { movimentacoes_Motivos_enum } from '&erp/graphql/generated/zeus'
import * as utils from '@comigo/utils'
import * as mutations from '../operations/mutations'
import { Dispatch, SetStateAction } from 'react'
import { ServiceOrderData } from '../types/serviceOrder'
import { registerMovement } from './finishServiceOrder'

type movimentationSubmitProps = {
  OS_Id: string
  serviceOrderData: ServiceOrderData
  serviceOrderRefetch: () => void
  setActiveEdit: Dispatch<SetStateAction<boolean>>
  setLoading: Dispatch<SetStateAction<boolean>>
}

export async function movimentationSubmit({
  serviceOrderData,
  OS_Id,
  serviceOrderRefetch,
  setActiveEdit,
  setLoading
}: movimentationSubmitProps) {
  setLoading(true)
  serviceOrderData.Agendamentos[0].Itens.map((item) => {
    registerMovement(
      item,
      1,
      'saida',
      movimentacoes_Motivos_enum.agendamentoDeOS
    )
    mutations
      .updateServiceOrderScheduleItem({
        Id: item.Id,
        RetiradoDoEstoque: true
      })
      .catch((err) => {
        utils.showError(err)
      })
  })
  await mutations
    .updateServiceOrdersSchedule({
      Id: serviceOrderData?.Agendamentos[0].Id,
      OS_Id
    })
    .then(() => {
      setLoading(false)
      serviceOrderRefetch()
      setActiveEdit(false)
      utils.notification('Itens retirados com sucesso', 'success')
    })
    .catch((err) => {
      setLoading(false)
      utils.showError(err)
    })
}
