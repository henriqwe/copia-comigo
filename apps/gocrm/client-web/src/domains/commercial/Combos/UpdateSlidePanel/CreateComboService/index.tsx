import { Controller, useForm } from 'react-hook-form'
import * as common from '@comigo/ui-common'
import * as combos from '&crm/domains/commercial/Combos'
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

export function CreateComboService() {
  const {
    setSlidePanelState,
    servicesData,
    createComboService,
    createComboServiceLoading,
    comboRefetch
  } = combos.useView()
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch
  } = useForm()

  const onSubmit = async (formData: FormData) => {
    await createComboService({
      variables: {
        Servico_Id: formData.Servico_Id.key.Id
      }
    })
      .then(() => {
        comboRefetch()
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
        loading={createComboServiceLoading}
        disabled={createComboServiceLoading}
      />
    </form>
  )
}
