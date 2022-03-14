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
  await Promise.all(
    serviceOrderData.Agendamentos[0].Itens.map(async (item) => {
      const product = serviceOrderData.Produtos.filter(
        (product) => product.Produto.Id === item.Produto.Id
      )

      for (let index = 0; index < (product?.[0]?.Quantidade || 1); index++) {
        await registerMovement(
          item,
          1,
          'saida',
          movimentacoes_Motivos_enum.agendamentoDeOS
        )
      }

      await mutations
        .updateServiceOrderScheduleItem({
          Id: item.Id,
          RetiradoDoEstoque: true
        })
        .catch((err) => {
          utils.showError(err)
        })
    })
  )
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
