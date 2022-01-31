import { Controller, useForm } from 'react-hook-form'

import * as common from '@comigo/ui-common'
 
 
import * as serviceTariffs from '&crm/domains/commercial/Services/Tabs/Tariffs'
import * as tariffs from '&crm/domains/commercial/Registration/Tariffs'

import { yupResolver } from '@hookform/resolvers/yup'
 import * as utils from '@comigo/utils'
  

type FormData = {
  Tarifa_Id: {
    key: string
  }
}

export default function CreateTariff() {
  const {
    createTariffLoading,
    createTariff,
    setSlidePanelState,
    tariffsRefetch,
    tariffsSchema
  } = serviceTariffs.useTariff()
  const { tariffsData } = tariffs.useTariffs()
  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm({
    resolver: yupResolver(tariffsSchema)
  })
  const onSubmit = (formData: FormData) => {
    createTariff({
      variables: {
        Tarifa_Id: formData.Tarifa_Id.key
      }
    })
      .then(() => {
        tariffsRefetch()
        setSlidePanelState((oldState) => {
          return { ...oldState, open: false }
        })
          utils.notification('Tarifa cadastrado com sucesso', 'success')
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
          name="Tarifa_Id"
          render={({ field: { onChange, value } }) => (
            <div>
              <common.form.Select
                itens={
                  tariffsData
                    ? tariffsData.map((item) => {
                      return {
                        key: item.Id,
                        title: item.Nome
                      }
                    })
                    : []
                }
                value={value}
                onChange={onChange}
                error={errors.Tarifa_Id}
                label="Tarifa"
              />
            </div>
          )}
        />
      </div>
      <common.Separator />
      <common.buttons.PrimaryButton
        title="Enviar"
        disabled={createTariffLoading}
        loading={createTariffLoading}
      />
    </form>
  )
}
