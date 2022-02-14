import { Controller, useForm } from 'react-hook-form'
import * as common from '@comigo/ui-common'
import * as combos from '&crm/domains/commercial/Combos'
import * as utils from '@comigo/utils'

type FormData = {
  Plan_Id: {
    key: {
      Id: string
      Nome: string
      Precos: {
        Id: string
        ValorDeAdesao: string
        ValorDeRecorrencia: string
      }[]
    }
  }
}

export function CreateComboPlan() {
  const {
    setSlidePanelState,
    plansData,
    createComboPlan,
    createComboPlanLoading,
    comboRefetch
  } = combos.useView()
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch
  } = useForm()

  const onSubmit = async (formData: FormData) => {
    await createComboPlan({
      variables: {
        Plano_Id: formData.Plan_Id.key.Id,
        PlanoPreco_Id: formData.Plan_Id.key.Precos[0].Id
      }
    })
      .then(() => {
        comboRefetch()
        utils.notification(
          formData.Plan_Id.key.Nome + ' cadastrado com sucesso',
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
          name="Plan_Id"
          render={({ field: { onChange, value } }) => (
            <div>
              <common.form.Select
                itens={
                  plansData
                    ? plansData.map((plan) => {
                        return {
                          key: plan,
                          title: plan.Nome as string
                        }
                      })
                    : []
                }
                value={value}
                onChange={onChange}
                error={errors.Plan_Id}
                label="Plano"
              />
            </div>
          )}
        />
        {watch('Plan_Id') !== undefined && (
          <div>
            <p>
              ValorDeAdesao:{' '}
              {utils.BRLMoneyFormat(
                watch('Plan_Id').key.Precos[0].ValorDeAdesao
              )}
            </p>
            <p>
              ValorDeRecorrencia:{' '}
              {utils.BRLMoneyFormat(
                watch('Plan_Id').key.Precos[0].ValorDeRecorrencia
              )}
            </p>
          </div>
        )}
      </div>
      <common.Separator />
      <common.buttons.PrimaryButton
        title="Enviar"
        loading={createComboPlanLoading}
        disabled={createComboPlanLoading}
      />
    </form>
  )
}
