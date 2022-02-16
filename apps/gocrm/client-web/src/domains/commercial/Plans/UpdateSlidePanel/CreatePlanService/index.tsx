import { Controller, useForm } from 'react-hook-form'
import * as common from '@comigo/ui-common'
import * as plans from '&crm/domains/commercial/Plans'
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
        Precos: { Id: true; Valor: true }[]
      }[]
    }
  }
}

export function CreatePlanService() {
  const {
    setSlidePanelState,
    servicesData,
    createServicePlan,
    createServicePlanLoading,
    plansRefetch
  } = plans.useUpdate()
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch
  } = useForm()

  const onSubmit = async (formData: FormData) => {
    await createServicePlan({
      variables: {
        Servico_Id: formData.Servico_Id.key.Id
      }
    })
      .then(() => {
        plansRefetch()
        utils.notification(
          formData.Servico_Id.key.Nome + ' cadastrado com sucesso',
          'success'
        )
        setSlidePanelState((oldState) => {
          return { ...oldState, open: false }
        })
      })
      .catch((err) => {
        utils.showError(err)
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
                    ? servicesData.map((service) => {
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
          <div>
            <p>Tipo: {watch('Servico_Id').key.Tipo.Comentario}</p>
            <p>
              Preço:{' '}
              {utils.BRLMoneyFormat(
                watch('Servico_Id').key.PrestadoresDeServicos[0].Precos[0].Valor
              )}
            </p>
          </div>
        )}
      </div>
      <common.Separator />
      <common.buttons.PrimaryButton
        title="Enviar"
        loading={createServicePlanLoading}
        disabled={createServicePlanLoading}
      />
    </form>
  )
}
