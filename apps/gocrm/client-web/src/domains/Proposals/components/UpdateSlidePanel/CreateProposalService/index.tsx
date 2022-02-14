import { Controller, useForm } from 'react-hook-form'
import * as common from '@comigo/ui-common'
import * as proposals from '&crm/domains/Proposals'
import * as utils from '@comigo/utils'

type FormData = {
  Servico_Id: {
    key: {
      Id: string
      Nome: string
      Tipo: {
        Valor: string
        Comentario: string
      }
      PrestadoresDeServicos: {
        Precos: {
          Id: string
          Valor: string
        }[]
      }[]
    }
  }
}

export function CreateProposalService() {
  const {
    setSlidePanelState,
    servicesData,
    insertProposalService,
    insertProposalServiceLoading,
    selectedCategory,
    proposalRefetch
  } = proposals.useUpdate()
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch
  } = useForm()

  const onSubmit = async (formData: FormData) => {
    await insertProposalService({
      variables: {
        Servico_Id: formData.Servico_Id.key.Id,
        ServicosPreco_Id:
          formData.Servico_Id.key.PrestadoresDeServicos[0].Precos[0].Id,
        PropostaVeiculo_Id: selectedCategory.id
      }
    })
    proposalRefetch()
    utils.notification(
      formData.Servico_Id.key.Nome + ' cadastrado com sucesso',
      'success'
    )
    setSlidePanelState((oldState) => {
      return { ...oldState, open: false }
    })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      data-testid="inserirForm"
      className="flex flex-col items-end"
    >
      <div className="flex flex-col w-full gap-2 mb-2">
        <Controller
          control={control}
          name="Servico_Id"
          render={({ field: { onChange, value } }) => (
            <div>
              <common.form.Select
                itens={
                  servicesData
                    ? servicesData
                        .filter(
                          (service) =>
                            (service.PrestadoresDeServicos?.[0].Precos.length ||
                              0) > 0
                        )
                        .map((service) => {
                          return {
                            key: service,
                            title: service.Nome as string
                          }
                        })
                    : []
                }
                value={value}
                onChange={onChange}
                error={errors.Servico_Id}
                label="Servico"
              />
            </div>
          )}
        />
        {watch('Servico_Id') !== undefined && (
          <p>Tipo: {watch('Servico_Id').key.Tipo.Comentario}</p>
        )}
      </div>
      <common.Separator />
      <common.buttons.PrimaryButton
        title="Enviar"
        disabled={insertProposalServiceLoading}
        loading={insertProposalServiceLoading}
      />
    </form>
  )
}
