import { Controller, useForm } from 'react-hook-form'

import * as common from '&test/components/common'
import * as buttons from '&test/components/common/Buttons'
import * as form from '&test/components/common/Form'
import * as serviceTariffs from '&test/components/domains/erp/commercial/Services/Tabs/Tariffs'
import * as tariffs from '&test/components/domains/erp/commercial/Registration/Tariffs'

import { yupResolver } from '@hookform/resolvers/yup'
import { notification } from '&test/utils/notification'
import { showError } from '&test/utils/showError'

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
        notification('Tarifa cadastrado com sucesso', 'success')
      })
      .catch((err) => {
        showError(err)
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
          name="Tarifa_Id"
          render={({ field: { onChange, value } }) => (
            <div>
              <form.Select
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
      <buttons.PrimaryButton
        title="Enviar"
        disabled={createTariffLoading}
        loading={createTariffLoading}
      />
    </form>
  )
}
