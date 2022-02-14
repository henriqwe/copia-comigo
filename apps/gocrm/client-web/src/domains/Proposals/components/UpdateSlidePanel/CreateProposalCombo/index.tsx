import { Controller, useForm } from 'react-hook-form'
import * as common from '@comigo/ui-common'
import * as proposals from '&crm/domains/Proposals'
import * as utils from '@comigo/utils'

type FormData = {
  Combo_Id: {
    key: {
      Id: string
      Nome: string
      Precos: {
        Id: string
      }[]
    }
  }
}

export function CreateProposalCombos() {
  const {
    setSlidePanelState,
    combosData,
    insertProposalCombo,
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
      await insertProposalCombo({
        variables: {
          ComboPreco_Id: formData.Combo_Id.key.Precos[0].Id,
          Combo_Id: formData.Combo_Id.key.Id,
          PropostaVeiculo_Id: selectedCategory.id
        }
      })

      proposalRefetch()
      utils.notification(
        formData.Combo_Id.key.Nome + ' cadastrado com sucesso',
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
          name="Combo_Id"
          render={({ field: { onChange, value } }) => (
            <div>
              <common.form.Select
                itens={
                  combosData
                    ? combosData.map((combo) => {
                        return {
                          key: combo,
                          title: combo.Nome as string
                        }
                      })
                    : []
                }
                value={value}
                onChange={onChange}
                error={errors.Combo_Id}
                label="Combo"
              />
            </div>
          )}
        />
      </div>
      <common.Separator />
      <common.buttons.PrimaryButton title="Enviar" />
    </form>
  )
}
