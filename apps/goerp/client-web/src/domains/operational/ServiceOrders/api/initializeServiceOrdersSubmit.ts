import * as utils from '@comigo/utils'
import * as mutations from '../operations/mutations'
import { Dispatch, SetStateAction } from 'react'
import { ServiceOrderData } from '../types/serviceOrder'

type InitializeServiceOrdersSubmitProps = {
  OS_Id: string
  serviceOrderData: ServiceOrderData
  serviceOrderRefetch: () => void
  setActiveEdit: Dispatch<SetStateAction<boolean>>
  setLoading: Dispatch<SetStateAction<boolean>>
}

export async function initializeServiceOrdersSubmit({
  serviceOrderData,
  OS_Id,
  serviceOrderRefetch,
  setActiveEdit,
  setLoading
}: InitializeServiceOrdersSubmitProps) {
  setLoading(true)
  await mutations
    .initializeServiceOrders({
      Id: serviceOrderData?.Agendamentos[0].Id,
      OS_Id
    })
    .then(() => {
      setLoading(false)
      serviceOrderRefetch()
      setActiveEdit(false)
      utils.notification('Serviços iniciados com sucesso', 'success')
    })
    .catch((err) => {
      setLoading(false)
      utils.showError(err)
    })
}
