import { Controller, useForm } from 'react-hook-form'

import * as common from '@comigo/ui-common'
import * as proposals from '&crm/domains/Proposals'

import * as utils from '@comigo/utils'

type SelectItem = {
  key: {
    Id: string
    Apelido?: string
    Placa?: string
  }
  title: string
}

type FormData = {
  TipoDePagamento_Id: SelectItem
  DiaDeFaturamento_Id: SelectItem
}

export function SelectPaymentType() {
  const {
    setSlidePanelState,
    paymentTypesData,
    slidePanelState,
    insertProposalPaymentType,
    insertProposalPaymentTypeLoading,
    insertClientPaymentType,
    insertClientPaymentTypeLoading,
    proposalRefetch,
    proposalData,
    setClient,
    getClientById,
    paymentDayData
  } = proposals.useUpdate()
  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm()

  const onSubmit = async (formData: FormData) => {
    try {
      if (formData.TipoDePagamento_Id === undefined) {
        throw new Error('Selecione o tipo de pagamento para continuar')
      }
      if (slidePanelState.type === 'paymentType') {
        await insertProposalPaymentType({
          variables: {
            FormaDePagamentoDaAdesao_Id: formData.TipoDePagamento_Id.key
          }
        })
        proposalRefetch()
        setSlidePanelState({
          type: 'paymentType',
          open: false
        })
        utils.notification('Tipo de pagamento alterado com sucesso', 'success')
        return
      }
      if (formData.DiaDeFaturamento_Id === undefined) {
        throw new Error('Selecione o tipo de pagamento para continuar')
      }
      await insertClientPaymentType({
        variables: {
          Id: proposalData.Cliente_Id,
          DiaDeFaturamento_Id: formData.DiaDeFaturamento_Id.key,
          FormaDePagamento_Id: formData.TipoDePagamento_Id.key
        }
      })
      const cliente = await getClientById(proposalData.Cliente_Id)
      setClient(cliente)
      setSlidePanelState({
        type: 'clientPaymentType',
        open: false
      })
      utils.notification('Tipo de pagamento alterado com sucesso', 'success')
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
          name={'TipoDePagamento_Id'}
          render={({ field: { onChange, value } }) => (
            <div>
              <common.form.Select
                itens={
                  paymentTypesData
                    ? paymentTypesData.map((paymentType) => {
                        return {
                          key: paymentType.Valor,
                          title: paymentType.Comentario
                        }
                      })
                    : []
                }
                value={value}
                onChange={onChange}
                error={errors.TipoDePagamento_Id}
                label="Tipo de pagamento"
              />
            </div>
          )}
        />

        {slidePanelState.type === 'clientPaymentType' && (
          <Controller
            control={control}
            name={'DiaDeFaturamento_Id'}
            render={({ field: { onChange, value } }) => (
              <div>
                <common.form.Select
                  itens={
                    paymentDayData
                      ? paymentDayData.map((paymentType) => {
                          return {
                            key: paymentType.Valor,
                            title: paymentType.Comentario
                          }
                        })
                      : []
                  }
                  value={value}
                  onChange={onChange}
                  error={errors.DiaDeFaturamento_Id}
                  label="Dia de faturamento"
                />
              </div>
            )}
          />
        )}
      </div>
      <common.Separator />
      <common.buttons.PrimaryButton
        title="Enviar"
        disabled={
          insertClientPaymentTypeLoading || insertProposalPaymentTypeLoading
        }
        loading={
          insertClientPaymentTypeLoading || insertProposalPaymentTypeLoading
        }
      />
    </form>
  )
}
