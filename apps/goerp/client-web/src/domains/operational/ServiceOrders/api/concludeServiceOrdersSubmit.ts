import * as utils from '@comigo/utils'
import * as mutations from '../operations/mutations'
import { Dispatch, SetStateAction } from 'react'
import { ServiceOrderData } from '../types/serviceOrder'

type ConcludeServiceOrdersSubmitProps = {
  OS_Id: string
  serviceOrderData: ServiceOrderData
  serviceOrderRefetch: () => void
  setActiveEdit: Dispatch<SetStateAction<boolean>>
  setLoading: Dispatch<SetStateAction<boolean>>
}

export async function concludeServiceOrdersSubmit({
  serviceOrderData,
  OS_Id,
  serviceOrderRefetch,
  setActiveEdit,
  setLoading
}: ConcludeServiceOrdersSubmitProps) {
  setLoading(true)
  await mutations
    .concludeServiceOrder({
      Id: serviceOrderData?.Agendamentos[0].Id,
      OS_Id
    })
    .then(() => {
      setLoading(false)
      serviceOrderRefetch()
      setActiveEdit(false)
      utils.notification('Serviços concluidos com sucesso', 'success')
    })
    .catch((err) => {
      setLoading(false)
      utils.showError(err)
    })
}
