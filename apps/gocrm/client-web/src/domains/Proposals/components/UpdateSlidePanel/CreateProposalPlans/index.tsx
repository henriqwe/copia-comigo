import { Controller, useForm } from 'react-hook-form'
import * as common from '@comigo/ui-common'
import * as proposals from '&crm/domains/Proposals'
import * as utils from '@comigo/utils'

type FormData = {
  Plan_Id: {
    key: {
      Id: string
      Nome: string
      Precos: {
        Id: string
        Valor?: string
      }[]
    }
  }
}

export function CreateProposalPlans() {
  const {
    setSlidePanelState,
    plansData,
    insertProposalPlan,
    insertProposalPlanLoading,
    selectedCategory,
    proposalRefetch
  } = proposals.useUpdate()
  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm()

  const onSubmit = async (formData: FormData) => {
    try {
      await insertProposalPlan({
        variables: {
          PlanoPreco_Id: formData.Plan_Id.key.Precos[0].Id,
          Plano_Id: formData.Plan_Id.key.Id,
          PropostaVeiculo_Id: selectedCategory.id
        }
      })

      proposalRefetch()
      utils.notification(
        formData.Plan_Id.key.Nome + ' cadastrado com sucesso',
        'success'
      )
      setSlidePanelState((oldState) => {
        return { ...oldState, open: false }
      })
    } catch (err) {
      utils.showError(err)
    }
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
      </div>
      <common.Separator />
      <common.buttons.PrimaryButton
        title="Enviar"
        disabled={insertProposalPlanLoading}
        loading={insertProposalPlanLoading}
      />
    </form>
  )
}
