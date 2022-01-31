import { useRouter } from 'next/router'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import * as common from '@comigo/ui-common'
 
 
import * as serviceOrders from '&crm/domains/operational/ServiceOrders'
import rotas from '&crm/domains/routes'

 import * as utils from '@comigo/utils'
 

type FormData = {
  DataAgendamento: Date
  Tipo: {
    key: string
    title: string
  }
  Proposta: {
    key: string
    title: string
  }
}

export default function CreateServiceOrder() {
  const router = useRouter()
  const {
    createServiceOrderLoading,
    createServiceOrder,
    setSlidePanelState,
    serviceOrdersRefetch,
    serviceOrderschema,
    serviceOrdersTypesData,
    proposalsData
  } = serviceOrders.useServiceOrder()
  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm({
    resolver: yupResolver(serviceOrderschema)
  })
  const onSubmit = (formData: FormData) => {
    createServiceOrder({
      variables: {
        Tipo_Id: formData.Tipo.key,
        Proposta_Id: formData.Proposta.key
      }
    })
      .then(() => {
        serviceOrdersRefetch()
        setSlidePanelState((oldState) => {
          return { ...oldState, open: false }
        })
          utils.notification('Ordem de serviço cadastrada com sucesso', 'success')
      })
      .catch((err) => {
        utils.showError(err)
      })
  }

  return (
    <form      onSubmit={handleSubmit(onSubmit)}
      data-testid="inserirForm"
      className="flex flex-col items-end"
    >
      <div className="flex flex-col w-full gap-2 mb-2">
        <Controller
          control={control}
          name="Tipo"
          render={({ field: { onChange, value } }) => (
            <div className="col-span-2">
              <common.form.Select
                itens={
                  serviceOrdersTypesData
                    ? serviceOrdersTypesData.map((vehicleCategory) => {
                      return {
                        key: vehicleCategory.Valor,
                        title: vehicleCategory.Comentario
                      }
                    })
                    : []
                }
                value={value}
                onChange={onChange}
                error={errors.Tipo}
                label="Tipo"
              />
            </div>
          )}
        />

        <Controller
          control={control}
          name="Proposta"
          render={({ field: { onChange, value } }) => (
            <div className="col-span-2">
              <common.form.Select
                itens={
                  proposalsData
                    ? proposalsData.map((proposal) => {
                      return {
                        key: proposal.Id,
                        title:
                          proposal.Lead.Nome +
                          ' - ' +
                          proposal.Usuario.Colaborador?.Pessoa.Nome
                      }
                    })
                    : []
                }
                value={value}
                onChange={onChange}
                error={errors.Proposta}
                label="Proposta"
              />
              <common.OpenModalLink
                onClick={() =>
                  router.push(rotas.comercial.propostas.cadastrar)
                }
              >
                Cadastrar Proposta
              </common.OpenModalLink>
            </div>
          )}
        />
      </div>
      <common.Separator />
      <common.buttons.PrimaryButton
        title="Enviar"
        disabled={createServiceOrderLoading}
        loading={createServiceOrderLoading}
      />
    </form>
  )
}
